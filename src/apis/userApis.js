import { defaultInstance, loadToken } from '../apis/axiosClient'

const getAllUser = () => {
    loadToken()
    return defaultInstance.get(`/users?IsNew=${true}`)
}

export const UserApi = {
    getAllUser,
}
