import Grid from '@mui/material/Grid'

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'

// @mui material components
import Card from '@mui/material/Card'

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import SuiTypography from 'components/SuiTypography'
import Table from 'examples/Tables/Table'

// Data
import authorsTableData from 'layouts/tables/data/authorsTableData'

function Major() {
    const { columns, rows } = authorsTableData

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                <SuiBox mb={3}>
                    <Card>
                        <SuiBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={3}
                        >
                            <SuiTypography variant="h6">
                                Major
                            </SuiTypography>
                        </SuiBox>
                        <SuiBox
                            sx={{
                                '& .MuiTableRow-root:not(:last-child)': {
                                    '& td': {
                                        borderBottom: ({
                                            borders: {
                                                borderWidth,
                                                borderColor,
                                            },
                                        }) =>
                                            `${borderWidth[1]} solid ${borderColor}`,
                                    },
                                },
                            }}
                        >
                            <Table columns={columns} rows={rows} />
                        </SuiBox>
                    </Card>
                </SuiBox>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Major
