'use client';

import { ArrowBigLeft, CreditCard, QrCode, Banknote, ReceiptText } from 'lucide-react';
import { Context } from '@/context/ContextProvider';
import Link from 'next/link';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useContext, useEffect, useState } from 'react';

const Page = () => {
    const { carrinho } = useContext(Context)!;

    const [modoPagamento, setModoPagamento] = useState<string | null>(null);

    /////////////////////// SIGNALR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        const [connection, setConnection] = useState<HubConnection | null>(null);

        useEffect(() => {
            //INSTANCIA DE CONEXÃO
            const newConnection = new HubConnectionBuilder()
                .withUrl('https://dotnet-webapi-base-production.up.railway.app/chat')
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }, []);

        useEffect(() => {

            if (!connection) return;

            connection
                .start()
                .then(() => {
                    console.log('✅ Conectado ao SignalR');
                    connection.invoke('EntrarSala', JSON.stringify({ sala: carrinho?.contatoCliente}));


                    // ESCUTA MENSAGEM DO SERVIDOR
                    connection.on('ReceiveMessage', (message: string) => {
                        console.log('📩 Servidor - ', message);
                        console.log(JSON.stringify(message));
                    });
                })
                .catch((err) => {
                    console.error('Erro na conexão:', err);
                });

            return () => {
                connection.stop();
            };
        }, [connection]);

    ////////////////////////////////////////////////////////////////////////

    ///////////////////////// FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    async function pagamento(pedido: any) {
        const res = await fetch('https://dotnet-webapi-base-production.up.railway.app/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido),
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) return;
        window.location.href = data.url;
    }


    async function pagamentoEntrega(pedido: any) {
        if (!connection) return;

        try {
            await connection.invoke('CreatePedido', pedido);

            console.log('✅ Pedido enviado: ', pedido);
        } catch (err) {
            console.error('Erro ao enviar:', err);
        }
    }

    ////////////////////////////////////////////////////////////////////////

    return !carrinho ? (
        <h1 className="font-bold w-full text-4xl text-center py-10 min-h-screen">
            Carrinho vazio <br></br> <br></br> <strong className="p-4 text-6xl">{'=('}</strong>{' '}
        </h1>
    ) : (
        <div className="h-full w-full p-5 flex flex-col gap-10 ">
            {/* Cabeçalho */}
            <div className="relative flex flex-col justify-center gap-5
                            lg:flex-row">
                <Link
                    href={'../endereco'}
                    className="
                        lg:absolute left-20
                        flex items-center gap-2
                        bg-slate-300
                        px-5 py-3
                        rounded-lg
                        text-black
                        hover:bg-slate-400
                    "
                >
                    <ArrowBigLeft />
                    <strong>Retornar</strong>
                </Link>

                <h2 className="text-3xl font-bold text-black">Forma de Pagamento</h2>
            </div>

            {/* Conteúdo */}
            <div
                className="flex gap-5 flex-1 flex-col
            lg:flex-row"
            >
                {/* Métodos */}
                <section
                    className="
                        lg:w-1/3
                        w-full
                        bg-slate-300
                        rounded-lg
                        border
                        border-slate-400
                        p-8
                    "
                >
                    <h3 className="text-2xl font-bold text-black mb-8">Escolha como deseja pagar</h3>

                    <div className="flex flex-col gap-5">
                        {/* Cartão */}
                        <label
                            className="
                                opacity-40
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                        >
                            <input
                                disabled
                                type="radio"
                                name="pagamento"
                                value="Online"
                                onChange={(e) => {
                                    setModoPagamento(e.target.value);
                                }}
                            />

                            <CreditCard className="text-blue-600" />

                            <div>
                                <h4 className="font-semibold">Pagar Online</h4>

                                <p className="text-sm text-slate-600">Visa, MasterCard, Elo...</p>
                            </div>
                        </label>

                        {/* ENTREGA */}
                        <label
                            className="
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                        >
                            <input
                                type="radio"
                                name="pagamento"
                                value="Entrega"
                                onChange={(e) => {
                                    setModoPagamento(e.target.value);
                                }}
                            />

                            <Banknote className="text-emerald-600" />

                            <div>
                                <h4 className="font-semibold">Dinheiro</h4>

                                <p className="text-sm text-slate-600">Pagamento na entrega</p>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Resumo */}
                <aside
                    className="
                        lg:w-1/3
                        w-full
                        bg-slate-300
                        rounded-lg
                        border
                        border-slate-400
                        p-6
                        flex
                        flex-col
                        justify-between
                    "
                >
                    <div>
                        <div className="flex justify-center mb-5">
                            <ReceiptText className="w-28 h-28 text-slate-500" />
                        </div>

                        <h3
                            className="
                                text-center
                                text-2xl
                                font-bold
                                text-black
                                mb-6
                            "
                        >
                            Resumo
                        </h3>

                        <div className="space-y-3 text-black">
                            <div className="flex justify-between">
                                <span>Produtos</span>
                                <span>
                                    {carrinho?.valorTotal.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }) || (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Entrega</span>
                                <span>{(10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>

                            <hr />

                            <div
                                className="
                                    flex
                                    justify-between
                                    text-xl
                                    font-bold
                                "
                            >
                                <span>Total</span>
                                <span>
                                    {((carrinho?.valorTotal || 0) + 10).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {modoPagamento == 'Online' ? (
                        <button
                            className="
                            w-full
                            mt-8
                            py-4
                            rounded-lg
                            bg-red-600
                            text-white
                            font-semibold
                            hover:bg-red-700
                            transition
                        "
                            onClick={() => {
                                pagamento(carrinho);
                            }}
                        >
                            Finalizar Pedido
                        </button>
                    ) : modoPagamento == 'Entrega' ? (
                        <button
                            className="
                            w-full
                            mt-8
                            py-4
                            rounded-lg
                            bg-blue-600
                            text-white
                            font-semibold
                            hover:bg-blue-700
                            transition
                        "
                            onClick={() => {
                                pagamentoEntrega(carrinho);
                            }}
                        >
                            Finalizar Pedido
                        </button>
                    ) : (
                        ''
                    )}
                </aside>

                <div
                    className="
                        lg:w-1/3
                        w-full
                        flex-1 space-y-4
                        bg-slate-300
                        rounded-lg
                        border
                        border-slate-400
                        p-8
                    "
                >
                    <h1 className="text-2xl font-bold text-black mb-8">Dados do pedido</h1>
                    <label
                        className="
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                    >
                        <strong>Destinário:</strong> {carrinho?.nomeCliente}
                    </label>
                    <label
                        className="
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                    >
                        <strong>Contato:</strong> {carrinho?.contatoCliente}
                    </label>
                    <label
                        className="
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                    >
                        <strong>Endereço:</strong> {carrinho?.enderecoCliente}
                    </label>
                </div>
            </div>

            <div
                className="h-full lg:w-1/2
            w-full  bg-slate-300 rounded-lg border border-slate-400 p-8
            flex flex-col items-start gap-4"
            >
                <h2 className="text-3xl font-bold text-black">Produtos</h2>
                {carrinho?.produtos == null ? (
                    <div className="w-full h-full py-8 border text-center rounded-lg">
                        <h1 className="w-full">Carrinho vazio</h1>
                    </div>
                ) : (
                    <div className="w-full h-full p-4 border border-y-slate-400 ">
                        <div className="flex flex-col gap-3 overflow-y-auto flex-1 max-h-[250px]">
                            {carrinho?.produtos?.map((produto) => (
                                <div
                                    key={produto.produtoId}
                                    className="bg-slate-300 text-black rounded-lg p-3 border-b border-r border-slate-400
                                flex items-center gap-3"
                                >
                                    <img
                                        src={produto.imagem}
                                        alt={produto.nome}
                                        className="w-16 h-16 object-contain rounded"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">{produto.nome}</h3>

                                        <p>Quantidade: {produto.quantidade}</p>
                                        <p>
                                            SubTotal:{' '}
                                            {produto.subtotal.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </p>

                                        {/** <p className="font-bold">R$ {produto.valor?.toString()}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};;

export default Page;
