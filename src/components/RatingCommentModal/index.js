import { Box, Dialog, DialogContent, DialogTitle, Rating } from '@mui/material'
import { ratingApi } from 'apis/ratingApis'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

export default function RatingCommentModal({
    appointment,
    isOpen,
    onSubmit,
    onCancel,
}) {
    useEffect(() => {
        if (isOpen) {
            fetchData()
        }
    }, [isOpen])

    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }
    const [rating, setRating] = useState()
    const [ratingScore, setRatingScore] = useState()
    const [tempScore, setTempScore] = useState(0)
    const [comment, setComment] = useState('')
    const [isError, setIsError] = useState(false)

    const fetchData = () => {
        ratingApi
            .loadRatingOfAnAppointment(appointment.id)
            .then((res) => {
                setRating(res.data.content)
                setRatingScore(res.data.content.vote)
                setTempScore(res.data.content.vote)
             
            })
            .catch((err) => {
                setRatingScore(null)
                setRating(null)
            })
    }

    const handleSaveStatus = () => {
        if (tempScore === 0 || comment?.length === 0 || comment?.trim() == "") {
            setIsError(true)
        } else {
            setIsError(false)
            ratingApi
                .createNewRating(appointment.id, {
                    vote: tempScore,
                    comment: comment?.trim(),
                })
                .then((res) => {
                    handleClickVariant(
                        'Rate this mentor successfully!',
                        'success'
                    )
                    onSubmit?.()
                })
        }
    }

    const handleCancel = () => {
        setIsError(false)
        onCancel?.()
    }

    return (
        <>
            <Dialog open={isOpen} maxWidth="xl">
                <Box width="600px">
                    <DialogTitle>Rate a mentor</DialogTitle>
                    <DialogContent>
                        <SuiBox>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                            >
                                Name
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            disabled
                            autoFocus
                            id="nameTextField"
                            type="text"
                            required={true}
                            value={appointment?.mentor?.name}
                            inputProps={{ maxLength: 100 }}
                        />
                        <SuiBox>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                            >
                                Rating score
                            </SuiTypography>
                        </SuiBox>

                        <Rating
                            disabled={ratingScore == null ? false : true}
                            name="simple-controlled"
                            value={tempScore * 1}
                            onChange={(event, newValue) => {
                                setTempScore(newValue)
                            }}
                        />
                        <SuiBox>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                color="error"
                            >
                                {isError == true && (tempScore == 0 || tempScore == null)
                                    ? 'Rating score must be higher or equals to 1!'
                                    : null}
                            </SuiTypography>
                        </SuiBox>

                        <SuiBox>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                isRequired
                            >
                                Comment
                            </SuiTypography>
                        </SuiBox>

                        <SuiInput
                            id="descriptionTextField"
                            type="text"
                            rows={5}
                            multiline
                            value={rating?.comment}
                            disabled={rating?.comment == null ? false : true}
                            onChange={(e) => setComment(e.target.value)}
                            name="description"
                        />

                        <SuiBox>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                color="error"
                            >
                                {isError == true &&
                                (comment == '' || comment == null)
                                    ? 'Comment is required!!'
                                    : null}
                            </SuiTypography>
                        </SuiBox>

                        <SuiBox mt={2} display="flex" justifyContent="flex-end">
                            {!ratingScore && (
                                <SuiButton
                                    sx={{ marginRight: 2 }}
                                    color="info"
                                    onClick={() => handleSaveStatus()}
                                >
                                    Save
                                </SuiButton>
                            )}
                            <SuiButton onClick={() => handleCancel()}>
                                Cancel
                            </SuiButton>
                        </SuiBox>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    )
}
