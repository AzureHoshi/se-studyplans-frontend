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
import AccountBoxRounded from '@mui/icons-material/AccountBoxRounded'
import MenuIcon from '@mui/icons-material/Menu'

// ** Custom Components
import Roadmap from 'src/views/front-office/Roadmap'
import Recommendation from 'src/views/front-office/Recommendation'
import StudentSystems from 'src/views/front-office/StudentSystems'
import { url } from 'src/configs/urlConfig'
import axios from 'axios'
import { userProfile } from 'src/dummy'
import Simulator from 'src/views/front-office/Simulator'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const drawerWidth = 350

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
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

const FrontOffice = ({
  jobRecommended,
  curriculumTree,
  subjectsSE66,
  curriculumScopeSE66,
  studyPlanSE66,
  jobCompetencies,
  allCurriculum,
  YLOs
}) => {
  const [open, setOpen] = useState(true) // for large screen drawer
  const [openSmallDrawer, setOpenSmallDrawer] = useState(false) // for small screen drawer
  const [pageState, setPageState] = useState(0)
  const router = useRouter()

  const backgroundImageUrl = 'https://images.pexels.com/photos/5255236/pexels-photo-5255236.jpeg'

  const handleChangeCurricuclum = curriculum_id => {
    Cookies.set('curr', curriculum_id)
    router.replace('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SwipeableDrawer onOpen={() => null} open={openSmallDrawer} onClose={() => setOpenSmallDrawer(false)}>
        <Grid container sx={{ display: 'grid', justifyContent: 'center', width: 300 }}>
          <Grid item xs={12} sx={{ mt: 16 }}>
            <img
              src='/images/logos/logo.png'
              alt='logo'
              style={{ width: 100, height: 'auto', margin: 32, marginBottom: 56 }}
            />
          </Grid>
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
                pr: 2,
                fontSize: 12,
                color: 'gray',
                ':hover': {
                  color: 'orange'
                }
              }}
              variant='text'
              startIcon={<AccountBoxRounded />}
              onClick={() => {
                setPageState(3)
                setOpenSmallDrawer(false)
              }}
            >
              Simulator System
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
                setPageState(3)
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
              sx={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                pb: 32,
                overflow: 'hidden'
              }}
            >
              <Grid container sx={{ display: 'grid', justifyContent: 'center' }}>
                <Grid item xs={12} sx={{ m: 16 }}>
                  <img src='/images/logos/logo.png' alt='logo' style={{ width: 140, height: 'auto', marginTop: 16 }} />
                </Grid>
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
                  <Button
                    variant='text'
                    startIcon={<AccountBoxRounded />}
                    onClick={() => {
                      setPageState(3)
                    }}
                  >
                    Simulator System
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='text' startIcon={<AssistantPhotoIcon />} onClick={() => setPageState(2)}>
                    Student Systems
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ height: '5%', display: 'grid', justifyContent: 'flex-start', alignItems: 'center', ml: 10 }}>
              <Button variant='text' startIcon={<ChevronLeftIcon />}>
                Back to Reform
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Hidden>

      <Main open={open}>
        <Hidden mdUp>
          <Box sx={{ marginTop: 0, display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton onClick={() => setOpenSmallDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Hidden>

        <Box
          sx={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%', // Set the width to fill the container
            height: '100vh', // Set the height to fill the viewport
            position: 'relative',
            p: 0,
            m: 0
          }}
        >
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              top: '6%',
              right: '4%'
            }}
          >
            <img
              src='/images/logos/logo-RMUTL.png'
              alt='logo-RMUTL'
              style={{
                width: 45,
                height: 'auto',
                marginTop: -35,
                marginRight: 4
              }}
            />
            <Typography>RMUTL University</Typography>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(200, 200, 200, 0.5)',
              overflow: pageState === 0 ? 'auto' : null
            }}
          >
            {pageState === 0 && (
              <Roadmap
                curriculumTree={curriculumTree}
                subjectsSE66={subjectsSE66}
                curriculumScopeSE66={curriculumScopeSE66}
                studyPlanSE66={studyPlanSE66}
                allCurriculum={allCurriculum}
                handleChangeCurricuclum={handleChangeCurricuclum}
                YLOs={YLOs}
              />
            )}
            {pageState === 1 && <Recommendation jobRecommended={jobRecommended} jobCompetencies={jobCompetencies} />}
            {pageState === 2 && <StudentSystems />}
            {pageState === 3 && <Simulator />}
          </Box>
        </Box>
      </Main>
    </Box>
  )
}
FrontOffice.getLayout = page => <BlankLayout>{page}</BlankLayout>

