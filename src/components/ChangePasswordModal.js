import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { KeyIcon } from '@heroicons/react/outline'
import { api } from 'services/api';
import toast, { Toaster } from 'react-hot-toast';


export default function ChangePasswordModal(props) {

    const cancelButtonRef = useRef(null)
    const [passwordDifferent, setPasswordDifferent] = useState(false)

    function handleChangePassword(e) {
        e.preventDefault()
        if (e.target[0].value === e.target[1].value) {
            props.setShowChangePasswordModal(false)
            const myPromise = api.post('/api/user/changepassword', {
                new_password: e.target[0].value,
                user_id: localStorage.getItem('user_id')
            })
            toast.promise(myPromise, {
                loading: 'Aguarde!',
                success: 'Senha alterada!',
                error: 'Ops! Não foi possível alterar a senha no momento!',
            });
        }
        else
            setPasswordDifferent(true)
    }


    return (
        <Transition.Root show={props.showChangePasswordModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => { props.setShowChangePasswordModal(false) }}>
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
                        <form className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onSubmit={handleChangePassword}>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <KeyIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Alterar senha
                                        </Dialog.Title>
                                        <div className="flex gap-2 mt-2">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="border-gray-300 rounded-md w-11/12 mx-auto my-1 focus:ring-purple-900 focus:border-purple-900 block sm:text-sm"
                                                placeholder="Nova senha"
                                                required
                                            />
                                            <input
                                                type="password"
                                                name="confirm-password"
                                                id="confirm-password"
                                                className="border-gray-300 rounded-md w-11/12 mx-auto my-1 focus:ring-purple-900 focus:border-purple-900 block sm:text-sm"
                                                placeholder="Confirmar senha"
                                                required
                                            />
                                        </div>
                                        {passwordDifferent ? <span className="text-red-500 text-xs">A senha de confirmação deve ser igual a nova senha!</span> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <input
                                    type="submit"
                                    value="Alterar"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-900 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900 sm:ml-3 sm:w-auto sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => props.setShowChangePasswordModal(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}