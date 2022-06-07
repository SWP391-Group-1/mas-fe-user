import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientId =
    '1095491146169-chjep4b3lt4fe6tj7cd9itb1ctqp205t.apps.googleusercontent.com'

function Login() {
    const onSuccess = (response) => {
        console.log('Login success current User: ', response.profileObj)
    }
    const onFailure = (response) => {
        console.log('Login fail : ', response)
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'signle_host_origin'}
            />
        </div>
    )
}
export default Login
