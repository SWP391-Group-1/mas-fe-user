import { Avatar, Card, Divider, Grid } from '@mui/material'
import { mentorApi } from 'apis/mentorApis'
import MentorSlot from 'components/MentorSlot'
import SuiAvatar from 'components/SuiAvatar'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard'
import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function MentorDetail() {
    const location = useLocation()
    const mentorId = location.state?.mentorID || null
    const [mentor, setMentor] = useState()
    const [mentorSubjects, setMentorSubjects] = useState('')
    const [mentorSlots, setMentorSlots] = useState([])
    var subjectArray = ''
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        mentorApi.getMentorById(mentorId).then((res) => {
            setMentor(res.data.content)
        })
        mentorApi.getMentorSubjects(mentorId).then((res) => {
            var i = 0
            for (const sub of res.data.content) {
                if (i == res.data.content.length - 1) {
                    subjectArray = subjectArray + sub.subject.code
                } else {
                    subjectArray = subjectArray + sub.subject.code + ' - '
                }
                i++
            }
            setMentorSubjects(subjectArray)
        })
        mentorApi.getMentorSlots(mentorId).then((res) => {
            setMentorSlots(res.data.content)
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
                        <Grid item>
                            <SuiAvatar
                                src={
                                    mentor?.avatar === null ||
                                    mentor?.avatar === ''
                                        ? 'https://pbs.twimg.com/media/EWAJB4WUcAAje8s.png'
                                        : mentor?.avatar
                                }
                                alt="profile-image"
                                variant="rounded"
                                size="xl"
                                shadow="sm"
                            />
                        </Grid>
                        <Grid item>
                            <SuiBox height="100%" mt={0.5} lineHeight={1}>
                                <SuiTypography variant="h4" fontWeight="medium">
                                    {mentor?.name}
                                </SuiTypography>
                                <SuiBox>
                                    <MentorInfoCard
                                        title="profile information"
                                        description={mentor?.introduce}
                                        info={{
                                            Email: mentor?.email,
                                            Rate:
                                                '⭐ ' +
                                                mentor?.rate +
                                                '(' +
                                                mentor?.numOfRate +
                                                ')',
                                            meetUrl:
                                                mentor?.meetUrl === null ||
                                                mentor?.meetUrl === ''
                                                    ? 'N/A'
                                                    : mentor?.meetUrl,
                                            Subjects: mentorSubjects,
                                        }}
                                    />
                                </SuiBox>
                            </SuiBox>
                        </Grid>
                    </Grid>
                </Card>

                <SuiBox sx={{ display: 'flex' }}>
                    <SuiBox mt={5} mb={3}>
                        <Card>
                            {/* <Grid item pl={1}> */}
                            <SuiTypography pl={1}>Mentor Slots</SuiTypography>
                            {/* </Grid> */}
                            {/* <Grid item p={3}> */}
                            <SuiBox p={3}>
                                {mentorSlots?.map((item) => {
                                    return <MentorSlot slot={item} />
                                })}
                            </SuiBox>

                            {/* </Grid> */}
                        </Card>
                    </SuiBox>
                </SuiBox>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}