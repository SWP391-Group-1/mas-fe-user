import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAppointment = (data) => {
    loadToken()
    return defaultInstance.post('/appointments', data)

}

const loadSendAppointment = () => { //load het
    loadToken()
    return defaultInstance.get('/users/send/appointments?IsNew=true&IsAll=true')
}
///users/send/appointments?IsNew=true&IsActive=true
const loadSendAppointmentNotApprovedYet= () => { //load nhung thang chua duyet
    loadToken()
    return defaultInstance.get(`/users/send/appointments?IsNew=true&IsAll=false`)
}

const loadSendAppointmentWithFilter= (status) => { // load nhung thang da xu ly - true/false
    loadToken()
    return defaultInstance.get(`/users/send/appointments?IsNew=true&IsAll=false&isApprove=${status}`)
}

const loadSendAppointmentFilter= (allStatus, approveStatus, passStatus) => { // load nhung thang da xu ly - true/false
    loadToken()
    return defaultInstance.get(`/users/send/appointments?IsNew=true&IsAll=${allStatus}&isApprove=${approveStatus}&IsPassed=${passStatus}`)
}

const loadReceivedAppointment = () => {
    loadToken()
    return defaultInstance.get('/users/receive/appointments?IsNew=true&IsAll=false')
}

const loadUserAppointment = () => {
    loadToken()
    return defaultInstance.get(
        '/users/own/appointments?IsActive=true&IsApprove=true'
    )
}

const loadMentorAppointment = () => {
    loadToken()
    return defaultInstance.get(
        '/users/mentor/appointments?IsActive=true&IsApprove=true'
    )
}

const loadSendAppointmentDetails = (appointmentId) => {
    loadToken()
    return defaultInstance.get(`/users/send/appointments/${appointmentId}`)
}

const loadReceivedAppointmentDetails = (appointmentId) => {
    loadToken()
    return defaultInstance.get(`/users/receive/appointments/${appointmentId}`)
}

const processAppointment = (appointmentId, data) => {
    loadToken()
    return defaultInstance.put(`/appointments/process/${appointmentId}`, data)
}

const loadAppointmentInASlot = (slotId) => {
    loadToken()
    return defaultInstance.get(`/users/receive/appointments?SlotId=${slotId}`)
}

const ratingAfterAppointment = (id, data) => {
    loadToken()
    return defaultInstance.post(`/ratings/${id}`, data)
}

export const appointmentApi = {
    createAppointment,
    loadSendAppointment,
    loadReceivedAppointment,
    loadReceivedAppointmentDetails,
    loadSendAppointmentDetails,
    loadSendAppointmentWithFilter,
    loadSendAppointmentNotApprovedYet,
    processAppointment,
    loadSendAppointmentFilter,
    loadAppointmentInASlot,
    ratingAfterAppointment,
    loadMentorAppointment,
    loadUserAppointment,
}