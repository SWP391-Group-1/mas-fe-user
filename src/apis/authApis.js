import { defaultInstance } from '../apis/axiosClient'

const loginAdmin = (email, password) => {
    return defaultInstance.post('/accounts/login-admin', { email, password })
}

export const authApis = {
    loginAdmin,
}
