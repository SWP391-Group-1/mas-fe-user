/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, IconButton } from '@mui/material'
import { mentorApi } from 'apis/mentorApis'
import { useNavigate } from 'react-router-dom'
import SuiInput from 'components/SuiInput'
import SearchIcon from '@mui/icons-material/Search'
import SuiBox from 'components/SuiBox'

const MentorDataGrid = () => {
    const [isChange, setIsChange] = useState(null)
    const [search, setSearch] = useState(null)
    const [subject, setSubject] = useState({ code: '' })
    const [mentors, setMentors] = useState([])
    let navigate = useNavigate()

    const fetchData = (search) => {
        mentorApi.getAllMentors(search, subject.id).then((res) => {
            setMentors(res.data.content)
        })
    }

    useEffect(() => {
        fetchData()
    }, [isChange])

    const renderViewButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {navigate('/mentor/details', {state: {mentorID: params.row.id}})}}
                >
                    View Detail
                </Button>
            </strong>
        )
    }
    const renderDeleteButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {}}
                >
                    Delete
                </Button>
            </strong>
        )
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 350 },
        {
            field: 'rate',
            headerName: 'Rate',
            width: 200,
            valueGetter: (params) =>
                params.row.rate + '(' + params.row.numOfRate + ')',
        },
        {
            field: 'numOfAppointment',
            headerName: 'Appointments',
            width: 200,
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
        <SuiBox mb={2} sx={{ display: 'flex', width: '30%' }}>
                <SuiInput
                    id="searchTextField"
                    type="text"
                    value={search}
                    inputProps={{ maxLength: 100 }}
                    placeholder="Search here..."
                    sx={{ width: '150px' }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <IconButton
                    color="dark"
                    component="span"
                    onClick={() => fetchData(search)}
                >
                    <SearchIcon />
                </IconButton>
            </SuiBox>
        
            <div style={{ height: 750, width: '100%' }}>
            <DataGrid
                rowHeight={80}
                rows={mentors}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
        </div>
        </>
       
    )
}

export default MentorDataGrid
