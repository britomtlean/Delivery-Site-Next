'use client';

import { Produto, ProdutoDB } from '@/Types/Types';
import { Produtos, Usuarios } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

type Carrinho = {
    nomeCliente: string | null;
    contatoCliente: string | null;
    enderecoCliente: string | null;
    produtos: Produto[] | null;
    loja: string | null;
    valorTotal: number;

};

export type ContextType = {
    connection: HubConnection | null;
    setConnection: React.Dispatch<SetStateAction<HubConnection | null>>;
    connectionsStatus: boolean;
    setConnectionsStatus: React.Dispatch<SetStateAction<boolean>>;

    dadosEstabelecimento: Usuarios;
    produtosEstabelecimento: ProdutoDB[] | null;
    carrinho: Carrinho;
    produtosCarrinho: Array<Produto>;

    incluirProduto: (produto: Produtos) => void;
    incrementarProduto: (produto: Produto) => void;
    decrementarProduto: (id: Produto) => void;
    adicionarCarrinho: (nome: string, contato: string, endereco: string) => void;
};

export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({children, dados, produtos}: {children: React.ReactNode; dados: Usuarios; produtos: ProdutoDB[] | null;}) => {

    const navigate = useRouter();
    const pathname = usePathname();

    //Dados DB
    const dadosEstabelecimento = dados;
    const produtosEstabelecimento = produtos;

    //Dados Carrinho
    const [produtosCarrinho, setProdutosCarrinho] = useState<Array<Produto>>([]);

    const [carrinho, setCarrinho] = useState<Carrinho>({
            nomeCliente: '',
            contatoCliente: '',
            enderecoCliente: '',
            produtos: produtosCarrinho,
            loja: dados.user,
            valorTotal: produtosCarrinho.reduce((acc, produto) => {
                return produto.subtotal + acc;
            }, 0),
        });


    ///////////////////////// SIGNAL \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [connectionsStatus, setConnectionsStatus] = useState<boolean>(false);

    useEffect(() => {
        if (connection) return;

        console.log('Conexão declarada.');

        const newConnection = new HubConnectionBuilder()
            .withUrl('https://dotnet-webapi-base-production.up.railway.app/chat')
            .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
            .build();

        newConnection.serverTimeoutInMilliseconds = 90000;
        newConnection.keepAliveIntervalInMilliseconds = 30000;

        newConnection.onclose(async (error) => {
            console.error('🔴 DESCONNECTED:', error);

            if (newConnection.state !== 'Disconnected') {
                await newConnection.stop();
            }
        });

        newConnection.onreconnecting((error) => {
            console.warn('🟡 RECONNECTING:', error);
        });

        newConnection.onreconnected(async (connectionId) => {
            console.log('🟢 RECONNECTED:', connectionId);
        });

        newConnection.on('Erro', async (mensagem: string) => {
            console.error('❌ Servidor:', mensagem);
        });

        newConnection.on('Conectado', (msg: string) => {
            console.log(msg);
        });

        newConnection
            .start()
            .then(() => setConnectionsStatus(true))
            .catch(() => setConnectionsStatus(false));

        setConnection(newConnection);
    }, []);

    /////////////////////////////////////////////////////////////////////

    function adicionarCarrinho(nome: string, contato: string, endereco: string) {


        setCarrinho((prev: Carrinho) => {
            prev.nomeCliente = nome;
            prev.contatoCliente = contato,
            prev.enderecoCliente = endereco

            return prev
        });

        navigate.push(`${pathname}/pagamento`);
    }

    function incluirProduto(produto: Produtos) {
        const quantidade = 1;
        const valorUnitario = produto.valor;

        const produtoConvertido: Produto = {
            produtoId: produto.id,
            nome: produto.nome,
            imagem: produto.imagem,
            quantidade: quantidade,
            valorUnitario: Number(valorUnitario),
            subtotal: quantidade * Number(valorUnitario),
        };

        try {
            const produtoExiste = produtosCarrinho.some((array) => array.produtoId == produto.id);

            if (produtoExiste)
            {
                const array = produtosCarrinho.map((ar) => {
                    if(ar.produtoId == produto.id)
                    {
                        ar.quantidade = ar.quantidade + 1
                        ar.subtotal = (ar.quantidade + 1) * Number(ar.valorUnitario);
                        return ar
                    }

                    return ar
                })
                setProdutosCarrinho(array)
                /*
                setCarrinho((prev) => {
                    prev.produtos = array;
                    return prev
            })
                    */
            }
            else
            {
            setProdutosCarrinho((prev: Produto[]) => {
                return [...prev, produtoConvertido];
            });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert(error);
            }
        }
    }

    function incrementarProduto(produto: Produto) {
        const quantidade = 1;
        const valorUnitario = produto.valorUnitario;

        const produtoConvertido: Produto = {
            produtoId: produto.produtoId,
            nome: produto.nome,
            quantidade: quantidade,
            valorUnitario: valorUnitario,
            subtotal: quantidade * valorUnitario,
        };

        setProdutosCarrinho((prev: Produto[]) => {
            const produtoExiste = prev.some((array) => array.produtoId == produto.produtoId);

            if (!produtoExiste) return [...prev, produtoConvertido];

            return prev.map((array) => {
                if (array.produtoId == produto.produtoId) {
                    return {
                        ...array,
                        quantidade: array.quantidade + 1,
                        subtotal: (array.quantidade + 1) * array.valorUnitario,
                    };
                }

                return array;
            });
        });
    }

    function decrementarProduto(produto: Produto) {
        setProdutosCarrinho((prev) => {
            const produtoExiste = prev.some((array) => array.produtoId == produto.produtoId && array.quantidade === 1);
            if (produtoExiste) {
                const novaLista = prev.filter((array) => array.produtoId !== produto.produtoId);
                return novaLista;
            }

            return prev.map((array) => {
                if (array.produtoId == produto.produtoId) {
                    return {
                        ...array,
                        quantidade: array.quantidade - 1,
                        subtotal: array.valorUnitario * (array.quantidade - 1),
                    };
                }

                return array;
            });
        });
    }

    return (
        <Context.Provider
            value={{
                connection,
                setConnection,
                connectionsStatus,
                setConnectionsStatus,
                dadosEstabelecimento,
                produtosEstabelecimento,
                produtosCarrinho,
                incluirProduto,
                incrementarProduto,
                decrementarProduto,
                adicionarCarrinho,
                carrinho,
            }}
        >
            {children}
        </Context.Provider>
    );
};;;

/*************************************************************************************** */

export default ContextProvider;
