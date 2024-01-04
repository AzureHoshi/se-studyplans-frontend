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
import { url } from 'src/configs/urlConfig'
import axios from 'axios'
import { userProfile } from 'src/dummy'

const drawerWidth = 350

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

const FrontOffice = ({ jobRecommended, curriculumTree, subjectsSE66, curriculumScopeSE66, studyPlanSE66 }) => {
  const [open, setOpen] = useState(true) // for large screen drawer
  const [openSmallDrawer, setOpenSmallDrawer] = useState(false) // for small screen drawer
  const [pageState, setPageState] = useState(0)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <SwipeableDrawer onOpen={() => null} open={openSmallDrawer} onClose={() => setOpenSmallDrawer(false)}>
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
          <Grid item xs={12} sx={{ mt: 6 }}>
            <Button
              sx={{
                pr: 16,
                fontSize: 12,
                color: 'gray',
                ':hover': {
                  color: 'orange'
                }
              }}
              variant='text'
              startIcon={<ChevronLeftIcon />}
              onClick={() => {
                // setPageState(2)
                setOpenSmallDrawer(false)
              }}
            >
              CE Reform
            </Button>
          </Grid>
        </Grid>
      </SwipeableDrawer>
      <Hidden mdDown>
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
      </Hidden>
      <Main open={open}>
        <Box sx={{ mt: 0 }}>
          <Hidden mdUp>
            <Box sx={{ marginTop: 0, display: 'flex', justifyContent: 'flex-start' }}>
              <IconButton onClick={() => setOpenSmallDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Hidden>
          {pageState === 0 && (
            <Roadmap
              curriculumTree={curriculumTree}
              subjectsSE66={subjectsSE66}
              curriculumScopeSE66={curriculumScopeSE66}
              studyPlanSE66={studyPlanSE66}
            />
          )}
          {pageState === 1 && <Recommendation jobRecommended={jobRecommended} />}
          {pageState === 2 && <StudentSystems />}
        </Box>
      </Main>
    </Box>
  )
}
FrontOffice.getLayout = page => <BlankLayout>{page}</BlankLayout>

// ssr
export async function getServerSideProps() {
  var jobRecommended = []
  var curriculumTree = []
  var subjectsSE66 = []
  var curriculumScopeSE66 = []
  var studyPlanSE66 = []

  try {
    // Make multiple API requests concurrently using Promise.all
    const [resJobRecommended, resCurriculumSE66Tree, resSubjectsSE66, resCurriculumSE66Scope, resStudyPlanRecords] =
      await Promise.all([
        axios.get(url.BASE_URL + `/subject-job-relateds`),
        axios.get(url.BASE_URL + `/continue-subjects-curriculum/` + userProfile.curriculum_id),
        axios.get(url.BASE_URL + `/subjects-by-curriculum/` + userProfile.curriculum_id),
        axios.get(url.BASE_URL + `/curriculum-structures-v2/` + userProfile.curriculum_id),
        axios.get(url.BASE_URL + `/study-plan-records/` + userProfile.curriculum_id)
      ])

    // Process data from responses
    jobRecommended = resJobRecommended.data.data
    curriculumTree = resCurriculumSE66Tree.data.data
    subjectsSE66 = resSubjectsSE66.data.data
    curriculumScopeSE66 = resCurriculumSE66Scope.data.data
    studyPlanSE66 = resStudyPlanRecords.data.data

    // Your logic with the retrieved data

    console.log('Data from endpoint jobRecommended:', jobRecommended)
    console.log('Data from endpoint curriculumTree:', curriculumTree)
    console.log('Data from endpoint subjectsSE66:', subjectsSE66)
    console.log('Data from endpoint curriculumScopeSE66:', curriculumScopeSE66)
    console.log('Data from endpoint studyPlanSE66:', studyPlanSE66)
  } catch (errorArray) {
    // Handle errors separately for each API request
    console.error('Error fetching data concurrently:', errorArray.message)
  }

  return {
    props: {
      jobRecommended: jobRecommended,
      subjectsSE66: subjectsSE66,
      curriculumScopeSE66: curriculumScopeSE66,
      studyPlanSE66: studyPlanSE66,
      curriculumTree: curriculumTree
    }
  }
}

export default FrontOffice
