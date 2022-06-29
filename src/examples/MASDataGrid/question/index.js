import { Button, Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { questionApi } from 'apis/questionApis'
import QuestionModal from 'components/QuestionModal'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import React, { useEffect, useState } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'

export default function QuestionDataGrid({ appointmentID }) {
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState([])
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const fetchData = () => {
        questionApi.loadQuestionsOfAppointment(appointmentID).then((res) => {
            setQuestions(res.data.content)
        })
    }

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    const handleSubmitQuestion = () => {
        setIsOpenEditModal(false)
        fetchData()
    }

    const handleOpenModel = (question) => {
        setQuestion(question)
        setIsOpenEditModal(true)
    }

    const handleAddQuestionClick = () => {
        setQuestion(null)
        setIsOpenEditModal(true)
    }

    const handleCancelOpenEditModal = (major) => {
        setIsOpenEditModal(false)
    }

    const renderViewButton = (params) => {
        const question = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleOpenModel(question)}
                >
                    View
                </Button>
            </strong>
        )
    }

    const columns = [
        // {
        //     field: 'no',
        //     headerName: 'No.',
        //     width: 250,
        //     valueGetter: (params) => {
        //         var i = questions.indexOf(params)
        //         return i
        //     },
        // },
        {
            field: 'questionContent',
            headerName: 'Question content',
            width: 300,
        },
        {
            field: 'answer',
            headerName: 'Answer Status',
            width: 300,
            valueGetter: (params) => {
                if (params.answer == null || params.answer.length == 0) {
                    return 'Not answer yet'
                } else {
                    return 'Answered'
                }
            },
        },
        {
            field: 'edit',
            headerName: 'View Detail',
            width: 200,
            renderCell: renderViewButton,
            disableClickEventBubbling: true,
        },
    ]

    const GridToolbar = () => {
        return (
            <>
                <SuiBox sx={{ float: 'right' }} mr={1} mt={1}>
                    <SuiButton
                        variant="contained"
                        color="dark"
                        size="small"
                        onClick={handleAddQuestionClick}
                    >
                        Add Question
                    </SuiButton>
                </SuiBox>
            </>
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rowHeight={50}
                rows={questions}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                components={{
                    Toolbar: GridToolbar,
                }}
            />
            <QuestionModal
                appointmentId={appointmentID}
                question={question}
                isOpen={isOpenEditModal}
                onSubmit={handleSubmitQuestion}
                onCancel={handleCancelOpenEditModal}
            />
        </div>
    )
}
