/* eslint-disable react-hooks/exhaustive-deps */
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import SuiBox from 'components/SuiBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Footer from 'examples/Footer'
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard'
import Header from 'layouts/profile/components/Header'
import { UserAuth } from 'context/AuthContext'
import { useEffect, useState } from 'react'
import { UserApi } from 'apis/userApis'
import { SlotApi } from 'apis/slotApis'
import { subjectApi } from 'apis/subjectApis'
import { mentorSubjectApi } from 'apis/mentorSubjectApis'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import '@fullcalendar/timegrid/main.css'
import { Button, Chip, MenuItem, Select } from '@mui/material'
import { useModal } from '../../hooks/useModal.js'
import EventDialog from './components/EventDialog/index.js'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

function Overview() {
    const { user } = UserAuth()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [selectMentorSubject, setSelectMentorSubject] = useState(null)
    const [mentorSubjects, setMentorSubjects] = useState([])
    const [subjects, setSubjects] = useState([])
    const [events, setEvents] = useState([])
    const [isEditingEventOpen, setIsEditingEventOpen] = useState(false)
    const [eventToEdit, setEventToEdit] = useState(null)
    const modal = useModal()
    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    const chipMentorSubjects = React.useMemo(() => {
        return mentorSubjects?.map((mentorSubject) => ({
            key: mentorSubject.subject.id,
            label: mentorSubject.subject.code,
            mentorSubject,
        }))
    }, [mentorSubjects])

    // TODO: change title of this one to data in API
    const freeSlotTitle = 'Available slot'
    const sampleDescription =
        'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    var today = new Date()
    // var day = today.getDay() - 1

    // this get first date of month
    // first date of week : new Date(today.getTime() - 60 * 60 * 24 * day * 1000)
    var weekStart = new Date(today.getFullYear(), today.getMonth(), 1)

    // last date of month
    // last date of week : new Date(weekStart.getTime() + 60 * 60 * 24 * 6 * 1000)
    var weekEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    console.log('Week ' + weekStart + ' - ' + weekEnd)

    const setDataEvents = (slots) => {
        if (Array.isArray(slots))
            setEvents((prevEvents) => [
                ...slots.map((slot) => ({
                    title:
                        freeSlotTitle +
                        ': ' +
                        slot.slotSubjects[0].subject.code,
                    start: slot.startTime+'Z',
                    end: slot.finishTime+'Z',
                    id: slot.id,
                })),
            ])
            console.log()
    }

    const handleClickAdd = () => {
        modal.openModal({
            title: 'Mentor subject add',
            content: 'Do you want to add this subject for mentor',
            buttons: [
                {
                    text: 'Confirm',
                    onClick: () => {
                        handleAddChipMentorSubject()
                        modal.closeModal()
                    },
                },
                {
                    text: 'Close',
                    onClick: () => {
                        modal.closeModal()
                    },
                },
            ],
        })
    }

    const handleClickOpenEvent = ({ event, el }) => {
        navigate('/mentorslot', {
            state: { slotID: event._def.publicId },
        })
    }

    const handleAddChipMentorSubject = () => {
        if (selectMentorSubject)
            mentorSubjectApi
                .registerMentorSubjects({
                    subjectId: selectMentorSubject.id,
                    briefInfo: selectMentorSubject.description,
                })
                .then((res) => {
                    handleClickVariant(
                        'Add mentor subject successfully!',
                        'success'
                    )
                    fetchData()
                })
    }

    const handleDelete = (chipToDelete) => {
        mentorSubjectApi.deleteMentorSubject(chipToDelete).then((res) => {
            fetchData()
        })
    }

    const fetchData = (data) => {
        UserApi.getPersonalInformation(data).then((res) => {
            setUserProfile(res.data.content)
        })

        subjectApi.getAllSubject().then((res) => {
            setSubjects(res.data.content)
        })
    }

    function handleEditEventCancelClick() {
        setIsEditingEventOpen(false)
    }

    function handleEditEventOkClick(event) {
        SlotApi.addAvailableSlot(event).then((res) => {
            fetchData()
        })
        setIsEditingEventOpen(false)
    }

    function handleDateClick(dateClickInfo) {
        function handleOpenEditEvent(start, end) {
            setIsEditingEventOpen(true)
            setEventToEdit({
                startTime: start,
                finishTime: end,
            })
            fetchData()
        }

        handleOpenEditEvent(dateClickInfo.date, dateClickInfo.date)
    }

    function handleOnUpdate() {
        fetchData()
        navigate('/profile')
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

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ m: 1 }}>
                    Current mentor subject
                </Typography>
                {chipMentorSubjects.map((chipMentorSubject, index) => {
                    return (
                        <Chip
                            sx={{ m: 1 }}
                            key={chipMentorSubject.key + index}
                            label={chipMentorSubject.label}
                            onDelete={() =>
                                handleDelete(chipMentorSubject.mentorSubject.id)
                            }
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
                    onClick={handleClickAdd}
                >
                    Add
                </Button>
            </CardContent>
        </React.Fragment>
    )

    useEffect(
        () => console.log(mentorSubjects, chipMentorSubjects),
        [chipMentorSubjects]
    )

    useEffect(() => {
        console.log('First day of month', weekStart)
        console.log('Last day of month', weekEnd)

        fetchData()
    }, [])

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
                            fullname={
                                userProfile !== null
                                    ? userProfile.name
                                    : user.displayName
                            }
                            meetUrl={
                                userProfile !== null
                                    ? userProfile.meetUrl
                                    : 'meet.google.com/defaut-url'
                            }
                            avatarUrl={
                                userProfile !== null
                                    ? userProfile.avatar
                                    : 'avatar/url'
                            }
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
                            onUpdate={handleOnUpdate}
                            action={{ route: '', tooltip: 'Edit Profile' }}
                        />
                    </Grid>
                    {userProfile.isMentor && (
                        <>
                            <Grid item xs={10} md={3} xl={9}>
                                <FullCalendar
                                    initialView="timeGridWeek"
                                    plugins={[
                                        dayGridPlugin,
                                        timeGridPlugin,
                                        interactionPlugin,
                                        momentTimezonePlugin,
                                    ]}
                                    timeZone="Asia/Bangkok"
                                    timeZoneParam="Asia/Bangkok"
                                    events={events}
                                    slotDuration={{
                                        minute: 30,
                                    }}
                                    dateClick={handleDateClick}
                                    eventClick={handleClickOpenEvent}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={10} md={1} xl={5}>
                                <Box sx={{ minWidth: 100 }}>
                                    <Card variant="outlined">{card}</Card>
                                </Box>
                            </Grid>
                        </>
                    )}
                </Grid>
            </SuiBox>
            <Footer />
            <EventDialog
                isOpen={isEditingEventOpen}
                initialEvent={eventToEdit}
                onOk={handleEditEventOkClick}
                onCancel={handleEditEventCancelClick}
                mentorSubjects={mentorSubjects}
            />
        </DashboardLayout>
    )
}

export default Overview
