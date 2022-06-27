import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAppointment = (data) => {
    loadToken()
    return defaultInstance.post('/appointments', data)

}

const loadSendAppointment = () => {
    loadToken()
    return defaultInstance.get('/users/own/appointments?IsAll=true')
}

const loadReceivedAppointment = () => {
    loadToken()
    return defaultInstance.get('/users/mentor/appointments?IsAll=false')
}

const loadSendAppointmentDetails = (appointmentId) => {
    loadToken()
    return defaultInstance.get(`/users/own/appointments/${appointmentId}`)
}

const loadReceivedAppointmentDetails = () => {
    loadToken()
    return defaultInstance.get('/users/mentor/appointments/${appointmentId}')
}


export const appointmentApi = {
    createAppointment,
    loadSendAppointment,
    loadReceivedAppointment,
    loadReceivedAppointmentDetails,
    loadSendAppointmentDetails
}