import Image from "next/image";
import prisma from "./_db/prisma";
import Link from "next/link";


export default async function Home() {

    const user = await prisma.usuarios.findMany();

    return (
        <main className="py-[5vh] lg:pt-[10vw] min-h-screen px-[2%] lg:px-[10%] 2xl:px-[20%] flex flex-col gap-8 items-center justify-start overflow-hidden bg-slate-600 text-white">
            <div>
                <h1 className="text-2xl font-black text-center "> Seu Delivery aqui</h1>
                <h2 className="pt-2 text-center">Os melhores deliverys da região você encontra aqui</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 space-y-3! w-full gap-5">
                {user.map((array) => (
                    <div
                        key={array.id}
                        className=" border-slate-200/30 bg-indigo-500/20 w-full h-[250px] flex flex-col items-center justify-center gap-2 py-2 rounded-lg border"
                    >
                        <Image
                            src={
                                array?.Logo ||
                                'https://res.cloudinary.com/dolfatptk/image/upload/v1788721062/images_saqhkw.jpg'
                            }
                            alt="Logo"
                            width={100}
                            height={100}
                            className="rounded-lg  transition-all ease-out"
                        />
                        <h1 className="text-center">{array.Nome}</h1>
                        <Link
                            className="py-2 w-3/4 bg-indigo-900 rounded-lg text-center font-bold"
                            href={`/${array?.user}/midias`}
                        >
                            Acessar
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
