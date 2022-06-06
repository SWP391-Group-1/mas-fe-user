/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { subjectApi } from 'apis/subjectApis'

const renderEditButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="error"
                size="small"
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
                onClick={() => {}}
            >
                Delete
            </Button>
        </strong>
    )
}

const columns = [
    { field: 'title', headerName: 'Subject Code', width: 200 },
    { field: 'description', headerName: 'Name', width: 350 },
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

const SubjectDataGrid = () => {
    const [subjects, setSubjects] = useState([])

    const fetchData = () => {
        subjectApi.getAllSubject().then((res) => {
            setSubjects(res.data.content)
            console.log('Majors: ', subjects)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rowHeight={80}
                rows={subjects}
                columns={columns}
                pageSize={10}
            />
        </div>
    )
}

export default SubjectDataGrid
