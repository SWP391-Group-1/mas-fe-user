import { Button } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { usePatch } from '../../hooks/usePatch.js'

export default function AddMajorModal({ major, isOpen, onSubmit, onCancel }) {
    const [newMajor, setNewMajor, patchMajor] = usePatch()
    const isCreateMode = React.useMemo(() => !major, [major])

    React.useEffect(() => {
        if (isOpen) setNewMajor(major)
    }, [major, isOpen])

    const handleUpdateClick = () => {
        onSubmit?.(newMajor, isCreateMode)
    }

    const handleCancelClick = () => {
        onCancel?.()
    }

    return (
        <Dialog open={isOpen}>
            {isCreateMode ? (
                <DialogTitle>Add New Major</DialogTitle>
            ) : (
                <DialogTitle>Edit Major</DialogTitle>
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
                        value={newMajor?.code}
                        onChange={(e) =>
                            patchMajor({ code: e?.target?.value ?? '' })
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
                    value={newMajor?.title}
                    onChange={(e) =>
                        patchMajor({ title: e?.target?.value ?? '' })
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
                    value={newMajor?.description}
                    onChange={(e) =>
                        patchMajor({ description: e?.target?.value ?? '' })
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
