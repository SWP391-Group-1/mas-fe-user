import Grid from "@mui/material/Grid";

//  components
import SuiBox from "components/SuiBox";

//  examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

import Projects from "layouts/dashboard/components/Projects";

function Dashboard() {
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
        </Grid>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
