import type { Metadata } from 'next';
import ContextProvider from '@/context/ContextProvider';
import { Inter } from 'next/font/google';
import '../../globals.css';
import { cn } from '@/lib/utils';
import { HomeIcon } from 'lucide-react';
import prisma from '@/app/_db/prisma';
import { Usuarios } from '@prisma/client';
import { ProdutoDB } from '@/Types/Types';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Delivery Guaratiba',
    description:
        'O delivey do seu bairro',
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
    const { id } = await params;
    const login: Usuarios | null = await prisma.usuarios.findUnique({ where: { user: id } });
    const produtos: ProdutoDB[] | null = await prisma.produtos.findMany({
        where: {
            //disponibilidade: true,
            login: id,
        },
        select: {
            id: true,
            categoria: true,
            descricao: true,
            imagem: true,
            nome: true,
            disponibilidade: true,
            valor: true,
        },
    });

    if (!login) {
        return (
            <div className="h-screen w-full flex justify-center items-center font-mono font-bold text-4xl bg-white">
                Pagina não encontrada {'=('}
            </div>
        );
    }

    return (
        <html lang="pt-br" className={cn('font-sans')}>
            <body className={inter.className}>
                <header
                    className="w-full h-[200px] lg:h-[10vh] relative
                        flex flex-col lg:flex-row justify-around lg:justify-center items-center lg:items-center"
                    style={{ background: login?.Background || '#1e293b' }}
                >
                    <img
                        src={
                            login?.Logo ||
                            'https://res.cloudinary.com/dolfatptk/image/upload/v1788721062/images_saqhkw.jpg'
                        }
                        alt="Logo"
                        className="bg-white rounded-[100%] lg:hidden absolute border top-6 w-[100px] h-[100px] z-100"
                    />

                    <div
                        className="w-full h-[60%] lg:hidden"
                        style={{ background: login?.Background || '#1e293b' }}
                    ></div>

                    <div
                        className="w-full h-full lg:hidden bg-white rounded-b-3xl"
                        style={{ border: '1px solid ' + login?.Background || '#1e293b' }}
                    >
                        <div className="h-full w-full relative">
                            <h1 className="absolute bottom-10 text-center w-full font-bold text-gray-700">
                                {login.Descricao}
                            </h1>
                            <h2 className="absolute bottom-4 text-center text-xs w-full font-bold text-gray-700">
                                {login.Horario}
                            </h2>
                        </div>
                    </div>

                    <nav
                        className="w-3/4 h-1/2 hidden
                                text-white font-bold text-sm
                                lg:flex justify-center items-center gap-20 xl:w-1/2"
                    >
                        <Link href={'/' + login.user + '/'}>
                            <HomeIcon className="size-6" />
                        </Link>

                        <Link href={`/${login.user}/search`}>Catálogo</Link>

                        <Link href={`/${login.user}`}>Promoções</Link>

                        <Link href={'/' + login.user + '/sobre'}>Sobre</Link>
                    </nav>
                </header>

                <ContextProvider dados={login} produtos={produtos}>
                    <div>{children}</div>
                </ContextProvider>

                <footer className="text-white" style={{ background: login?.Background || '#1e293b' }}>
                    <div className="max-w-7xl mx-auto px-6 py-12 flex justify-center">
                        {/* Empresa */}
                        <section>
                            <h2 className="text-lg text-center font-bold mb-4">{login.Nome}</h2>

                            <p className="text-slate-300 text-sm text-center leading-7">{login.Descricao}</p>
                        </section>
                    </div>

                    <div className="border-t border-white">
                        <div className="max-w-7xl text-center mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-300">
                            <p>© {new Date().getFullYear()} Brits Inc. Todos os direitos reservados.</p>

                            <p>Desenvolvido por Leandro Matos</p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
