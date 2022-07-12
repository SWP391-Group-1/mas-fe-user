import { defaultInstance, loadToken } from '../apis/axiosClient'

const sendEmail = (toEmail, subject, body) => {
    loadToken()
    return defaultInstance.post('/email/send', {
        toEmail: toEmail,
        subject: subject,
        body: body,
    })
}

export const emailApi = {
    sendEmail,
}
