import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAppointment = (data) => {
    loadToken()
    return defaultInstance.post('/appointments', data)

}

const loadSendAppointment = () => {
    loadToken()
    return defaultInstance.post(`/users/own/appointments?IsNew=true`)
}

export const appointmentApi = {
    createAppointment,
    loadSendAppointment
}