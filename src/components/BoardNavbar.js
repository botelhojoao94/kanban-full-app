import { useState, Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import OutsideClickHandler from 'react-outside-click-handler';
import toast from 'react-hot-toast';
import axios from 'axios'
import DeleteModal from './DeleteModal'

export default function BoardNavbar(props) {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [titleClicked, setTitleClicked] = useState(false)

    function handleAddList(e) {
        e.preventDefault()
        const values = {
            id: localStorage.getItem('selected_board_id'),
            title: e.target[0].value
        }
        const myPromise = axios.post('/api/board/list/create', values)
            .then(res => {
                if (!res.data.error)
                    props.setUpdateComponent(props.updateComponent + 1)

            })
        toast.promise(myPromise, {
            loading: 'Aguarde!',
            success: 'Lista criada!',
            error: 'Ops! Não foi possível adicionar a lista no momento!',
        });
    }

    function handleAddEmail(e) {
        e.preventDefault()
        if (e.target[0].value === localStorage.getItem('email'))
            toast.error("Você não pode adicionar seu próprio e-mail!")
        else {
            const loading = toast.loading("Aguarde!")
            axios.post(`/api/user/addboard/`, {
                email: e.target[0].value,
                board_id: localStorage.getItem('selected_board_id')
            })
                .then(res => {
                    toast.dismiss(loading)
                    if (res.data.msg === "email_already_added") {
                        toast.error("Este e-mail já foi adicionado!")
                    } else if (res.data.msg === "not_a_valid_email") {
                        toast.error("Este e-mail não existe na plataforma!")
                    } else {
                        toast.success("E-mail adicionado com sucesso!")
                        props.setUpdateComponent(props.updateComponent + 1)
                    }
                })
        }
    }

    function handleDeleteEmail(e) {
        const values = {
            board_id: localStorage.getItem('selected_board_id'),
            email: e.target.getAttribute('data-id')
        }
        const myPromise = axios.post('/api/board/shared/remove', values)
            .then(res => {
                if (!res.data.error)
                    props.setUpdateComponent(props.updateComponent + 1)

            })
        toast.promise(myPromise, {
            loading: 'Aguarde!',
            success: 'E-mail removido da lista!',
            error: 'Ops! Não foi possível remover este e-mail no momento!',
        });
    }

    function handleDeleteBoard() {
        setShowDeleteModal(true)
        console.log(localStorage.getItem('selected_board_id'))
    }

    function handleSaveTitle() {
        setTitleClicked(false)
        const myPromise = axios.post('/api/board/edittitle', {
            board_id: localStorage.getItem('selected_board_id'),
            new_title: document.getElementById("title_board").innerHTML
        })
        toast.promise(myPromise, {
            loading: 'Aguarde!',
            success: 'Título do quadro alterado!',
            error: 'Ops! Não foi possível alterar o título no momento!',
        });
    }

    return (
        <header className="bg-white shadow">
            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} deletedItem={"quadro"} />
            <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between">

                <OutsideClickHandler
                    disabled={titleClicked ? undefined : true}
                    onOutsideClick={handleSaveTitle}
                >
                    <h1 id="title_board" className="text-3xl font-bold text-gray-700 cursor-pointer rounded-md" suppressContentEditableWarning={true} contentEditable="true" onClick={() => { setTitleClicked(true) }}>{props.title}</h1>
                </OutsideClickHandler>

                <div className="flex items-center gap-5 text-gray-700">
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border hover:border-gray-300 px-2 py-1 bg-white text-sm font-medium text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                <div className="py-1">
                                    <form onSubmit={handleAddList}>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="border-gray-300 rounded-md w-11/12 mx-auto my-1 focus:ring-indigo-500 focus:border-purple-900 block sm:text-sm"
                                            placeholder="Título"
                                            required
                                        />
                                        <input type="submit" value="+ Criar lista" className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100" />
                                    </form>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border hover:border-gray-300 px-2 py-1 bg-white text-sm font-medium text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                <div className="py-1">
                                    {props.emails.map((email, key) => {
                                        return (
                                            <Menu.Item key={key}>
                                                <div className="w-full p-2 text-gray-700 text-sm flex justify-between items-center hover:bg-gray-100">
                                                    {email}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id={email} onClick={handleDeleteEmail}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </Menu.Item>
                                        )
                                    })}
                                </div>
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                    <div className="py-1">
                                        <form onSubmit={handleAddEmail}>
                                            <input
                                                type="email"
                                                name="title"
                                                id="title"
                                                className="border-gray-300 rounded-md w-11/12 mx-auto my-1 focus:ring-indigo-500 focus:border-purple-900 block sm:text-sm"
                                                placeholder="E-mail"
                                                required
                                            />
                                            <input type="submit" value="+ Convidar" className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100" />
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Menu.Items>

                        </Transition>
                    </Menu>

                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border hover:border-gray-300 px-2 py-1 bg-white text-sm font-medium text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item onClick={handleDeleteBoard}>
                                        <div className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100">
                                            Excluir
                                        </div>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

            </div>
        </header>
    )
}