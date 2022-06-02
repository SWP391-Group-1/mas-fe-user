import Grid from "@mui/material/Grid";

//  components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

//  examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Table from "examples/Tables/Table";

import { Card } from "@mui/material";

import authorsTableData from "layouts/tables/data/authorsTableData";

function Dashboard() {
  const { columns, rows } = authorsTableData;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total register" }}
                count="20"
                icon={{ color: "info", component: "assessment" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total users" }}
                count="2,300"
                icon={{ color: "info", component: "account_box" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Upcoming booking" }}
                count="10"
                icon={{ color: "info", component: "event_available" }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">Authors table</SuiTypography>
          </SuiBox>
          <SuiBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={rows} />
          </SuiBox>
        </Card>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
