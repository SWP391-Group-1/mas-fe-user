// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Major from 'layouts/major'
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

//  icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Cube from "examples/Icons/Cube";
import Subject from "layouts/subject";
import Account from "layouts/account"; 
import SpaceShip from "examples/Icons/SpaceShip"
import MentorDetail from "layouts/mentorDetail";
import SlotDetailModal from "components/SlotDetailModal";
import CreateAppointmentModal from "components/CreateAppointmentModal";
import AppointmentDataGrid from "examples/MASDataGrid/appointment";

const routes = [
    { type: 'title', title: 'Dashboard  Pages', key: 'dashboard-pages' },
    {
        type: 'collapse',
        name: 'Dashboard',
        key: 'dashboard',
        route: '/dashboard',
        icon: <Shop size="12px" />,
        component: <Dashboard />,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Mentor',
        key: 'mentor',
        route: '/mentor',
        icon: <Office size="12px" />,
        component: <Account />,
        noCollapse: true,
    },
    
    {
        type: 'collapse',
        name: 'Appointment',
        key: 'appointment',
        route: '/appointment',
        icon: <SpaceShip size="12px" />,
        component: <AppointmentDataGrid />,
        noCollapse: true,
    },

    
    { type: 'title', title: 'Mentor Pages', key: 'mentor-pages' },
    {
        type: 'collapse',
        name: 'Request',
        key: 'request',
        route: '/request',
        icon: <SpaceShip size="12px" />,
        component: <AppointmentDataGrid />,
        noCollapse: true,
    },
    
    { type: 'title', title: 'Account Pages', key: 'account-pages' },
    {
        type: 'collapse',
        name: 'Profile',
        key: 'profile',
        route: '/profile',
        icon: <CustomerSupport size="12px" />,
        component: <Profile />,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Register',
        key: 'register',
        route: '/tables',
        icon: <Cube size="12px" />,
        component: <Tables />,
        noCollapse: true,
    },

    // {
    //     type: 'collapse',
    //     name: 'Sign In',
    //     key: 'sign-in',
    //     route: '/authentication/user/sign-in',
    //     component: <SignIn />,
    // }
    
]

const extraRoutes = [
    {
        type: 'collapse',
        name: 'MentorDetail',
        key: 'details',
        route: '/mentor/details',
        component: <MentorDetail />,  
    },

    {
        type: 'collapse',
        name: 'Slot Detail',
        key: 'slotdetails',
        route: '/mentor/details/slotdetails',
        component: <SlotDetailModal />,  
    },

    {
        type: 'collapse',
        name: 'Create Appointment',
        key: 'createappointment',
        route: '/mentor/details/slotdetails/createappointment',
        component: <CreateAppointmentModal />,  
    },

    {
        type: 'collapse',
        name: 'Sign In',
        key: 'sign-in',
        route: '/authentication/user/sign-in',
        component: <SignIn />,
    }
]
export default routes;

export {extraRoutes}
