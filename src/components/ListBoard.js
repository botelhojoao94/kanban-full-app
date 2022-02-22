import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import OutsideClickHandler from 'react-outside-click-handler'
import ItemListBoard from './ItemListBoard'
import DeleteModal from './DeleteModal'
import toast from 'react-hot-toast'
import { api } from 'services/api'

export default function ListBoard(props) {

    const [titleClicked, setTitleClicked] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    function handleDeleteList(e) {
        localStorage.setItem('selected_list_id', e.target.getAttribute('data-id'))
        setShowDeleteModal(true)
    }

    function handleCreateItem(e) {
        const values = {
            board_id: localStorage.getItem('selected_board_id'),
            list_id: e.target.getAttribute('data-id')
        }
        const myPromise = api.post('/api/board/list/item/create', values)
            .then(res => {
                console.log(res)
                if (!res.data.error)
                    props.setUpdateComponent(props.updateComponent + 1)

            })
        toast.promise(myPromise, {
            loading: 'Aguarde!',
            success: 'Novo item criado!',
            error: 'Ops! Não foi possível criar um novo item no momento!',
        });
    }

    function handleSaveTitle() {
        setTitleClicked(false)
        const myPromise = api.post('/api/board/list/edittitle', {
            list_id: localStorage.getItem('selected_list_id'),
            new_title: document.getElementById(localStorage.getItem('selected_list_id')).innerHTML
        })
        toast.promise(myPromise, {
            loading: 'Aguarde!',
            success: 'Título da lista alterado!',
            error: 'Ops! Não foi possível alterar o título no momento!',
        });
    }

    function handleStoreListId(e) {
        localStorage.setItem('selected_list_id', e.target.getAttribute('data-id'))
    }

    function preventEnter(e) {
        if (e.keyCode == 13)
            e.preventDefault()
    }

    return (
        <>
            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} deletedItem={"lista"} updateComponent={props.updateComponent} setUpdateComponent={props.setUpdateComponent} />
            <div className="bg-white rounded-xl border border-gray-200 shadow w-64 shrink-0 overflow-y-auto edited-scroll">
                <div className="rounded-t-xl p-4 flex justify-between">
                    <OutsideClickHandler
                        disabled={titleClicked ? undefined : true}
                        onOutsideClick={handleSaveTitle}
                    >
                        <div className="w-40">
                            <h2 id={props.list._id} data-id={props.list._id} className="text-gray-500 uppercase tracking-wider flex items-center" suppressContentEditableWarning={true} contentEditable="true"
                                onClick={(e) => { setTitleClicked(true); handleStoreListId(e) }}
                                onKeyDown={preventEnter}>
                                {props.list.title}
                            </h2>
                        </div>
                    </OutsideClickHandler>

                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex justify-center px-1 py-1 text-gray-500 hover:text-gray-700">
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
                                    <Menu.Item>
                                        <div className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100" data-id={props.list._id} onClick={handleDeleteList}>
                                            Excluir
                                        </div>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>

                        </Transition>
                    </Menu>
                </div>

                <div className="flex flex-col items-center gap-4 px-2 py-4" data-id={props.list._id}>
                    {props.list.items.map((item, key) => {
                        return (
                            <ItemListBoard key={key} item={item} lists={props.lists} list_id={props.list._id} updateComponent={props.updateComponent} setUpdateComponent={props.setUpdateComponent} />
                        )
                    })}
                    <div className="inline-flex justify-center w-full rounded-md border px-2 py-1 bg-white text-sm font-medium text-gray-500 cursor-pointer hover:border-gray-300" data-id={props.list._id} onClick={handleCreateItem}>+ Adicionar cartão</div>
                </div>
            </div>
        </>
    )
}