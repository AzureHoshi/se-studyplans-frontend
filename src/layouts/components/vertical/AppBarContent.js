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
import { mdiExitToApp, mdiFlagCheckered, mdiFlagPlus } from '@mdi/js'
import Icon from '@mdi/react'
import { userProfile } from 'src/dummy'
import { useEffect, useLayoutEffect, useState } from 'react'
import { handleGetUser } from 'src/authentication'
import { UserProvider, useUser } from 'src/hooks'
import { useGlobalContext } from 'src/configs/context'
import { CircleLoading } from 'src/components'

const AppBarContent = props => {
  const { state, setUserData } = useGlobalContext()
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility, hideTextSearch, hideUserAvatar, showStudentMenu } = props
  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleClicktoSimSyst = () => {
    window.open('/pages/studyplansimulator/', '_blank')
    // router.push('/pages/studyplansimulator/')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userByToken = await handleGetUser(/* pass your req object here if needed */)
        console.log('checkUser', userByToken)
        setUserData(userByToken)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchData()
  }, [])

  if (!state?.userData) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999 // Adjust the zIndex value as needed
        }}
      >
        {/* You can customize the loading content */}
        <div>
          <CircleLoading />
          <h1>Loading...</h1>
          {/* Add additional loading content as needed */}
        </div>
      </div>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'space-between', lg: 'end' }
      }}
    >
      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '100%', lg: 800 } }}>
          <Box
            sx={{
              width: { xs: '40%', md: '20%' },
              height: 70,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
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
            <Box
              onClick={() => handleClicktoSimSyst()}
              sx={{
                width: '40%',
                background: grey[200],
                height: 70,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                ':hover': {
                  background: grey[50]
                }
              }}
            >
              <Icon path={mdiFlagPlus} size={1} color={grey[500]} />
              <Typography sx={{ ml: 2, textAlign: 'center', fontSize: { xs: 12, md: 14 } }}>
                Studyplan Simulator
              </Typography>
            </Box>
          </Hidden>
          <Box sx={{ width: { xs: '60%', md: '40%' }, background: grey[900], height: 70 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                cursor: 'pointer'
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
                {state?.userData?.col_code}
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
                {state?.userData?.col_first_name + ' ' + state?.userData?.col_last_name}
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
