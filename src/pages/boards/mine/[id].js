import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../components/Loading'
import NoBoardsMsg from '../../../components/NoBoardsMsg'
import TopNavbar from '../../../components/TopNavbar'
import SectionTitle from '../../../components/SectionTitle'
import CardBoards from '../../../components/CardBoards'

export default function Mine() {

    const [updateComponent, setUpdateComponent] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [isNewUser, setIsNewUser] = useState(false)
    const [myBoards, setMyBoards] = useState([])

    useEffect(() => {
        axios.get(`/api/board/findmine/${localStorage.getItem('email')}`)
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 fill-gray-500 cursor-pointer hover:fill-gray-400" viewBox="0 0 20 20" fill="currentColor" onClick={handleShowCreateBoardField}>
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            <form onSubmit={handleCreateBoard} className="hidden flex w-full flex-col">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    className="border-gray-300 rounded-md w-11/12 mx-auto mb-2 focus:ring-indigo-500 focus:border-purple-900 sm:text-sm"
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