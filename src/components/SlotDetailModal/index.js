import { Card, Grid, Paper } from '@mui/material'
import { mentorApi } from 'apis/mentorApis'
import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import SuiButton from 'components/SuiButton'
import { useNavigate } from 'react-router-dom'

export default function SlotDetailModal() {
    const location = useLocation()
    const slotId = location.state?.slotID || null
    const [slotDetail, setSlotDetail] = useState()
    let navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        mentorApi.getMentorSlotById(slotId).then((res) => {
            setSlotDetail(res.data.content)
        })
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
                        //mx: 3,
                        py: 2,
                        px: 2,
                    }}
                >
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
                            disable
                            type="text"
                            value={slotDetail?.mentor.name}
                            inputProps={{ maxLength: 100 }}
                        />
                    </SuiBox>

                    <SuiBox sx={{ display: 'flex' }} >
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
                    <Paper sx={{width:"40%"} } elevation={3}>
                        <SuiBox p={2}>
                        <MentorInfoCard
                            title="profile information"
                            description={slotDetail?.mentor.introduce}
                            info={{
                                Email: slotDetail?.mentor.email,
                                Rate:
                                    '⭐ ' +
                                    slotDetail?.mentor.rate +
                                    '(' +
                                    slotDetail?.mentor.numOfRate +
                                    ')',
                                meetUrl:
                                    slotDetail?.mentor.meetUrl === null ||
                                    slotDetail?.mentor.meetUrl === ''
                                        ? 'N/A'
                                        : slotDetail?.mentor.meetUrl,
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
                            disable
                            id="codeTextField"
                            type="text"
                            value={moment(slotDetail?.startTime).format('LLLL')}
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
                            disable
                            id="codeTextField"
                            type="text"
                            value={moment(slotDetail?.finishTime).format(
                                'LLLL'
                            )}
                            inputProps={{ maxLength: 20 }}
                        />
                    </SuiBox>
                    <SuiBox sx={{ width: '40%' }} mb={2} display="flex" justifyContent="flex-end">
                        <SuiButton color="dark" onClick={()=> {
                            navigate('/mentor/details/slotdetails/createappointment', {state: {slotID: slotDetail?.id}})
                        }}>
                                Create appointment
                        </SuiButton>
                    </SuiBox>
                </Card>
            </SuiBox>
        </DashboardLayout>
    )
}
