import { defaultInstance, loadToken } from '../apis/axiosClient'

const createMajor = (data) => {
    loadToken()
    return defaultInstance.post('/majors', data)
}

const updateMajor = (id, data) => {
    loadToken()
    return defaultInstance.put(`/majors/${id}`, data)
}
const getMajorById = (id) => {
    loadToken()
    return defaultInstance.get(`/majors/${id}`)
}

const deleteMajor = (id) => {
    loadToken()
    return defaultInstance.delete(`/majors/${id}`)
}

const getAllMajor = () => {
    loadToken()
    return defaultInstance.get(`/majors/`)
}
export const majorApi = {
    createMajor,
    getMajorById,
    updateMajor,
    deleteMajor,
    getAllMajor,
}
