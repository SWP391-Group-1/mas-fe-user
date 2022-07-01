import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useNavigate } from 'react-router-dom'
import SuiBox from 'components/SuiBox'
import { useEffect, useState } from 'react'
import { UserApi } from 'apis/userApis'
import { SlotApi } from 'apis/slotApis'
import { appointmentApi } from 'apis/appointmentApis'

function Dashboard() {
    var today = new Date()
    var day = today.getDay() - 1
    var weekStart = new Date(today.getTime() - 60 * 60 * 24 * day * 1000)
    var weekEnd = new Date(weekStart.getTime() + 60 * 60 * 24 * 6 * 1000)

    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [mentorSlots, setMentorSlots] = useState([])
    const [appointments, setAppointments] = useState([])
    const [joinEvents, setJoinEvents] = useState([])

    const handleClickOpenEvent = (event) => {
        console.log('eventclick', event)
        console.log('eventclick', event.event._def.publicId)
        navigate('/appointment/appointmentdetails', {
            state: { appointmentId: event.event._def.publicId },
        })
    }

    const handleDateClick = (event) => {
        console.log('dateclick', event)
        
    }

    const setDataAppointments = (slots) => {
        if (Array.isArray(slots))
            setAppointments((prevEvents) => [
                ...slots.map((slot) => ({
                    title: 'Appoinment',
                    start: slot.startTime,
                    end: slot.finishTime,
                    id: slot.id,
                    color: 'red',
                })),
            ])
    }

    const setDataMentorSlots = (slots) => {
        if (Array.isArray(slots))
            setMentorSlots((prevEvents) => [
                ...slots.map((slot) => ({
                    title: 'Mentor available slot',
                    start: slot.startTime,
                    end: slot.finishTime,
                    id: slot.id,
                    color: 'purple',
                })),
            ])
    }

    const fetchData = (data) => {
        UserApi.getPersonalInformation(data).then((res) => {
            setUserProfile(res.data.content)
        })
    }

    useEffect(() => {
        if (userProfile?.id) {
            appointmentApi.loadMentorAppointment().then((res) => {
                setDataMentorSlots(res.data.content)
            })
            appointmentApi.loadUserAppointment().then((res) => {
                setDataAppointments(res.data.content)
            })
        }
    }, [userProfile])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setJoinEvents([...mentorSlots, ...appointments])
        console.log('appointments:', appointments)
        console.log('mentorSlots:', mentorSlots)
        console.log('JoinEvents:', joinEvents)
        console.log('userProfile', userProfile)
    }, [appointments])

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
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
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
