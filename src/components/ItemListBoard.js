import { useState, Fragment } from 'react'
import toast from 'react-hot-toast'
import { Menu, Transition } from '@headlessui/react'
import OutsideClickHandler from 'react-outside-click-handler'
import DeleteModal from './DeleteModal'
import { api } from 'services/api'

export default function ItemListBoard(props) {

    const [titleClicked, setTitleClicked] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    function handleSaveTitle() {
        setTitleClicked(false)
        const myPromise = api.post('/api/board/list/item/edittitle', {
            board_id: localStorage.getItem('selected_board_id'),
            list_id: localStorage.getItem('selected_list_id'),
            item_id: localStorage.getItem('selected_item_id'),
            new_title: document.getElementById(localStorage.getItem('selected_item_id')).innerHTML
        })
        toast.promise(myPromise, {
            loading: 'Aguarde!',
            success: 'Item alterado!',
            error: 'Ops! Não foi possível alterar o item no momento!',
        });
    }

    function handleSaveItemData(e) {
        localStorage.setItem('selected_item_id', e.target.id)
        localStorage.setItem('selected_list_id', e.target.getAttribute('list-id'))
    }

    function handleChangeEmphasisColor(e) {
        api.post('/api/board/list/item/editcolor', {
            board_id: localStorage.getItem('selected_board_id'),
            list_id: e.target.parentNode.getAttribute('list-id'),
            item_id: e.target.parentNode.getAttribute('item-id'),
            color: e.target.getAttribute('data-id')
        })
            .then(res => props.setUpdateComponent(props.updateComponent + 1))

    }

    function handleDeleteItem(e) {
        setShowDeleteModal(true)
        localStorage.setItem('selected_list_id', e.target.getAttribute('list-id'))
        localStorage.setItem('selected_item_id', e.target.getAttribute('item-id'))
    }

    function getEmphasisColor(color) {
        if (color === 'purple')
            return 'border-r-purple-500'
        else if (color === 'blue')
            return 'border-r-indigo-500'
        else if (color === 'green')
            return 'border-r-lime-500'
        else if (color === 'yellow')
            return 'border-r-yellow-400'
        else if (color === 'orange')
            return 'border-r-amber-500'
        else if (color === 'red')
            return 'border-r-red-500'
        else
            return null
    }

    function preventEnter(e) {
        if (e.keyCode == 13)
            e.preventDefault()
    }

    return (
        <>
            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} deletedItem={"item"} updateComponent={props.updateComponent} setUpdateComponent={props.setUpdateComponent} />
            <div className={`bg-white w-full shadow rounded-xl flex border border-gray-200 border-r-4 ${getEmphasisColor(props.item.color)}`}>
                <div className="p-2 w-full flex justify-between">
                    <div className="w-40">
                        <OutsideClickHandler
                            disabled={titleClicked ? undefined : true}
                            onOutsideClick={handleSaveTitle}
                        >
                            <p id={props.item._id} list-id={props.list_id} data-id={props.item._id} className="text-md text-gray-900" suppressContentEditableWarning={true} contentEditable="true"
                                onClick={(e) => { setTitleClicked(true); handleSaveItemData(e) }}
                                onKeyDown={preventEnter}
                            >
                                {props.item.title}
                            </p>
                        </OutsideClickHandler>
                    </div>
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
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
                                <div className="py-1">
                                    <Menu.Item>
                                        <div className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100" list-id={props.list_id} item-id={props.item._id}
                                            onClick={handleDeleteItem} >
                                            Mover para cima
                                        </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <div className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100" list-id={props.list_id} item-id={props.item._id}
                                            onClick={handleDeleteItem} >
                                            Mover para baixo
                                        </div>
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    {props.lists.map((list, key) => {
                                        return (
                                            <Menu.Item key={key}>
                                                <div className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100"
                                                currentList-id={props.list_id} toList-id={list._id} item-id={props.item._id}
                                                >
                                                    {list.title}
                                                </div>
                                            </Menu.Item>
                                        )
                                    })}
                                </div>
                                <div className="py-1">
                                    <Menu.Item list-id={props.list_id} item-id={props.item._id}>
                                        <div className="w-full p-2 flex justify-between h-10">
                                            <div className="rounded-full w-6 h-6 hover:w-7 hover:h-7 cursor-pointer bg-purple-500"
                                                data-id="purple"
                                                onClick={handleChangeEmphasisColor}
                                            >
                                            </div>
                                            <div className="rounded-full w-6 h-6 hover:w-7 hover:h-7 cursor-pointer bg-indigo-500"
                                                data-id="blue"
                                                onClick={handleChangeEmphasisColor}
                                            >
                                            </div>
                                            <div className="rounded-full w-6 h-6 hover:w-7 hover:h-7 cursor-pointer bg-lime-500"
                                                data-id="green"
                                                onClick={handleChangeEmphasisColor}
                                            >
                                            </div>
                                            <div className="rounded-full w-6 h-6 hover:w-7 hover:h-7 cursor-pointer bg-yellow-400"
                                                data-id="yellow"
                                                onClick={handleChangeEmphasisColor}
                                            >
                                            </div>
                                            <div className="rounded-full w-6 h-6 hover:w-7 hover:h-7 cursor-pointer bg-amber-500"
                                                data-id="orange"
                                                onClick={handleChangeEmphasisColor}
                                            >
                                            </div>
                                            <div className="rounded-full w-6 h-6 hover:w-7 hover:h-7 cursor-pointer bg-red-500"
                                                data-id="red"
                                                onClick={handleChangeEmphasisColor}
                                            >
                                            </div>
                                            <div className="rounded-full w-6 h-6 hover:w-7 hover:h-7 cursor-pointer bg-gray-200"
                                                data-id=""
                                                onClick={handleChangeEmphasisColor}
                                            >
                                            </div>
                                        </div>
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        <div className="w-full p-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100" list-id={props.list_id} item-id={props.item._id}
                                            onClick={handleDeleteItem} >
                                            Excluir
                                        </div>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                </div>
            </div>
        </>
    )
}