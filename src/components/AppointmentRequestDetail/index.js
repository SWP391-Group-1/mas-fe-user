import { Card, Grid, Paper } from '@mui/material'
import { appointmentApi } from 'apis/appointmentApis'
import { emailApi } from 'apis/emailApis'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import SubjectInfoCard from 'examples/Cards/InfoCards/SubjectInfoCard'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function AppointmentRequestDetail() {
    const location = useLocation()
    const appointmentID = location.state?.appointmentId || null
    const [appointmentRequestDetails, setAppointmentRequestDetails] = useState(
        []
    )

    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        appointmentApi
            .loadReceivedAppointmentDetails(appointmentID)
            .then((res) => {
                setAppointmentRequestDetails(res.data.content)
                console.log('Appoinment Request detail', res.data.content.isApprove)
            }).catch((err) => {
                handleClickVariant(
                    err.data.content,
                    'error'
                )
            })

           
    }
    const handleSendEmail = (toEmail, subject, body) => {
        emailApi
            .sendEmail(toEmail, subject, body)
            .then((res) => console.log(res.data.content))
    }

    const handleAcceptOrDenyRequest = (status) => {
        appointmentApi
            .processAppointment(appointmentID, {
                isApprove: status,
                mentorDescription: 'Appointment Decision',
            })
            .then((res) => {
                fetchData()
                if (status === true) {
                    handleClickVariant(
                        'Accept request successfully!',
                        'success'
                    )
                    handleSendEmail(
                        appointmentRequestDetails.creator.email,
                        'Appointment request approved',
                        'Your appointment request is accepted! Thank you'
                    )
                    handleSendEmail(
                        'huynhse140380@fpt.edu.vn',
                        'Appointment request approved',
                        'Your appointment request is accepted! Thank you'
                    )
                } else {
                    handleClickVariant('You have denied the request!', 'info')
                    handleSendEmail(
                        appointmentRequestDetails.creator.email,
                        'Appointment request denied',
                        'Your appointment request is denied!'
                    )
                    handleSendEmail(
                        'huynhse140380@fpt.edu.vn',
                        'Appointment request denied',
                        'Your appointment request is denied! Please check back your appointment!'
                    )
                }
            })
            .catch((err) => {
                console.log(err.response.data.error.message)
                handleClickVariant(err.response.data.error.message, 'error')
            })
    }

    const renderStatus = () => {
        if (appointmentRequestDetails?.isApprove == null) {
            return (
                <SuiTypography
                    component="label"
                    variant="h6"
                    fontWeight="bold"
                    color="info"
                >
                    Not approved yet
                </SuiTypography>
            )
        } else {
            if (appointmentRequestDetails?.isApprove === true) {
                return (
                    <SuiTypography
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        color="success"
                    >
                        Approved
                    </SuiTypography>
                )
            } else {
                return (
                    <SuiTypography
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        color="error"
                    >
                        Denied
                    </SuiTypography>
                )
            }
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox mt={7}>
                <Card
                    sx={{
                        backdropFilter: `saturate(200%) blur(30px)`,
                        backgroundColor: ({
                            functions: { rgba },
                            palette: { white },
                        }) => rgba(white.main, 0.8),
                        boxShadow: ({ boxShadows: { navbarBoxShadow } }) =>
                            navbarBoxShadow,
                        position: 'relative',
                        mt: -8,
                        py: 2,
                        px: 2,
                    }}
                >
                    <SuiBox mb={1}>{renderStatus()}</SuiBox>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Fullname
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={2}>
                                <SuiInput
                                    disable="true"
                                    type="text"
                                    value={
                                        appointmentRequestDetails?.creator?.name
                                    }
                                    inputProps={{ maxLength: 100 }}
                                />
                            </SuiBox>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    width="10%"
                                    alignItems="center"
                                >
                                    Mentor Profile
                                </SuiTypography>
                            </SuiBox>
                            <Paper elevation={3}>
                                <SuiBox p={2}>
                                    <MentorInfoCard
                                        title="profile information"
                                        description={
                                            appointmentRequestDetails?.creator
                                                ?.introduce
                                        }
                                        info={{
                                            Email: appointmentRequestDetails
                                                ?.creator?.email,
                                        }}
                                    />
                                </SuiBox>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Chosen Subject
                                </SuiTypography>
                            </SuiBox>
                            {appointmentRequestDetails?.slot?.slotSubjects?.map(
                                (item, index) => (
                                    <Paper elevation={3}>
                                        <SuiBox p={2}>
                                            <SubjectInfoCard
                                                description={
                                                    appointmentRequestDetails?.briefProblem
                                                }
                                                info={{
                                                    Code: item.subject?.code,
                                                    Name: item.subject?.title,
                                                }}
                                            />
                                        </SuiBox>
                                    </Paper>
                                )
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Start Time
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={2}>
                                <SuiInput
                                    disable="true"
                                    id="codeTextField"
                                    type="text"
                                    value={moment(
                                        appointmentRequestDetails?.slot
                                            ?.startTime + 'Z'
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    End Time
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={2}>
                                <SuiInput
                                    disable="true"
                                    id="codeTextField"
                                    type="text"
                                    value={moment(
                                        appointmentRequestDetails?.slot
                                            ?.finishTime + 'Z'
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                        </Grid>
                    </Grid>

                    {appointmentRequestDetails?.isApprove == null && (
                        <SuiBox
                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                            <SuiButton
                                sx={{ mr: '10px' }}
                                color="success"
                                onClick={() => {
                                    handleAcceptOrDenyRequest(true)
                                }}
                            >
                                Accept
                            </SuiButton>
                            <SuiButton
                                color="dark"
                                onClick={() => {
                                    handleAcceptOrDenyRequest(false)
                                }}
                            >
                                Deny
                            </SuiButton>
                        </SuiBox>
                    )}
                </Card>
            </SuiBox>
        </DashboardLayout>
    )
}
