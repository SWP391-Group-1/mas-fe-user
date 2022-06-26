import { defaultInstance, loadToken } from './axiosClient'


const updateMentorSubject = (id, major) => {
    loadToken()
    return defaultInstance.put(`/majors/${id}`, major)
}
const getMentorSubjects = (mentorId) => {
    loadToken()
    return defaultInstance.get(`/mentor-subjects/${mentorId}`)
}

const deleteMentorSubject = (id) => {
    loadToken()
    return defaultInstance.delete(`/mentor-subjects/${id}`)
}


export const mentorSubjectApi = {
    getMentorSubjects,
    updateMentorSubject,
    deleteMentorSubject,
}
