import { appointmentApi } from 'apis/appointmentApis'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import SuiInput from 'components/SuiInput'
import { IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function AppointmentDataGrid() {
    const [sendAppointment, setSendAppointment] = useState([])

    const fetchData = () => {
        appointmentApi.loadSendAppointment().then((res) => {
            setSendAppointment(res.data.content)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns = [
        {
            field: 'name',
            headerName: 'Mentor Name',
            width: 250,
            valueGetter: (params) => {
                return params.row.mentor.name
            },
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            width: 300,
            valueGetter: (params) => {
                console.log(params.row.startTime)
                return moment(params.row.slot.startTime).format('LLLL')
            },
        },
        {
            field: 'finishTime',
            headerName: 'End Time',
            width: 300,
            valueGetter: (params) => {
                console.log(params.row.finishTime)
                return moment(params.row.slot.finishTime).format('LLLL')
            },
        },
        {
            field: 'createdDate',
            headerName: 'Create Date',
            width: 300,
            valueGetter: (params) => {
                console.log(params.row.createdDate)
                return moment(params.row.createDate).format('LLLL')
            },
        },
        {
            field: 'isApprove',
            headerName: 'Approval Status',
            width: 200,
            valueGetter: (params) => {
                if (params.row.isApprove == null) {
                    return 'Not approved yet'
                } else {
                    if (params.row.isApprove == true) {
                        return 'Approved'
                    } else if (params.row.isApprove == true) {
                        return 'Denied'
                    }
                }
            },
        },
        {
            field: 'rate',
            headerName: 'Rate',
            width: 100,
            valueGetter: (params) =>
                params.row.mentor.rate + '(' + params.row.mentor.numOfRate + ')',
        },
    ]

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <div style={{ height: 750, width: '100%' }}>
                    <DataGrid
                        rowHeight={80}
                        rows={sendAppointment}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                    />
                </div>
            </DashboardLayout>
        </>
    )
}
