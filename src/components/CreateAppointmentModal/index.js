import { Card, IconButton, Menu, MenuItem } from '@mui/material'
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

export default function CreateAppointmentModal() {
    const location = useLocation()
    const slotId = location.state?.slotID || null
    const [slotDetail, setSlotDetail] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const [subjects, setSubjects] = useState([])
    const [subject, setSubject] = useState({
        subject: { code: 'Select subject' },
    })
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

    const open = Boolean(anchorEl)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        mentorApi.getMentorSlotById(slotId).then((res) => {
            setSlotDetail(res.data.content)
            getMentorSubject(res.data.content.mentor.id)
        })
    }

    const getMentorSubject = (data) => {
        mentorApi.getMentorSubjects(data).then((res) => {
            setSubjects(res.data.content)
        })
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onChoose = (item) => {
        setSubject(item.subject)
        setAnchorEl(null)
    }

    const handleSendAppointment = () => {
        // console.log(slotId)
        // console.log(subject.id)
        // console.log(problem)
        if (
            slotId == null ||
            slotId == '' ||
            subject.id == null ||
            subject.id == '' ||
            subject.code == 'Select Subject' ||
            problem == null ||
            problem == 'F'
        ) {
            console.log('abc')
            handleClickVariant('Subject and problem are required!', 'error')
        }
        appointmentApi
            .createAppointment({
                slotId: slotId,
                appointmentSubjects: [
                    {
                        subjectId: subject.id,
                        briefProblem: problem,
                    },
                ],
            })
            .then((res) => {
                handleClickVariant(
                    'Create appointment successfully!!!!',
                    'success'
                )
                navigate('/appointment')
            })
            .catch((err) => {
                handleClickVariant(err.data.error.message, 'error')
            })
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
                    {/* <SuiBox display="flex" justifyContent="flex-end">
                        <SuiButton color="dark" onClick>
                            Add Question
                        </SuiButton>
                    </SuiBox> */}

                    <SuiBox sx={{ display: 'flex' }} mb={1}>
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

                    <SuiBox sx={{ width: '40%' }} mb={2}>
                        <SuiInput
                            disable
                            type="text"
                            value={slotDetail?.mentor.name}
                            inputProps={{ maxLength: 100 }}
                        />
                    </SuiBox>

                    <SuiBox sx={{ display: 'flex' }} mb={1}>
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
                    <SuiBox sx={{ width: '40%' }} mb={2}>
                        <SuiInput
                            disable
                            id="codeTextField"
                            type="text"
                            value={moment(slotDetail?.startTime).format('LLLL')}
                            inputProps={{ maxLength: 20 }}
                        />
                    </SuiBox>
                    <SuiBox sx={{ display: 'flex' }} mb={1}>
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
                    <SuiBox sx={{ width: '40%' }} mb={2}>
                        <SuiInput
                            disable
                            id="codeTextField"
                            type="text"
                            value={moment(slotDetail?.finishTime).format(
                                'LLLL'
                            )}
                            inputProps={{ maxLength: 20 }}
                        />
                    </SuiBox>
                    <SuiBox sx={{ display: 'flex' }} mb={1}>
                        <SuiTypography
                            component="label"
                            variant="button"
                            fontWeight="bold"
                            width="10%"
                            alignItems="center"
                        >
                            Subject
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox
                        mb={2}
                        sx={{
                            display: 'flex',
                            width: '20%',
                        }}
                    >
                        <SuiInput
                            disable
                            placeholder="Subject"
                            icon={{
                                component: 'arrow_drop_down',
                                direction: 'right',
                            }}
                            value={subject.code}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        />

                        <IconButton
                            color="dark"
                            component="span"
                            onClick={() => {
                                setSubject({ code: 'Select Subject' })
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 50 * 4.5,
                                    width: '12%',
                                },
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {subjects?.map((item) => {
                                return (
                                    <MenuItem
                                        value={10}
                                        key={item.id}
                                        onClick={() => onChoose(item)}
                                    >
                                        {item.subject.code}
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </SuiBox>
                    <SuiBox sx={{ width: '40%' }} mb={2}>
                        <SuiTypography
                            component="label"
                            variant="button"
                            fontWeight="bold"
                            width="10%"
                            alignItems="center"
                        >
                            Brief Problem
                        </SuiTypography>
                        <SuiInput
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
                    <SuiBox
                        sx={{ width: '40%' }}
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
