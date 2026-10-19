'use client';

import { Context } from '@/context/ContextProvider';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

export default function Carrinho({ id }: { id: string }) {
    const { produtosCarrinho, carrinho } = useContext(Context)!;
    const pathname = usePathname();

    return produtosCarrinho.length === 0 ? (
        <aside
            className="hidden lg:h-[310px] w-[95%] py-5 lg:p-4 bottom-[1%] overflow-y-scroll lg:overflow-hidden
            bg-[#1e293b] border border-slate-300 text-white rounded-lg
            lg:flex flex-col fixed
            lg:h-full lg:max-h-[320px] 2xl:max-h-[350px] lg:w-[25%] 2xl:w-1/5 lg:relative lg:pt-8 z-50"
        >
            <h2 className="text-xl font-bold mb-2 text-center">Carrinho</h2>
            <>
                <div className="mt-4 border-t border-white py-10 flex flex-col justify-center items-center gap-4">
                    <ShoppingCart className="size-12" />
                    <div>
                        <h1 className="w-full">Itens: {produtosCarrinho.length}</h1>
                    </div>
                    <Link
                        className="
                                inline-flex items-center justify-center gap-2
                                lg:w-full
                                w-3/4
                                px-5 py-3
                                rounded-lg
                                bg-red-600
                                text-white
                                font-semibold
                                shadow-md
                                transition-all duration-200
                                hover:bg-red-700
                                hover:shadow-lg
                                active:scale-95
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-400

                                "
                        href={`${pathname}/carrinho`}
                    >
                        Ver carrinho
                    </Link>
                </div>
            </>
        </aside>
    ) : (
        <div
            className="h-[120px] w-[95%] py-5 bottom-[1%] overflow-hidden z-50
            bg-blue-800 border border-slate-300 text-white rounded-lg
            flex flex-col fixed
            lg:h-[320px] lg:py-5 2xl:max-h-[350px] lg:w-[25%] 2xl:w-1/5 lg:relative"
        >
            <h2 className="hidden lg:inline text-xl font-bold mb-2 text-center">Carrinho</h2>
            <div className="lg:border-t border-blue-500 flex flex-col justify-center items-center gap-4 h-full">
                <ShoppingCart className="size-12 hidden lg:block" />
                <div>
                    <h1 className="w-full font-bold">Itens no carrinho: {produtosCarrinho.length}</h1>
                </div>
                <Link
                    className="
                                inline-flex items-center justify-center gap-2
                                w-3/4
                                px-5 py-3
                                rounded-lg
                                bg-red-600
                                text-white
                                font-semibold
                                shadow-md
                                transition-all duration-200
                                hover:bg-red-700
                                hover:shadow-lg
                                active:scale-95
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-400
                                "
                    href={`${pathname}/carrinho`}
                >
                    Ver carrinho
                </Link>
            </div>
        </div>
    );
}
