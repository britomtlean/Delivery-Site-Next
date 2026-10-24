'use client';

import { Context } from '@/context/ContextProvider';
import { Content } from 'next/font/google';
import Image from 'next/image';
import React, { useContext } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdAccessTimeFilled, MdPlace } from 'react-icons/md';

const Page = () => {
    const { dadosEstabelecimento } = useContext(Context)!;
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(dadosEstabelecimento.Endereco)}&output=embed`;
    return (
        <div
            className="relative flex flex-col gap-4 items-center py-4 w-full h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://monitormercantil.com.br/wp-content/uploads/2023/01/Corcovado-foto-Riotur.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-radial from-gray-600 to-black/80" />
            <div
                className="hidden lg:flex lg:flex-row justify-center lg:justify-center items-center gap-10
                        bg-slate-300 rounded-lg p-4 px-8 border border-slate-200 relative z-10"
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
            </div>
            <h1 className="font-extrabold text-3xl relative z-10 text-white">Localização</h1>
            <div className="w-[95vw] lg:w-1/2 h-[300px] lg:h-[400px] overflow-hidden rounded-2xl relative z-10">
                <iframe
                    src={mapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
};

export default Page;
