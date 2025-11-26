import axios from "axios"

export const baseUrl = 'http://localhost:3000/api'

export let token = ""

export const setToken = (newToken) => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    token = newToken

}

export default { baseUrl, token, setToken }