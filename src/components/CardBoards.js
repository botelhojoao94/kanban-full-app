import Router from 'next/router'

export default function CardBoards(props) {

    function handleAccessBoard(e) {
        localStorage.setItem('selected_board_id', e.target.getAttribute('data-id'))
        Router.push(`/board/mine/${e.target.getAttribute('data-id')}`)
    }

    return (
        <div data-id={props.board._id} className="cursor-pointer bg-white w-64 h-24 hover:bg-gray-200 rounded-xl border border-gray-200 shadow" onClick={(e) => { handleAccessBoard(e) }}>
            <div data-id={props.board._id} className="p-4 text-left text-m font-medium text-gray-500 uppercase tracking-wider">{props.board.name}</div>
            <div data-id={props.board._id} className="pb-4 pr-4 flex justify-end">
                <svg data-id={props.board._id} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}