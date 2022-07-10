import { defaultInstance, loadToken } from './axiosClient'


const updateMentorSubject = (id, major) => {
    loadToken()
    return defaultInstance.put(`/majors/${id}`, major)
}
const getMentorSubjects = (mentorId) => {
    loadToken()
    return defaultInstance.get(`/mentor-subjects/${mentorId}?IsActive=true`)
}
const registerMentorSubjects = (mentorSubject) => {
    loadToken()
    
        console.log('Add chip mentor:', mentorSubject)
    return defaultInstance.post(`/mentor-subjects/`, {
        subjectId: mentorSubject.subjectId,
        // TODO: fix this to mentorSubject.briefInfo
        briefInfo: "briefInfo",
    })
}

const deleteMentorSubject = (id) => {
    loadToken()
    return defaultInstance.delete(`/mentor-subjects/${id}`)
}


export const mentorSubjectApi = {
    getMentorSubjects,
    updateMentorSubject,
    deleteMentorSubject,
    registerMentorSubjects,
}
