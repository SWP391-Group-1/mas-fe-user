import { Button, Card, Rating } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { questionApi } from 'apis/questionApis'
import QuestionModal from 'components/QuestionModal'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import React, { useEffect, useState } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { appointmentApi } from 'apis/appointmentApis'

export default function QuestionDataGrid({ appointmentID }) {
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState([])
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const [appointment, setAppointment] = useState(null)

    const fetchData = () => {
        questionApi.loadQuestionsOfAppointment(appointmentID).then((res) => {
            setQuestions(res.data.content)
        })

        appointmentApi.loadSendAppointmentDetails(appointmentID).then((res) => {
            setAppointment(res.data.content)
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
                <SuiButton
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleOpenModel(question)}
                >
                    View
                </SuiButton>
            </strong>
        )
    }

    const columns = [
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
                if (
                    params.row.answer == null ||
                    params.row.answer.length == 0
                ) {
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
                {!appointment?.isPassed == true && (
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
                )}
                {/* <SuiBox sx={{ float: 'right' }} mr={1} mt={1}>
                        <SuiButton
                            variant="contained"
                            color="dark"
                            size="small"
                            onClick={handleAddQuestionClick}
                        >
                            Add Question
                        </SuiButton>
                    </SuiBox> */}
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
