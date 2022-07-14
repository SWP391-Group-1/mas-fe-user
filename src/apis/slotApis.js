import { defaultInstance, loadToken } from './axiosClient'

const getAllSlots = (mentorId, fromDate, toDate, isAsc, isActive, isOn) => {
    return defaultInstance.get('/slots', {
        params: {
            MentorId: mentorId,
            From: fromDate,
            To: toDate,
            IsAsc: isAsc,
            IsActive: isActive,
            isOn: isOn,
            PageSize: 1000,
        },
    })
}

const getSlotDetailById = (slotId) => {
    return defaultInstance.get(`/slots/${slotId}`)
}
const addAvailableSlot = (slot) => {
    loadToken()
    console.log('api', slot)
    return defaultInstance.post(`/slots`, {
        startTime: slot.startTime,
        finishTime: slot.finishTime,
        slotSubjects: [
            {
                subjectId: slot.subjectId,
                // TODO: change fix data to slot.description
                description: 'description',
            },
        ],
    })
}

const deleteAvailableSlot = (id) => {
    loadToken()
    return defaultInstance.delete(`/slots/${id}`)
}

export const SlotApi = {
    getAllSlots,
    deleteAvailableSlot,
    addAvailableSlot,
    getSlotDetailById,
}
