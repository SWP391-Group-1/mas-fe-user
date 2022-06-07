import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { majorApi } from 'apis/majorApis'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import EditMajorModal from 'components/EditMajorModal'

const MajorDataGrid = () => {
    const { id } = useParams()
    const [majors, setMajors] = useState([])
    const [isChange, setIsChange] = useState(null)
    const [editingMajor, setEditingMajor] = useState(null);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const handleUpdateMajorClick = (major) => {
        setEditingMajor(major);
        setIsOpenEditModal(true);
    }

    const handleUpdateMajor = (major) => {
        // TODO: Are you sure to bla bla bla
        // TODO: Call update API
        console.log("Update Major", major);
        setIsOpenEditModal(false);
    }

    const handleCancelUpdateMajor = (major) => {
        // TODO: Are you sure meow moew
        setIsOpenEditModal(false)
    }

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

    const renderEditButton = (params) => {
        const major = params.row;
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
    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rowHeight={80}
                rows={majors}
                columns={columns}
                pageSize={10}
            />
            <EditMajorModal 
                major={editingMajor} 
                isOpen={isOpenEditModal}
                onSubmit={handleUpdateMajor}
                onCancel={handleCancelUpdateMajor}
            />
        </div>
    )
}

export default MajorDataGrid
