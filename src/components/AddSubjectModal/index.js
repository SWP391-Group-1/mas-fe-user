import { Button } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { usePatch } from '../../hooks/usePatch.js'

export default function AddSubjectModal({
    subject,
    isOpen,
    onSubmit,
    onCancel,
}) {
    const [newSubject, setNewSubject, patchSubject] = usePatch()
    const isCreateMode = React.useMemo(() => !subject, [subject])

    React.useEffect(() => {
        if (isOpen) setNewSubject(subject)
    }, [subject, isOpen])

    const handleUpdateClick = () => {
        onSubmit?.(newSubject, isCreateMode)
    }

    const handleCancelClick = () => {
        onCancel?.()
    }

    return (
        <Dialog open={isOpen}>
            {isCreateMode ? (
                <DialogTitle>Add New Subject</DialogTitle>
            ) : (
                <DialogTitle>Edit Subject</DialogTitle>
            )}
            <DialogContent>
                {isCreateMode && (
                    <TextField
                        autoFocus
                        margin="dense"
                        id="codeTextField"
                        label="code"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newSubject?.code}
                        onChange={(e) =>
                            patchSubject({ code: e?.target?.value ?? '' })
                        }
                    />
                )}
                <TextField
                    autoFocus
                    margin="dense"
                    id="titleTextField"
                    label="title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newSubject?.title}
                    onChange={(e) =>
                        patchSubject({ title: e?.target?.value ?? '' })
                    }
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="descriptionTextField"
                    label="description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newSubject?.description}
                    onChange={(e) =>
                        patchSubject({ description: e?.target?.value ?? '' })
                    }
                />
            </DialogContent>
            <DialogActions>
                {isCreateMode ? (
                    <Button onClick={handleUpdateClick}>Create</Button>
                ) : (
                    <Button onClick={handleUpdateClick}>Update</Button>
                )}
                <Button onClick={handleCancelClick}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
