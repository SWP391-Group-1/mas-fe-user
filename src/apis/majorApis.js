import { defaultInstance, loadToken } from '../apis/axiosClient'

const createMajor = (data) => {
    loadToken()
    return defaultInstance.post('/majors', data)
}

const updateMajor = (id, major) => {
    loadToken()
    return defaultInstance.put(`/majors/${id}`, major)
}
const getMajorById = (id) => {
    loadToken()
    return defaultInstance.get(`/majors/${id}`)
}

const deleteMajor = (id) => {
    loadToken()
    return defaultInstance.delete(`/majors/${id}`)
}

const getAllMajor = (searchString) => {
    loadToken()
    if(searchString == null) {
        searchString = ""
    }
    return defaultInstance.get(
        `/majors?SearchString=${searchString}&IsActive=true&PageSize=100`
    )
}

export const majorApi = {
    createMajor,
    getMajorById,
    updateMajor,
    deleteMajor,
    getAllMajor,
}
