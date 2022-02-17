import { useState, useEffect } from 'react'
import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast'
import { parseCookies } from 'nookies'
import { api } from 'services/api'
import Loading from 'components/Loading'
import NoSharedBoardsMsg from 'components/NoSharedBoardsMsg'
import TopNavbar from 'components/TopNavbar'
import SectionTitle from 'components/SectionTitle'
import CardBoards from 'components/CardBoards'

export default function SharedBoards() {

    const [updateComponent, setUpdateComponent] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [isNewUser, setIsNewUser] = useState(false)
    const [myBoards, setMyBoards] = useState([])

    useEffect(() => {
        api.get(`/api/board/sharedboard/${localStorage.getItem('email')}`)
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
        e.target.parentNode.classList.add("hidden")
        e.target.parentNode.nextElementSibling.classList.remove("hidden")
    }

    function handleCreateBoard(e) {
        e.preventDefault()

        const myPromise = axios.post('/api/board/create', {
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
                <title>Kanbify - Compartilhados</title>
            </Head>
            {isLoading ? <Loading /> :
                <div className='h-screen w-screen flex flex-col'>
                    <TopNavbar selected={"shared"} />
                    <Toaster
                        position="top-right"
                        reverseOrder={true}
                    />
                    <div className="grow">
                        {isNewUser ? <NoSharedBoardsMsg setIsNewUser={setIsNewUser} isLoading={isLoading} setIsLoading={setIsLoading} /> :
                            <div>
                                <SectionTitle title={"Compartilhados"} />
                                <main>
                                    <div className="w-screen max-w-7xl mx-auto py-6 gap-2 flex flex-wrap justify-center">

                                        {myBoards.map((board, key) => {
                                            return (
                                                <CardBoards key={key} board={board} />
                                            )
                                        })}
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