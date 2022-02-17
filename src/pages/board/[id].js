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
                <div className='h-screen w-screen flex flex-col'>
                    <TopNavbar selected={"mine"} />
                    <Toaster
                        position="top-right"
                        reverseOrder={true}
                    />
                    <div className="grow">
                        <BoardNavbar title={boardTitle} emails={invitedEmails} updateComponent={updateComponent} setUpdateComponent={setUpdateComponent} />
                        <div className="h-full w-screen px-4 pt-4 flex flex-row">
                            <div className="h-full flex flex-row gap-6 overflow-x-auto pb-4">
                                {lists.map((list, key) => {
                                    return (
                                        <ListBoard list={list} key={key} setUpdateComponent={setUpdateComponent} />
                                    )
                                })}
                            </div>
                        </div>
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
        props: {}, // will be passed to the page component as props
    }
}