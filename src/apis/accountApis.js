import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAdminAccount = (data) => {
    loadToken()
    return defaultInstance.post(`/accounts/register-admin`, data)
}

const getUserInformation = (id) => {
    loadToken()
    return defaultInstance.get(`/users/${id}`)
}

export const AccountApi = {
    createAdminAccount,
    getUserInformation,
}
