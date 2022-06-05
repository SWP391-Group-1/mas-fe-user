import React, { Component, useState, useEffect } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import { majorApi } from 'apis/majorApis'
import { Button } from '@mui/material'

const renderDetailsButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="error"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {}}
            >
                Edit
            </Button>
        </strong>
    )
}

const columns = [
    { field: 'id', headerName: 'No', width: 200 },
    { field: 'title', headerName: 'Major Code', width: 200 },
    { field: 'description', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true,
    },
]

const MASDataGrid = () => {
    const [majors, setMajors] = useState([])

    const fetchData = () => {
        majorApi.getAllMajor().then((res) => {
            setMajors(res.data.content)
            console.log('Majors: ', majors)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div style={{ height: 450, width: '80%' }}>
            <DataGrid
                rowHeight={80}
                rows={majors}
                columns={columns}
                pageSize={10}
            />
        </div>
    )
}

export default MASDataGrid
