import { useState, useEffect } from 'react'
import { GoogleButton } from 'react-google-button'
import { UserAuth } from 'context/AuthContext'

// @mui material components
import Switch from '@mui/material/Switch'

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import { useNavigate } from 'react-router-dom'

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'

// Images
import curved9 from 'assets/images/curved-images/curved-6.jpg'

import { authApis } from '../../../apis/authApis'
import { UserApi } from 'apis/userApis'

function SignIn() {
    const [username, setUsername] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [rememberMe, setRememberMe] = useState(true)

    const handleSetRememberMe = () => setRememberMe(!rememberMe)

    const { googleSignIn, user } = UserAuth()

    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            const userInfo = await googleSignIn()
            successLoginGoogle()
        } catch (err) {
            console.log(err)
        }
    }

    const successLoginGoogle = () => {
        authApis
            .loginGoogle(
                user.providerId,
                localStorage.getItem('access-token-google')
            )
            .then((res) => {
                if (res.success) {
                    localStorage.setItem('access-token', res.message)
                }
            })
            .catch((err) => {
                setErrorMessage(err.response.data.errors[0])
                setErrorEmail(err.response.data.errors['Email'][0])
                setErrorPassword(err.response.data.errors['Password'][0])
            })
    }

    const handleSignInButtonClick = () => {
        authApis
            .loginUser(username, password)
            .then((res) => {
                const token = res?.data?.message
                localStorage.setItem('access-token', token)
                UserApi.getPersonalInformation()
                    .then((res) => {
                        localStorage.setItem(
                            'userInfo',
                            JSON.stringify(res.data.content)
                        )
                        navigate('/dashboard')
                    })
                    .cath((err) => {
                        console.error(
                            'Sign in failed.',
                            err.response.data.errors[0]
                        )
                    })
            })
            .catch((err) => {
                setErrorMessage(err.response.data.errors[0])
                if (err.response.data.errors['Email'] != null)
                    setErrorEmail(err.response.data.errors['Email'][0])
                if (err.response.data.errors['Password'] != null)
                    setErrorPassword(err.response.data.errors['Password'][0])
            })
    }

    useEffect(() => {}, [])

    return (
        <CoverLayout
            title="FPT MAS"
            description="Mentor Appointment System"
            image={curved9}
        >
            <SuiBox component="form" role="form">
                {errorMessage && (
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {errorMessage}
                        </SuiTypography>
                    </SuiBox>
                )}
                <SuiBox mb={2}>
                    {errorEmail && (
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                color="error"
                            >
                                {errorEmail}
                            </SuiTypography>
                        </SuiBox>
                    )}
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Email
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setUsername(e?.target?.value)}
                    />
                </SuiBox>
                <SuiBox mb={2}>
                    {errorPassword && (
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                color="error"
                            >
                                {errorPassword}
                            </SuiTypography>
                        </SuiBox>
                    )}
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Password
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e?.target?.value)}
                    />
                </SuiBox>
                <SuiBox display="flex" alignItems="center">
                    <Switch
                        checked={rememberMe}
                        onChange={handleSetRememberMe}
                    />
                    <SuiTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetRememberMe}
                        sx={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                        &nbsp;&nbsp;Remember me
                    </SuiTypography>
                </SuiBox>
                <SuiBox mt={4} mb={1}>
                    <SuiButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={handleSignInButtonClick}
                    >
                        sign in
                    </SuiButton>
                </SuiBox>

                <GoogleButton onClick={handleGoogleSignIn} />
            </SuiBox>
        </CoverLayout>
    )
}

export default SignIn
