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
        console.log('eventclick', event)
        console.log('eventclick', event.event._def.publicId)
        if (event.event._def.title.includes('Mentor available slot')) {
            navigate('/mentorslot', {
                state: { slotID: event.event._def.publicId },
            })
        } else {
            if (userProfile?.isMentor) {
                navigate('/request/appointmentrequestdetails', {
                    state: { appointmentId: event.event._def.publicId },
                })
            } else {
                navigate('/appointment/appointmentdetails', {
                    state: { appointmentId: event.event._def.publicId },
                })
            }
        }
    }

    const handleDateClick = (event) => {
        console.log('dateclick', event)
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
                    color: slot.isApprove ? 'green' : 'red',
                })),
            ])
    }

    const setDataMentorSlots = (slots) => {
        if (Array.isArray(slots))
            setMentorSlots((prevEvents) => [
                ...slots.map((slot) => ({
                    title:
                        'Mentor available slot: ' +
                        slot.slotSubjects[0].subject.code,
                    start: slot.startTime + 'Z',
                    end: slot.finishTime + 'Z',
                    id: slot.id,
                    color: 'purple',
                })),
            ])
    }

    const fetchData = (data) => {
        UserApi.getPersonalInformation(data).then((res) => {
            setUserProfile(res.data.content)
            localStorage.setItem('userId', res.data.content.id)
        })
        console.log('1 fetch profile')
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        SlotApi.getAllSlots(
            localStorage.getItem('userId') != null
                ? localStorage.getItem('userId')
                : '',
            weekStart.toISOString(),
            weekEnd.toISOString(),
            true,
            true
        ).then((res) => {
            setDataMentorSlots(res.data.content)
        })
        appointmentApi.loadSendAppointmentWithFilter('true').then((res) => {
            setDataAppointments(res.data.content)
        })
        console.log('2 fetch data event')
    }, [userProfile])

    useEffect(() => {
        setJoinEvents([...mentorSlots, ...appointments])
        console.log(mentorSlots)
        console.log(appointments)
        console.log(joinEvents)
        console.log('3 joins event data to calendar')
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
