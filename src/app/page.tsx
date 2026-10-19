import Image from "next/image";
import prisma from "./_db/prisma";
import Link from "next/link";


export default async function Home() {

    const user = await prisma.usuarios.findMany();

    return (
        <main className="pt-[10%] min-h-screen px-[2%] lg:px-[10%] 2xl:px-[20%] flex flex-col gap-8 items-center justify-start md:justify-center overflow-hidden bg-gray-700 text-white">
            <div>
                <h1 className="text-xl font-black font-mono text-center"> Seu Delivery aqui</h1>
                <h2>Acesse o perfil de nosso parceiros</h2>
            </div>
            <div className="w-full h-screen py-5 grid grid-cols-1">
                {user.map((array) => (
                    <div
                        key={array.id}
                        className=" border-slate-200 bg-black/20 w-full h-[250px] flex flex-col items-center justify-center gap-2 py-2 rounded-lg"
                    >
                        <Image
                            src={
                                array?.Logo ||
                                'https://res.cloudinary.com/dolfatptk/image/upload/v1788721062/images_saqhkw.jpg'
                            }
                            alt="Logo"
                            width={100}
                            height={100}
                            className="rounded-lg animate-pulse transition-all ease-out"
                        />
                        <h1 className="text-center">{array.Nome}</h1>
                        <Link
                            className="py-2 w-3/4 bg-indigo-950 rounded-lg text-center font-bold"
                            href={`/${array?.user}/`}
                        >
                            Acessar
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
