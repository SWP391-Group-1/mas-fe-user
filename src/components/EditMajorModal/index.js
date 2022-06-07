import { Button, Input, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

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
    const [newMajor, setNewMajor] = React.useState()

    React.useEffect(() => {
        if (isOpen) setNewMajor(major)
    }, [major, isOpen])

    const patchMajor = (patchData) => {
        setNewMajor((prev) => ({ ...prev, ...(patchData ?? {}) })) // meow ... : spread operator
    }

    const handleOkClick = () => {
        onSubmit?.(newMajor)
    }

    const handleCancelClick = () => {
        onCancel?.()
    }

    return (
        <Modal open={isOpen}>
            <div>
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Major Detail
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Major code
                    </Typography>
                    <Input onChange={e => patchMajor({ title: e?.target?.value ?? "" })}></Input>
                    <Button onClick={handleOkClick}>OK</Button>
                    <Button onClick={handleCancelClick}>Cancle</Button>
                </Box>
            </div>
        </Modal>
    )
}
