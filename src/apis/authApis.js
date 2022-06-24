import { defaultInstance } from '../apis/axiosClient'

const loginUser = (email, password) => {
    return defaultInstance.post('/accounts/login-user', { email, password })
}

const logout = () => {
    localStorage.removeItem('access-token')
}

const getOwnProfile =() => {
    return defaultInstance.get(`/users/personal`)
}

export const authApis = {
    loginUser,
    logout,
    getOwnProfile
}
