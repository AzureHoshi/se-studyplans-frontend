import { Box, Button, Card, Divider, Grid, Hidden, LinearProgress, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CustomLayout } from 'src/views/custom-layout-student-systems'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { BoxCutter } from 'mdi-material-ui'

ChartJS.register(ArcElement, Tooltip, Legend)

function StudentSystems() {
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

  return (
    <CustomLayout
      content={
        <Box sx={{ width: '100%', position: 'relative', background: grey[200], p: { xs: 6, md: 12 } }}>
          <Box sx={{ position: 'absolute', top: 360, right: 30, height: 80, width: 20 }}>
            <Button
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
              <Grid item xs={12} sm={5} lg={4}>
                <Card sx={{ height: 420, p: 6, pt: 4, minWidth: 260 }}>
                  <Typography sx={{ color: 'black' }}>Interested Result</Typography>
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
                      <Doughnut data={data} options={options} />
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
                      60%
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '75%' }}>
                      <Typography variant='body2' sx={{ fontWeight: 'bold', color: 'black' }}>
                        Software Engineer
                      </Typography>
                      <Typography variant='body2' sx={{ fontWeight: 'bold', color: 'black' }}>
                        60%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '75%' }}>
                      <Typography variant='body2'>IT Support</Typography>
                      <Typography variant='body2'>30% </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '75%' }}>
                      <Typography variant='body2'>Programmer</Typography>
                      <Typography variant='body2'>10% </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={7} lg={8}>
                <Card sx={{ height: 420, p: 6, pt: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                      <Typography sx={{ color: 'black' }} noWrap>
                        Study Plan
                      </Typography>
                      <Typography sx={{ ml: { xs: 0, md: 2.5 }, color: 'gray' }} noWrap>
                        Curriculum SE.66
                      </Typography>
                    </Box>

                    <Box sx={{ alignItems: 'end' }}>
                      <Button
                        size='medium'
                        variant={'contained'}
                        sx={{
                          px: 4,
                          mx: 'auto',
                          letterSpacing: 0.5,
                          fontSize: 12,
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
                      50% inprocess
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
        </Box>
      }
    />
  )
}
StudentSystems.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default StudentSystems
