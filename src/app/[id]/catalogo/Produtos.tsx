'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import type { Produtos } from '@prisma/client';
import { Context } from '@/context/ContextProvider';

const Produtos = ({ produtos }: { produtos: any }) => {
    const { incluirProduto } = useContext(Context)!;

    const [categoria, setCategoria] = useState<string | null>(null);

    const produtoFiltrado: Produtos = produtos.filter((array: any) => array.categoria == categoria);

    return (
        <>
            <div className="w-[95%] 2xl:w-[80vw] h-full flex flex-col gap-5 mb-20">
                {
                    //SELECT
                    <div className="flex lg:justify-around flex-col lg:items-center lg:gap-5 gap-4 lg:relative">
                        <h1 className="font-black text-gray-700 font-sans text-xl lg:text-2xl  text-center">
                            {categoria ? categoria : 'Selecione uma categoria'}
                        </h1>
                        <select
                            defaultValue={''}
                            value={categoria || ''}
                            onChange={(e) => {
                                setCategoria(e.target.value == '' ? null : e.target.value);
                            }}
                            className=" w-full lg:w-[30vw] 2xl:w-2/6 p-4 rounded-md bg-gray-300 "
                        >
                            <option value={''}>{!categoria ? 'Lista de categorias' : 'Voltar ao início'}</option>
                            <option value={'Mais Vendidos'}>Mais Vendidos</option>
                            <option value={'Outros'}>Outros</option>
                        </select>
                    </div>
                }

                <div className="flex flex-wrap flex-col w-full h-full gap-4">
                    {categoria != null ? (
                        <div
                            className="w-full h-full
                            grid grid-cols-1 lg:grid-cols-4 gap-4"
                        >
                            {Array.isArray(produtoFiltrado) &&
                                produtoFiltrado.map((produto: Produtos) => (
                                    <div
                                        key={produto.id}
                                        className="border border-slate-300 rounded-xl bg-white shadow-sm lg:max-h-[450px]
                                        overflow-hidden flex flex-col transition hover:shadow-lg"
                                    >
                                        <div className="h-52 flex items-center justify-center p-4">
                                            <img
                                                src={produto.imagem}
                                                alt={produto.nome}
                                                className="max-h-full object-contain"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 p-4 flex-1">
                                            <h2 className="text-lg font-semibold">{produto.nome}</h2>

                                            <p className="text-sm text-slate-600 line-clamp-2">{produto.descricao}</p>
                                            <p className="text-sm text-slate-600 line-clamp-2">
                                                {Number(produto.valor).toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                })}
                                            </p>

                                            <span
                                                className={`text-sm font-medium ${
                                                    produto.disponibilidade ? 'text-green-600' : 'text-red-500'
                                                }`}
                                            >
                                                {produto.disponibilidade ? 'Disponível' : 'Indisponível'}
                                            </span>

                                            <button
                                                onClick={() => incluirProduto(produto)}
                                                disabled={!produto.disponibilidade}
                                                className="mt-auto bg-blue-600 text-white py-4 rounded-lg
                                                hover:bg-blue-700 disabled:bg-slate-300
                                                disabled:cursor-not-allowed transition"
                                            >
                                                Adicionar ao carrinho
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-2">
                            <button
                                className=" flex flex-col items-center justify-center lg:p-20 border border-slate-300 rounded-lg py-[5%]"
                                onClick={() => {
                                    setCategoria('Mais Vendidos');
                                }}
                            >
                                <Image
                                    src="/MaisVendidos.png"
                                    alt="Logo"
                                    width={400}
                                    height={200}
                                    className="rounded-lg lg:animate-bounce transition-all ease-in-out delay-5000"
                                />
                                <strong className="lg:text-3xl py-2">Mais Vendidos</strong>
                            </button>
                            <button
                                className=" flex flex-col items-center justify-center lg:p-20 border border-slate-300 rounded-lg py-[5%]"
                                onClick={() => {
                                    setCategoria('Mais Vendidos');
                                }}
                            >
                                <Image
                                    src="/Outros.png"
                                    alt="Logo"
                                    width={400}
                                    height={200}
                                    className="rounded-lg lg:animate-bounce transition-all ease-in-out delay-5000"
                                />
                                <strong className="lg:text-3xl py-2">Mais Vendidos</strong>
                            </button>
                            <button
                                className=" flex flex-col items-center justify-center lg:p-20 border border-slate-300 rounded-lg py-[5%]"
                                onClick={() => {
                                    setCategoria('Mais Vendidos');
                                }}
                            >
                                <Image
                                    src="/MaisVendidos.png"
                                    alt="Logo"
                                    width={400}
                                    height={200}
                                    className="rounded-lg lg:animate-bounce transition-all ease-in-out delay-5000"
                                />
                                <strong className="lg:text-3xl py-2">Mais Vendidos</strong>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Produtos;
