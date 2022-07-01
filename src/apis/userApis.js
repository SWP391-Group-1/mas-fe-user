import { defaultInstance, loadToken } from '../apis/axiosClient'

const getAllUser = () => {
    loadToken()
    return defaultInstance.get(`/users?IsNew=${true}`)
}

const getPersonalInformation = () => {
    loadToken()
    return defaultInstance.get(`users/personal`)
}
const updatePersonalInformation = (userProfile) => {
    loadToken()
    return defaultInstance.put(`users/personal`, userProfile)
}

export const UserApi = {
    getAllUser,
    getPersonalInformation,
    updatePersonalInformation,
}
