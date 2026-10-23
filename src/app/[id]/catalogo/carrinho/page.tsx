'use client'
import React, { useContext } from 'react'
import { Context } from '@/context/ContextProvider'
import { ArrowBigLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Page = () => {

  const { carrinho, incrementarProduto, decrementarProduto } = useContext(Context)!;
  const pathname = usePathname();

  return (
      <div
          className="h-[full] w-[full] p-5 overflow-hidden text-white rounded-lg
            flex flex-col gap-10"
      >
          <div className="flex justify-center flex-col lg:flex-row gap-8 lg:gap-1">
              <Link
                  className="text-black h-[60px] lg:absolute left-20 bg-slate-300 p-4 rounded-lg flex gap-2"
                  href="../catalogo"
              >
                  <ArrowBigLeft className="text-slate-600" /> <strong>Retornar</strong>
              </Link>
              <h2 className="lg:text-3xl font-bold lg:mb-4 text-center text-gray-700">
                  Reveja os detalhes do seu pedido
              </h2>
          </div>

          <div
              className="min-h-[50%]
            flex flex-col justify-center items-center lg:items-start gap-2 border-black
            lg:flex-row"
          >
              {carrinho.produtos.length === 0 ? (
                  <></>
              ) : (
                  <div className="w-full lg:w-1/3 h-full p-4 border border-y-slate-400">
                      <div className="flex flex-col gap-3 overflow-y-scroll lg:overflow-y-scroll flex-1 h-96">
                          {carrinho.produtos.map((produto) => (
                              <div
                                  key={produto.produtoId}
                                  className="bg-slate-300 text-black rounded-lg p-3 overflow-hidden py-10
                                flex items-center gap-3"
                              >
                                  <img
                                      src={produto.imagem}
                                      alt={produto.nome}
                                      className="w-16 h-16 object-contain rounded"
                                  />

                                  <div className="flex-1">
                                      <h3 className="font-semibold">{produto.nome}</h3>

                                      <p>Quantidade: {produto.quantidade}</p>
                                      <p>
                                          SubTotal:{' '}
                                          {produto.subtotal.toLocaleString('pt-BR', {
                                              style: 'currency',
                                              currency: 'BRL',
                                          })}
                                      </p>

                                      {/** <p className="font-bold">R$ {produto.valor?.toString()}</p> */}
                                  </div>

                                  <div className="flex flex-col gap-4">
                                      {' '}
                                      <button
                                          onClick={() => incrementarProduto(produto)}
                                          className="bg-green-600 px-3 py-2 rounded
                                    text-white hover:bg-green-700"
                                      >
                                          +
                                      </button>
                                      <button
                                          onClick={() => decrementarProduto(produto)}
                                          className="bg-red-600 px-3 py-2 rounded
                                    text-white hover:bg-red-700"
                                      >
                                          -
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              <div
                  className="lg:w-1/3 h-full min-h-96 bg-slate-300 p-4 border border-slate-400 rounded-lg pl-20 pr-20
              hidden lg:flex flex-col justify-center gap-4"
              >
                  <ShoppingCart className="size-full text-slate-500" />
              </div>
          </div>

          <div className="flex justify-center">
              <Link
                  className="
                                inline-flex items-center justify-center gap-2
                                lg:w-3/5
                                w-full
                                px-5 py-5
                                rounded-lg
                                bg-red-600
                                text-white
                                font-semibold
                                shadow-md
                                transition-all duration-200
                                hover:bg-red-700
                                hover:shadow-lg
                                active:scale-95
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-400
                                "
                  href={`${pathname}/endereco`}
              >
                  Próximo
              </Link>
          </div>
      </div>
  );
}

export default Page
