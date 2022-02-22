import Router from 'next/router'

export default function CardBoards(props) {

    function handleAccessBoard(e) {
        localStorage.setItem('selected_board_id', e.target.getAttribute('data-id'))
        Router.push(`/board/${e.target.getAttribute('data-id')}`)
    }

    return (
        <div data-id={props.board._id} className="cursor-pointer bg-white w-64 h-24 hover:bg-gray-200 rounded-xl border border-gray-200 shadow" onClick={(e) => { handleAccessBoard(e) }}>
            <div data-id={props.board._id} className="p-4 text-left text-m font-medium text-gray-500 uppercase tracking-wider">{props.board.name}</div>
        </div>
    )
}