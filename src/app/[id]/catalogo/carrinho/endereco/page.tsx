'use client';

import { ArrowBigLeft, MapPinned } from 'lucide-react';
import { Context } from '@/context/ContextProvider';
import Link from 'next/link';
import { useContext, useState } from 'react';

const Page = () => {

    const { adicionarCarrinho, produtosCarrinho, carrinho } = useContext(Context)!;

    const [endereco, setEndereco] = useState({
        cep: '',
        nome: '',
        contato: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        numero: '',
        complemento: '',
    });

    const buscarCep = async () => {
        const cep = endereco.cep.replace(/\D/g, '');

        if (cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            setEndereco((prev) => ({
                ...prev,
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf,
            }));
        } catch {
            alert('Erro ao buscar CEP.');
        }
    };


    return produtosCarrinho.length == 0 ? (
        <h1 className="font-bold w-full text-4xl text-center py-10 min-h-screen">
            Carrinho vazio <br></br> <br></br> <strong className="p-4 text-6xl">{'=('}</strong>{' '}
        </h1>
    ) : (
        <div className="h-full w-full p-5 flex flex-col gap-10
        lg:w-4/5 lg:mx-auto">
            {/* Cabeçalho */}
            <div className="flex flex-col justify-center relative gap-2">
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

                <h2 className="text-3xl font-bold text-black">Endereço de Entrega</h2>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col items-center lg:items-start gap-5 flex-1
            lg:flex-row">
                {/* Formulário */}
                <section
                    className="
                        lg:w-2/3
                        w-full
                        bg-slate-300
                        border
                        border-slate-400
                        rounded-lg
                        p-8
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
                                    value={endereco.nome}
                                    required
                                    onChange={(e) =>
                                        setEndereco({
                                            ...endereco,
                                            nome: e.target.value,
                                        })
                                    }
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
                                    value={endereco.contato}
                                    required
                                    onChange={(e) => {
                                        let value = e.target.value;

                                        // Remove tudo que não for número
                                        let numbers = value.replace(/\D/g, '');

                                        // Remove o 55 caso o usuário digite manualmente
                                        if (numbers.startsWith('55')) {
                                            numbers = numbers.slice(2);
                                        }

                                        // Limita a 11 dígitos: DDD + celular
                                        numbers = numbers.slice(0, 11);

                                        // Formata
                                        let formatted = '+55';

                                        if (numbers.length > 0) {
                                            formatted += ' (' + numbers.slice(0, 2);
                                        }

                                        if (numbers.length >= 2) {
                                            formatted += ') ';
                                        }

                                        if (numbers.length > 2) {
                                            formatted += numbers.slice(2, 7);
                                        }

                                        if (numbers.length >= 7) {
                                            formatted += '-' + numbers.slice(7, 11);
                                        }

                                        setEndereco({
                                            ...endereco,
                                            contato: formatted,
                                        });
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
                                    value={endereco.cep}
                                    required
                                    onChange={(e) =>
                                        setEndereco({
                                            ...endereco,
                                            cep: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="col-span-3 flex items-end">
                                <button
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

                        {/* Rua */}
                        <div>
                            <label className="font-semibold text-black">
                                Rua
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    value={endereco.rua}
                                    readOnly
                                />
                            </label>
                        </div>

                        {/* Número / Complemento */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold text-black">
                                    Número
                                    <input type="text" className="w-full mt-2 p-3 rounded-lg border border-slate-400" />
                                </label>
                            </div>

                            <div>
                                <label className="font-semibold text-black">
                                    Complemento
                                    <input type="text" className="w-full mt-2 p-3 rounded-lg border border-slate-400" />
                                </label>
                            </div>
                        </div>

                        {/* Bairro / Cidade */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold text-black">
                                    Bairro
                                    <input
                                        type="text"
                                        className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                        value={endereco.bairro}
                                        readOnly
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="font-semibold text-black">
                                    Cidade
                                    <input
                                        type="text"
                                        className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                        value={endereco.cidade}
                                        readOnly
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Referência */}
                        <div>
                            <label className="font-semibold text-black">Ponto de Referência</label>

                            <textarea
                                rows={4}
                                placeholder="Ex.: Casa de esquina, portão azul..."
                                className="
                                    w-full
                                    mt-2
                                    p-3
                                    rounded-lg
                                    border
                                    border-slate-400
                                    resize-none
                                "
                            />
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

                        adicionarCarrinho(endereco.nome, endereco.contato, (endereco.rua+", "+endereco.numero ));
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
