'use client'

import { Context } from '@/context/ContextProvider';
import React, { useContext } from 'react'

const page = () => {

  const { carrinho, dadosEstabelecimento } = useContext(Context)!;
  const message = `SEU PEDIDO: LELECO HAMBURGUERIA PIRAQUÊ

                        Acompanhe abaixo o pedido

                        Pedido nº: ######
                        Realizado em: ${new Date().toLocaleString('pt-BR')}

                        -----------------------------
                        🍽️ RESUMO DO PEDIDO

                        -----------------------------
                        💳 PAGAMENTO

                        ▪️ Taxa de Entrega: R$ 10,00
                        ▪️ Valor Total do Pedido: R$ ${carrinho.valorTotal.toFixed(2).replace('.', ',')}

                        -----------------------------
                        🏠 ENDEREÇO DE ENTREGA

                        ${carrinho.enderecoCliente}

                        ⏲️ Previsão de Entrega: 45 a 80 minutos

                        -----------------------------
                        🤩 ${carrinho.nomeCliente}
                        📞 ${carrinho.contatoCliente}
                        💳 Crédito

                        Clique no link para acompanhar seu pedido:
                        https://seusite.com/pedido/####}
                       `;
    return (
        <div className="h-screen w-full flex flex-col justify-start pt-20 items-center gap-5">
            <h1 className="text-2xl font-black">Seu pedido está sendo confirmado...</h1>
            <h1>Acompanhe seu perdido pelo whatsapp</h1>
            <button
                className="p-5 bg-emerald-600 rounded-lg text-black"
                onClick={() => {
                    window.open(`https://wa.me/5521970076196?text=${encodeURIComponent(message)}`, '_blank');
                }}
            >
                Acompanhar pedido aqui
            </button>
        </div>
    );
}

export default page
