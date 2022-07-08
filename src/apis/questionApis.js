import { defaultInstance, loadToken } from '../apis/axiosClient'

const loadQuestionsOfAppointment = (appointmentId) => {
    loadToken()
    return defaultInstance.get(`/appointments/${appointmentId}/questions?IsActive=true`)
}

const createNewQuestion = (data) => {
    loadToken()
    return defaultInstance.post('/questions', data)
}

const getQuestionById = (id) => {
    loadToken()
    return defaultInstance.get(`/questions/${id}`)
}
const answerQuestion = (questionId, data) => {
    loadToken()
    return defaultInstance.put(`/questions/${questionId}`, data)
}

// /appointments/133da9d6-82c1-46de-a78f-355280821b30/questions?IsActive=true
export const questionApi = {
    loadQuestionsOfAppointment,
    createNewQuestion, 
    answerQuestion,
    getQuestionById
}