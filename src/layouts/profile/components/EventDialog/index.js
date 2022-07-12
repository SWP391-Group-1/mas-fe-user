import React from 'react'
import { usePatch } from 'hooks/usePatch'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function EventDialog({
    initialEvent,
    isOpen,
    onOk,
    onCancel,
    mentorSubjects,
}) {
    const [editingEvent, setEditingEvent, patchEditingEvent] = usePatch()

    React.useEffect(() => {
        if (isOpen) setEditingEvent(initialEvent)
    }, [initialEvent, isOpen, setEditingEvent])

    function handleOkClick() {
        onOk?.(editingEvent)
    }

    function handleCancelClick() {
        onCancel?.()
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog open={isOpen}>
                <DialogTitle id="alert-dialog-title">
                    {'Create an available slot'}
                </DialogTitle>
                <DialogContent>
                    <DialogContent>Start time</DialogContent>
                    <DateTimePicker
                        value={editingEvent?.startTime}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                            patchEditingEvent({ startTime: newValue })
                        }
                    />
                    <DialogContent>End time</DialogContent>
                    <DateTimePicker
                        value={editingEvent?.finishTime}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                            patchEditingEvent({ finishTime: newValue })
                        }
                    />
                    <DialogContent>Subject</DialogContent>
                    <Select
                        value={editingEvent?.subjectCode}
                        onChange={(e) => {
                            patchEditingEvent({
                                subjectId: e.target.value.id,
                                description: e.target.value.description,
                            })
                        }}
                    >
                        {mentorSubjects.map((subject) => {
                            return (
                                <MenuItem
                                    key={subject.id}
                                    value={subject.subject}
                                >
                                    {subject.subject.code}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                    <Button onClick={handleOkClick}>Ok</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    )
}
