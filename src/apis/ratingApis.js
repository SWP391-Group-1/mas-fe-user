///users/0032f30a-a27e-4245-b07b-b0a3e3fae393/ratings

import { defaultInstance, loadToken } from "./axiosClient"

const loadAllRatingOfAMentor = (mentorId) => {
    loadToken()
    return defaultInstance.get(`/users/${mentorId}/ratings`)
}

const loadRatingOfAMentorWithFilterVote = (mentorId, vote) => {
    loadToken()
    return defaultInstance.get(`/users/${mentorId}/ratings?Vote=${vote}`)
}


export const ratingApi = {
    loadAllRatingOfAMentor,
    loadRatingOfAMentorWithFilterVote,
}