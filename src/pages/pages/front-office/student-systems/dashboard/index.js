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
  List,
  ListItem,
  ListItemText,
  MenuItem,
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
import {
  mdiClose,
  mdiArrowTopRight,
  mdiNewspaper,
  mdiNewspaperVariantMultipleOutline,
  mdiTextBoxSearchOutline
} from '@mdi/js'
import Icon from '@mdi/react'
import { url } from 'src/configs/urlConfig'
import { userProfile } from 'src/dummy'
import axios from 'axios'
import router, { useRouter } from 'next/router'
import { Selection } from 'src/components'
import { handleCheckLogin, handleGetUser } from 'src/authentication'
import { useGlobalContext } from 'src/configs/context'
import ModalProjectDetails from 'src/views/std-dashboard/ModalProjectDetails'

ChartJS.register(ArcElement, Tooltip, Legend)

function StudentSystems({ InterestResult, curriculumScope, StudyPlanByStdNo, jobRecommended }) {
  const { state } = useGlobalContext()
  const [openFeedBack, setOpenFeedBack] = useState(false)
  const [jobPosition, setJobPosition] = useState([])
  const [jobSelected, setJobSelected] = useState([])
  const [interRestResult, setInterRestResult] = useState({
    labels: [],
    datasets: []
  })
  const [feedback, setFeedback] = useState('')
  const [lastedSubjectSemester, setLastedSubjectsSemester] = useState([])
  const [projectRecommended, setProjectRecommended] = useState([])
  const [page, setPage] = useState(0)
  const [projectId, setProjectId] = useState(0)
  const [openProjectDetails, setOpenProjectDetails] = useState(false)
  const [rowPerpage, setRowPerPage] = useState(6)
  const router = useRouter()

  const handleGetProjectId = proId => {
    setProjectId(proId)
    setOpenProjectDetails(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleRoutetoUpdatePlan = () => {
    router.push('studyplans')
  }
  const handleLinkClick = path => {
    window.open(path, '_blank')
  }

  const handleSubmitFeedBack = (text, collegianCode) => {
    if (!text || !collegianCode) return
    const postFeedBackURL = `${url.BASE_URL}/feedback-records`
    var isError = false
    try {
      const resFeedBack = axios.post(postFeedBackURL, {
        collegian_code: String(collegianCode),
        feedback_record_answer: String(text)
      })
      // console.log('resFeedBack', resFeedBack.data)
    } catch (error) {
      // console.log('err from feedback', error)
      isError = true
    }
    if (!isError) {
      alert('Thank you for your feedback')
      setFeedback('')
      setOpenFeedBack(false)
    }
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

  // Check if StudyPlanByStdNo is null, if so, return 0
  const totalCurrentSubjectCredit =
    StudyPlanByStdNo === null || StudyPlanByStdNo === undefined
      ? 0
      : StudyPlanByStdNo.reduce((sum, currentItem) => {
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
  // console.log(findMaxYearAndSemester(StudyPlanByStdNo))

  function calculatePercentage(totalCurrentSubjectCredit, totalCreditByScope) {
    if (totalCreditByScope === 0) {
      // Handle division by zero to avoid errors
      return 0
    }

    const percentage = (totalCurrentSubjectCredit / totalCreditByScope) * 100

    if (percentage) return parseInt(percentage)
    else return 0
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
    axios
      .get(url.COLLAB_URL.project + `/getallprojectrecommend`)
      // .then(response => console.log('test', response.data))
      .then(response => setProjectRecommended(response.data?.projectlist))

      .catch(err => {
        console.log('An error occurred. Awkward.. : ', err)
      })
  }, [])
  // console.log('getallprojectrecommend', projectRecommended)

  useLayoutEffect(() => {
    if (jobRecommended && interRestResult) {
      // console.log('jobRecommended', jobRecommended)
      const uniqueJobPositions = jobRecommended?.reduce((result, currentItem, index) => {
        const { job_position_id, job_position } = currentItem
        if (!result[job_position_id]) {
          result[job_position_id] = { index: index, ...job_position }
        }
        return result
      }, {})
      const sortData = Object.values(uniqueJobPositions)?.sort((a, b) => {
        const positionA = interRestResult.labels.indexOf(a.job_position_name)
        const positionB = interRestResult.labels.indexOf(b.job_position_name)

        // If both positions are in the labels array, compare their positions
        if (positionA !== -1 && positionB !== -1) {
          return positionA - positionB
        }

        // If only one of them is in the labels array, prioritize it
        if (positionA !== -1) {
          return -1
        }

        if (positionB !== -1) {
          return 1
        }

        // If none of them are in the labels array, maintain their original order
        return 0
      })

      setJobPosition(sortData)
      // const firstItem = Object.values(uniqueJobPositions).sort((a, b) => interRestResult.labels === a.job_position_name)
      setJobSelected(sortData[0])
      // console.log('interRestResult', interRestResult)
      // console.log(Object.values(uniqueJobPositions))
    }
  }, [jobRecommended, interRestResult])

  // console.log('jobRecommended', jobRecommended)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        // You can adjust the breakpoint (960) for your specific use case
        setRowPerPage(2)
      } else {
        setRowPerPage(6)
      }
    }

    // Initial call to set the initial rowPerPage value
    handleResize()

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  useEffect(() => {
    // console.log('InterestResult', InterestResult)
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
    // console.log('newObject', newObject)
  }, [InterestResult])

  useEffect(() => {
    if (!StudyPlanByStdNo) return
    setLastedSubjectsSemester(findMaxYearAndSemester(StudyPlanByStdNo))
  }, [StudyPlanByStdNo])

  return (
    <CustomLayout
      content={
        <Box sx={{ width: '100%', position: 'relative', background: grey[200], p: 6 }}>
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
            <Grid container item spacing={6} xs={12} lg={9} sx={{ pr: { xs: 0, lg: 2.5 } }}>
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
                    {lastedSubjectSemester[0] !== undefined && (
                      <Grid container>
                        <Grid item xs={12} lg={8}>
                          <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', lg: 'start' } }}>
                            <Typography variant='caption' mr={lastedSubjectSemester[0] === undefined ? 0 : 6} noWrap>
                              {'ปี: ' +
                                String(lastedSubjectSemester[0]?.stu_acad_rec_year) +
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
                        <Grid item xs={12} lg={4} sx={{ textAlign: 'end', overflow: 'hidden' }}>
                          <Typography variant='caption' noWrap>
                            {reformattedDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
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
                  <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 6 }}>
                    Project Recommended
                  </Typography>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    component='div'
                    size='small'
                    count={projectRecommended?.length || 0}
                    rowsPerPage={rowPerpage}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </Box>
                <Grid container item xs={12} sx={{ mt: 2, height: 500 }} spacing={6}>
                  {projectRecommended &&
                    projectRecommended.length > 0 &&
                    projectRecommended?.slice(page * rowPerpage, page * rowPerpage + rowPerpage).map(project => (
                      <Grid key={project?.project_id} item xs={12} md={6} lg={4}>
                        <Card sx={{ height: 200, background: 'white' }}>
                          <Box
                            sx={{
                              height: 30,
                              background: 'lightgray',
                              width: '100%',
                              textAlign: 'end',
                              pr: 2.5
                            }}
                          >
                            <Typography
                              variant='caption'
                              sx={{
                                minWidth: 80,
                                color: 'gray',
                                display: 'inline' // Ensure inline display
                              }}
                            >
                              {new Date(project?.created_datetime).toLocaleDateString()}
                            </Typography>
                          </Box>
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
                                flexDirection: 'column',
                                backgroundColor: grey[200],
                                p: 2
                              }}
                            >
                              <Typography
                                variant='body2'
                                sx={{
                                  maxWidth: 300,
                                  ml: 1,
                                  fontWeight: 'bold',
                                  color: 'gray',
                                  display: 'inline' // Ensure inline display
                                }}
                                noWrap
                              >
                                {project?.project_code} {`ประเภท: ` + project?.type_name}
                              </Typography>
                            </Box>
                            <Box sx={{ m: 2, ml: 1.5, p: 1, display: 'flex', flexDirection: 'column' }}>
                              <Typography variant='caption' sx={{ display: 'inline', fontWeight: 'bold', height: 40 }}>
                                <Typography variant='caption' sx={{ display: 'inline' }}>
                                  {project?.project_name_th}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box sx={{ width: '100%', textAlign: 'end', pr: 4 }}>
                              <Button
                                // onClick={() => handleGetProjectId(project?.project_id)}
                                variant={'contained'}
                                sx={{
                                  mx: 'auto',
                                  mt: 2,
                                  mr: 2,
                                  backgroundColor: 'primary'
                                }}
                              >
                                <Icon path={mdiArrowTopRight} size={0.7} />
                              </Button>
                              <Button
                                onClick={() => handleGetProjectId(project?.project_id)}
                                variant={'contained'}
                                sx={{
                                  mx: 'auto',
                                  mt: 2,
                                  letterSpacing: 2,
                                  fontSize: 10,
                                  backgroundColor: 'black'
                                }}
                              >
                                Details
                              </Button>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
            {/* reform shortcut */}
            <Grid item xs={12} lg={3} sx={{ px: { xs: 0, lg: 3.5 }, mt: { xs: 6, lg: 0 } }}>
              <Card sx={{ height: 535, background: 'white', mb: 6, textAlign: 'start', p: 4, pt: 0 }}>
                <Typography variant='body2' color={grey[500]} sx={{ mb: 2, mt: 6 }}>
                  Recommend Subjects By Job
                </Typography>

                <Selection
                  height={40}
                  width={'100%'}
                  selectionValue={jobSelected}
                  handleChange={e => {
                    setJobSelected(e.target.value)
                  }}
                  Items={jobPosition?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.job_position_name}
                    </MenuItem>
                  ))}
                />
                <List sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: 400, pb: 6 }}>
                  {jobRecommended
                    ?.filter(f => f.job_position_id === jobSelected.job_position_id)
                    .map((subjectRelated, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'row', lg: 'column' },
                          alignItems: 'start',
                          background: grey[100],
                          borderBottom: 1,
                          borderColor: grey[300]
                        }}
                      >
                        <Typography variant='caption' noWrap sx={{ mr: { xs: 12, lg: 0 }, fontWeight: 'bold' }}>
                          {subjectRelated.subject.subject_code}
                          {subjectRelated.subject_structures[0]?.subject_category_id === 1
                            ? ' ศึกษาทั่วไป'
                            : subjectRelated.subject_structures[0]?.subject_category_id === 2
                            ? ' วิชาเฉพาะ'
                            : null}
                        </Typography>
                        <Typography variant='caption' sx={{ maxWidth: 240 }} noWrap>
                          {subjectRelated.subject.subject_name_th}
                        </Typography>
                      </ListItem>
                    ))}
                </List>
              </Card>
              <Card
                sx={{
                  height: 120,
                  background: `linear-gradient(to top right, ${grey[300]} 50%, transparent 80%)`,
                  mb: 6,
                  textAlign: 'center',
                  position: 'relative',
                  ':hover': { cursor: 'pointer', opacity: 0.7 }
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    position: 'absolute',
                    top: 11.5,
                    left: -50,
                    background: 'white',
                    borderRadius: 2,
                    width: 170,
                    height: '80%',
                    opacity: 0.8
                  }}
                >
                  <Icon
                    path={mdiNewspaperVariantMultipleOutline}
                    size={3.2}
                    color='gray'
                    style={{ marginLeft: 40, marginTop: 6, opacity: 0.4 }}
                  />
                </Box>
                <Box sx={{ position: 'absolute', top: 0, left: 150 }}>
                  <Typography variant='body2' sx={{ my: 12, fontWeight: 'bold', letterSpacing: 0.5 }}>
                    CE Reform Portal
                  </Typography>
                </Box>
              </Card>
              <Card
                onClick={() => handleLinkClick('http://128.199.147.134:3003/')}
                sx={{
                  height: 120,
                  background: `linear-gradient(to top right, ${grey[300]} 50%, transparent 80%)`,
                  mb: 6,
                  textAlign: 'center',
                  position: 'relative',
                  ':hover': { cursor: 'pointer', opacity: 0.7 }
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    position: 'absolute',
                    top: 11.5,
                    left: -50,
                    background: 'white',
                    borderRadius: 2,
                    width: 170,
                    height: '80%',
                    opacity: 0.8
                  }}
                >
                  <Icon
                    path={mdiTextBoxSearchOutline}
                    size={3.2}
                    color='gray'
                    style={{ marginLeft: 40, marginTop: 6, opacity: 0.4 }}
                  />
                </Box>
                <Box sx={{ position: 'absolute', top: 0, left: 150 }}>
                  <Typography variant='body2' sx={{ my: 12, fontWeight: 'bold', letterSpacing: 0.5 }}>
                    Pre-Project/Project
                  </Typography>
                </Box>
              </Card>

              <Typography variant='caption'>
                <p style={{ textAlign: 'justify' }}>
                  มทร.ล้านนา การจัดทำโครงการระบบการจัดการสารสนเทศเพื่อการเรียน การสอน :
                  กรณีศึกษาหลักสูตรวิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เพื่อพัฒนาระบบของหลักสูตร
                  ขึ้นมาเพื่อที่จะใช้เทคโนโลยีทางด้านวิศวกรรมมาพัฒนาระบบการศึกษาและ วิจัยร่วมระหว่าง ภาครัฐ ภาคเอกชน และ
                  ภาคการศึกษา มาจัดการเพื่อเพิ่มประสิทธิภาพการจัดการเรียนการสอน ให้มีความ เข้าใจง่าย
                  และเข้าถึงข้อมูลของหลักสูตรได้ เพื่อตอบสนองต่อผู้ใช้งานระบบ และผู้พัฒนาระบบ
                  ซึ่งจะสามารถแบ่งประเด็นที่จะนำเอาเทคโนโลยีมาใช้ในการพัฒนาระบบที่ตอบสนองต่อผู้ใช้งาน
                </p>
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
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
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
                    <Button
                      onClick={() => handleSubmitFeedBack(feedback, state?.userData?.col_code)}
                      variant='contained'
                      fullWidth
                    >
                      Send Feedback
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <ModalProjectDetails
            open={openProjectDetails}
            handleClose={() => setOpenProjectDetails(false)}
            projectId={projectId}
          />
        </Box>
      }
    />
  )
}
StudentSystems.getLayout = page => <BlankLayout>{page}</BlankLayout>

