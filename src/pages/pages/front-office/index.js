// ** React Imports
import { useEffect, useState } from 'react'

import { Box, Button, Grid, Drawer, Hidden, IconButton, SwipeableDrawer, Typography } from '@mui/material'

import { styled } from '@mui/material/styles'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Icons Import
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto'
import MenuIcon from '@mui/icons-material/Menu'

// ** Custom Components
import Roadmap from 'src/views/front-office/Roadmap'
import Recommendation from 'src/views/front-office/Recommendation'
import StudentSystems from 'src/views/front-office/StudentSystems'

const drawerWidth = 400

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

const FrontOffice = () => {
  const [open, setOpen] = useState(true) // for large screen drawer
  const [openSmallDrawer, setOpenSmallDrawer] = useState(false) // for small screen drawer
  const [pageState, setPageState] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    // Function to check if the screen is small
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 600) // Adjust the threshold as needed
    }

    // Initial check on mount
    checkScreenSize()

    // Event listener to update when the window is resized
    window.addEventListener('resize', checkScreenSize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, []) // Empty dependency array ensures that this effect runs only on mount and unmount

  return (
    <Box sx={{ display: 'flex' }}>
      {!isSmallScreen && (
        <Drawer
          sx={{
            width: { xs: 70, sm: 120, lg: 400 },
            '& .MuiDrawer-paper': {
              width: { xs: 70, sm: 120, lg: 400 },
              boxSizing: 'border-box'
            }
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <Box sx={{ height: '100%', overflow: 'hidden' }}>
            {/* <Hidden lgUp>
              <Box sx={{ mt: 8, mr: 2, height: '5%', display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton>
                  <ChevronLeftIcon onClick={handleDrawerClose} />
                </IconButton>
              </Box>
            </Hidden> */}
            <Box
              sx={{
                ml: { xs: 2, lg: -12 },
                mt: 24,
                height: '100%',
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Grid container sx={{ display: 'grid', justifyContent: 'center' }}>
                <Hidden lgDown>
                  <Grid item xs={12}>
                    <Button
                      sx={{ fontSize: 12 }}
                      variant='text'
                      startIcon={<LibraryBooksIcon />}
                      onClick={() => setPageState(0)}
                    >
                      Roadmap
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={{ fontSize: 12 }}
                      variant='text'
                      startIcon={<DashboardIcon />}
                      onClick={() => setPageState(1)}
                    >
                      Recommendation
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={{ fontSize: 12 }}
                      variant='text'
                      startIcon={<AssistantPhotoIcon />}
                      onClick={() => setPageState(2)}
                    >
                      Student Systems
                    </Button>
                  </Grid>
                </Hidden>
                <Hidden lgUp>
                  <Grid item xs={12}>
                    <Button variant='text' startIcon={<LibraryBooksIcon />} onClick={() => setPageState(0)}></Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant='text' startIcon={<DashboardIcon />} onClick={() => setPageState(1)}></Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant='text' startIcon={<AssistantPhotoIcon />} onClick={() => setPageState(2)}></Button>
                  </Grid>
                </Hidden>
              </Grid>
              <Box sx={{ height: '5%', display: 'grid', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Hidden lgDown>
                  <Button variant='text' startIcon={<ChevronLeftIcon />}>
                    CE Reform
                  </Button>
                </Hidden>
                <Hidden lgUp>
                  <Button variant='text' startIcon={<ChevronLeftIcon />}></Button>
                </Hidden>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
      <SwipeableDrawer open={openSmallDrawer} onClose={() => setOpenSmallDrawer(false)}>
        <Grid container sx={{ display: 'grid', justifyContent: 'center', p: 6 }}>
          <Grid item xs={12}>
            <Button
              // fullWidth
              sx={{
                pr: 18,
                fontSize: 12,
                color: 'gray',
                ':hover': {
                  color: 'orange'
                }
              }}
              variant='text'
              startIcon={<LibraryBooksIcon />}
              onClick={() => {
                setPageState(0)
                setOpenSmallDrawer(false)
              }}
            >
              Roadmap
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              sx={{
                fontSize: 12,
                color: 'gray',
                ':hover': {
                  color: 'orange'
                }
              }}
              variant='text'
              startIcon={<DashboardIcon />}
              onClick={() => {
                setPageState(1)
                setOpenSmallDrawer(false)
              }}
            >
              Recommendation
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              sx={{
                fontSize: 12,
                color: 'gray',
                ':hover': {
                  color: 'orange'
                }
              }}
              variant='text'
              startIcon={<AssistantPhotoIcon />}
              onClick={() => {
                setPageState(2)
                setOpenSmallDrawer(false)
              }}
            >
              Student Systems
            </Button>
          </Grid>
        </Grid>
      </SwipeableDrawer>
      <Main open={open}>
        {/* <Hidden lgUp>
          <Box sx={{ marginTop: 6, display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton>
              <MenuIcon onClick={handleDrawerOpen} />
            </IconButton>
          </Box>
        </Hidden> */}
        <Box sx={{ ml: { xs: 2, md: 12 }, mt: 0 }}>
          {isSmallScreen && (
            <Box sx={{ marginTop: 0, display: 'flex', justifyContent: 'flex-start' }}>
              <IconButton onClick={() => setOpenSmallDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          {pageState === 0 && <Roadmap />}
          {pageState === 1 && <Recommendation />}
          {pageState === 2 && <StudentSystems />}
        </Box>
      </Main>
    </Box>
  )
}
FrontOffice.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default FrontOffice
