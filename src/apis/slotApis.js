import { defaultInstance } from './axiosClient'

const getAllSlots = (mentorId, fromDate, toDate, isAsc, isActive) => {
    return defaultInstance.get('/slots', {
        params: {
            MentorId: mentorId,
            From: fromDate,
            To: toDate,
            IsAsc: isAsc,
            IsActive: isActive,
        },
    })
}

export const SlotApi = {
    getAllSlots,
}
