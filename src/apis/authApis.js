import { defaultInstance } from '../apis/axiosClient'

const loginUser = (email, password) => {
    return defaultInstance.post('/accounts/login-user', { email, password })
}
const loginGoogle = (providerName, idToken) => {
    return defaultInstance.post('/accounts/login-google', { providerName, idToken })
}

const logout = () => {
    localStorage.removeItem('access-token')
}

export const authApis = {
    loginUser,
    loginGoogle,
    logout
}