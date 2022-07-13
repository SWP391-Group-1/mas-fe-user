import { Button, Card, Grid, List, ListItem, Paper } from '@mui/material'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { mentorApi } from 'apis/mentorApis'
import { SlotApi } from 'apis/slotApis'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInfoCard'
import SuiInput from 'components/SuiInput'
import { appointmentApi } from 'apis/appointmentApis'
import { questionApi } from 'apis/questionApis'
import { useSnackbar } from 'notistack'
import { DataGrid } from '@mui/x-data-grid'
import AnswerQuestionModal from 'components/AnswerQuestionModal'
import SubjectInfoCard from 'examples/Cards/InfoCards/SubjectInfoCard'
import EventDialog from 'layouts/profile/components/EventDialog'
import { useModal } from '../../hooks/useModal.js'
import { useNavigate } from 'react-router-dom'

export default function MentorSlotDetail() {
    const location = useLocation()
    let questions = []
    const modal = useModal()
    const navigate = useNavigate()
    const slotID = location.state?.slotID || null
    const mentorSubjects = location.state?.mentorSubjects || null
    const [slotDetails, setSlotDetails] = useState()
    const [appointments, setAppointments] = useState([])
    const [isEditingEventOpen, setIsEditingEventOpen] = useState(false)
    const [eventToEdit, setEventToEdit] = useState(null)
    const [tempQuestions, setTempQuestions] = useState([])
    const [question, setQuestion] = useState([])
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        fetchData()
    }, [])

    function handleEditEventCancelClick() {
        setIsEditingEventOpen(false)
    }

    function handleEditEventOkClick(event) {
        // SlotApi.addAvailableSlot(event)
        //     .then((res) => {
        //         handleClickVariant('Update slot successfully!', 'success')
        //         fetchData()
        //     })
        //     .catch((error) => {
        //         handleClickVariant(error.response.data.title, 'error')
        //     })
        setIsEditingEventOpen(false)
    }

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

    const handleUpdateSlot = (start, end, subjectId) => {
        setEventToEdit({
            startTime: start,
            finishTime: end,
            subjectId: subjectId,
        })
        setIsEditingEventOpen(true)
    }

    const handleDeleteSlot = (slotId) => {
        modal.openModal({
            title: 'Mentor subject add',
            content: 'Do you want to add this subject for mentor',
            buttons: [
                {
                    text: 'Confirm',
                    onClick: () => {
                        SlotApi.deleteAvailableSlot(slotId)
                            .then((res) => {
                                handleClickVariant(
                                    'Delete slot successfully!',
                                    'success'
                                )
                                fetchData()
                            })
                            .catch((error) => {
                                handleClickVariant(
                                    error.response.data.error.message,
                                    'error'
                                )
                            })
                        modal.closeModal()
                        navigate('/profile')
                    },
                },
                {
                    text: 'Close',
                    onClick: () => {
                        modal.closeModal()
                    },
                },
            ],
        })
    }

    const fetchData = () => {
        mentorApi.getMentorSlotById(slotID).then((res) => {
            setSlotDetails(res.data.content)
        })
        appointmentApi.loadAppointmentInASlot(slotID).then((res) => {
            setAppointments(res.data.content)
            loadQuestion(res.data.content)
        })
    }

    const loadQuestion = (appointmentList) => {
        var request = appointmentList.map((item) => {
            return questionApi.loadQuestionsOfAppointment(item.id)
        })
        Promise.all(request).then((res) => {
            res?.map((item) => {
                item?.data?.content.map((i) => {
                    questions = [...questions, i]
                })
            })
            setTempQuestions(questions)
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
                if (params.row?.answer == null) {
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

                                <Card
                                    sx={{
                                        borderRadius: '7px',
                                        height: 276,
                                        backdropFilter: `saturate(200%) blur(30px)`,
                                        backgroundColor: ({
                                            functions: { rgba },
                                            palette: { white },
                                        }) => rgba(white.main, 0.8),
                                        boxShadow: ({
                                            boxShadows: { navbarBoxShadow },
                                        }) => navbarBoxShadow,
                                    }}
                                >
                                    <List
                                        sx={{
                                            maxHeight: 276,
                                            position: 'relative',
                                            overflow: 'auto',
                                        }}
                                    >
                                        {appointments?.map((item, index) => {
                                            return (
                                                <ListItem>
                                                    <SuiBox p={2}>
                                                        <SuiTypography
                                                            variant="button"
                                                            fontWeight="regular"
                                                            color="text"
                                                        >
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
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Chosen Subject
                                </SuiTypography>
                            </SuiBox>
                            {slotDetails?.slotSubjects?.map((item, index) => (
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
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    backdropFilter: `saturate(200%) blur(30px)`,
                                    backgroundColor: ({
                                        functions: { rgba },
                                        palette: { white },
                                    }) => rgba(white.main, 0.8),
                                    boxShadow: ({
                                        boxShadows: { navbarBoxShadow },
                                    }) => navbarBoxShadow,
                                    position: 'relative',
                                    mt: 4,
                                    py: 2,
                                    px: 2,
                                    borderRadius: 2,
                                }}
                            >
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
                                            slotDetails?.startTime + 'Z'
                                        ).format('LLLL')}
                                        inputProps={{ maxLength: 20 }}
                                    />
                                </SuiBox>
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
                                            slotDetails?.finishTime + 'Z'
                                        ).format('LLLL')}
                                        inputProps={{ maxLength: 20 }}
                                    />
                                </SuiBox>
                            </Card>
                        </Grid>
                    </Grid>
                </Card>
                {/* <Button
                        mt={1}
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                        }}
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() =>
                            handleUpdateSlot(
                                slotDetails?.startTime + 'Z',
                                slotDetails?.finishTime + 'Z',
                                slotDetails?.slotSubjects[0].subject.code
                            )
                        }
                    >
                        {' '}
                        Update
                    </Button>{' '} */}
                <Button
                    mt={1}
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                    }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteSlot(slotDetails?.id)}
                >
                    {' '}
                    Delete
                </Button>
            </SuiBox>
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid
                    rowHeight={50}
                    rows={tempQuestions}
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
            <EventDialog
                title={'Update available slot'}
                isOpen={isEditingEventOpen}
                initialEvent={eventToEdit}
                onOk={handleEditEventOkClick}
                onCancel={handleEditEventCancelClick}
                mentorSubjects={mentorSubjects}
            />
        </DashboardLayout>
    )
}
