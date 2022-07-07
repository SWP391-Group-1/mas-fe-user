import {
    Button,
    Card,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom'
import { mentorApi } from 'apis/mentorApis'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import SuiInput from 'components/SuiInput'
import { appointmentApi } from 'apis/appointmentApis'
import { questionApi } from 'apis/questionApis'
import QuestionDataGrid from 'examples/MASDataGrid/question'
import { useSnackbar } from 'notistack'
import { DataGrid } from '@mui/x-data-grid'
import AnswerQuestionModal from 'components/AnswerQuestionModal'

export default function MentorSlotDetail() {
    const location = useLocation()
    const [slotDetails, setSlotDetails] = useState()
    const [appointments, setAppointments] = useState([])
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState([])
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    let navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const handleClickVariant = (title, varientType) => {
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

    const handleCancelOpenEditModal = (major) => {
        setIsOpenEditModal(false)
    }

    const fetchData = () => {
        mentorApi
            .getMentorSlotById('e6ec0fc3-b74d-4df5-9551-f068f3e859cc')
            .then((res) => {
                setSlotDetails(res.data.content)
            })
        appointmentApi
            .loadAppointmentInASlot('e6ec0fc3-b74d-4df5-9551-f068f3e859cc')
            .then((res) => {
                setAppointments(res.data.content)
                loadQuestion(res.data.content)
            })
    }

    const loadQuestion = (appointmentList) => {
        setQuestions([])
        var request = appointmentList.map((item) => {
            return questionApi.loadQuestionsOfAppointment(item.id)
        })
        Promise.all(request).then((res) => {
            res?.map((item) => {
                item?.data?.content.map((i) => {
                    questions.push(i)
                })
            })
        })
    }

    const renderViewButton = (params) => {
        const question = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleOpenModel(question)}
                >
                    View
                </Button>
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
                if (params.answer === null || params.answer.length === 0) {
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
                                                slotDetails?.mentor?.introduce
                                            }
                                            // description="aaaaa"
                                            info={{
                                                Email: slotDetails?.mentor
                                                    ?.email,
                                                meetUrl:
                                                    slotDetails?.mentor
                                                        ?.meetUrl === null ||
                                                    slotDetails?.mentor
                                                        ?.meetUrl === ''
                                                        ? 'N/A'
                                                        : slotDetails?.mentor
                                                              ?.meetUrl,
                                            }}
                                        />
                                    </SuiBox>
                                </Paper>
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SuiBox>
                                <SuiBox sx={{ display: 'flex' }}>
                                    <SuiTypography
                                        component="label"
                                        variant="button"
                                        fontWeight="bold"
                                        alignItems="center"
                                    >
                                        List Student
                                    </SuiTypography>
                                </SuiBox>

                                <Card sx={{ borderRadius: '7px' }}>
                                    <List
                                        sx={{
                                            maxHeight: 275,
                                            position: 'relative',
                                            overflow: 'auto',
                                        }}
                                    >
                                        {appointments?.map((item, index) => {
                                            return (
                                                <ListItem>
                                                    <SuiBox p={2}>
                                                        <SuiTypography variant="button">
                                                            {index + 1}.{' '}
                                                            {
                                                                item?.creator
                                                                    ?.name
                                                            }
                                                        </SuiTypography>
                                                    </SuiBox>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </Card>
                            </SuiBox>
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
                                        slotDetails?.slot?.startTime
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
                                        slotDetails?.slot?.finishTime
                                    ).format('LLLL')}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </SuiBox>
                        </Grid>
                    </Grid>
                </Card>
            </SuiBox>
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid
                    rowHeight={50}
                    rows={questions}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                />

                <AnswerQuestionModal
                    question={question}
                    isOpen={isOpenEditModal}
                    onSubmit={handleSubmitQuestion}
                    onCancel={handleCancelOpenEditModal}
                />
            </div>
        </DashboardLayout>
    )
}
