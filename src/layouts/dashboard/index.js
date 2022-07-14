import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'

import { useNavigate } from 'react-router-dom'
import SuiBox from 'components/SuiBox'
import { useEffect, useState } from 'react'
import { UserApi } from 'apis/userApis'
import { SlotApi } from 'apis/slotApis'
import { appointmentApi } from 'apis/appointmentApis'

function Dashboard() {
    var today = new Date()
    var weekStart = new Date(today.getFullYear(), today.getMonth(), 1)
    var weekEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [mentorSlots, setMentorSlots] = useState([])
    const [appointments, setAppointments] = useState([])
    const [joinEvents, setJoinEvents] = useState([])

    const handleClickOpenEvent = (event) => {
        if (event.event._def.title.includes('Mentor slot')) {
            navigate('/mentorslot', {
                state: { slotID: event.event._def.publicId },
            })
        } else {
            if (userProfile?.isMentor) {
                if (
                    userProfile?.id !==
                    event?.event?._def?.extendedProps?.mentorId
                ) {
                    navigate('/appointment/appointmentdetails', {
                        state: { appointmentId: event.event._def.publicId },
                    })
                } else {
                    navigate('/request/appointmentrequestdetails', {
                        state: { appointmentId: event.event._def.publicId },
                    })
                }
            } else {
                navigate('/appointment/appointmentdetails', {
                    state: { appointmentId: event.event._def.publicId },
                })
            }
        }
    }

    const handleDateClick = (event) => {
        // console.log('dateclick', event)
    }

    const setDataAppointments = (slots) => {
        if (Array.isArray(slots))
            setAppointments((prevEvents) => [
                ...slots.map((slot) => ({
                    title: slot.isApprove
                        ? 'Appoinment : Approved'
                        : ' Appointment : Unapproved',
                    start: slot.startTime + 'Z',
                    end: slot.finishTime + 'Z',
                    id: slot.id,
                    mentorId: slot.mentorId,
                    color: slot.isApprove
                        ? slot.isPassed
                            ? 'gray'
                            : 'green'
                        : 'red',
                })),
            ])
    }

    const setDataMentorSlots = (slots) => {
        if (Array.isArray(slots))
            setMentorSlots((prevEvents) => [
                ...slots.map((slot) => ({
                    title: 'Mentor slot: ' + slot.slotSubjects[0].subject.code,
                    start: slot.startTime + 'Z',
                    end: slot.finishTime + 'Z',
                    id: slot.id,
                    mentorId: slot.mentorId,
                    color: slot.isPassed ? 'gray' : 'purple',
                })),
            ])
    }

    const fetchData = (data) => {
        UserApi.getPersonalInformation(data).then((res) => {
            setUserProfile(res.data.content)
            localStorage.setItem('userId', res.data.content.id)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        appointmentApi.checkPass()
        if (userProfile?.isMentor) {
            SlotApi.getAllSlots(
                userProfile?.id,
                weekStart.toISOString(),
                weekEnd.toISOString(),
                true,
                true
            ).then((res) => {
                setDataMentorSlots(res.data.content)
            })
        }
        appointmentApi.loadSendAppointment().then((res) => {
            setDataAppointments(res.data.content)
        })
    }, [userProfile])

    useEffect(() => {
        setJoinEvents([...mentorSlots, ...appointments])
    }, [appointments, userProfile, mentorSlots])

    if (localStorage.getItem('access-token-google') == null) {
        if (localStorage.getItem('access-token') == null) {
            navigate('authentication/sign-in')
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox mt={1} mb={1}>
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        momentTimezonePlugin,
                    ]}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    }}
                    timeZone="Asia/Bangkok"
                    timeZoneParam="Asia/Bangkok"
                    events={joinEvents}
                    eventClick={handleClickOpenEvent}
                    dateClick={handleDateClick}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                />
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Dashboard
