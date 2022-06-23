import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()

    if (localStorage.getItem('access-token-google') == null) {
        navigate('authentication/sign-in')
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            
            <Footer />
        </DashboardLayout>
    )
}

export default Dashboard
