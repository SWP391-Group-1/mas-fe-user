/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { UserApi } from 'apis/userApis'
import { Button } from '@mui/material'

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
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: 'isActive',
        headerName: 'Active',
        width: 200,
    },
    {
        field: 'rate',
        headerName: 'Rate',
        width: 150,
    },
    {
        field: 'isMentor',
        headerName: 'Mentor Status',
        width: 200,
    },
    {
        field: 'edit',
        headerName: 'Edit',
        width: 200,
        renderCell: renderEditButton,
        disableClickEventBubbling: true,
    },
    {
        field: 'delete',
        headerName: 'Ban',
        width: 200,
        renderCell: renderDeleteButton,
        disableClickEventBubbling: true,
    },
]

const AccountDataGrid = () => {
    const [accounts, setAccounts] = useState([])
    const [isChange, setIsChange] = useState(null)

    const fetchData = () => {
        UserApi.getAllUser().then((res) => {
            setAccounts(res.data.content)
            console.log('Accounts: ', accounts)
        })
    }

    const deleteAccount = () => {
        setIsChange()
    }

    useEffect(() => {
        fetchData()
    }, [isChange])

    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rowHeight={80}
                rows={accounts}
                columns={columns}
                pageSize={10}
            />
        </div>
    )
}

export default AccountDataGrid