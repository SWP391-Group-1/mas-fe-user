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

function Overview() {
    const { user } = UserAuth()

    return (
        <DashboardLayout>
            <Header />
            <SuiBox mt={5} mb={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} xl={4}>
                        <ProfileInfoCard
                            title="profile information"
                            description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                            info={{
                                fullName:
                                    user !== null ? user.displayName : 'Change default name',
                                mobile: '(44) 123 1234 123',
                                email: user !== null ? user.email : 'Change default email',
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
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Overview
