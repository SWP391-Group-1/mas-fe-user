import React from 'react'
import { usePatch } from 'hooks/usePatch'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function EventDialog({ initialEvent, isOpen, onOk, onCancel }) {
    const [editingEvent, setEditingEvent, patchEditingEvent] = usePatch();

    React.useEffect(() => {
        if (isOpen)
            setEditingEvent(initialEvent);
    }, [initialEvent, isOpen, setEditingEvent]);

    function handleOkClick() {
        onOk?.(editingEvent);
    }

    function handleCancelClick() {
        onCancel?.();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog open={isOpen}>
                <DialogTitle id="alert-dialog-title">
                    {'Create an event'}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                    <Button onClick={handleOkClick}>Ok</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    )
}