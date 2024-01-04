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
  TablePagination,
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

function StudentSystems({ InterestResult, curriculumScope, StudyPlanByStdNo }) {
  const [openFeedBack, setOpenFeedBack] = useState(false)
  const [interRestResult, setInterRestResult] = useState({
    labels: [],
    datasets: []
  })
  const [lastedSubjectSemester, setLastedSubjectsSemester] = useState([])
  const router = useRouter()

  const handleRoutetoUpdatePlan = () => {
    router.push('studyplans')
  }

  const mostRecentObject = lastedSubjectSemester.reduce((acc, current) => {
    const currentUpdatedAt = new Date(current.updated_at).getTime()
    const accUpdatedAt = acc ? new Date(acc.updated_at).getTime() : 0

    return currentUpdatedAt > accUpdatedAt ? current : acc
  }, null)

  const reformattedDate = new Date(mostRecentObject?.updated_at).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC' // Adjust the time zone as needed
  })

  const totalCreditByScope = curriculumScope.reduce((sum, currentItem) => {
    // Check if the subject property exists and has the subject_credit property
    if (currentItem.credit_total) {
      // Add the subject_credit to the sum
      return sum + currentItem.credit_total
    } else {
      // If the property is missing or doesn't have subject_credit, return the current sum
      return sum
    }
  }, 0)

  const totalCreditByLastedSemester = lastedSubjectSemester?.reduce((sum, currentItem) => {
    // Check if the subject property exists and has the subject_credit property
    if (currentItem.subject) {
      // Add the subject_credit to the sum
      return sum + currentItem.subject.subject_credit
    } else {
      // If the property is missing or doesn't have subject_credit, return the current sum
      return sum
    }
  }, 0)

  const totalCurrentSubjectCredit = StudyPlanByStdNo.reduce((sum, currentItem) => {
    // Check if the subject property exists and has the subject_credit property
    if (currentItem.subject && currentItem.subject.subject_credit) {
      // Add the subject_credit to the sum
      return sum + currentItem.subject.subject_credit
    } else {
      // If the property is missing or doesn't have subject_credit, return the current sum
      return sum
    }
  }, 0)

  function findMaxYearAndSemester(data) {
    if (!Array.isArray(data) || data.length === 0) {
      // Handle empty or invalid input
      return []
    }

    const maxYearSemester = data.reduce((acc, current) => {
      const currentYear = current.stu_acad_rec_year
      const currentSemester = current.stu_acad_rec_semester

      if (!acc || currentYear > acc.year || (currentYear === acc.year && currentSemester > acc.semester)) {
        return { year: currentYear, semester: currentSemester }
      } else {
        return acc
      }
    }, null)

    // Filter the array to get all objects with the max year and semester
    const maxYearSemesterObjects = data.filter(item => {
      return item.stu_acad_rec_year === maxYearSemester.year && item.stu_acad_rec_semester === maxYearSemester.semester
    })

    return maxYearSemesterObjects
  }
  console.log(findMaxYearAndSemester(StudyPlanByStdNo))

  function calculatePercentage(totalCurrentSubjectCredit, totalCreditByScope) {
    if (totalCreditByScope === 0) {
      // Handle division by zero to avoid errors
      return 0
    }

    const percentage = (totalCurrentSubjectCredit / totalCreditByScope) * 100
    return parseInt(percentage)
  }

  const handleOpenFeedBack = () => {
    setOpenFeedBack(true)
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

  useEffect(() => {
    if (!StudyPlanByStdNo) return
    setLastedSubjectsSemester(findMaxYearAndSemester(StudyPlanByStdNo))
  }, [StudyPlanByStdNo])

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
                        onClick={handleRoutetoUpdatePlan}
                        size='medium'
                        variant={'contained'}
                        sx={{
                          ml: 4,
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        {calculatePercentage(totalCurrentSubjectCredit, totalCreditByScope)}% inprocess
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        {totalCurrentSubjectCredit + '/' + totalCreditByScope + ' TotalCredit'}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant='determinate'
                      value={calculatePercentage(totalCurrentSubjectCredit, totalCreditByScope)}
                      sx={{ height: 10, borderRadius: 24, border: 1, borderColor: orange[200] }}
                    />
                  </Box>
                  {/* show studyplan */}
                  <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}>
                    <Grid container>
                      <Grid item xs={12} lg={8}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', lg: 'start' } }}>
                          <Typography variant='caption' mr={6} noWrap>
                            {'ปี: ' +
                              lastedSubjectSemester[0]?.stu_acad_rec_year +
                              ' เทอม:' +
                              lastedSubjectSemester[0]?.stu_acad_rec_semester}
                          </Typography>
                          <Typography variant='caption' mr={6} noWrap>
                            {lastedSubjectSemester?.length} subjects
                          </Typography>
                          <Typography variant='caption' noWrap>
                            {totalCreditByLastedSemester} total credit
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={4} sx={{ textAlign: 'end' }}>
                        <Typography variant='caption' noWrap>
                          {reformattedDate}
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
                  {lastedSubjectSemester?.slice(0, 3).map((currentSubject, index) => (
                    <Box key={currentSubject.stu_acad_rec_id}>
                      <Box sx={{ mt: 3.5, display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant='caption' sx={{ width: '30%' }} noWrap>
                            {currentSubject.subject.subject_code}
                          </Typography>
                          <Typography variant='caption' sx={{ width: '70%' }} noWrap>
                            {currentSubject.subject.subject_name_th}
                          </Typography>
                        </Box>
                        <Typography variant='caption' sx={{ width: '40%', fontWeight: 'bold', textAlign: 'end' }}>
                          {currentSubject.subject.subject_credit}
                        </Typography>
                      </Box>
                      {index + 1 !== 3 && <Divider />}
                    </Box>
                  ))}
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    Project Recommended
                  </Typography>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    component='div'
                    size='small'
                    count={6}
                    rowsPerPage={5}
                    page={1}
                    onPageChange={() => null}
                  />
                </Box>
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
                    <Box sx={{ position: 'absolute', top: '55%', left: '43%', transform: 'translate(-50%, -50%)' }}>
                      <img
                        src='/images/feedback/mail.png'
                        alt='Description of the image'
                        style={{ width: '110%', height: 'auto' }}
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
  var InterestResult = []
  var StudyPlanByStdNo = []
  var curriculumScope = []

  try {
    // Make multiple API requests concurrently using Promise.all
    const [resInterestResult, resStudyPlan, resCurriculumSE66Scope] = await Promise.all([
      axios.get(url.BASE_URL + `/interest-results/` + userProfile.std_no),
      axios.get(url.BASE_URL + `/stu-acad-recs/` + userProfile.std_no),
      axios.get(url.BASE_URL + `/curriculum-structures-v2/` + userProfile.curriculum_id)
    ])

    // Process data from responses
    InterestResult = resInterestResult.data
    StudyPlanByStdNo = resStudyPlan.data.data
    curriculumScope = resCurriculumSE66Scope.data.data

    // Your logic with the retrieved data

    console.log('Data from endpoint InterestResult:', InterestResult)
    console.log('Data from endpoint StudyPlanByStdNo:', StudyPlanByStdNo)
    console.log('Data from endpoint curriculumScope:', curriculumScope)
  } catch (errorArray) {
    // Handle errors separately for each API request
    console.error('Error fetching data concurrently:', errorArray.message)
  }

  return {
    props: {
      InterestResult: InterestResult,
      StudyPlanByStdNo: StudyPlanByStdNo,
      curriculumScope: curriculumScope
    }
  }
}

export default StudentSystems
