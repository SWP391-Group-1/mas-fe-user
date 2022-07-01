import { defaultInstance, loadToken } from './axiosClient'

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

const addAvailableSlot = (slot) => {
    loadToken()
    console.log('api', slot)    
    return defaultInstance.post(`/slots/`, slot)
}

const deleteAvailableSlot = (id) => {
    loadToken()
    return defaultInstance.delete(`/slots/${id}`)
}

export const SlotApi = {
    getAllSlots,
    deleteAvailableSlot,
    addAvailableSlot,
}
