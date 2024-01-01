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
      <Main open={open}>
        <Box sx={{ ml: { xs: 0, md: 12 }, mt: 0 }}>
          {isSmallScreen && (
            <Box sx={{ marginTop: 0, display: 'flex', justifyContent: 'flex-start' }}>
              <IconButton onClick={() => setOpenSmallDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
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
  const resJobRecommended = await axios.get(url.BASE_URL + `/subject-job-relateds`)
  // for display subject
  const resCurriculumSE66Tree = await axios.get(
    url.BASE_URL + `/continue-subjects-curriculum/` + userProfile.curriculum_id
  ) // 2 for se 66
  const resSubjectsSE66 = await axios.get(url.BASE_URL + `/subjects-by-curriculum/` + userProfile.curriculum_id) // 2 for se 66
  const resCurriculumSE66Scope = await axios.get(
    url.BASE_URL + `/curriculum-structures-v2/` + userProfile.curriculum_id
  ) // 2 for se 66
  const resStudyPlanRecords = await axios.get(url.BASE_URL + `/study-plan-records/` + userProfile.curriculum_id) // 2 for se 66
  return {
    props: {
      jobRecommended: resJobRecommended.data.data,
      curriculumTree: resCurriculumSE66Tree.data.data,
      subjectsSE66: resSubjectsSE66.data.data,
      curriculumScopeSE66: resCurriculumSE66Scope.data.data,
      studyPlanSE66: resStudyPlanRecords.data.data
    }
  }
}

export default FrontOffice
