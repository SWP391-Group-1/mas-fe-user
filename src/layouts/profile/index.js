import Grid from '@mui/material/Grid'

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Footer from 'examples/Footer'
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard'

// Overview page components
import Header from 'layouts/profile/components/Header'
import { UserAuth } from 'context/AuthContext'
import { useEffect, useState } from 'react'
import { UserApi } from 'apis/userApis'
import { SlotApi } from 'apis/slotApis'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
// import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
// import '@fullcalendar/list/main.css'

function Overview() {
    const { user } = UserAuth()
    const [userProfile, setUserProfile] = useState({})
    const freeSlotTitle = 'Available slot'
    const sampleDescription =
        'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    const [events, setEvents] = useState([])
    var today = new Date()
    var day = today.getDay() - 1
    var weekStart = new Date(today.getTime() - 60 * 60 * 24 * day * 1000)
    var weekEnd = new Date(weekStart.getTime() + 60 * 60 * 24 * 6 * 1000)

    const setDataEvents = (slots) => {
        if (Array.isArray(slots))
            setEvents((prevEvents) => [
                ...prevEvents,
                ...slots.map((slot) => ({
                    title: freeSlotTitle,
                    start: slot.startTime,
                    end: slot.finishTime,
                })),
            ])
    }

    const fetchData = (data) => {
        UserApi.getPersonalProfile(data).then((res) => {
            setUserProfile(res.data.content)
            console.log(res.data.content)
        })
        SlotApi.getAllSlots(
            userProfile?.id,
            // TODO: uncmt this 2 line for real data
            // weekStart.toISOString(),
            // weekEnd.toISOString(),
            // fake data
            '2022-06-25T03:39:32.840Z',
            '2022-06-30T03:39:32.840Z',
            true,
            true
        ).then((res) => {
            setDataEvents(res.data.content)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log('events: ', events)
    }, [events])

    return (
        <DashboardLayout>
            {userProfile != null ? (
                <Header
                    profileAvatar={userProfile.avatar}
                    profileName={userProfile.name}
                    isMentor={userProfile.mentor}
                />
            ) : (
                <Header
                    profileAvatar={user.photoURL}
                    profileName={user.displayName}
                    isMentor={false}
                />
            )}

            <SuiBox mt={5} mb={3}>
                <Grid container spacing={3}>
                    <Grid item xs={10} md={6} xl={3}>
                        <ProfileInfoCard
                            title="profile information"
                            description={
                                userProfile.introduce === ''
                                    ? sampleDescription
                                    : userProfile.introduce
                            }
                            info={{
                                fullName:
                                    userProfile !== null
                                        ? userProfile.name
                                        : user.displayName,
                                mobile: '(44) 123 1234 123',
                                meetUrl:
                                    userProfile !== null
                                        ? userProfile.meetUrl
                                        : 'meet.google.com/defaut-url',
                                email:
                                    userProfile !== null
                                        ? userProfile.email
                                        : user.email,
                            }}
                            social={[
                                {
                                    link: 'https://www.facebook.com/CreativeTim/',
                                    icon: <FacebookIcon />,
                                    color: 'facebook',
                                },
                                {
                                    link: 'https://twitter.com/creativetim',
                                    icon: <TwitterIcon />,
                                    color: 'twitter',
                                },
                                {
                                    link: 'https://www.instagram.com/creativetimofficial/',
                                    icon: <InstagramIcon />,
                                    color: 'instagram',
                                },
                            ]}
                            action={{ route: '', tooltip: 'Edit Profile' }}
                        />
                    </Grid>
                    <Grid item xs={10} md={3} xl={9}>
                        <FullCalendar
                            initialView="timeGridWeek"
                            plugins={[timeGridPlugin]}
                            events={events}
                        />
                    </Grid>
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Overview
