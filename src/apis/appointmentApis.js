import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAppointment = (data) => {
    loadToken()
    return defaultInstance.post('/appointments', data)
}

const loadSendAppointment = () => {
    //load het
    loadToken()
    return defaultInstance.get('/users/send/appointments?IsNew=true&IsAll=true')
}
///users/send/appointments?IsNew=true&IsActive=true
const loadSendAppointmentNotApprovedYet = () => {
    //load nhung thang chua duyet
    loadToken()
    return defaultInstance.get(
        `/users/send/appointments?IsNew=true&IsAll=false`
    )
}

<<<<<<< HEAD
const loadSendAppointmentNotApprovedYet = () => {
    //load nhung thang chua duyet
=======
const loadSendAppointmentWithFilter = (status) => {
    // load nhung thang da xu ly - true/false
>>>>>>> 7b4b58223bac2d427b9bb86824bbde0729b8886f
    loadToken()
    return defaultInstance.get(
        `/users/send/appointments?IsNew=true&IsAll=false&isApprove=${status}`
    )
}

<<<<<<< HEAD
const loadSendAppointmentWithFilter = (status) => {
    // load nhung thang da xu ly - true/false
    loadToken()
    return defaultInstance.get(
        `/users/own/appointments?IsNew=true&IsAll=false&isApprove=${status}`
    )
}

const loadSendAppointmentFilter = (allStatus, approveStatus, passStatus) => {
    // load nhung thang da xu ly - true/false
    loadToken()
    return defaultInstance.get(
        `/users/own/appointments?IsNew=true&IsAll=${allStatus}&isApprove=${approveStatus}&IsPassed=${passStatus}`
=======
const loadSendAppointmentFilter = (allStatus, approveStatus, passStatus) => {
    // load nhung thang da xu ly - true/false
    loadToken()
    return defaultInstance.get(
        `/users/send/appointments?IsNew=true&IsAll=${allStatus}&isApprove=${approveStatus}&IsPassed=${passStatus}`
>>>>>>> 7b4b58223bac2d427b9bb86824bbde0729b8886f
    )
}

const loadReceivedAppointment = () => {
    loadToken()
<<<<<<< HEAD
    return defaultInstance.get(
        '/users/mentor/appointments?IsNew=true&IsAll=false'
    )
}

const loadUserAppointment = () => {
    loadToken()
    return defaultInstance.get(
        '/users/receive/appointments?IsActive=true&IsApprove=true'
=======
    return defaultInstance.get(
        '/users/receive/appointments'
>>>>>>> 7b4b58223bac2d427b9bb86824bbde0729b8886f
    )
}

const loadMentorAppointment = () => {
    loadToken()
    return defaultInstance.get(
        '/users/send/appointments?IsActive=true&IsApprove=true'
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

const loadAppointmentInASlot = (appointmentId) => {
    loadToken()
<<<<<<< HEAD
    return defaultInstance.get(`/users/mentor/appointments/${appointmentId}`)
=======
    return defaultInstance.get(`/users/receive/appointments?SlotId=${slotId}`)
>>>>>>> 7b4b58223bac2d427b9bb86824bbde0729b8886f
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
<<<<<<< HEAD
    loadUserAppointment,
=======
>>>>>>> 7b4b58223bac2d427b9bb86824bbde0729b8886f
}
