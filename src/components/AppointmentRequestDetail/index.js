import { Card, Paper } from '@mui/material'
import { appointmentApi } from 'apis/appointmentApis'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function AppointmentRequestDetail() {
    const location = useLocation()
    const appointmentID = location.state?.appointmentId || null
    const [appointmentRequestDetails, setAppointmentRequestDetails] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        appointmentApi.loadReceivedAppointmentDetails(appointmentID).then((res) => {
            setAppointmentRequestDetails(res.data.content)
            console.log(res.data.content)
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
            if (appointmentRequestDetails?.isApprove == true) {
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
                    <SuiBox sx={{ display: 'flex' }} mb={1}>
                        <SuiTypography
                            component="label"
                            variant="button"
                            fontWeight="bold"
                            width="10%"
                            alignItems="center"
                        >
                            Fullname
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox sx={{ width: '40%' }} mb={2}>
                        <SuiInput
                            disable="true"
                            type="text"
                            value={appointmentRequestDetails?.creator?.name}
                            inputProps={{ maxLength: 100 }}
                        />
                    </SuiBox>
                    <SuiBox sx={{ display: 'flex' }}>
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
                    <Paper sx={{ width: '40%' }} elevation={3}>
                        <SuiBox p={2}>
                            <MentorInfoCard
                                title="profile information"
                                description={
                                    appointmentRequestDetails?.creator?.introduce
                                }
                                // description="aaaaa"
                                info={{
                                    Email: appointmentRequestDetails?.creator?.email,                                  
                                }}
                            />
                        </SuiBox>
                    </Paper>
                    <SuiBox sx={{ display: 'flex' }} mb={1} mt={2}>
                        <SuiTypography
                            component="label"
                            variant="button"
                            fontWeight="bold"
                            width="10%"
                            alignItems="center"
                        >
                            Start Time
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox sx={{ width: '40%' }} mb={2}>
                        <SuiInput
                            disable="true"
                            id="codeTextField"
                            type="text"
                            value={moment(appointmentRequestDetails?.slot?.startTime).format('LLLL')}
                            inputProps={{ maxLength: 20 }}
                        />
                    </SuiBox>
                    <SuiBox sx={{ display: 'flex' }} mb={1}>
                        <SuiTypography
                            component="label"
                            variant="button"
                            fontWeight="bold"
                            width="10%"
                            alignItems="center"
                        >
                            End Time
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox sx={{ width: '40%' }} mb={2}>
                        <SuiInput
                            disable="true"
                            id="codeTextField"
                            type="text"
                            value={moment(appointmentRequestDetails?.slot?.finishTime).format(
                                'LLLL'
                            )}
                            inputProps={{ maxLength: 20 }}
                        />
                    </SuiBox>
                    <SuiBox
                        sx={{ width: '40%' }}
                        mb={2}
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <SuiButton mr={2}
                            color="success"
                            //     onClick={()=> {
                            //     navigate('/mentor/details/slotdetails/createappointment', {state: {slotID: slotDetail?.id}})
                            // }
                            // }
                        >
                            Accept
                        </SuiButton>
                        <SuiButton
                            color="dark"
                            //     onClick={()=> {
                            //     navigate('/mentor/details/slotdetails/createappointment', {state: {slotID: slotDetail?.id}})
                            // }
                            // }
                        >
                            Deny
                        </SuiButton>
                    </SuiBox>
                </Card>
            </SuiBox>
        </DashboardLayout>
    )
}
