import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useGlobalContext } from 'src/configs/context'
import { url } from 'src/configs/urlConfig'
import { userProfile } from 'src/dummy'
import { CustomLayout } from 'src/views/custom-layout-student-systems'

function StudentComcetencies() {
  const { state } = useGlobalContext()
  const [planRecords, setPlanRecords] = useState([])
  const [openDesc, setOpenDesc] = useState(false)

  const [getSubPlo, setGetSubPlo] = useState([])
  const URL_GET_PLAN_RECORDS = `${url.BASE_URL}/stu-acad-recs/`

  const [dummy, setDummy] = useState([
    { year: 1, semester: 1 },
    { year: 1, semester: 2 },
    { year: 1, semester: 3 },
    { year: 2, semester: 1 },
    { year: 2, semester: 2 },
    { year: 2, semester: 3 },
    { year: 3, semester: 1 },
    { year: 3, semester: 2 },
    { year: 3, semester: 3 },
    { year: 4, semester: 1 },
    { year: 4, semester: 2 },
    { year: 4, semester: 3 }
  ])

  const handleOpenSubPLODesc = subPLO => {
    setGetSubPlo(subPLO)
    setOpenDesc(true)
  }

  const handleCreateYearFromCurrentPlan = (yearsArray, dummyArray) => {
    let updatedArray = [...dummyArray]

    yearsArray.forEach(dataYear => {
      const maxYear = Math.max(...updatedArray.map(item => item.year), 0)

      if (dataYear > maxYear && !updatedArray.find(item => item.year === dataYear)) {
        updatedArray = [
          ...updatedArray,
          { year: dataYear, semester: 1 },
          { year: dataYear, semester: 2 },
          { year: dataYear, semester: 3 }
        ]
      }
    })

    return updatedArray
  }

  useLayoutEffect(() => {
    if (state?.userData !== null) {
      try {
        axios
          .get(URL_GET_PLAN_RECORDS + state?.userData?.col_code)
          .then(response => {
            // Handle successful response
            console.log('records', response.data.data)
            setPlanRecords(response.data.data)
            const onlyYearArr = response.data.data.map(d => d.stu_acad_rec_year)
            const addCurrentYear = handleCreateYearFromCurrentPlan(onlyYearArr, dummy)
            setDummy(addCurrentYear)
            console.log('addCurrentYear', addCurrentYear)
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
    }
  }, [state])

  console.log('planRecords', planRecords)

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
                      ปีการศึกษา {d.year} เทอม {d.semester} {d.semester === 3 && '(summer)'}
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
                              sm={12}
                              md={3}
                              sx={{ display: { xs: 'flex', lg: 'grid' }, mb: { xs: 0, lg: 2 } }}
                            >
                              <Typography variant='caption'> {plan.subject?.subject_code}</Typography>
                              <Typography variant='caption' sx={{ ml: { xs: 2, lg: 0 } }}>
                                {plan.subject?.subject_name_th}
                              </Typography>
                            </Grid>
                            {/* <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography variant='caption'> competencies</Typography>
                              {plan?.competencies.length > 0 ? (
                                plan?.competencies?.map(c => (
                                  <Typography variant={'caption'} key={c.competency_id}>
                                    -{c.competency_name}
                                  </Typography>
                                ))
                              ) : (
                                <Typography>-</Typography>
                              )}
                            </Grid> */}
                            {plan?.sub_plo_mappings?.length !== 0 && (
                              <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Hidden mdDown>
                                  <Typography variant='caption'> sub-plo</Typography>
                                </Hidden>
                                <Typography variant={'caption'} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                  [ {plan?.sub_plo_mappings?.map(mapSubPlo => mapSubPlo.sub_plo?.sub_plo_title + ',')}]
                                  <Typography
                                    onClick={() => handleOpenSubPLODesc(plan)}
                                    variant='caption'
                                    sx={{
                                      ml: 2,
                                      '&:hover': {
                                        cursor: 'pointer',
                                        textDecoration: 'underline' // You can customize the styles as needed
                                      }
                                    }}
                                  >
                                    คลิกแสดงคำอธิบาย
                                  </Typography>
                                </Typography>
                              </Grid>
                            )}
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
          <Dialog
            maxWidth={'lg'}
            fullWidth
            open={openDesc}
            onClose={() => {
              setOpenDesc(false)
              setTimeout(() => {
                setGetSubPlo([])
              }, 500)
            }}
          >
            <DialogContent sx={{ minHeight: 500, overflow: 'hidden' }}>
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
                    setOpenDesc(false)
                    setTimeout(() => {
                      setGetSubPlo([])
                    }, 500)
                  }}
                >
                  <Icon path={mdiClose} size={1} />
                </IconButton>
                <Grid item xs={12}>
                  <Typography>
                    {getSubPlo?.subject?.subject_code + ' ' + getSubPlo?.subject?.subject_name_th}
                  </Typography>
                  <Typography sx={{ pt: 2.5 }} variant='body2'>
                    Sub-PLO ที่เกี่ยวข้อง
                  </Typography>
                  {getSubPlo?.sub_plo_mappings?.map((subPLO, index) => (
                    <Typography variant='body2'>
                      {index + 1 + ').' + subPLO.sub_plo?.sub_plo_title + ' ' + subPLO.sub_plo?.sub_plo_description}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={12} sx={{ pt: 6 }}>
                  <Typography>คำอธิบาย Sub-PLO</Typography>
                  <Typography variant='body2'>
                    <p style={{ textAlign: 'justify' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Box>
      }
    />
  )
}
StudentComcetencies.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default StudentComcetencies
