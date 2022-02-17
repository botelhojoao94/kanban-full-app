import axios from 'axios'
import { parseCookies } from 'nookies'

const {'kanban-auth-token': token} = parseCookies()

export const api = axios.create({
    baseUrl: 'http://localhost:3000'
})

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}