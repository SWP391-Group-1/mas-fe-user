import SuiTypography from 'components/SuiTypography'
import SuiBox from 'components/SuiBox'
import React from 'react'
import SuiInput from 'components/SuiInput'

export default function QuestionModal({ title }) {
    return (
        <SuiBox sx={{width: "40%"}}>
            <SuiTypography
                component="label"
                variant="button"
                fontWeight="bold"
                width="10%"
                alignItems="center"
            >
                {title}
            </SuiTypography>
            <SuiInput
                        id="questionTextField"
                        type="text"
                        rows={5}
                        multiline
                        onChange={() => {

                        }
                        }
                        name="question"
                    />
        </SuiBox>
    )
}