// ssr
export async function getServerSideProps(context) {
  const { req } = context

  const checkIsLogin = await handleCheckLogin(req)
  // console.log('checkIsLogin', checkIsLogin)

  if (!checkIsLogin) {
    return {
      redirect: {
        destination: '/pages/login/', // if is not login return login path
        permanent: false
      }
    }
  }

  const userByToken = await handleGetUser(req)
  // console.log('checkUser', userByToken)

  const apiEndpoints = [
    `/interest-results/${userByToken.col_code}`,
    `/stu-acad-recs/${userByToken.col_code}`,
    `/curriculum-structures-v2/${userByToken.curriculum_id}`,
    `/subject-job-relateds`
  ]

  const apiData = []

  for (let i = 0; i < apiEndpoints.length; i++) {
    try {
      const response = await axios.get(url.BASE_URL + apiEndpoints[i])
      apiData[i] = i !== 0 ? response.data.data : response.data // Assuming data is stored in a property named "data" for consistency

      // console.log(`Data from endpoint ${apiEndpoints[i]}:`, apiData[i])
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(`API request ${apiEndpoints[i]} returned a 404 status code. Handling it gracefully.`)
      } else {
        console.error(`Error fetching data for ${apiEndpoints[i]}:`, error.message)
      }
    }
  }

  const [InterestResult, StudyPlanByStdNo, curriculumScope, jobRecommended] = apiData

  // Continue with the logic only if InterestResult is available
  if (InterestResult === undefined) {
    return {
      redirect: {
        destination: '/pages/front-office/student-systems/interest-survey/',
        permanent: false
      }
    }
  }
  // Replace undefined variables with null in the props object
  const propsObject = {
    InterestResult,
    StudyPlanByStdNo: StudyPlanByStdNo !== undefined ? StudyPlanByStdNo : null,
    curriculumScope: curriculumScope !== undefined ? curriculumScope : null,
    jobRecommended: jobRecommended !== undefined ? jobRecommended : null
  }
  return {
    props: propsObject
  }
}
export default StudentSystems
