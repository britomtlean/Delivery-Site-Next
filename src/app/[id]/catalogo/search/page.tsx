'use client'

import { Context } from '@/context/ContextProvider';
import { div } from 'framer-motion/client';
import Image from 'next/image';
import React, { useContext } from 'react'

export default function Page({searchParams}: { searchParams: { produto?: string } })
{
    const { produtosEstabelecimento } = useContext(Context)!;
    const busca = searchParams.produto;

        const produtosSearch = produtosEstabelecimento?.filter((p) => {
            const texto = (busca || '').toLowerCase();
            return p.nome.toLowerCase().includes(texto);
        });


        if(produtosSearch?.length == 0)
        {
            return <div className="text-3xl text-black font-sans font-medium w-full h-[50vh] flex justify-center items-center">Nenhum produto encontrado</div>
        }


    return (
        <>
            <h1 className="text-3xl w-full text-center text-black py-10">Resultado da pesquisa: {busca}</h1>
            <div
                className="text-2xl text-black font-sans font-medium w-[90%] min-h-[50vh] mx-auto py-[2%]
            grid grid-cols-3 gap-2 mb-4"
            >
                {produtosSearch?.map((p) => (
                    <div
                        className="flex justify-start items-center w-full h-[180px] border-2 bg-slate-100 border-blue-700/30 rounded-xl pr-2"
                        key={p.id}
                    >
                        <img src={p.imagem} alt={p.imagem} className="rounded-lg max-h-[150px]" />
                        <div
                            className="w-full h-full
                                grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2"
                        >
                            <div className="flex w-full flex-col items-center justify-center">
                                <h1 className="text-sm mb-3 font-semibold">{p.nome}</h1>
                                <h1 className="text-sm font-extrabold">
                                    {Number(p.valor).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </h1>
                                <button
                                    className="bg-red-600 text-white py-2 rounded-lg lg:w-[80%] text-sm mt-5
                                                hover:bg-cyan-300 disabled:bg-slate-300
                                                disabled:cursor-not-allowed transition"
                                >
                                    Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
