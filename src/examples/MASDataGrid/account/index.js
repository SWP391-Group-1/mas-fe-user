/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Autocomplete, Button, IconButton, TextField } from '@mui/material'
import { mentorApi } from 'apis/mentorApis'
import { useNavigate } from 'react-router-dom'
import SuiInput from 'components/SuiInput'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import SuiBox from 'components/SuiBox'
import { subjectApi } from 'apis/subjectApis'
import { Box } from '@mui/system'

const MentorDataGrid = () => {
    const [isChange, setIsChange] = useState(null)
    const [search, setSearch] = useState(null)
    const [subject, setSubject] = useState({ code: 'Search by subject' })
    const [subjects, setSubjects] = useState([])
    const [mentors, setMentors] = useState([])
    let navigate = useNavigate()

    const fetchData = () => {
        mentorApi.getAllMentors(search, subject?.id).then((res) => {
            
            setMentors(res.data.content)
        })

        subjectApi.getAllSubject().then((res) => {
            setSubjects(res.data.content)
        })
    }

    useEffect(() => {
        fetchData()
    }, [isChange, subject])

    const renderViewButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        navigate('/mentor/details', {
                            state: { mentorID: params.row.id },
                        })
                    }}
                >
                    View Detail
                </Button>
            </strong>
        )
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
        },
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

            <SuiBox mb={2} sx={{ display: 'flex', width: '30%' }}  >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    isOptionEqualToValue={(option, value) =>
                        option.id == value.id
                    }
                    options={subjects}
                    sx={{ width: 550 }}
                    renderInput={(params) =><TextField {...params} />}
                    onChange={(e, value) => {
                        setSubject(value)
                    }}
                    value={subject}
                    getOptionLabel={(option) => option.code}
                    renderOption={(props, option) => (
                        <Box component="li" {...props} key={option.id}>
                            {option.code} - {option.title}
                        </Box>
                    )}
                    disableClearable={true}
                    //onClose={() => setSubject({ code: 'Search by subject' })}
                />
                <IconButton
                    color="dark"
                    component="span"
                    onClick={() => setSubject({ code: 'Search by subject' })}
                >
                    <CloseIcon />
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
