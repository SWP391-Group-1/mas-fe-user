import { ratingApi } from 'apis/ratingApis'
import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import Rating from '@mui/material/Rating'
import React, { useState } from 'react'

export default function RatingCommentItem({ rating }) {
    return (
        <>
            <SuiBox>
                <SuiTypography variant="button">
                    {rating?.creatorName} ({rating?.creatorMail})
                </SuiTypography>
                <SuiBox>
                    <Rating value={rating?.vote}  size="small" readOnly />
                </SuiBox>

                <SuiInput
                    mb={1}
                    sx={{ style: 'border:none', mb: 1 }}
                    disable
                    rows={2}
                    multiline
                    value={rating?.comment}
                />
            </SuiBox>
        </>
    )
}