// ssr
export async function getServerSideProps(context) {
  const { req } = context
  const cookies = req?.headers?.cookie
  const defaultCurri = 2
  var apiEndpoints
  if (cookies !== undefined && cookies?.split(';').find(cookie => cookie.trim().startsWith('curr='))) {
    const currByDropdown = cookies.split(';').find(cookie => cookie.trim().startsWith('curr='))
    const currId = parseInt(String(currByDropdown).split('=')[1], 10)
    apiEndpoints = [
      `/subject-job-relateds`,
      `/continue-subjects-curriculum/` + currId,
      `/subjects-by-curriculum/` + currId,
      `/curriculum-structures-v2/` + currId,
      `/study-plan-records/` + currId,
      `/job-positions`,
      '/curriculums',
      '/ylos/' + currId
    ]
  } else {
    apiEndpoints = [
      `/subject-job-relateds`,
      `/continue-subjects-curriculum/` + defaultCurri,
      `/subjects-by-curriculum/` + defaultCurri,
      `/curriculum-structures-v2/` + defaultCurri,
      `/study-plan-records/` + defaultCurri,
      `/job-positions`,
      '/curriculums',
      '/ylos/' + defaultCurri
    ]
  }

  const apiData = []

  for (let i = 0; i < apiEndpoints.length; i++) {
    try {
      const response = await axios.get(url.BASE_URL + apiEndpoints[i])
      apiData[i] = response.data.data || response.data // Assuming data is stored in a property named "data" for consistency

      // console.log(`Data from endpoint ${apiEndpoints[i]}:`, apiData[i])
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(`API request ${apiEndpoints[i]} returned a 404 status code. Handling it gracefully.`)
      } else {
        console.error(`Error fetching data for ${apiEndpoints[i]}:`, error.message)
      }
    }
  }

  const [
    jobRecommended,
    curriculumTree,
    subjectsSE66,
    curriculumScopeSE66,
    studyPlanSE66,
    jobCompetencies,
    allCurriculum,
    YLOs
  ] = apiData

  const propsObject = {
    jobRecommended: jobRecommended !== undefined ? jobRecommended : null,
    curriculumTree: curriculumTree !== undefined ? curriculumTree : null,
    subjectsSE66: subjectsSE66 !== undefined ? subjectsSE66 : null,
    curriculumScopeSE66: curriculumScopeSE66 !== undefined ? curriculumScopeSE66 : null,
    studyPlanSE66: studyPlanSE66 !== undefined ? studyPlanSE66 : null,
    jobCompetencies: jobCompetencies !== undefined ? jobCompetencies : null,
    allCurriculum: allCurriculum !== undefined ? allCurriculum : null,
    YLOs: YLOs !== undefined ? YLOs : null
  }

  // Your logic with the retrieved data
  // console.log('Data from endpoint jobRecommended:', jobRecommended)
  // console.log('Data from endpoint curriculumTree:', curriculumTree)
  // console.log('Data from endpoint subjectsSE66:', subjectsSE66)
  // console.log('Data from endpoint curriculumScopeSE66:', curriculumScopeSE66)
  // console.log('Data from endpoint studyPlanSE66:', studyPlanSE66)

  return {
    props: propsObject
  }
}
export default FrontOffice
