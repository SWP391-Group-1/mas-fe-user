import { defaultInstance, loadToken } from '../apis/axiosClient'

const createSubject = (data) => {
    return defaultInstance.post('/subjects', data)
}

const updateSubject = (id, data) => {
    return defaultInstance.put(`/subjects/${id}`, data)
}

const getSubjectById = (id) => {
    return defaultInstance.get(`/subjects/${id}`)
}

const deleteSubject = (id) => {
    return defaultInstance.delete(`/subjects/${id}`)
}

const getAllSubject = (searchString, majorId) => {
    if(searchString == null) {
        searchString = ''
    }
    if(majorId == null) {
        majorId =''
    }
    return defaultInstance.get(
        `/subjects?SearchString=${searchString}&MajorId=${majorId}&IsActive=true&PageSize=10000`
    )
}
export const subjectApi = {
    createSubject,
    getSubjectById,
    updateSubject,
    deleteSubject,
    getAllSubject,
}
