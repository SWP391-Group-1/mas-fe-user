import { appointmentApi } from 'apis/appointmentApis'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import SuiInput from 'components/SuiInput'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

export default function AppointmentDataGrid() {
    const [sendAppointment, setSendAppointment] = useState([])
    const [status, setStatus] = useState('All status')
    const statuses = ['All status', 'Not approved yet', "Approved", "Denied"]
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    let navigate = useNavigate()
    
    const fetchData = () => {
        appointmentApi.loadSendAppointment().then((res) => {
            setSendAppointment(res.data.content)
        })
    }

    const fetchDataWithFilter1 = () => {
        appointmentApi.loadSendAppointmentNotApprovedYet().then((res) => {
            setSendAppointment(res.data.content)
        })
    }

    const fetchDataWithFilter2 = (status) => {
        appointmentApi.loadSendAppointmentWithFilter(status).then((res) => {
            setSendAppointment(res.data.content)
        })
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onChoose = (item) => {
        setStatus(item)
        setAnchorEl(null)
        if (item != null) {
            if(item=='All status') {
                fetchData()
            }

            if(item=='Not approved yet') {
                fetchDataWithFilter1()
            }

            if(item=='Approved') {
                fetchDataWithFilter2(true)
            }
            if(item=='Denied') {
                fetchDataWithFilter2(false)
            }
        }
    }

    const renderViewButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {navigate('/appointment/appointmentdetails', {state: {appointmentId: params.row.id}})}}
                >
                    View Detail
                </Button>
            </strong>
        )
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

                <SuiBox
                mb={2}
                sx={{
                    display: 'flex',
                    width: '20%',
                }}
            >
                <SuiInput
                    disable
                    placeholder="Major"
                    icon={{
                        component: 'arrow_drop_down',
                        direction: 'right',
                    }}
                    value={status}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                />

                <IconButton
                    color="dark"
                    component="span"
                    onClick={() => {
                        setStatus('All status')
                        fetchData()
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 50 * 4.5,
                            width: '12%',
                        },
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {statuses?.map((item) => {
                        return (
                            <MenuItem
                                value={10}
                                key={item}
                                onClick={() => onChoose(item)}
                                
                            >
                                {item}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </SuiBox>
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
