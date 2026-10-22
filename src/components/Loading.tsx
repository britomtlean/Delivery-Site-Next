'use client';
import { Context } from '@/context/ContextProvider';
import Image from 'next/image';
import { useContext } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
    const { dadosEstabelecimento } = useContext(Context)!;
    return (
        <div
            className="h-screen w-full p-20 justify-start items-center flex flex-col gap-4"
            style={{
                background: dadosEstabelecimento?.Background || '#0d171f',
            }}
        >
            <Image
                src={
                    dadosEstabelecimento?.Logo ||
                    'https://res.cloudinary.com/dolfatptk/image/upload/v1788721062/images_saqhkw.jpg'
                }
                alt="Logo"
                width={200}
                height={200}
                className="rounded-lg transition-all ease-out animate-pulse"
            />
        </div>
    );
};

export default Loading;
