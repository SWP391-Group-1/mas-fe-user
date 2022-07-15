import { appointmentApi } from 'apis/appointmentApis'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import SuiInput from 'components/SuiInput'
import { Button, Grid, IconButton, Menu, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import SuiButton from 'components/SuiButton'

export default function AppointmentDataGrid() {
    const [sendAppointment, setSendAppointment] = useState([])
    const [status, setStatus] = useState({
        title: 'All status',
        isAllStatusVal: true,
        isApproveStatus: '',
    })
    const statuses = [
        { title: 'All status', isAllStatusVal: true, isApproveStatus: '' },
        {
            title: 'Not approved yet',
            isAllStatusVal: false,
            isApproveStatus: '',
        },
        { title: 'Approved', isAllStatusVal: false, isApproveStatus: true },
        { title: 'Denied', isAllStatusVal: false, isApproveStatus: false },
    ]

    const [historyStatus, setHistoryStatus] = useState({
        title: 'All history status',
        isPassedVal: '',
    })
    const historyStatuses = [
        { title: 'All history status', isPassedVal: '' },
        { title: 'Upcoming', isPassedVal: false },
        { title: 'Passed', isPassedVal: true },
    ]

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [anchorEl2, setAnchorEl2] = useState(null)
    const open2 = Boolean(anchorEl2)
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

    const fetchDataWithFilter = (allStatus, approveStatus, passStatus) => {
        appointmentApi
            .loadSendAppointmentFilter(allStatus, approveStatus, passStatus)
            .then((res) => {
                setSendAppointment(res.data.content)
            })
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClose2 = () => {
        setAnchorEl2(null)
    }

    const onChoose = (item) => {
        setStatus(item)
        setAnchorEl(null)
        fetchDataWithFilter(
            item.isAllStatusVal,
            item.isApproveStatus,
            historyStatus.isPassedVal
        )
    }

    const onChoose2 = (item) => {
        setHistoryStatus(item)
        setAnchorEl2(null)
        fetchDataWithFilter(
            status.isAllStatusVal,
            status.isApproveStatus,
            item.isPassedVal
        )
    }

    const renderViewButton = (params) => {
        return (
            <strong>
                <SuiButton
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => {
                        navigate('/appointment/appointmentdetails', {
                            state: { appointmentId: params.row.id },
                        })
                    }}
                    // onClick= {()=> {console.log(params.row.id)}}
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
            headerName: 'Mentor Name',
            width: 200,
            valueGetter: (params) => {
                return params.row.mentor.name
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
            field: 'rate',
            headerName: 'Rate',
            width: 100,
            valueGetter: (params) =>
                params.row.mentor.rate +
                '(' +
                params.row.mentor.numOfRate +
                ')',
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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={2}>
                        <SuiBox
                            mb={2}
                            sx={{
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <SuiTypography variant="h6" mr={2}>
                                Status:
                            </SuiTypography>
                            <SuiInput
                                disable
                                icon={{
                                    component: 'arrow_drop_down',
                                    direction: 'right',
                                }}
                                value={status.title}
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            />

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
                                            key={item.title}
                                            onClick={() => onChoose(item)}
                                        >
                                            {item.title}
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        </SuiBox>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <SuiBox
                            mb={2}
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <SuiTypography variant="h6" mr={2}>
                                History status:
                            </SuiTypography>
                            <SuiInput
                                disable
                                icon={{
                                    component: 'arrow_drop_down',
                                    direction: 'right',
                                }}
                                value={historyStatus.title}
                                onClick={(e) => setAnchorEl2(e.currentTarget)}
                            />

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
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
                                {historyStatuses?.map((item) => {
                                    return (
                                        <MenuItem
                                            value={10}
                                            key={item.title}
                                            onClick={() => onChoose2(item)}
                                        >
                                            {item.title}
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        </SuiBox>
                    </Grid>
                </Grid>

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
