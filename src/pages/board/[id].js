import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { parseCookies } from 'nookies'
import { api } from 'services/api'
import Loading from '../../components/Loading'
import TopNavbar from '../../components/TopNavbar'
import BoardNavbar from '../../components/BoardNavbar'
import ListBoard from '../../components/ListBoard'

export default function BoardArea() {

    const [updateComponent, setUpdateComponent] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [boardTitle, setBoardTitle] = useState('')
    const [lists, setLists] = useState([])
    const [invitedEmails, setInvitedEmails] = useState([])

    useEffect(() => {
        api.get(`/api/board/findone/${localStorage.getItem('selected_board_id')}`)
            .then(function (response) {
                const boardData = response.data.message
                setIsLoading(false)
                setBoardTitle(boardData.name)
                setLists(boardData.lists)
                setInvitedEmails(boardData.invited_emails)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [updateComponent])

    return (
        <>
            <Head>
                <title>Kanbify - {boardTitle}</title>
            </Head>
            {isLoading ? <Loading /> :
                <div className='w-screen h-screen flex flex-col'>

                    <TopNavbar selected={"mine"} />

                    <BoardNavbar title={boardTitle} emails={invitedEmails} updateComponent={updateComponent} setUpdateComponent={setUpdateComponent} />
                    <Toaster
                        position="top-right"
                        reverseOrder={true}
                    />
                    <div className="flex flex-row gap-6 overflow-x-auto p-4">
                        {lists.map((list, key) => {
                            return (
                                <ListBoard list={list} lists={lists} key={key} setUpdateComponent={setUpdateComponent} updateComponent={updateComponent} />
                            )
                        })}
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