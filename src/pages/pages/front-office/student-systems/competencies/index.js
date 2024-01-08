import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { url } from 'src/configs/urlConfig'
import { userProfile } from 'src/dummy'
import { CustomLayout } from 'src/views/custom-layout-student-systems'

function StudentComcetencies() {
  const [planRecords, setPlanRecords] = useState([])
  const URL_GET_PLAN_RECORDS = `${url.BASE_URL}/stu-acad-recs/${userProfile.std_no}`

  const [dummy, setDummy] = useState([
    { year: 1, semester: 1 },
    { year: 1, semester: 2 },
    { year: 2, semester: 1 },
    { year: 2, semester: 2 },
    { year: 3, semester: 1 },
    { year: 3, semester: 2 },
    { year: 4, semester: 1 },
    { year: 4, semester: 2 }
  ])

  const handleCreateYearFromCurrentPlan = (yearsArray, dummyArray) => {
    let updatedArray = [...dummyArray]

    yearsArray.forEach(dataYear => {
      const maxYear = Math.max(...updatedArray.map(item => item.year), 0)

      if (dataYear > maxYear && !updatedArray.find(item => item.year === dataYear)) {
        updatedArray = [...updatedArray, { year: dataYear, semester: 1 }, { year: dataYear, semester: 2 }]
      }
    })

    return updatedArray
  }

  useLayoutEffect(() => {
    try {
      axios
        .get(URL_GET_PLAN_RECORDS)
        .then(response => {
          // Handle successful response
          console.log('records', response.data.data)
          setPlanRecords(response.data.data)
          const onlyYearArr = response.data.data.map(d => d.stu_acad_rec_year)
          const addCurrentYear = handleCreateYearFromCurrentPlan(onlyYearArr, dummy)
          setDummy(addCurrentYear)
        })
        .catch(error => {
          // Handle error from the axios request
          console.error('Error fetching data:', error)
        })
    } catch (error) {
      // Handle unexpected errors (e.g., syntax errors, etc.)
      console.error('Unexpected error from plan records:', error)
      setPlanRecords([])
    }
  }, [])

  return (
    <CustomLayout
      content={
        <Box sx={{ width: '100%', position: 'relative', p: 6 }}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography variant='h6'>Competencies(สมรรถนะที่ได้จากแผนการเรียน)</Typography>
            </Grid>
            <Grid item xs={12} sx={{ pt: 6 }}>
              {dummy.map((d, index) => (
                <Card key={index} sx={{ mb: 6 }}>
                  <CardContent>
                    <Typography variant='h6' sx={{ mb: 2.5 }}>
                      ปีการศึกษา {d.year} เทอม {d.semester}
                    </Typography>
                    {planRecords?.find(
                      f => f.stu_acad_rec_year === d.year && f.stu_acad_rec_semester === d.semester
                    ) ? (
                      planRecords
                        ?.filter(pf => pf.stu_acad_rec_year === d.year && pf.stu_acad_rec_semester === d.semester)
                        .map(plan => (
                          <Grid container key={plan.stu_acad_rec_id}>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              sx={{ display: { xs: 'flex', lg: 'grid' }, mb: { xs: 0, lg: 2 } }}
                            >
                              <Typography variant='caption'> {plan.subject?.subject_code}</Typography>
                              <Typography variant='caption' sx={{ ml: { xs: 2, lg: 0 } }}>
                                {plan.subject?.subject_name_th}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant='caption'> competencies</Typography>
                              <Typography>-</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              {index + 1 !== dummy.length && <Divider sx={{ mt: 2 }} />}
                            </Grid>
                          </Grid>
                        ))
                    ) : (
                      <Grid container>
                        <Grid item xs={12} sx={{ display: { xs: 'flex', lg: 'grid' }, mb: { xs: 0, lg: 2 } }}>
                          <Typography variant='caption' color={grey[500]}>
                            ยังไม่มีรายวิชาในภาคเรียนนี้
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      }
    />
  )
}
StudentComcetencies.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default StudentComcetencies
