import { useState } from 'react'
import { createContext } from "react";

export const AppContext = createContext({})

export function AppProvider(props) {
    const [myBoards, setMyBoards] = useState({})
    const [sharedBoards, setSharedBoards] = useState({})


    return (
        <AppContext.Provider value={{ }}>
            {props.children}
        </AppContext.Provider>
    )
}