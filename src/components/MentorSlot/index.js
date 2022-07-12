import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import React, { useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Button, Divider } from '@mui/material'
export default function MentorSlot({ slot }) {
    const [slotDetail, setSlotDetail] = useState()
    let navigate = useNavigate()

    React.useEffect(() => {
        setSlotDetail(slot)
    }, [slot])

    return (
        <>
            <SuiBox mb={2}>
                <SuiBox>
                    <SuiTypography variant="button" fontWeight="bold">
                        {'Slot for subject: '}
                        {slotDetail?.slotSubjects[0].subject.code}
                    </SuiTypography>
                </SuiBox>
                <SuiBox>
                    <SuiTypography variant="button" fontWeight="regular">
                        {'At '}
                        {moment(slotDetail?.startTime + 'Z').format(
                            'dddd'
                        )}, {moment(slotDetail?.startTime + 'Z').format('LL')}
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular">
                        {' '}
                        {moment(slotDetail?.startTime + 'Z').format(
                            'HH:mm'
                        )} -{' '}
                        {moment(slotDetail?.finishTime + 'Z').format('HH:mm')}
                    </SuiTypography>
                </SuiBox>
                <Button
                    style={{
                        backgroundColor: 'gray',
                        color: 'black',
                        marginTop: 5,
                    }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        navigate('/mentor/details/slotdetails', {
                            state: { slotID: slotDetail?.id },
                        })
                    }}
                >
                    View
                </Button>
            </SuiBox>
            <Divider />
        </>
    )
}
