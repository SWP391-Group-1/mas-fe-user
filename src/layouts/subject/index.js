// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import SubjectDataGrid from 'examples/MASDataGrid/subject'

function Subject() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                <SuiBox mb={3}>
                    <SuiBox
                        sx={{
                            '& .MuiTableRow-root:not(:last-child)': {
                                '& td': {
                                    borderBottom: ({
                                        borders: { borderWidth, borderColor },
                                    }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        <SubjectDataGrid />
                    </SuiBox>
                </SuiBox>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Subject
