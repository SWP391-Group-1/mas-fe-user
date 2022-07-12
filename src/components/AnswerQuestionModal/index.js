import SuiTypography from 'components/SuiTypography'
import SuiBox from 'components/SuiBox'
import React, { useState } from 'react'
import SuiInput from 'components/SuiInput'
import { useSnackbar } from 'notistack'
import { usePatch } from 'hooks/usePatch'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { Box } from '@mui/system'
import { questionApi } from 'apis/questionApis'
import { appointmentApi } from 'apis/appointmentApis'

export default function AnswerQuestionModal({
    question,
    isOpen,
    onSubmit,
    onCancel,
}) {
    const [isError, setIsError] = useState(false)
    const [answer, setAnswer] = useState('')
    const [questionDetail, setQuestionDetail] = useState()
    const [appointment, setAppointment] = useState()
    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    React.useEffect(() => {
        if (isOpen) {
            fetchData()
        }
    }, [question, isOpen])

    const handleCancelClick = () => {
        setIsError(false)
        setAnswer('')
        onCancel?.()
    }

    const fetchData = () => {
        questionApi.getQuestionById(question.id).then((res) => {
            setQuestionDetail(res.data.content)
            setAnswer(res.data.content.answer)
            appointmentApi
                .loadReceivedAppointmentDetails(res.data.content.appointmentId)
                .then((r) => {
                    setAppointment(r.data.content)
                })
        })
    }

    const handleAnswerQuestion = () => {
        if (answer == null || answer == '') {
            setIsError(true)
            handleClickVariant('Answer is required!', 'error')
        } else {
            if (!isError) {
                console.log(question.id)
                console.log(answer)
                questionApi
                    .answerQuestion(question.id, { answer: answer })
                    ?.then((res) => {
                        handleClickVariant(
                            'Answer question successfully!',
                            'success'
                        )
                        onSubmit?.() // TODO
                    })
                    .catch((err) => {
                        handleClickVariant(
                            err.response.data?.error?.message,
                            'error'
                        )
                    })
                setIsError(false)
            } else {
                console.log('error đó')
            }
        }
    }

    return (
        <Dialog open={isOpen} maxWidth="xl">
            <Box width="600px">
                <DialogTitle>Question Details</DialogTitle>
                <DialogContent>
                    <>
                        <SuiBox>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                            >
                                Question content
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            disabled={true}
                            rows={5}
                            multiline
                            id="contentTextField"
                            type="text"
                            required={true}
                            value={questionDetail?.questionContent}
                            inputProps={{ maxLength: 500 }}
                        />

                        <SuiBox>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                            >
                                Answer content
                            </SuiTypography>
                            <SuiBox>
                                <SuiInput
                                    disabled={
                                        appointment?.isPassed == false
                                            ? false
                                            : true
                                    }
                                    autoFocus
                                    rows={5}
                                    multiline
                                    id="answerTextField"
                                    type="text"
                                    required={true}
                                    value={answer}
                                    inputProps={{ maxLength: 500 }}
                                    onChange={(e) =>
                                        setAnswer(e?.target?.value)
                                    }
                                />
                            </SuiBox>
                        </SuiBox>
                    </>
                </DialogContent>
                <DialogActions>
                    {appointment?.isPassed != true && (
                        <Button onClick={handleAnswerQuestion}>Save</Button>
                    )}
                    <Button onClick={handleCancelClick}>Close</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
