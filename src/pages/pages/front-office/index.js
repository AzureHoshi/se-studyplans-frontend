// ** React Imports
import { useState } from 'react'

import { Box, Button, Grid, Drawer, Hidden, IconButton } from '@mui/material'

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
  const [open, setOpen] = useState(true)
  const [pageState, setPageState] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <Box sx={{ height: '100%' }}>
          <Hidden mdUp>
            <Box sx={{ height: '5%', display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton>
                <ChevronLeftIcon onClick={handleDrawerClose} />
              </IconButton>
            </Box>
          </Hidden>
          <Box
            sx={{ height: { xs: '90%', md: '95%' }, display: 'grid', justifyContent: 'center', alignItems: 'center' }}
          >
            <Grid container sx={{ display: 'grid', justifyContent: 'center' }}>
              <Grid item xs={12}>
                <Button variant='text' startIcon={<LibraryBooksIcon />} onClick={() => setPageState(0)}>
                  Roadmap
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant='text' startIcon={<DashboardIcon />} onClick={() => setPageState(1)}>
                  Recommendation
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant='text' startIcon={<AssistantPhotoIcon />} onClick={() => setPageState(2)}>
                  Student Systems
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ height: '5%', display: 'grid', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button variant='text' startIcon={<ChevronLeftIcon />}>
              CE Reform
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Main open={open}>
        <Hidden mdUp>
          <Box sx={{ marginTop: 6, display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton>
              <MenuIcon onClick={handleDrawerOpen} />
            </IconButton>
          </Box>
        </Hidden>
        {pageState === 0 && <Roadmap />}
        {pageState === 1 && <Recommendation />}
        {pageState === 2 && <StudentSystems />}
      </Main>
    </Box>
  )
}
FrontOffice.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default FrontOffice
