import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAppointment = (data) => {
    loadToken()
    return defaultInstance.post('/appointments', data)

}

const loadSendAppointment = () => {
    loadToken()
    return defaultInstance.get('/users/own/appointments')
    
}

export const appointmentApi = {
    createAppointment,
    loadSendAppointment
}