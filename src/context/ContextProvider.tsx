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
    produtos: Produto[];
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

    const [carrinho, setCarrinho] = useState<Carrinho>({
            nomeCliente: '',
            contatoCliente: '',
            enderecoCliente: '',
            produtos: [],
            loja: dados.user,
            valorTotal: 0,
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

    const valorUnitario = Number(produto.valor);

    setCarrinho((prev) => {
        const produtoExiste = prev.produtos.some((item: Produto) => item.produtoId === produto.id);

        let novosProdutos: Produto[];

        if (produtoExiste) {
            novosProdutos = prev.produtos.map((item: Produto) => {
                if (item.produtoId === produto.id) {
                    const quantidade = item.quantidade + 1;

                    return {
                        ...item,
                        quantidade,
                        subtotal: quantidade * item.valorUnitario,
                    };
                }

                return item;
            });
        } else {
            const produtoConvertido: Produto = {
                produtoId: produto.id,
                nome: produto.nome,
                imagem: produto.imagem,
                quantidade: 1,
                valorUnitario,
                subtotal: valorUnitario,
            };

            novosProdutos = [...prev.produtos, produtoConvertido];
        }

        return {
            ...prev,
            produtos: novosProdutos,
            valorTotal: novosProdutos.reduce((total, item) => total + item.subtotal, 0),
        };
    });
}

function incrementarProduto(produto: Produto) {
    setCarrinho((prev: Carrinho) => {
        const produtoExiste = prev.produtos.some((item) => item.produtoId === produto.produtoId);

        let novosProdutos: Produto[];

        if (!produtoExiste) {
            novosProdutos = [
                ...prev.produtos,
                {
                    ...produto,
                    quantidade: 1,
                    subtotal: produto.valorUnitario,
                },
            ];
        } else {
            novosProdutos = prev.produtos.map((item) => {
                if (item.produtoId === produto.produtoId) {
                    const quantidade = item.quantidade + 1;

                    return {
                        ...item,
                        quantidade,
                        subtotal: quantidade * item.valorUnitario,
                    };
                }

                return item;
            });
        }

        return {
            ...prev,
            produtos: novosProdutos,
            valorTotal: novosProdutos.reduce((total, item) => total + item.subtotal, 0),
        };
    });
}

function decrementarProduto(produto: Produto) {
    setCarrinho((prev: Carrinho) => {
        const novosProdutos = prev.produtos
            .map((item) => {
                if (item.produtoId === produto.produtoId) {
                    const quantidade = item.quantidade - 1;

                    if (quantidade <= 0) {
                        return null;
                    }

                    return {
                        ...item,
                        quantidade,
                        subtotal: quantidade * item.valorUnitario,
                    };
                }

                return item;
            })
            .filter((item): item is Produto => item !== null);

        return {
            ...prev,
            produtos: novosProdutos,
            valorTotal: novosProdutos.reduce((total, item) => total + item.subtotal, 0),
        };
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
