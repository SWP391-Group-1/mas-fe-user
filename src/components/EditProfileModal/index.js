import { Button } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { usePatch } from '../../hooks/usePatch.js'
import SuiInput from 'components/SuiInput/index.js'
import SuiBox from 'components/SuiBox/index.js'
import SuiTypography from 'components/SuiTypography/index.js'
import { Box } from '@mui/system'

export default function EditProfileModal({
    profile,
    isOpen,
    onSubmit,
    onCancel,
}) {
    const [newProfile, setNewProfile, patchProfile] = usePatch()

    React.useEffect(() => {
        setNewProfile(profile)
    }, [profile])

    const handleUpdateClick = () => {
        onSubmit?.(newProfile)
    }

    const handleCancelClick = () => {
        onCancel?.()
    }

    return (
        <Dialog open={isOpen} maxWidth="xl">
            <Box width="600px">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Name
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        autoFocus
                        id="codeTextField"
                        type="text"
                        value={newProfile?.name}
                        inputProps={{ maxLength: 20 }}
                        onChange={(e) =>
                            patchProfile({
                                name: e?.target?.value ?? '',
                            })
                        }
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Introduce
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        id="titleTextField"
                        type="text"
                        multiline
                        rows={5}
                        value={newProfile?.introduce}
                        inputProps={{ maxLength: 500 }}
                        onChange={(e) =>
                            patchProfile({ introduce: e?.target?.value ?? '' })
                        }
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Meet URL
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        id="descriptionTextField"
                        type="text"
                        value={newProfile?.meetUrl}
                        inputProps={{ maxLength: 100 }}
                        onChange={(e) =>
                            patchProfile({
                                meetUrl: e?.target?.value ?? '',
                            })
                        }
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Avatar
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        id="descriptionTextField"
                        type="text"
                        value={newProfile?.avatar}
                        inputProps={{ maxLength: 100 }}
                        onChange={(e) =>
                            patchProfile({
                                avatar: e?.target?.value ?? '',
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClick}>Update</Button>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
