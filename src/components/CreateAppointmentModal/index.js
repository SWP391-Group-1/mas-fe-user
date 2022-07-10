import { Card, Grid, IconButton, Menu, MenuItem, Paper } from '@mui/material'
import { mentorApi } from 'apis/mentorApis'
import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import SuiButton from 'components/SuiButton'
import QuestionModal from 'components/QuestionModal'
import { appointmentApi } from 'apis/appointmentApis'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import SubjectInfoCard from 'examples/Cards/InfoCards/SubjectInfoCard'

export default function CreateAppointmentModal() {
    const location = useLocation()
    const slotId = location.state?.slotID || null
    const [slotDetail, setSlotDetail] = useState()
    // const [anchorEl, setAnchorEl] = useState(null)
    // const [subjects, setSubjects] = useState([])
    // const [subject, setSubject] = useState({
    //     subject: { code: 'Select subject' },
    // })
    const [problem, setProblem] = useState('')
    let navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    // const [question, setQuestion] = useState({
    //     appointmentId: 'string',
    //     creatorId: 'string',
    //     questionContent: 'string',
    // })

    //const open = Boolean(anchorEl)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        console.log(slotId)
        mentorApi.getMentorSlotById(slotId).then((res) => {
            setSlotDetail(res.data.content)
        })
    }

    const handleSendAppointment = () => {
        console.log(slotId)
        //console.log(subject.id)
        console.log(problem)
        if (
            slotId == null ||
            slotId == '' ||
            problem == null ||
            problem == ''
        ) {
            handleClickVariant('Brief problem are required!', 'error')
        } else {
            appointmentApi
                .createAppointment({
                    slotId: slotId,
                    briefProblem: problem
                })
                .then((res) => {
                    handleClickVariant(
                        'Create appointment successfully!!!',
                        'success'
                    )
                    navigate('/appointment')
                })
                .catch((err) => {
                    console.log(err.response.data.error.message)
                    handleClickVariant(err.response.data.error.message, 'error')
                })
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox mt={7}>
                <Card
                    sx={{
                        backdropFilter: `saturate(200%) blur(30px)`,
                        backgroundColor: ({
                            functions: { rgba },
                            palette: { white },
                        }) => rgba(white.main, 0.8),
                        boxShadow: ({ boxShadows: { navbarBoxShadow } }) =>
                            navbarBoxShadow,
                        position: 'relative',
                        mt: -8,
                        py: 2,
                        px: 2,
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    width="10%"
                                    alignItems="center"
                                >
                                    Fullname
                                </SuiTypography>
                            </SuiBox>

                            <SuiBox mb={2}>
                                <SuiInput
                                    disabled
                                    type="text"
                                    value={slotDetail?.mentor.name}
                                    inputProps={{ maxLength: 100 }}
                                />
                            </SuiBox>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    width="10%"
                                    alignItems="center"
                                >
                                    Start Time
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox>
                                <SuiInput
                                    disabled
                                    type="text"
                                    value={moment(slotDetail?.startTime).format(
                                        'LLLL'
                                    )}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                            <SuiBox mb={1}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    width="10%"
                                    alignItems="center"
                                >
                                    End Time
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={0.5}>
                                <SuiInput
                                    disabled
                                    type="text"
                                    value={moment(
                                        slotDetail?.finishTime
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                            <SuiBox mb={2}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Brief Problem
                                </SuiTypography>
                                <SuiInput
                                    autoFocus
                                    id="problemTextField"
                                    type="text"
                                    rows={5}
                                    multiline
                                    onChange={(e) => {
                                        setProblem(e.target.value)
                                    }}
                                    name="problem"
                                />
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Slot Subject
                                </SuiTypography>
                            </SuiBox>
                            {slotDetail?.slotSubjects?.map((item, index) => (
                                <Paper elevation={3}>
                                    <SuiBox p={2}>
                                        <SubjectInfoCard
                                            description={item.description}
                                            info={{
                                                Code: item.subject?.code,
                                                Name: item.subject?.title,
                                            }}
                                        />
                                    </SuiBox>
                                </Paper>
                            ))}
                        </Grid>
                    </Grid>

                    <SuiBox
                        
                        mb={2}
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <SuiButton
                            color="dark"
                            onClick={() => {
                                handleSendAppointment()
                            }}
                        >
                            Send appointment
                        </SuiButton>
                    </SuiBox>
                    {/* {questions?.map((item) => {
                        return <QuestionModal></QuestionModal>
                    })} */}
                </Card>
            </SuiBox>
        </DashboardLayout>
    )
}
