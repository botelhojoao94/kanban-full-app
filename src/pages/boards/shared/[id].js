import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../../../components/Loading'
import NoSharedBoardsMsg from '../../../components/NoSharedBoardsMsg'
import TopNavbar from '../../../components/TopNavbar'
import SectionTitle from '../../../components/SectionTitle'
import CardBoards from '../../../components/CardBoards'

export default function Shared() {

    const [updateComponent, setUpdateComponent] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [isNewUser, setIsNewUser] = useState(false)
    const [myBoards, setMyBoards] = useState([])

    useEffect(() => {
        axios.get(`/api/board/findshared/${localStorage.getItem('email')}`)
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

    return (
        <>
            {isLoading ? <Loading /> :
                <div className='h-screen w-screen flex flex-col'>
                    <TopNavbar selected={"shared"} />
                    <div className="grow">
                        {isNewUser ? <NoSharedBoardsMsg setIsNewUser={setIsNewUser} isLoading={isLoading} setIsLoading={setIsLoading} /> :
                            <div>
                                <SectionTitle title={"Meus Quadros"} />
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