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

export default function QuestionModal({
    appointmentId,
    question,
    isOpen,
    onSubmit,
    onCancel,
}) {
    const [newQuestion, setNewQuestion, patchQuestion] = usePatch()
    const [isError, setIsError] = useState(false)
    const isCreateMode = React.useMemo(() => !question, [question])
    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    React.useEffect(() => {
        if (isOpen) {
            setNewQuestion(question)
        }
    }, [question, isOpen])

    const handleCancelClick = () => {
        setIsError(false)
        onCancel?.()
    }

    const handleCreateQuestion = () => {
        if (
            newQuestion?.questionContent == null ||
            newQuestion?.questionContent.length == ''
        ) {
            setIsError(true)
            console.log('aaaaaaaaaaaaaaaa')
            handleClickVariant('Content is required!', 'error')
        } else {
            if (!isError) {
                questionApi
                    .createNewQuestion({
                        appointmentId: appointmentId,
                        questionContent: newQuestion?.questionContent,
                    })
                    ?.then((res) => {
                        handleClickVariant(
                            'Create question successfully!',
                            'success'
                        )
                        onSubmit?.() // TODO
                    })
                    .catch((error) => {
                        console.log(error)
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
                {isCreateMode ? (
                    <DialogTitle>Add Question</DialogTitle>
                ) : (
                    <DialogTitle>Question Details</DialogTitle>
                )}
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
                            disabled={isCreateMode == false ? true : false}
                            autoFocus
                            rows={5}
                            multiline
                            id="contentTextField"
                            type="text"
                            required={true}
                            value={newQuestion?.questionContent}
                            inputProps={{ maxLength: 500 }}
                            onChange={(e) =>
                                patchQuestion({
                                    questionContent: e?.target?.value ?? '',
                                })
                            }
                        />
                        {isCreateMode == false && (
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Answer content
                                </SuiTypography>
                                <SuiBox>
                                    {newQuestion?.answer != null ? (
                                        <SuiInput
                                            disabled={true}
                                            autoFocus
                                            rows={5}
                                            multiline
                                            id="answerTextField"
                                            type="text"
                                            required={true}
                                            value={newQuestion?.answer}
                                            inputProps={{ maxLength: 500 }}
                                        />
                                    ) : (
                                        <SuiTypography
                                            component="label"
                                            variant="info"
                                            fontWeight="normal"
                                        >
                                            Not answer yet
                                        </SuiTypography>
                                    )}
                                </SuiBox>
                            </SuiBox>
                        )}
                    </>
                </DialogContent>
                <DialogActions>
                    {isCreateMode && (
                        <Button onClick={handleCreateQuestion}>Create</Button>
                    )}
                    <Button onClick={handleCancelClick}>Close</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
