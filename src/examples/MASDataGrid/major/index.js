import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { majorApi } from 'apis/majorApis'
import { Button } from '@mui/material'
import EditMajorModal from 'components/EditMajorModal'

const MajorDataGrid = () => {
    const [majors, setMajors] = useState([])
    const [editingMajor, setEditingMajor] = useState(null)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)

    const handleUpdateMajorClick = (major) => {
        setEditingMajor(major)
        setIsOpenEditModal(true)
    }
    const handleCreateMajorClick = (major) => {
        setEditingMajor(null)
        setIsOpenEditModal(true)
    }

    const handleSubmitMajor = (major, isCreateMode) => {
        // TODO: Validate data
        if (isCreateMode) {
            majorApi.createMajor(major)?.then((res) => {
                fetchData()
                alert('The major has been created!') // TODO
            })
        }
        else {
            majorApi.updateMajor(major.id, major)?.then((res) => {
                fetchData()
                alert('The major has been updated!') // TODO
            })
        }
        setIsOpenEditModal(false)
    }

    const handleCancelUpdateMajor = (major) => {
        // TODO: Are you sure meow moew
        setIsOpenEditModal(false)
    }

    const fetchData = () => {
        majorApi.getAllMajor().then((res) => {
            setMajors(res.data.content)
        })
    }

    const handleDelete = (id) => {
        majorApi.deleteMajor(id).then((res) => {
            fetchData()
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderEditButton = (params) => {
        const major = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleUpdateMajorClick(major)}
                >
                    Edit
                </Button>
            </strong>
        )
    }
    
    const renderDeleteButton = (params) => {
        const major = params.row

        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        handleDelete(major?.id)
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
        { field: 'description', headerName: 'Description', width: 300 },
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

    const GridToolbar = () => {
        return (
            <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleCreateMajorClick}
            >
                Add
            </Button>
        )
    }

    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rowHeight={80}
                rows={majors}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                components={{
                    Toolbar: GridToolbar,
                }}
            />
            <EditMajorModal
                major={editingMajor}
                isOpen={isOpenEditModal}
                onSubmit={handleSubmitMajor}
                onCancel={handleCancelUpdateMajor}
            />
        </div>
    )
}

export default MajorDataGrid
