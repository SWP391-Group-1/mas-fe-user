// react-routers components
import { Link } from 'react-router-dom'

// prop-types is library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Icon from '@mui/material/Icon'

//  components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

//  base styles
import colors from 'assets/theme/base/colors'
import typography from 'assets/theme/base/typography'
import EditProfileModal from 'components/EditProfileModal'
import { useState } from 'react'
import { UserApi } from 'apis/userApis'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

function ProfileInfoCard({
    title,
    description,
    info,
    social,
    action,
    avatarUrl,
    meetUrl,
    fullname,
    onUpdate,
}) {
    const labels = []
    const values = []
    const { socialMediaColors } = colors
    const { size } = typography
    const [editingProfile, setEditingProfile] = useState(null)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const profile = {
        name: fullname,
        introduce: description,
        meetUrl: meetUrl,
        avatar: avatarUrl,
    }

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    const handleUpdateProfile = (profile) => {
        UserApi.updatePersonalInformation(profile)?.then((res) => {
            handleClickVariant('Update profile successfully!', 'success')
        })
        onUpdate?.(profile)
        setIsOpenEditModal(false)
    }

    const handleCancelUpdateProfile = (profile) => {
        setIsOpenEditModal(false)
    }

    const handleEditProfile = () => {
        setEditingProfile(profile)
        setIsOpenEditModal(true)
    }

    // Convert this form `objectKey` of the object key in to this `object key`
    Object.keys(info).forEach((el) => {
        if (el.match(/[A-Z\s]+/)) {
            const uppercaseLetter = Array.from(el).find((i) =>
                i.match(/[A-Z]+/)
            )
            const newElement = el.replace(
                uppercaseLetter,
                ` ${uppercaseLetter.toLowerCase()}`
            )

            labels.push(newElement)
        } else {
            labels.push(el)
        }
    })

    // Push the object values into the values array
    Object.values(info).forEach((el) => values.push(el))

    // Render the card info items
    const renderItems = labels.map((label, key) => (
        <SuiBox key={label} display="flex" py={1} pr={2}>
            <SuiTypography
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
            >
                {label}: &nbsp;
            </SuiTypography>
            <SuiTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{values[key]}
            </SuiTypography>
        </SuiBox>
    ))

    // Render the card social media icons
    const renderSocial = social.map(({ link, icon, color }) => (
        <SuiBox
            key={color}
            component="a"
            href={link}
            target="_blank"
            rel="noreferrer"
            fontSize={size.lg}
            color={socialMediaColors[color].main}
            pr={1}
            pl={0.5}
            lineHeight={1}
        >
            {icon}
        </SuiBox>
    ))

    return (
        <Card sx={{ height: '100%' }}>
            <SuiBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
            >
                <SuiTypography
                    variant="h6"
                    fontWeight="medium"
                    textTransform="capitalize"
                >
                    {title}
                </SuiTypography>
                <SuiTypography
                    component={Link}
                    to={action.route}
                    variant="body2"
                    color="secondary"
                >
                    <Tooltip
                        title={action.tooltip}
                        onClick={() => handleEditProfile()}
                        placement="top"
                    >
                        <Icon>edit</Icon>
                    </Tooltip>
                </SuiTypography>
                <EditProfileModal
                    profile={editingProfile}
                    isOpen={isOpenEditModal}
                    onSubmit={handleUpdateProfile}
                    onCancel={handleCancelUpdateProfile}
                />
            </SuiBox>
            <SuiBox p={2}>
                <SuiBox mb={2} lineHeight={1}>
                    <SuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                    >
                        {description}
                    </SuiTypography>
                </SuiBox>
                <SuiBox opacity={0.3}>
                    <Divider />
                </SuiBox>
                <SuiBox>
                    {renderItems}
                    <SuiBox display="flex" py={1} pr={2}>
                        <SuiTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                        >
                            social: &nbsp;
                        </SuiTypography>
                        {renderSocial}
                    </SuiBox>
                </SuiBox>
            </SuiBox>
        </Card>
    )
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    info: PropTypes.objectOf(PropTypes.string).isRequired,
    social: PropTypes.arrayOf(PropTypes.object).isRequired,
    action: PropTypes.shape({
        route: PropTypes.string.isRequired,
        tooltip: PropTypes.string.isRequired,
    }).isRequired,
}

export default ProfileInfoCard
