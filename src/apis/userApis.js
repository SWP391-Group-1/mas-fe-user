import { defaultInstance, loadToken } from '../apis/axiosClient'

const getAllUser = () => {
    loadToken()
    return defaultInstance.get(`/users?IsNew=${true}`)
}

const getPersonalInformation = () => {
    loadToken()
    return defaultInstance.get(`users/personal`)
}

export const UserApi = {
    getAllUser,
    getPersonalInformation
}
