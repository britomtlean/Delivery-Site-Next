import type { Metadata } from 'next';
import ContextProvider from '@/context/ContextProvider';
import { Inter } from 'next/font/google';
import '../../globals.css';
import { cn } from '@/lib/utils';
import { Button } from '@base-ui/react';
import { HomeIcon, Menu } from 'lucide-react';
import prisma from '@/app/_db/prisma';
import { Usuarios } from '@prisma/client';
import { ProdutoDB } from '@/Types/Types';
import Link from 'next/link';
import Image from 'next/image';

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
                    className="w-full h-[25vh] lg:h-[10vh] relative
                        flex flex-col lg:flex-row justify-around lg:justify-center items-center lg:items-center"
                    style={{ background: login?.Background || '#1e293b' }}
                >
                    <img
                        src={
                            login?.Logo ||
                            'https://res.cloudinary.com/dolfatptk/image/upload/v1788721062/images_saqhkw.jpg'
                        }
                        alt="Logo"
                        className="bg-white rounded-[100%] lg:hidden absolute border top-5 w-[30vw] h-[30vw] max-w-[120px] max-h-[120px] z-100"
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
                                lg:flex justify-around items-center gap-8 xl:w-1/2"
                    >
                        <Link href={'/' + login.user + '/catalogo'}>
                            <HomeIcon className="size-8" />
                        </Link>

                        <Link href={`/${login.user}/catalogo/search`}>Catálogo</Link>

                        <Link href={'/'}>Promoções</Link>

                        <Link href={'/' + login.user + '/sobre'}>Sobre</Link>

                    </nav>
                </header>

                <ContextProvider dados={login} produtos={produtos}>
                    <div className="lg:min-h-[100vh] bg-slate-100">{children}</div>
                </ContextProvider>

                <footer className="text-white" style={{ background: login?.Background || '#1e293b' }}>
                    <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
                        {/* Empresa */}
                        <section>
                            <h2 className="text-lg text-center font-bold mb-4">{login.Nome}</h2>

                            <p className="text-slate-300 text-sm text-center leading-7">{login.Descricao}</p>
                        </section>

                        {/* Contato */}
                        <section className="mx-auto">
                            <h2 className="text-lg font-semibold mb-4">Contato</h2>

                            <ul className="space-y-3 text-slate-300 text-sm">
                                <li>{login.Endereco}</li>

                                <li>💬 WhatsApp</li>
                                <li>{login.WhatsApp}</li>

                                <li>
                                    🕒 Segunda a Sexta
                                    <br />
                                    08:00 às 17:00
                                </li>

                                <li>
                                    🕒 Sábado
                                    <br />
                                    08:30 às 12:30
                                </li>
                            </ul>
                        </section>

                        {/* Navegação */}
                        <section className="mx-auto">
                            <h2 className="text-lg font-semibold mb-4">Navegação</h2>

                            <nav className="flex flex-col gap-3 text-slate-300 text-sm">
                                <a href="/home" className="hover:text-white transition">
                                    Início
                                </a>

                                <a href="/catalogo" className="hover:text-white transition">
                                    Catálogo
                                </a>

                                <a href="#" className="hover:text-white transition">
                                    Promoções
                                </a>

                                <a href="#" className="hover:text-white transition">
                                    Minha Conta
                                </a>

                                <a href="/politica-de-privacidade" className="hover:text-white transition">
                                    Política de Privacidade
                                </a>
                            </nav>
                        </section>
                    </div>

                    <div className="border-t border-white">
                        <div className="max-w-7xl text-center mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-300">
                            <p>
                                © {new Date().getFullYear()} Brits Inc. Todos os direitos
                                reservados.
                            </p>

                            <p>Desenvolvido por Leandro Matos</p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
