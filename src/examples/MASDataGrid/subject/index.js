/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { subjectApi } from 'apis/subjectApis'
import EditSubjectModal from 'components/EditSubjectModal'
import { COUNTER_STYLE } from 'stylis'

const SubjectDataGrid = () => {
    const [subjects, setSubjects] = useState([])
    const [editingSubject, setEditingSubject] = useState(null)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)

    const handleSubmitSubject = (subject, isCreateMode) => {
        // TODO: Validate data
        if (isCreateMode) {
            subjectApi.createSubject(subject)?.then((res) => {
                fetchData()
                alert('The subject has been created!') // TODO
            })
        } else {
            subjectApi.updateSubject(subject.id, subject)?.then((res) => {
                fetchData()
                alert('The subject has been updated!') // TODO
            })
        }
        setIsOpenEditModal(false)
    }
    const handleUpdateSubjectClick = (subject) => {
        setEditingSubject(subject)
        setIsOpenEditModal(true)
    }
    const handleCreateSubjectClick = (subject) => {
        setEditingSubject(null)
        setIsOpenEditModal(true)
    }

    const handleDelete = (id) => {
        subjectApi.deleteSubject(id).then((res) => {
            fetchData()
        })
    }

    const fetchData = () => {
        subjectApi.getAllSubject().then((res) => {
            setSubjects(res.data.content)
            console.log(res.data.content)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderEditButton = (params) => {
        const subject = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleUpdateSubjectClick(subject)}
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

    const GridToolbar = () => {
        return (
            <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleCreateSubjectClick}
            >
                Add
            </Button>
        )
    }

    const columns = [
        { field: 'code', headerName: 'Subject Code', width: 200 },
        { field: 'title', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 350 },
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

    const handleCancelUpdateSubject = (subject) => {
        setIsOpenEditModal(false)
    }

    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rowHeight={80}
                rows={subjects}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                components={{
                    Toolbar: GridToolbar,
                }}
            />
            <EditSubjectModal
                subject={editingSubject}
                isOpen={isOpenEditModal}
                onSubmit={handleSubmitSubject}
                onCancel={handleCancelUpdateSubject}
            />
        </div>
    )
}

export default SubjectDataGrid
