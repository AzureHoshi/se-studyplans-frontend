// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { grey } from '@mui/material/colors'

import { Button, Hidden, Typography } from '@mui/material'
import { mdiExitToApp } from '@mdi/js'
import Icon from '@mdi/react'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility, hideTextSearch, hideUserAvatar, showStudentMenu } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'space-between', lg: 'end' }
      }}
    >
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
      </Box>
      {/* menu for student system */}
      {showStudentMenu && (
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', width: { xs: '100%', lg: 800 } }}>
          <Box
            sx={{
              width: { xs: '40%', md: '20%' },
              height: 70,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box sx={{ mr: 2, mt: 2 }}>
              <Icon path={mdiExitToApp} size={1} color={grey[500]} />
            </Box>
            <Typography
              sx={{ fontWeight: 'bold', color: grey[500], textAlign: 'center', fontSize: { xs: 12, md: 14 } }}
            >
              Logout
            </Typography>
          </Box>
          <Hidden only={'xs'}>
            <Box sx={{ width: '40%', background: grey[200], height: 70 }}>
              <Typography sx={{ textAlign: 'center', mt: 6.5, fontSize: { xs: 12, md: 14 } }}>
                Simulation Stydyplan
              </Typography>
            </Box>
          </Hidden>
          <Box sx={{ width: { xs: '60%', md: '40%' }, background: grey[900], height: 70 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center'
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  color: grey[500],
                  mr: 2,
                  mt: { xs: 4, md: 6.5 },
                  fontSize: { xs: 12, md: 14 },
                  mx: { xs: 'auto', md: 2 }
                }}
              >
                #635432060XXX
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mt: { xs: 0, md: 6.5 },
                  fontSize: { xs: 12, md: 14 },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Profile Name
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* textsearch */}
        {!hideTextSearch && (
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        )}
        {/* useravatar */}
        {!hideUserAvatar && <UserDropdown />}
      </Box>
    </Box>
  )
}

export default AppBarContent
