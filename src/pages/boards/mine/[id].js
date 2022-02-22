import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast'
import { parseCookies } from 'nookies'
import { api } from 'services/api'
import Loading from 'components/Loading'
import NoBoardsMsg from 'components/NoBoardsMsg'
import TopNavbar from 'components/TopNavbar'
import SectionTitle from 'components/SectionTitle'
import CardBoards from 'components/CardBoards'

export default function MyBoards() {

    const [updateComponent, setUpdateComponent] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [isNewUser, setIsNewUser] = useState(false)
    const [myBoards, setMyBoards] = useState([])

    useEffect(() => {
        api.get(`/api/board/myboard/${localStorage.getItem('email')}`)
            .then(function (response) {
                setIsLoading(false)
                if (response.data.boards.length != 0) {
                    const boards = response.data.boards
                    setMyBoards(boards)
                }
                else {
                    setIsNewUser(true)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [updateComponent, isNewUser])

    function handleShowCreateBoardField(e) {
        e.target.classList.add("hidden")
        e.target.nextElementSibling.classList.remove("hidden")
    }

    function handleCreateBoard(e) {
        e.preventDefault()

        const myPromise = api.post('/api/board/create', {
            name: e.target[0].value,
            email: localStorage.getItem('email')
        })
            .then(res => {
                if (!res.data.error) {
                    setUpdateComponent(updateComponent + 1)
                }
            })

        toast.promise(myPromise, {
            loading: 'Aguarde!',
            success: 'Novo quadro criado!',
            error: 'Ops! Não foi possível criar um novo quadro no momento!',
        });

        e.target.classList.add("hidden")
        e.target.previousSibling.classList.remove("hidden")
    }


    return (
        <>
            <Head>
                <title>Kanbify - Meus Quadros</title>
            </Head>
            {isLoading ? <Loading /> :
                <div className='h-screen w-screen flex flex-col'>
                    <TopNavbar selected={"mine"} />
                    <Toaster
                        position="top-right"
                        reverseOrder={true}
                    />
                    <div className="grow">
                        {isNewUser ? <NoBoardsMsg setIsNewUser={setIsNewUser} isLoading={isLoading} setIsLoading={setIsLoading} /> :
                            <div>
                                <SectionTitle title={"Meus Quadros"} />
                                <main>
                                    <div className="w-screen max-w-7xl mx-auto py-6 gap-2 flex flex-wrap justify-center">

                                        {myBoards.map((board, key) => {
                                            return (
                                                <CardBoards key={key} board={board} />
                                            )
                                        })}
                                        <div className="bg-white rounded-xl border border-gray-200 shadow w-64 h-24 flex flex-col items-center justify-center ">
                                            <div className="text-gray-500 text-8xl mb-3 cursor-pointer hover:text-gray-400" onClick={handleShowCreateBoardField}>
                                                +
                                            </div>
                                            <form onSubmit={handleCreateBoard} className="hidden flex w-full flex-col">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    className="border-gray-300 rounded-md w-11/12 mx-auto mb-2 focus:ring-purple-900 focus:border-purple-900 sm:text-sm"
                                                    placeholder="Título"
                                                    required
                                                />
                                                <input type="submit" value="+ Criar quadro" className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100" />
                                            </form>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { ['kanban-auth-token']: token } = parseCookies(context)

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {},
    }
}