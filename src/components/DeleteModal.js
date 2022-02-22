import Router from 'next/router';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast';
import { api } from 'services/api'

export default function DeleteModal(props) {

    const cancelButtonRef = useRef(null)

    function handleDelete() {
        if (props.deletedItem == 'quadro') {
            props.setShowDeleteModal(false)
            const myPromise = api.get(`/api/board/delete/${localStorage.getItem('selected_board_id')}`)
            toast.promise(myPromise, {
                loading: 'Aguarde!',
                success: 'Quadro excluído!',
                error: 'Ops! Não foi possível excluir o quadro no momento!',
            });
            Router.push(`/boards/mine/${localStorage.getItem('selected_board_id')}`)
        }
        else if (props.deletedItem == 'lista') {
            props.setShowDeleteModal(false)
            const values = {
                board_id: localStorage.getItem('selected_board_id'),
                list_id: localStorage.getItem('selected_list_id')
            }
            const myPromise = api.post('/api/board/list/delete', values)
                .then(res => {
                    if (!res.data.error)
                        props.setUpdateComponent(props.updateComponent + 1)
                })
            toast.promise(myPromise, {
                loading: 'Aguarde!',
                success: 'Lista Excluída!',
                error: 'Ops! Não foi possível excluir a lista no momento!',
            })
        }
        else {
            props.setShowDeleteModal(false)
            const values = {
                board_id: localStorage.getItem('selected_board_id'),
                list_id: localStorage.getItem('selected_list_id'),
                item_id: localStorage.getItem('selected_item_id')
            }
            const myPromise = api.post('/api/board/list/item/delete', values)
                .then(res => {
                    if (!res.data.error)
                        props.setUpdateComponent(props.updateComponent + 1)
                })
            toast.promise(myPromise, {
                loading: 'Aguarde!',
                success: 'Item Excluído!',
                error: 'Ops! Não foi possível excluir o item no momento!',
            })
        }
    }

    function whatToDelete() {
        if (props.deletedItem == 'quadro') {
            return (
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Excluir este quadro
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-500">
                        <p>
                            Você tem certeza que deseja excluir este quadro?
                        </p>
                        <p>
                            Após a exclusão não será mais possível recuperar!
                        </p>
                    </div>
                </div>
            )
        } else if (props.deletedItem == 'lista') {
            return (
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Excluir lista
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-500">
                        <p >
                            Você tem certeza que deseja excluir esta lista?
                        </p>
                        <p >
                            Após a exclusão não será mais possível recuperar!
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Excluir item
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-500">
                        <p >
                            Você tem certeza que deseja excluir este item?
                        </p>
                        <p >
                            Após a exclusão não será mais possível recuperar!
                        </p>
                    </div>
                </div>
            )
        }
    }

    return (
        <Transition.Root show={props.showDeleteModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => { props.setShowDeleteModal(false) }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    {whatToDelete()}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => { handleDelete() }}
                                >
                                    Excluir
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => props.setShowDeleteModal(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}