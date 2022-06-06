import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { majorApi } from 'apis/majorApis'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'

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
                onClick={() => {
                    handleDelete()
                }}
            >
                Delete
            </Button>
        </strong>
    )
}
const columns = [
    // { field: 'id', headerName: 'No', width: 350 },
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
    const { id } = useParams()
    const [majors, setMajors] = useState([])
    const [isChange, setIsChange] = useState(null)

    const fetchData = () => {
        majorApi.getAllMajor().then((res) => {
            setMajors(res.data.content)
            console.log('Majors: ', majors)
        })
    }

    const deleteMajor = () => {
        setIsChange()
    }

    const handleDelete = () => {
        majorApi.deleteMajor(id).then((res) => {
            deleteMajor()
        })
    }

    useEffect(() => {
        fetchData()
    }, [isChange])

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
