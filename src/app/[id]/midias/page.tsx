import prisma from '../../_db/prisma';
import Landing from './Landing';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const user = await prisma.usuarios.findUnique({where: {user: id}});

    if (!user) {
        return (
            <div className="h-screen w-full flex justify-center items-center font-mono font-bold text-4xl bg-white">
                Pagina não encontrada {'=('}
            </div>
        );
    }


    return (
        <Landing user={user}/>
    );
}


