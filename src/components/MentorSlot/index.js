import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import React, { useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
export default function MentorSlot({ slot }) {
    const [slotDetail, setSlotDetail] = useState()
    let navigate = useNavigate()

    React.useEffect(() => {
        setSlotDetail(slot)
        console.log(slot)
    }, [slot]) 


    return (
        <>
            <SuiBox mb={2} onClick= {() => {navigate('/mentor/details/slotdetails', {state: {slotID: slotDetail?.id}})}}>
                <SuiBox>
                    <SuiTypography variant="button" fontWeight="bold">
                        {moment(slotDetail?.startTime).format('dddd')},{' '}
                        {moment(slotDetail?.startTime).format('LL')}
                    </SuiTypography>
                </SuiBox>
                <SuiBox>
                    <SuiTypography variant="button" fontWeight="regular">
                        {moment(slotDetail?.startTime).format('HH:mm')} - {' '}
                        {moment(slotDetail?.finishTime).format('HH:mm')}
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
        </>
    )
}
