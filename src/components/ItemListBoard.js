import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios'

export default function ItemListBoard(props) {

    const [titleClicked, setTitleClicked] = useState(false)

    function handleSaveTitle() {
        setTitleClicked(false)
        console.log("oi")
        console.log(document.getElementById("title_list").getAttribute('data-id'))
        const myPromise = axios.post('/api/board/list/item/edittitle', {
            board_id: localStorage.getItem('selected_board_id'),
            item_id: document.getElementById("title_item").getAttribute('data-id'),
            new_title: document.getElementById("title_item").innerHTML
        })
        // toast.promise(myPromise, {
        //     loading: 'Aguarde!',
        //     success: 'Título da lista alterado!',
        //     error: 'Ops! Não foi possível alterar o título no momento!',
        // });
    }

    return (
        <div className="bg-white w-full shadow rounded-xl border border-gray-200 border-r-4 border-r-indigo-500 hover:bg-gray-100 cursor-pointer">
            <div className="p-2 flex">
                <OutsideClickHandler
                    disabled={titleClicked ? undefined : true}
                    onOutsideClick={handleSaveTitle}
                >
                    <div id="title_item" data-id={props.item._id} className="text-md text-gray-900" suppressContentEditableWarning={true} contentEditable="true" onClick={() => { setTitleClicked(true) }}>{props.item.title}</div>
                </OutsideClickHandler>
            </div>
            <div className="pl-2 pb-2 text-zinc-600">
                {props.item.description ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg> : null}
            </div>
        </div>
    )
}