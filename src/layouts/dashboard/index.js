import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'
import SuiBox from 'components/SuiBox'

function Dashboard() {
    const navigate = useNavigate()
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
                    plugins={[dayGridPlugin]}
                />
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Dashboard
