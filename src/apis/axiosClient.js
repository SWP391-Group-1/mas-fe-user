import axios from 'axios'

const API_URL = 'https://mas-api.azurewebsites.net/api/mas/v1/'
const defaultInstance = axios.create({
    baseURL: API_URL,
})

export const loadToken = () => {
    const token = localStorage.getItem('access-token')

    defaultInstance.defaults.headers.common[
        'Authorization'
    ] = `Bearer ${token}`
}

export { defaultInstance }
