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
import SuiInput from 'components/SuiInput'

function MentorInfoCard({ title, description, info, social, action }) {
    const labels = []
    const values = []
    const { socialMediaColors } = colors
    const { size } = typography

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

    return (
        <>
            {/* <SuiBox display="flex" justifyContent="space-between" alignItems="center">
        <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SuiTypography>
      </SuiBox> */}
            <SuiBox>
                <SuiTypography
                    variant="button"
                    fontWeight="bold"
                    textTransform="capitalize"
                >
                    Introduce:
                </SuiTypography>
                <SuiBox mb={2} lineHeight={0}>
                    {/* <SuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                        rows={10}
                        multiline
                    >
                        {description}
                    </SuiTypography> */}
                    <SuiInput sx={{style: "border:none"}}
                                disabled
                                rows={5}
                                multiline
                                value={description}
                            />
                </SuiBox>
                <SuiBox>{renderItems}</SuiBox>
            </SuiBox>
        </>
    )
}

// Typechecking props for the ProfileInfoCard
MentorInfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    info: PropTypes.objectOf(PropTypes.string).isRequired,
    // social: PropTypes.arrayOf(PropTypes.object),
    // action: PropTypes.shape({
    //   route: PropTypes.string.isRequired,
    //   tooltip: PropTypes.string.isRequired,
    // })
}

export default MentorInfoCard
