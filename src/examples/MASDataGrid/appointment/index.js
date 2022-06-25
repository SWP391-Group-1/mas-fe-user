import { appointmentApi } from 'apis/appointmentApis'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'

export default function AppointmentDataGrid() {
  const [sendAppointment, setSendAppointment] = useState([])

  const fetchData= () => {
    appointmentApi.loadSendAppointment().then((res) => {
      setSendAppointment(res.data.content)
      console.log(res.data.content)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DashboardLayout>
            <DashboardNavbar />
            <SuiBox>
                <SuiTypography>
                    aaaaaaaaaaaaaaaaa
                </SuiTypography>
            </SuiBox>
    </DashboardLayout>
  )
}
 