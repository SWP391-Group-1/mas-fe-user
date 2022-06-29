/* eslint-disable react-hooks/exhaustive-deps */
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'

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
import { subjectApi } from 'apis/subjectApis'
import { mentorSubjectApi } from 'apis/mentorSubjectApis'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/timegrid/main.css'
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
} from '@mui/material'

function Overview() {
    const { user } = UserAuth()
    const [userProfile, setUserProfile] = useState({})
    const [selectMentorSubject, setSelectMentorSubject] = useState(null)
    const [mentorSubjects, setMentorSubjects] = useState([])
    const [subjects, setSubjects] = useState([])
    // const [chipMentorSubject, setChipMentorSubject] = useState([])
    const [events, setEvents] = useState([])
    const [open, setOpen] = useState(false)

    const chipMentorSubjects = React.useMemo(() => {
        return mentorSubjects?.map((mentorSubject) => ({
            key: mentorSubject.subject.id,
            label: mentorSubject.subject.code,
            mentorSubject,
        }))
    }, [mentorSubjects])

    useEffect(() => console.log(mentorSubjects, chipMentorSubjects), [chipMentorSubjects])

    const freeSlotTitle = 'Available slot'
    const sampleDescription =
        'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    var today = new Date()
    var day = today.getDay() - 1
    var weekStart = new Date(today.getTime() - 60 * 60 * 24 * day * 1000)
    var weekEnd = new Date(weekStart.getTime() + 60 * 60 * 24 * 6 * 1000)


    const setDataEvents = (slots) => {
        if (Array.isArray(slots))
            setEvents((prevEvents) => [
                // ...prevEvents,
                ...slots.map((slot) => ({
                    title: freeSlotTitle,
                    start: slot.startTime,
                    end: slot.finishTime,
                })),
            ])
    }

    const fetchData = (data) => {
        UserApi.getPersonalInformation(data).then((res) => {
            setUserProfile(res.data.content)
        })

        subjectApi.getAllSubject().then((res) => {
            setSubjects(res.data.content)
        })
    }

    React.useEffect(() => {
        if (userProfile?.id) {
            SlotApi.getAllSlots(
                userProfile?.id,
                weekStart.toISOString(),
                weekEnd.toISOString(),
                true,
                true
            ).then((res) => {
                setDataEvents(res.data.content)
            })
            mentorSubjectApi.getMentorSubjects(userProfile?.id).then((res) => {
                setMentorSubjects(res.data.content)
            })
        }
    }, [userProfile])

    const handleClickOpen = () => {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }

    // const handleAddMentorSubject = (selectMentorSubject) => {

    //         setChipMentorSubject((prev) => [
    //             ...prev,
    //             {
    //                 key: selectMentorSubject.id,
    //                 label: selectMentorSubject.code,
    //             },
    //         ])
    //     }
    // }

    const handleAddChipMentorSubject = () => {
        handleClose()
        if (selectMentorSubject)
            mentorSubjectApi
                .registerMentorSubjects({
                    subjectId: selectMentorSubject.id,
                    briefInfo: selectMentorSubject.description,
                })
                .then((res) => {
                    console.log('imsohuy', res.data)
                })
    }

    const handleDelete = (chipToDelete) => {
        console.log('delete', chipToDelete);
        // Todo
    }

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ m: 1 }}>
                    Current mentor subject
                </Typography>
                {chipMentorSubjects.map((data, index) => {
                    return (
                        <Chip
                            sx={{ m: 1 }}
                            key={data.key + index}
                            label={data.label}
                            onDelete={() => handleDelete(data)}
                        />
                    )
                })}
                <Box sx={{ m: 1 }}>
                    <Select
                        onChange={(e) => {
                            setSelectMentorSubject(e.target.value)
                        }}
                    >
                        {subjects.map((subject) => {
                            return (
                                <MenuItem key={subject.id} value={subject}>
                                    {subject.code}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </Box>
                <Button
                    sx={{ m: 1 }}
                    variant="contained"
                    color="error"
                    size="small"
                    // onClick={() => {
                    //     console.log('imsohuy userprofile:', userProfile)
                    //     console.log('imsohuy subject', subjects)
                    //     console.log('imsohuy mentorSubject', mentorSubjects)
                    //     console.log('imsohuy chipMentor', chipMentorSubject)

                    //     handleAddMentorSubject(selectMentorSubject)
                    // }}
                    onClick={handleClickOpen}
                >
                    Add
                </Button>
            </CardContent>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Add mentor subject'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to add this subject
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddChipMentorSubject} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

    const handleDateClick = (dateClickInfo) => {
        console.log(dateClickInfo.dateStr)
    }

    const handleEventClick = (clickInfo) => {
        console.log('imsohuy eventclick: ', clickInfo.event.title)
    }

    useEffect(() => {
        fetchData()
    }, [])

    // TODO: delete this
    // useEffect(() => {
    //     if (mentorSubjects != null) {
    //         handleAddChipMentorSubject()
    //     }
    // }, [mentorSubjects])

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
                            plugins={[timeGridPlugin, interactionPlugin]}
                            events={events}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                        />
                    </Grid>
                    <Grid item xs={10} md={1} xl={5}>
                        <Box sx={{ minWidth: 100 }}>
                            <Card variant="outlined">{card}</Card>
                        </Box>
                    </Grid>
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Overview
