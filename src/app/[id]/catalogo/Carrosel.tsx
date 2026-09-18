'use client'

import { Produtos } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ProdutoDB } from '@/Types/Types';

const Carrosel = ({ produtos }: { produtos: ProdutoDB[] | null }) => {

    const oneRef = useRef<HTMLInputElement>(null);
    const [item, setItem] = useState<ProdutoDB[] | null>(produtos);

    const nextProduct = () => {

        if (oneRef.current) {
            // Sai pela esquerda
            oneRef.current.style.transition = 'transform 0.5s ease'; //animação
            oneRef.current.style.transform = 'translateX(-100vw)';

            setTimeout(() => {
                if (!oneRef.current) return;

                // Vai para a direita sem animação
                oneRef.current.style.transition = 'none';
                oneRef.current.style.transform = 'translateX(100vw)';

                // Força reflow
                void oneRef.current.offsetWidth;

                // Retorna para o centro animando
                oneRef.current.style.transition = 'transform 0.5s ease';
                oneRef.current.style.transform = 'translateX(0)';

                setItem((prev: any) => {
                    const first = prev[0];

                    return [...prev.slice(1), first];
                });

            }, 500);
        }
    };

    const returnProduct = () => {

        if (oneRef.current) {

            oneRef.current.style.transition = 'transform 0.5s ease'; //animação
            oneRef.current.style.transform = 'translateX(100vw)';

            setTimeout(() => {
                if (!oneRef.current) return;

                // Vai para a direita sem animação
                oneRef.current.style.transition = 'none';
                oneRef.current.style.transform = 'translateX(-100vw)';

                // Força reflow
                void oneRef.current.offsetWidth;

                // Retorna para o centro animando
                oneRef.current.style.transition = 'transform 0.5s ease';
                oneRef.current.style.transform = 'translateX(0)';

                setItem((prev: any) => {
                    const last = prev[prev.length - 1];

                    return [last, ...prev.slice(0, -1)];
                });

            }, 500);
        }
    };

    if(!item) return <>Nenhum produto encontrado</>

    return (
        <div
            className=" h-[100px]
                flex justify-center items-center
                overflow-hidden rounded-lg
                md:min-h-[300px]
                lg:w-full lg:h-[500px]
            "
        >
            <button
                className="
                    md:w-[10%] h-full
                    border-l-0!
                    rounded-r-[0]!
                    bg-slate-900
                    z-50
                "
                onClick={nextProduct}
            >
                <FaAngleLeft className="text-white text-4xl text-center w-full" />
            </button>

            <div
                className="flex w-[90%] h-full overflow-hidden border border-slate-500/40 items-center justify-around"
                ref={oneRef}
            >
                <AnimatePresence mode="popLayout">
                    <div className="w-[25%] rounded-3xl border-2 bg-gray-200 flex justify-center items-center opacity-80 relative">
                        <img src={item[0].imagem} className="w-[200px] h-[300px] object-contain " />

                        {/* Overlay escuro */}
                        <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
                    </div>

                    <div className="w-[40%] rounded-3xl border-2 bg-gray-200 flex justify-center items-center">
                        <img src={item[1].imagem} className="w-full h-[450px] object-contain" />
                    </div>

                    <div className="w-[25%] rounded-3xl border-2 bg-gray-200 flex justify-center items-center opacity-80 relative">
                        <img src={item[2].imagem} className="w-[200px] h-[300px] object-contain" />

                        {/* Overlay escuro */}
                        <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
                    </div>
                </AnimatePresence>
            </div>

            <button
                className="
                    md:w-[10%] h-full
                    bg-slate-900
                    border-r-0!
                    rounded-l-[0]!
                    z-50
                "
                onClick={returnProduct}
            >
                <FaAngleRight className="text-white text-4xl text-center w-full" />
            </button>
        </div>
    );
}

export default Carrosel;
