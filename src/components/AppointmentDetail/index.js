import { Button, Card, Grid, Paper } from '@mui/material'
import { display } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { appointmentApi } from 'apis/appointmentApis'
import { questionApi } from 'apis/questionApis'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import SubjectInfoCard from 'examples/Cards/InfoCards/SubjectInfoCard'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SnackbarProvider, useSnackbar } from 'notistack'
import QuestionModal from 'components/QuestionModal'
import QuestionDataGrid from 'examples/MASDataGrid/question'
import AppointmentDataGrid from 'examples/MASDataGrid/appointment'

export default function AppointmentDetail() {
    const location = useLocation()
    const appointmentID = location.state?.appointmentId || null
    const [appointmentDetails, setAppointmentDetails] = useState([])
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState([])
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        appointmentApi.loadSendAppointmentDetails(appointmentID).then((res) => {
            setAppointmentDetails(res.data.content)
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
                    //onClick={() => {navigate('/appointment/appointmentdetails', {state: {appointmentId: params.row.id}})}}
                    onClick={() => handleOpenModel(question)}
                >
                    Edit
                </Button>
            </strong>
        )
    }

    const renderStatus = () => {
        if (appointmentDetails?.isApprove == null) {
            return (
                <SuiTypography
                    component="label"
                    variant="h6"
                    fontWeight="bold"
                    color="info"
                >
                    Not approved yet
                </SuiTypography>
            )
        } else {
            if (appointmentDetails?.isApprove == true) {
                return (
                    <SuiTypography
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        color="success"
                    >
                        Approved
                    </SuiTypography>
                )
            } else {
                return (
                    <SuiTypography
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        color="error"
                    >
                        Denied
                    </SuiTypography>
                )
            }
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox mt={7} mb={3}>
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
                    <SuiBox mb={1}>{renderStatus()}</SuiBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Fullname
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={2}>
                                <SuiInput
                                    disabled="true"
                                    type="text"
                                    value={appointmentDetails?.mentor?.name}
                                    inputProps={{ maxLength: 100 }}
                                />
                            </SuiBox>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox>
                                <SuiBox sx={{ display: 'flex' }}>
                                    <SuiTypography
                                        component="label"
                                        variant="button"
                                        fontWeight="bold"
                                        alignItems="center"
                                    >
                                        Mentor Profile
                                    </SuiTypography>
                                </SuiBox>
                                <Paper elevation={3}>
                                    <SuiBox p={2}>
                                        <MentorInfoCard
                                            title="profile information"
                                            description={
                                                appointmentDetails?.mentor
                                                    ?.introduce
                                            }
                                            // description="aaaaa"
                                            info={{
                                                Email: appointmentDetails
                                                    ?.mentor?.email,
                                                meetUrl:
                                                    appointmentDetails?.mentor
                                                        ?.meetUrl === null ||
                                                    appointmentDetails?.mentor
                                                        ?.meetUrl === ''
                                                        ? 'N/A'
                                                        : appointmentDetails
                                                              ?.mentor?.meetUrl,
                                            }}
                                        />
                                    </SuiBox>
                                </Paper>
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SuiBox sx={{ display: 'flex' }}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Chosen Subject
                                </SuiTypography>
                            </SuiBox>

                            {appointmentDetails?.appointmentSubjects?.map(
                                (item, index) => (
                                    <Paper elevation={3}>
                                        <SuiBox p={2}>
                                            <SubjectInfoCard
                                                description={item.briefProblem}
                                                info={{
                                                    Code: item.subject?.code,
                                                    Name: item.subject?.title,
                                                }}
                                            />
                                        </SuiBox>
                                    </Paper>
                                )
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1} mt={2}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Start Time
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={2}>
                                <SuiInput
                                    disabled="true"
                                    id="codeTextField"
                                    type="text"
                                    value={moment(
                                        appointmentDetails?.slot?.startTime
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SuiBox mb={1} mt={2}>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    End Time
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox mb={2}>
                                <SuiInput
                                    disabled="true"
                                    id="codeTextField"
                                    type="text"
                                    value={moment(
                                        appointmentDetails?.slot?.finishTime
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                        </Grid>
                    </Grid>
                </Card>
            </SuiBox>

            {appointmentDetails?.isApprove != null && (
                <QuestionDataGrid appointmentID={appointmentID}/>
            )}
        </DashboardLayout>
    )
}
