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
import SubjectInfoCard from 'examples/Cards/InfoCards/SubjectInfoCard'

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
                                    Fullname
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput
                                disabled
                                type="text"
                                value={slotDetail?.mentor.name}
                                inputProps={{ maxLength: 100 }}
                            />
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
                            <SuiBox mb={2}>
                                <Paper elevation={3}>
                                    <SuiBox p={2}>
                                        <MentorInfoCard
                                            title="profile information"
                                            description={
                                                slotDetail?.mentor.introduce
                                            }
                                            info={{
                                                Email: slotDetail?.mentor.email,
                                                Rate:
                                                    '⭐ ' +
                                                    slotDetail?.mentor.rate +
                                                    '(' +
                                                    slotDetail?.mentor
                                                        .numOfRate +
                                                    ')',
                                                meetUrl:
                                                    slotDetail?.mentor
                                                        .meetUrl === null ||
                                                    slotDetail?.mentor
                                                        .meetUrl === ''
                                                        ? 'N/A'
                                                        : slotDetail?.mentor
                                                              .meetUrl,
                                            }}
                                        />
                                    </SuiBox>
                                </Paper>
                            </SuiBox>
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

                            {slotDetail?.slotSubjects?.map((item, index) => (
                                <Paper elevation={3}>
                                    <SuiBox p={2}>
                                        <SubjectInfoCard
                                            description={item.description}
                                            info={{
                                                Code: item.subject?.code,
                                                Name: item.subject?.title,
                                            }}
                                        />
                                    </SuiBox>
                                </Paper>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1} mt={2}>
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
                            <SuiBox mb={2}>
                                <SuiInput
                                    disabled
                                    id="codeTextField"
                                    type="text"
                                    value={moment(
                                        slotDetail?.startTime + 'Z'
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1} mt={2}>
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
                            <SuiBox mb={2}>
                                <SuiInput
                                    disabled
                                    id="codeTextField"
                                    type="text"
                                    value={moment(
                                        slotDetail?.finishTime + 'Z'
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                        </Grid>
                    </Grid>

                    <SuiBox mb={2} display="flex" justifyContent="flex-end">
                        <SuiButton
                            color="dark"
                            onClick={() => {
                                navigate(
                                    '/mentor/details/slotdetails/createappointment',
                                    { state: { slotID: slotDetail?.id } }
                                )
                            }}
                        >
                            Create appointment
                        </SuiButton>
                    </SuiBox>
                </Card>
            </SuiBox>
        </DashboardLayout>
    )
}
