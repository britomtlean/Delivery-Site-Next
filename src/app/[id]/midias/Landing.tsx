'use client';

import { Usuarios } from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Landing({ user }: { user: Usuarios | null }) {

    const router = useRouter();


    return (
        <main
            className={`relative px-5 md:p-0 min-h-screen flex flex-col gap-8 items-center justify-center lg:justify-center overflow-hidden text-white`}
            style={{
                background: user?.Background || '#0d171f',
            }}
        >
            {/* BACKGROUND */}
            <motion.div
                initial={{ opacity: 0, y: -100, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                transition={{ duration: 1, ease: 'easeIn' }}
            >
                <Image
                    src={
                        user?.Logo || 'https://res.cloudinary.com/dolfatptk/image/upload/v1788721062/images_saqhkw.jpg'
                    }
                    alt="Logo"
                    width={200}
                    height={200}
                    className="rounded-lg transition-all ease-out animate-pulse"
                />
            </motion.div>

            {
                /*
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-purple-700/20 to-cyan-500/20 blur-3xl animate-pulse" />
                */
            }
            {/* CONTAINER */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-sm p-6 rounded-2xl
                   bg-white/10 backdrop-blur-xl
                   border border-white/10 shadow-2xl"
            >
                {/* HEADER */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Bem vindo a <br></br> {user?.Nome}
                    </h1>
                    <p className="text-sm text-white/60 mt-2">Acesse nosso espaço digital abaixo:</p>
                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex flex-col gap-3">
                    <LinkButton href={`/${user?.user}/`}>
                        <div className="flex justify-center items-center gap-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-7 h-7 text-white"
                                fill="currentColor"
                                aria-label="Cardápio"
                            >
                                <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                            </svg>
                            Catálogo
                        </div>
                    </LinkButton>

                    <LinkButton href={`https://wa.me/${user?.WhatsApp}`}>
                        <div className="flex justify-center items-center gap-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-7 h-7 text-white"
                                fill="currentColor"
                                aria-label="WhatsApp"
                            >
                                <path d="M12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.77.46 3.5 1.34 5.02L2 22l5.13-1.34A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10S17.56 2 12.04 2Zm0 18.18a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3.05.8.82-2.98-.2-.31A8.13 8.13 0 1 1 12.04 20.18Zm4.47-6.08c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.3-1.64-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.56 4.08 3.6.57.24 1.02.38 1.37.48.58.18 1.1.16 1.52.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                            </svg>
                            WhatsApp
                        </div>
                    </LinkButton>

                    <LinkButton href={'https://www.instagram.com/' + user?.Instagram}>
                        <div className="flex justify-center items-center gap-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="3 2.98 18.01 18.04"
                                className="w-7 h-7 text-white"
                                fill="currentColor"
                                aria-label="Instagram"
                            >
                                <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755.012-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s.013 2.747.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755-.013 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71s-.013-2.747-.056-3.709ZM11.994 16.602a4.623 4.623 0 1 1 0-9.246 4.623 4.623 0 0 1 0 9.246Zm4.807-8.339a1.077 1.077 0 1 1 0-2.155 1.077 1.077 0 0 1 0 2.155Z" />

                                <circle cx="11.994" cy="11.979" r="3.003" />
                            </svg>
                            Instagram
                        </div>
                    </LinkButton>
                </div>
            </motion.div>
        </main>
    );
}

/* COMPONENTE BUTTON */
function LinkButton({ children, href }: { children: React.ReactNode; href: string }) {
return (
    <Link href={href}>
        <motion.div

            className="
                    p-3 rounded-xl text-center overflow-hidden
                    bg-white/10 hover:bg-white/20
                    border border-white/10
                    backdrop-blur-md
                    transition-all duration-200
                "
        >
            {children}
        </motion.div>
    </Link>
);
}
