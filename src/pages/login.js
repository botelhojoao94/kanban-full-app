import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { parseCookies } from 'nookies'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'

export default function Example() {

    const { register, handleSubmit } = useForm()
    const { loginEmailError, signIn } = useContext(AuthContext)

    async function handleSignIn(userData) {
        await signIn(userData)
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="flex flex-col items-center">
                        <div>
                            <Image
                                src="/image/logo-purple.png"
                                alt="kanban"
                                width={300}
                                height={160}
                            />
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Bem-vindo de volta!</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    E-mail
                                </label>
                                <input
                                    {...register('email')}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-900 focus:border-purple-900 focus:z-10 sm:text-sm"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Senha
                                </label>
                                <input
                                    {...register('password')}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-900 focus:border-purple-900 focus:z-10 sm:text-sm"
                                    placeholder="Senha"
                                />
                            </div>
                        </div>
                        {loginEmailError ? <span className="text-red-500 text-xs">Usuário ou senha incorretos!</span> : null}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-purple-900 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Lembre de mim
                                </label>
                            </div>

                            <Link href="/register">
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Criar uma conta
                                </a>
                            </Link>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}