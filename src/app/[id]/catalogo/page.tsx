'use client'

import Image from 'next/image';
import Produtos from './Produtos';
import { MdPlace } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import Carrinho from './Carrinho';
import Carrosel from './Carrosel';
import { useContext, useState } from 'react';
import { Context } from '@/context/ContextProvider';
import { usePathname } from 'next/navigation';

const Page = () => {

    const pathname = usePathname();
    const { dadosEstabelecimento, produtosEstabelecimento } = useContext(Context)!;

    const [busca, setBusca] = useState<string>('');

    return (
        <div
            className="w-full min-h-screen gap-4
            flex flex-col justify-start items-center"
        >
            <div
                className="w-full lg:w-[95%] 2xl:w-[80%] lg:h-[380px]
                flex flex-col lg:flex-row items-center lg:items-start gap-4 py-4"
            >
                <main className="w-[95%] lg:w-[75%] 2xl:w-4/5 flex flex-wrap flex-col gap-8 ">
                    <div
                        className="hidden lg:flex lg:flex-row justify-center lg:justify-center items-center gap-10
                        bg-slate-300 rounded-lg p-4 px-8 border border-slate-200"
                    >
                        <Image
                            src={
                                dadosEstabelecimento?.Logo ||
                                'https://res.cloudinary.com/dolfatptk/image/upload/v1788721062/images_saqhkw.jpg'
                            }
                            alt="Logo"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />

                        <div className="flex flex-col justify-start items-start lg:gap-4">
                            <h1 className="lg:text-3xl font-extrabold font-sans text-center py-5">
                                {dadosEstabelecimento.Nome}
                            </h1>

                            <div
                                className="flex lg:flex-row flex-col gap-5
                                list-none font-sans font-medium text-sm"
                            >
                                <div className="flex gap-2 justify-center items-center">
                                    <MdPlace />
                                    <li className="inline">{dadosEstabelecimento.Endereco}</li>
                                </div>
                                <div className="flex gap-2 justify-center items-center">
                                    <MdAccessTimeFilled />
                                    <li>{dadosEstabelecimento.Horario}</li>
                                </div>
                                <div className="flex gap-2 justify-center items-center">
                                    <IoLogoWhatsapp />
                                    <a className="underline" href="https://wa.me/552124171020">
                                        {dadosEstabelecimento.WhatsApp}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="/logo.jpg" className="lg:w-[180px] rounded-lg" />
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                        <input
                            type="search"
                            placeholder="Pesquisar produto..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="flex-1 p-3 rounded-lg border border-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <a
                            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            target="_blank"
                            href={`${pathname}/search?produto=${busca}`}
                        >
                            Pesquisar
                        </a>
                    </div>
                </main>

                {<Carrinho id={dadosEstabelecimento.id} />}
            </div>

            <div className="lg:w-3/4 border-b border-slate-300 lg:py-5">
                <h2 className="font-medium text-slate-800 px-30 w-full text-center font-sans text-xl pb-8">
                    {dadosEstabelecimento.Descricao}
                </h2>
            </div>

            {produtosEstabelecimento?.length == 0 ? (
                <h1 className='text-3xl'>Não há produtos cadastrados</h1>
            ) : (
                <div className="w-[95%] 2xl:w-[80%] flex flex-col gap-10 py-8 border-b border-slate-300">
                    <h2 className="font-black px-30 w-full text-center font-sans text-4xl px-2">Destaques</h2>
                    <Carrosel produtos={produtosEstabelecimento} />
                </div>
            )}

            <Produtos produtos={produtosEstabelecimento} />
        </div>
    );
};

export default Page;
