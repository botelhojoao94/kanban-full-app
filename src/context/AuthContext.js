import { useState } from 'react'
import Router from 'next/router'
import { createContext } from "react";
import { setCookie } from 'nookies'
import axios from "axios";

export const AuthContext = createContext({})

export function AuthProvider(props) {
    const [loginEmailError, setLoginEmailError] = useState(false)
    const [registerEmailError, setRegisterEmailError] = useState(false)
    const [user, setUser] = useState({}) //??????
    const isAuthenticated = !!user //??????

    function signIn(userData) {
        axios.post('/api/auth/check', userData)
            .then(res => {
                if (res.data.error) {
                    console.log(res.data.msg)
                    setLoginEmailError(true)
                } else {
                    console.log(res.data.msg)
                    localStorage.setItem('name', res.data.username)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('user_id', res.data.id)
                    const token = res.data.token
                    if (token) {
                        setCookie(undefined, 'kanban-auth-token', token, {
                            maxAge: 60 * 60 * 1 // 1 hora de duração do cookie
                        })
                        Router.push(`/boards/mine/${res.data.id}`)
                    }
                }
            })
    }

    function signUp(userData) {
        axios.post('/api/auth/create', userData)
            .then(res => {
                if (res.data.error) {
                    console.log(res.data.msg)
                    setRegisterEmailError(true)
                } else {
                    console.log(res.data.msg)
                    Router.push('/login')
                }
            })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loginEmailError, registerEmailError, signIn, signUp }}>
            {props.children}
        </AuthContext.Provider>
    )
}