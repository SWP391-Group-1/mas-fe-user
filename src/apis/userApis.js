import { defaultInstance, loadToken } from '../apis/axiosClient'

const getAllUser = () => {
    loadToken()
    return defaultInstance.get(`/users?IsNew=${true}`)
}

const getPersonalProfile = () => {
    loadToken()
    return defaultInstance.get(`/users/personal`)
}

export const UserApi = {
    getAllUser,
    getPersonalProfile,
}
