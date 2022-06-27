import { useState, useEffect } from 'react'

// @mui material components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiAvatar from 'components/SuiAvatar'

// Soft UI Dashboard React examples
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

// Soft UI Dashboard React base styles
import breakpoints from 'assets/theme/base/breakpoints'

// Images
import burceMars from 'assets/images/bruce-mars.jpg'
import curved0 from 'assets/images/curved-images/curved0.jpg'
import { Avatar } from '@mui/material'

function Header({ profileName, profileAvatar, isMentor }) {
    const [tabsOrientation, setTabsOrientation] = useState('horizontal')
    const [tabValue, setTabValue] = useState(0)

    useEffect(() => {
        // A function that sets the orientation state of the tabs.
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.sm
                ? setTabsOrientation('vertical')
                : setTabsOrientation('horizontal')
        }
        
        window.addEventListener('resize', handleTabsOrientation)

        handleTabsOrientation()

        return () => window.removeEventListener('resize', handleTabsOrientation)
    }, [tabsOrientation])

    const handleSetTabValue = (event, newValue) => setTabValue(newValue)

    return (
        <SuiBox position="relative">
            <DashboardNavbar absolute light />
            <SuiBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="18.75rem"
                borderRadius="xl"
                sx={{
                    backgroundImage: ({
                        functions: { rgba, linearGradient },
                        palette: { gradients },
                    }) =>
                        `${linearGradient(
                            rgba(gradients.info.main, 0.6),
                            rgba(gradients.info.state, 0.6)
                        )}, url(${curved0})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '50%',
                    overflow: 'hidden',
                }}
            />
            <Card
                sx={{
                    backdropFilter: `saturate(200%) blur(30px)`,
                    backgroundColor: ({
                        functions: { rgba },
                        palette: { white },
                    }) => rgba(white.main, 0.8),
                    boxShadow: ({ boxShadows: { navbarBoxShadow } }) =>
                        navbarBoxShadow,
                    position: 'relative',
                    mt: -8,
                    mx: 3,
                    py: 2,
                    px: 2,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        {profileAvatar !== null ? (
                            <Avatar
                                src={profileAvatar}
                                sx={{ width: 80, height: 80 }}
                            />
                        ) : (
                            <SuiAvatar
                                src={burceMars}
                                alt="profile-image"
                                variant="rounded"
                                size="xl"
                                shadow="sm"
                            />
                        )}
                    </Grid>
                    <Grid item>
                        <SuiBox height="100%" mt={0.5} lineHeight={1}>
                            <SuiTypography variant="h5" fontWeight="medium">
                                {profileName}
                            </SuiTypography>
                            <SuiTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                            >
                                {isMentor ? 'User' : 'Mentor'}
                            </SuiTypography>
                        </SuiBox>
                    </Grid>
                </Grid>
            </Card>
        </SuiBox>
    )
}

export default Header
