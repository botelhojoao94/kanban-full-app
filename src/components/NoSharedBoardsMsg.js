import { useState } from "react"
import axios from "axios"
import Loading from "./Loading"

export default function NewUser(props) {

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
                <div className="max-w-7xl w-screen py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Oops!</span>
                        <span className="block text-purple-800">Você ainda não possui quadros compartilhados!</span>
                    </h2>
                </div>
            </div> :

        </>
    )
}