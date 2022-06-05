import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { majorApi } from 'apis/majorApis'
import { Button } from '@mui/material'

const renderEditButton = (params) => {
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
const renderDeleteButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="error"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {}}
            >
                Delete
            </Button>
        </strong>
    )
}
const columns = [
    { field: 'id', headerName: 'No', width: 350 },
    { field: 'title', headerName: 'Major Code', width: 200 },
    { field: 'description', headerName: 'Name', width: 300 },
    {
        field: 'edit',
        headerName: 'Edit',
        width: 200,
        renderCell: renderEditButton,
        disableClickEventBubbling: true,
    },
    {
        field: 'delete',
        headerName: 'Delete',
        width: 200,
        renderCell: renderDeleteButton,
        disableClickEventBubbling: true,
    },
]

const MajorDataGrid = () => {
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
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rowHeight={80}
                rows={majors}
                columns={columns}
                pageSize={10}
            />
        </div>
    )
}

export default MajorDataGrid
