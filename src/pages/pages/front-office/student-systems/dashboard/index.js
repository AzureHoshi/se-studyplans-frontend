import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CustomLayout } from 'src/views/custom-layout-student-systems'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useEffect, useLayoutEffect, useState } from 'react'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { url } from 'src/configs/urlConfig'
import { userProfile } from 'src/dummy'
import axios from 'axios'
import router, { useRouter } from 'next/router'

ChartJS.register(ArcElement, Tooltip, Legend)

function StudentSystems({ InterestResult }) {
  const router = useRouter()
  const [openFeedBack, setOpenFeedBack] = useState(false)
  const [interRestResult, setInterRestResult] = useState({
    labels: [],
    datasets: []
  })

  const handleOpenFeedBack = () => {
    setOpenFeedBack(true)
  }

  const data = {
    labels: ['Software Engineering', 'IT Support', 'Programmer'],
    datasets: [
      {
        label: '  % Interested',
        data: [60, 30, 10],
        backgroundColor: ['rgba(40, 40, 40, 1)', 'rgba(160, 160, 160, 1)', 'rgba(200, 200, 200, 1)'], // 40% opacity gray],
        borderWidth: 6,
        borderRadius: 100
      }
    ]
  }

  let options = {
    // responsive: true,
    cutout: '80%',
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'bottom'
      }
    }
  }

  useEffect(() => {
    console.log('InterestResult', InterestResult)
    const newObject = {
      labels: InterestResult?.labels,
      datasets: [
        {
          label: '  % Interested',
          data: InterestResult?.data,
          backgroundColor: ['rgba(40, 40, 40, 1)', 'rgba(160, 160, 160, 1)', 'rgba(200, 200, 200, 1)'], // 40% opacity gray],
          borderWidth: 6,
          borderRadius: 100
        }
      ]
    }
    setInterRestResult(newObject)
    console.log('newObject', newObject)
  }, [InterestResult])

  return (
    <CustomLayout
      content={
        <Box sx={{ width: '100%', position: 'relative', background: grey[200], p: { xs: 6, md: 12 } }}>
          <Box sx={{ position: 'absolute', top: 360, right: 30, height: 80, width: 20 }}>
            <Button
              onClick={handleOpenFeedBack}
              variant='contained'
              color='primary'
              sx={{ textTransform: 'capitalize', transform: 'rotate(-90deg)' }}
            >
              Feedback
            </Button>
          </Box>
          <Grid container>
            {/* dashbord  */}
            <Grid container item spacing={10} xs={12} lg={9} sx={{ pr: { xs: 0, lg: 10 } }}>
              <Grid item xs={12} sm={5} lg={5}>
                {interRestResult?.labels?.length > 0 ? (
                  <Card sx={{ height: 420, p: 6, pt: 4, minWidth: 260 }}>
                    <Typography sx={{ color: 'black', fontFamily: 'Segoe UI' }}>Interested Result</Typography>
                    <Box
                      sx={{
                        width: '100%',
                        mt: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      {/* <PieChart series={[{ data, innerRadius: 80 }]} {...size} /> */}

                      <Box sx={{ width: '100%', height: 180, mt: 12 }}>
                        <Doughnut data={interRestResult} options={options} />
                      </Box>
                      <Typography
                        sx={{
                          color: 'black',
                          fontSize: 24,
                          fontWeight: 'medium',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {InterestResult?.data[0] + '%'}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 6,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      {[0, 1, 2].map(index => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '75%' }}>
                          <Typography
                            variant='caption'
                            sx={{ color: index === 0 ? 'black' : 'gray', pr: 2, maxWidth: 220 }}
                            noWrap
                          >
                            {InterestResult?.labels[index]}
                          </Typography>
                          <Typography variant='caption' sx={{ fontWeight: 'bold', color: 'black' }}>
                            {InterestResult?.data[index] + '%'}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Card>
                ) : (
                  <Card sx={{ height: 420, p: 6, pt: 4, minWidth: 260 }}>
                    <Typography sx={{ color: 'black', fontFamily: 'Segoe UI' }}>Interested Result</Typography>
                    <Box
                      sx={{
                        width: '100%',
                        mt: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      No Data
                    </Box>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} sm={7} lg={7}>
                <Card sx={{ height: 420, p: 6, pt: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                      <Typography sx={{ color: 'black', fontFamily: 'Segoe UI' }} noWrap>
                        Study Plan
                      </Typography>
                      <Typography sx={{ ml: { xs: 0, md: 2.5 }, color: 'gray' }} noWrap>
                        Curriculum SE.66
                      </Typography>
                    </Box>

                    <Box sx={{ alignItems: 'end', minWidth: 120 }}>
                      <Button
                        size='medium'
                        variant={'contained'}
                        sx={{
                          px: 4,
                          mx: 'auto',
                          letterSpacing: 0.5,
                          fontSize: 10,
                          backgroundColor: 'black'
                        }}
                      >
                        Update Plan
                      </Button>
                    </Box>
                  </Box>
                  {/* show percentage of studyplan */}
                  <Box sx={{ width: '100%', mt: 6 }}>
                    <Typography variant='body2' sx={{ mb: 2 }}>
                      25% inprocess
                    </Typography>
                    <LinearProgress
                      variant='determinate'
                      value={25}
                      sx={{ height: 10, borderRadius: 24, border: 1, borderColor: orange[200] }}
                    />
                  </Box>
                  {/* show studyplan */}
                  <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}>
                    <Grid container>
                      <Grid item xs={12} lg={8}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', lg: 'start' } }}>
                          <Typography variant='caption' mr={6} noWrap>
                            2/2023
                          </Typography>
                          <Typography variant='caption' mr={6} noWrap>
                            3 subjects
                          </Typography>
                          <Typography variant='caption' noWrap>
                            9 total credit
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={4} sx={{ textAlign: 'end' }}>
                        <Typography variant='caption' noWrap>
                          2026-11-05 08:15:30
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ mt: 3.5, display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='caption' sx={{ width: '30%', fontWeight: 'bold' }}>
                        Code
                      </Typography>
                      <Typography variant='caption' sx={{ width: '70%', fontWeight: 'bold' }}>
                        Subject
                      </Typography>
                    </Box>
                    <Typography variant='caption' sx={{ width: '40%', fontWeight: 'bold', textAlign: 'end' }}>
                      Credit
                    </Typography>
                  </Box>

                  <Divider />
                  {Array.from({ length: 3 }, (_, index) => (
                    <Box key={index}>
                      <Box sx={{ mt: 3.5, display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant='caption' sx={{ width: '30%' }} noWrap>
                            ENGCEXXX
                          </Typography>
                          <Typography variant='caption' sx={{ width: '70%' }} noWrap>
                            Something...................
                          </Typography>
                        </Box>
                        <Typography variant='caption' sx={{ width: '40%', fontWeight: 'bold', textAlign: 'end' }}>
                          3
                        </Typography>
                      </Box>
                      {index + 1 !== 3 && <Divider />}
                    </Box>
                  ))}
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Project Recommended
                </Typography>
                <Grid container item xs={12} sx={{ mt: 2 }} spacing={6}>
                  {Array.from({ length: 6 }, (_, index) => (
                    <Grid key={index} item xs={12} md={6} lg={4}>
                      <Card sx={{ height: 200, background: 'white' }}>
                        <Box
                          sx={{
                            height: 30,
                            background: 'lightgray',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        ></Box>
                        <Box
                          // onClick={() => handleOpenDetails(value)}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              backgroundColor: grey[200],
                              p: 2,
                              pl: 1.5
                            }}
                          >
                            <Typography
                              variant='body2'
                              sx={{
                                maxWidth: 300,
                                ml: 1.5,
                                fontWeight: 'bold',
                                color: 'gray',
                                display: 'inline' // Ensure inline display
                              }}
                              noWrap
                            >
                              Project Name Project Name Project Name
                            </Typography>
                            <Typography
                              variant='caption'
                              sx={{
                                minWidth: 80,
                                color: 'gray',
                                display: 'inline' // Ensure inline display
                              }}
                            >
                              2023-07-16
                            </Typography>
                          </Box>
                          <Box sx={{ m: 2, ml: 1.5, p: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='caption' sx={{ display: 'inline', fontWeight: 'bold' }}>
                              ENGCEXX
                              <Typography variant='caption' sx={{ display: 'inline', ml: 6 }} noWrap>
                                Subject Name...........................
                              </Typography>
                            </Typography>

                            <Typography variant='caption' sx={{ display: 'inline', fontWeight: 'bold' }}>
                              ENGCEXX
                              <Typography variant='caption' sx={{ display: 'inline', ml: 6 }} noWrap>
                                Subject Name...........................
                              </Typography>
                            </Typography>
                          </Box>
                          <Button
                            variant={'contained'}
                            sx={{
                              width: '80%',
                              mx: 'auto',
                              mt: 2,
                              letterSpacing: 2,
                              fontSize: 12,
                              backgroundColor: 'black'
                            }}
                          >
                            Details
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            {/* reform shortcut */}
            <Grid item xs={12} lg={3} sx={{ background: 'white', p: 3.5, mt: { xs: 6, lg: 0 } }}>
              <Card sx={{ height: 120, background: grey[300], mb: 6, textAlign: 'center' }}>
                <Typography variant='body2' color={grey[500]} sx={{ my: 12 }}>
                  Reform Shortcut
                </Typography>
              </Card>
              <Card sx={{ height: 120, background: grey[300], mb: 6, textAlign: 'center' }}>
                <Typography variant='body2' color={grey[500]} sx={{ my: 12 }}>
                  Reform Shortcut
                </Typography>
              </Card>
              <Card sx={{ height: 120, background: grey[300], mb: 6, textAlign: 'center' }}>
                <Typography variant='body2' color={grey[500]} sx={{ my: 12 }}>
                  Reform Shortcut
                </Typography>
              </Card>
              <Typography variant='caption' sx={{ textAlign: 'justify' }}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web
                designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have
                scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually
              </Typography>
              <Divider />
            </Grid>
          </Grid>
          <Dialog maxWidth={'md'} fullWidth open={openFeedBack} onClose={() => setOpenFeedBack(false)}>
            <DialogContent sx={{ height: 500, overflow: 'hidden' }}>
              <Grid container sx={{ px: 6, pl: 2, pt: 3, position: 'relative' }}>
                <IconButton
                  sx={{
                    p: 0,
                    color: grey[700],
                    borderRadius: 1,
                    m: 1,
                    ml: 6,
                    fontSize: 16,
                    p: 2,
                    position: 'absolute',
                    right: 0,
                    top: 0
                  }}
                  onClick={() => {
                    setOpenFeedBack(false)
                  }}
                >
                  <Icon path={mdiClose} size={1} />
                </IconButton>
                <Hidden mdDown>
                  <Grid item xs={6} sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: -15, bottom: -60 }}>
                      <img
                        src='https://img.freepik.com/free-vector/like-icon-3d-vector-illustration-heart-symbol-red-bubble-social-media-applications-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1695.jpg?w=826&t=st=1703657164~exp=1703657764~hmac=2c8cfdfa08d33fb0e7742e6ffeb4b26a3b993686189011951b21a64d7ba87236'
                        alt='Description of the image'
                        style={{ width: '105%', height: 'auto' }}
                      />
                    </Box>
                  </Grid>
                </Hidden>
                <Grid item xs={12} md={6} sx={{ px: 3.5, py: 8 }}>
                  <Typography
                    variant='h3'
                    sx={{
                      fontSize: { xs: 38, md: 36 },
                      pl: { xs: 0, md: 2 },
                      py: 3.5,
                      fontWeight: 'bold',
                      letterSpacing: 0.5,
                      // fontFamily: 'Segoe UI',
                      fontFamily: 'Inter',
                      textAlign: { xs: 'center', md: 'start' }
                    }}
                  >
                    Feedback
                  </Typography>
                  <Box sx={{ m: 3.5 }}>
                    <TextField
                      multiline
                      label={'message'}
                      fullWidth
                      size='small'
                      inputProps={{
                        style: {
                          height: 180,
                          padding: '0 2px'
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', m: 3.5, mt: 6 }}>
                    <Button variant='contained' fullWidth>
                      Send Feedback
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Box>
      }
    />
  )
}
StudentSystems.getLayout = page => <BlankLayout>{page}</BlankLayout>

// ssr
export async function getServerSideProps() {
  const resInterestResult = await axios.get(url.BASE_URL + `/interest-results/` + userProfile.std_no)
  // if didn't answer the survey redirect to survay page
  if (resInterestResult.data.labels.length === 0) {
    // router.push('/pages/front-office/student-systems/interest-survey/')
    return {
      redirect: {
        destination: '/pages/front-office/student-systems/interest-survey/',
        permanent: false // Set to true for permanent redirection
      }
    }
  }
  return {
    props: {
      InterestResult: resInterestResult.data
    }
  }
}

export default StudentSystems
