import { Button } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { usePatch } from '../../hooks/usePatch.js'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function EditMajorModal({ major, isOpen, onSubmit, onCancel }) {
    const [newMajor, setNewMajor, patchMajor] = usePatch();
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
        // <Modal open={isOpen}>
        //     <div>
        //         <Box sx={modalStyle}>
        //             <Typography
        //                 id="modal-modal-title"
        //                 variant="h6"
        //                 component="h2"
        //             >
        //                 Major Detail
        //             </Typography>
        //             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        //                 Major code
        //             </Typography>
        //             <Input onChange={e => patchMajor({ title: e?.target?.value ?? "" })}></Input>
        //             <Button onClick={handleOkClick}>OK</Button>
        //             <Button onClick={handleCancelClick}>Cancle</Button>
        //         </Box>
        //     </div>
        // </Modal>
        <Dialog open={isOpen}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                </DialogContentText>
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
                <Button onClick={handleUpdateClick}>Update</Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
