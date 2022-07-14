import { Card, Grid, Paper } from '@mui/material'
import { mentorApi } from 'apis/mentorApis'
import { SlotApi } from 'apis/slotApis'
import MentorSlot from 'components/MentorSlot'
import SuiAvatar from 'components/SuiAvatar'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { ratingApi } from 'apis/ratingApis'
import RatingCommentItem from 'components/RatingCommentItem'

export default function MentorDetail() {
    const location = useLocation()
    const mentorId = location.state?.mentorID || null
    const [mentor, setMentor] = useState()
    const [mentorSubjects, setMentorSubjects] = useState('')
    const [mentorSlots, setMentorSlots] = useState([])
    const [ratingLists, setRatingLists] = useState([])
    var subjectArray = ''
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        var fromDate = moment().format('YYYY-MM-DD HH:mm:ss')
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
        SlotApi.getAllSlots(mentorId, fromDate, '', true, true, false).then((res) => {
            setMentorSlots(res.data.content)
        })
        ratingApi.loadAllRatingOfAMentor(mentorId).then((res) => {
            setRatingLists(res.data.content)
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

                <SuiBox>
                    <SuiBox mt={2} mb={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <SuiTypography pl={1}>
                                        Mentor Slots
                                    </SuiTypography>
                                    <Paper
                                        style={{
                                            maxHeight: 500,
                                            overflow: 'auto',
                                        }}
                                    >
                                        <SuiBox>
                                            <SuiBox p={2}>
                                                {mentorSlots?.map((item) => {
                                                    return (
                                                        <MentorSlot
                                                            slot={item}
                                                        />
                                                    )
                                                })}
                                            </SuiBox>
                                        </SuiBox>
                                    </Paper>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <SuiTypography pl={1}>
                                        Rating Comment Section
                                    </SuiTypography>
                                    <SuiBox>
                                        <SuiBox p={2}>
                                            {ratingLists?.map((item) => {
                                                return (
                                                    <RatingCommentItem
                                                        rating={item}
                                                    />
                                                )
                                            })}
                                        </SuiBox>
                                    </SuiBox>
                                </Card>
                            </Grid>
                        </Grid>
                    </SuiBox>
                </SuiBox>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}
