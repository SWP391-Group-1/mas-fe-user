import React from 'react'
import { GoogleLogout } from 'react-google-login'

const clientId =
    '1095491146169-chjep4b3lt4fe6tj7cd9itb1ctqp205t.apps.googleusercontent.com'

function Logout() {
    const onSuccess = (response) => {
        console.log('Login success current User: ', response.profileObj)
    }
    const onFailure = (response) => {
        console.log('Login fail : ', response)
    }
    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'signle_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
export default Logout
