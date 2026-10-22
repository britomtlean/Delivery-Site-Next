'use client';

import { ArrowBigLeft, MapPinned } from 'lucide-react';
import { Context } from '@/context/ContextProvider';
import Link from 'next/link';
import { useContext, useState } from 'react';

const Page = () => {

    const { adicionarCarrinho, produtosCarrinho, carrinho } = useContext(Context)!;

    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [endereco, setEndereco] = useState('');

    const buscarCep = async () => {
        /*
        const cep = endereco.cep.replace(/\D/g, '');

        if (cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

        } catch {
            alert('Erro ao buscar CEP.');
        }
            */
    };


    return produtosCarrinho.length == 0 ? (
        <h1 className="font-bold w-full text-4xl text-center py-10 min-h-screen">
            Carrinho vazio <br></br> <br></br> <strong className="p-4 text-6xl">{'=('}</strong>{' '}
        </h1>
    ) : (
        <div
            className="h-full w-full p-5 flex flex-col gap-5 lg:gap-10
        lg:w-4/5 lg:mx-auto"
        >
            {/* Cabeçalho */}
            <div className="flex flex-col justify-center relative gap-5 lg:gap-2 py-3">
                <Link
                    href={`../carrinho`}
                    className="
                        lg:absolute left-20
                        flex items-center gap-2
                        bg-slate-300
                        px-5 py-3
                        rounded-lg
                        text-black
                        hover:bg-slate-400
                    "
                >
                    <ArrowBigLeft />
                    <strong>Retornar</strong>
                </Link>

                <h2 className="lg:text-3xl font-bold text-gray-700 text-center">Endereço de Entrega</h2>
            </div>

            {/* Conteúdo */}
            <div
                className="flex flex-col items-center lg:items-start gap-5 flex-1
            lg:flex-row"
            >
                {/* Formulário */}
                <section
                    className="
                        lg:w-2/3
                        w-full
                        bg-slate-300
                        border
                        border-slate-400
                        rounded-lg
                        p-4 lg:p-8
                    "
                >
                    <form className="flex flex-col gap-5">
                        {/* CEP */}
                        <div className="flex flex-col lg:grid grid-cols-4 gap-4">
                            <div>
                                <label className="font-semibold text-black">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Digite o seu nome"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    required
                                    value={nome}
                                    onChange={(e) => {
                                        setNome(e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-black">Contato</label>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="Digite o seu WhatsApp"
                                    maxLength={19}
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    required
                                    value={contato}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, '');

                                        // Remove o 55 caso o usuário digite manualmente
                                        if (value.startsWith('55')) {
                                            value = value.slice(2);
                                        }

                                        // Limita a 11 dígitos: DDD + celular
                                        value = value.slice(0, 11);

                                        // Formata
                                        let formatted = '+55';

                                        if (value.length > 0) {
                                            formatted += ' (' + value.slice(0, 2);
                                        }

                                        if (value.length >= 2) {
                                            formatted += ') ';
                                        }

                                        if (value.length > 2) {
                                            formatted += value.slice(2, 7);
                                        }

                                        if (value.length >= 7) {
                                            formatted += '-' + value.slice(7, 11);
                                        }
                                        setContato(value);
                                    }}
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-black">Endereço</label>
                                <input
                                    type="text"
                                    placeholder="Digite o seu nome"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    required
                                    value={endereco}
                                    onChange={(e) => {
                                        setEndereco(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="font-semibold text-black">CEP</label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="00000-000"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    required
                                    onChange={(e) => {}}
                                />
                            </div>

                            <div className="col-span-3 flex items-end">
                                <button
                                    disabled
                                    type="button"
                                    className="
                                        h-12
                                        px-6
                                        rounded-lg
                                        bg-blue-600
                                        text-white
                                        hover:bg-blue-700
                                    "
                                    onBlur={buscarCep}
                                >
                                    Buscar CEP
                                </button>
                            </div>
                        </div>
                    </form>
                </section>

                {/* Painel lateral */}
                <aside
                    className="
                        lg:w-1/3
                        w-full
                        bg-slate-300
                        border
                        border-slate-400
                        rounded-lg
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-5
                        p-6
                    "
                >
                    <MapPinned className="w-36 h-36 text-slate-500" />

                    <h3 className="text-2xl font-bold text-black">Local de Entrega</h3>

                    <p className="text-center text-slate-700">
                        Informe corretamente o endereço onde o pedido deverá ser entregue.
                    </p>
                </aside>
            </div>

            {/* Rodapé */}
            <div className="flex justify-center">
                <button
                    onClick={() => {
                        if (!nome || !contato || !endereco) return;
                        adicionarCarrinho(nome, contato, endereco);
                    }}
                    className="
                    flex justify-center
                        lg:w-3/5
                        w-full
                        py-5
                        rounded-lg
                        bg-red-600
                        text-white
                        font-semibold
                        hover:bg-red-700
                        transition
                    "
                >
                    Continuar para Pagamento
                </button>
            </div>
        </div>
    );
};

export default Page;
