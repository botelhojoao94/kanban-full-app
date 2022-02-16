import { useState } from "react"
import axios from "axios"
import Loading from "./Loading"

export default function NoBoardsMsg(props) {

    function handleCreateBoard() {
        props.setIsLoading(true)
        axios.post('/api/board/create', {
            name: "Meu quadro",
            email: localStorage.getItem('email')
        })
            .then(res => {
                if (!res.data.error) {
                    props.setIsNewUser(false)
                    props.setIsLoading(false)
                }
            })
    }

    return (
        <>
            <div className="bg-gray-100 h-full flex flex-col justify-center items-center">
                <div className="max-w-7xl w-screen py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Ainda não possui um quadro?</span>
                        <span className="block text-purple-800">Crie seu primeiro quadro Kanban!</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <div
                                onClick={handleCreateBoard}
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-800 cursor-pointer hover:bg-purple-900"
                            >
                                Criar Quadro
                            </div>
                        </div>
                    </div>
                </div>
            </div> :

        </>
    )
}