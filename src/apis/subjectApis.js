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

const getAllSubject = () => {
    return defaultInstance.get(`/subjects?IsActive=true`)
}
export const subjectApi = {
    createSubject,
    getSubjectById,
    updateSubject,
    deleteSubject,
    getAllSubject,
}
