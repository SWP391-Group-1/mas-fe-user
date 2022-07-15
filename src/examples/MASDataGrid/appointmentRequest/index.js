import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { appointmentApi } from 'apis/appointmentApis'
import SuiButton from 'components/SuiButton'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AppointmentRequestDataGrid() {
    const [receivedAppointments, setReceivedAppointments] = useState([])
    let navigate = useNavigate()
    const fetchData = () => {
        appointmentApi.loadReceivedAppointment().then((res) => {
            setReceivedAppointments(res.data.content)
        })
    }

    const renderViewButton = (params) => {
        return (
            <strong>
                <SuiButton
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => {
                        navigate('/request/appointmentrequestdetails', {
                            state: { appointmentId: params.row.id },
                        })
                    }}
                >
                    View Detail
                </SuiButton>
            </strong>
        )
    }

    useEffect(() => {
        fetchData()
    }, [])
    const columns = [
        {
            field: 'name',
            headerName: 'Student Name',
            width: 200,
            valueGetter: (params) => {
                return params.row.creator.name
            },
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            width: 300,
            valueGetter: (params) => {
                return moment(params.row.slot.startTime + 'Z').format('LLLL')
            },
        },
        {
            field: 'finishTime',
            headerName: 'End Time',
            width: 300,
            valueGetter: (params) => {
                return moment(params.row.slot.finishTime + 'Z').format('LLLL')
            },
        },
        {
            field: 'createdDate',
            headerName: 'Create Date',
            width: 300,
            valueGetter: (params) => {
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
                    } else if (params.row.isApprove != true) {
                        return 'Denied'
                    }
                }
            },
        },
        {
            field: 'edit',
            headerName: 'View Detail',
            width: 200,
            renderCell: renderViewButton,
            disableClickEventBubbling: true,
        },
    ]

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <div style={{ height: 750, width: '100%' }}>
                    <DataGrid
                        rowHeight={80}
                        rows={receivedAppointments}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                    />
                </div>
            </DashboardLayout>
        </>
    )
}
