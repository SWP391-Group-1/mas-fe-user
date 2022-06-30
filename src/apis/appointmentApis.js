import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAppointment = (data) => {
    loadToken()
    return defaultInstance.post('/appointments', data)

}

const loadSendAppointment = () => {
    loadToken()
    return defaultInstance.get('/users/own/appointments?IsNew=true&IsAll=true')
}

const loadSendAppointmentNotApprovedYet= () => {
    loadToken()
    return defaultInstance.get(`/users/own/appointments?IsNew=true&IsAll=false`)
}

const loadSendAppointmentWithFilter= (status) => {
    loadToken()
    return defaultInstance.get(`/users/own/appointments?IsNew=true&IsAll=false&isApprove=${status}`)
}


const loadReceivedAppointment = () => {
    loadToken()
    return defaultInstance.get('/users/mentor/appointments?IsNew=true&IsAll=false')
}

const loadSendAppointmentDetails = (appointmentId) => {
    return defaultInstance.get(`/users/own/appointments/${appointmentId}`)
}

const loadReceivedAppointmentDetails = (appointmentId) => {
    return defaultInstance.get(`/users/mentor/appointments/${appointmentId}`)
}

const processAppointment = (appointmentId, data) => {
    loadToken()
    return defaultInstance.put(`/appointments/process/${appointmentId}`, data)
}

export const appointmentApi = {
    createAppointment,
    loadSendAppointment,
    loadReceivedAppointment,
    loadReceivedAppointmentDetails,
    loadSendAppointmentDetails,
    loadSendAppointmentWithFilter,
    loadSendAppointmentNotApprovedYet,
    processAppointment
}