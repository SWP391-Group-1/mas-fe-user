import { defaultInstance, loadToken } from '../apis/axiosClient'

const getAllMentors = (search, subjectId) => {
    if(search == null) {
        search = ""
    }
    if(subjectId == null) {
        subjectId = ""
    }
    loadToken()
    return defaultInstance.get(`users/mentors?Search=${search}&SubjectId=${subjectId}&PageSize=10000`)
}

const getMentorById = (mentorId) => {
    loadToken()
    return defaultInstance.get(`users/${mentorId}`)
}

const getMentorSubjects = (id) => {
    loadToken()
    return defaultInstance.get(`/mentor-subjects/${id}`)
}
const getMentorSlots = (id) => {
    loadToken()
    return defaultInstance.get(`/slots?MentorId=${id}&IsAsc=true&IsActive=true&IsPassed=false`)
}

const getMentorSlotById = (id) => {
    loadToken()
    return defaultInstance.get(`/slots/${id}`)
}

export const mentorApi = {
    getAllMentors,
    getMentorById,
    getMentorSubjects,
    getMentorSlots,
    getMentorSlotById
}
