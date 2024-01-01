// React import
import React, { useState, useEffect, useLayoutEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Hidden,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Typography
} from '@mui/material'

// Icon import URL: https://materialdesignicons.com/
import BookOpenPageVariantOutline from 'mdi-material-ui/BookOpenPageVariantOutline'

// Components import
import CardInfo from 'src/views/add-learned-subjects/CardInfo'
import Subjects from 'src/views/add-learned-subjects/Subjects'
import SubjectDetails from 'src/views/add-learned-subjects/SubjectDetails'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CustomLayout } from 'src/views/custom-layout-student-systems'
import axios from 'axios'
import { url } from 'src/configs/urlConfig'
import { grey } from '@mui/material/colors'
import { userProfile } from 'src/dummy'
import { Selection } from 'src/components'

const Studyplans = ({ SubjectData }) => {
  const [switchContent, setSwitchContent] = useState(0) // for switch between search bar and display current term
  const [filterState, setFilterState] = useState(0) // 0 unfilter, 1 general, 2 specific
  const [openAlertStatus, setOpenAlertStatus] = useState(false) // hide | show alert
  const [alertText, setAlertText] = useState('') // text to display
  const [AlertType, setAlertType] = useState('success') // type of alert
  const [subjectSelected, setSubjectSelected] = useState([]) // cursor subject is selected
  const [currentTerm, setCurrentTerm] = useState('') // cursor current term
  const [semesterType, setSemesterType] = useState('normal')

  // จริงๆต้องดึงข้อมูลการศึกษาของนักศึกษามาว่ามีกี่เทอมแล้วเอามาทำข้อมูล ด้านล่างนี้เป็น Default สำหรับนักศึกษาที่ยังไม่ได้เพิ่มข้อมูลลงในระบบ
  const [termLabel, setTermLabel] = useState([
    { i: 1, year: 1, semester: 1, label: '' },
    { i: 2, year: 1, semester: 2, label: '' },
    { i: 3, year: 2, semester: 1, label: '' },
    { i: 4, year: 2, semester: 2, label: '' },
    { i: 5, year: 3, semester: 1, label: '' },
    { i: 6, year: 3, semester: 2, label: '' },
    { i: 7, year: 4, semester: 1, label: '' },
    { i: 8, year: 4, semester: 2, label: '' }
  ])
  const [summerLabel, setSummerLabel] = useState([
    { i: 1, year: 1, semester: 3, label: '' },
    { i: 2, year: 2, semester: 3, label: '' },
    { i: 3, year: 3, semester: 3, label: '' },
    { i: 4, year: 4, semester: 3, label: '' }
  ])

  useLayoutEffect(() => {
    if (!userProfile) return
    const createTermLabel = termLabel.map(pre => {
      const yearFromStdNo = '25' + (parseInt(userProfile.std_no.substring(0, 2)) + (pre.year - 1)).toString()
      return {
        ...pre,
        label: String(pre.semester + '/' + yearFromStdNo)
      }
    })
    const createSummerLabel = summerLabel.map(pre => {
      const yearFromStdNo = '25' + (parseInt(userProfile.std_no.substring(0, 2)) + (pre.year - 1)).toString()
      return {
        ...pre,
        label: String(pre.semester + '/' + yearFromStdNo)
      }
    })
    setTermLabel(createTermLabel)
    setSummerLabel(createSummerLabel)
    setCurrentTerm(createTermLabel[0].label)
  }, [userProfile])

  const handleChangeSemesterType = value => {
    setSemesterType(value)
    if (value === 'normal') setCurrentTerm(termLabel[0].label)
    else setCurrentTerm(summerLabel[0].label)
  }

  const handleShowAlert = (text, type = 'success') => {
    if (!text || !type) return
    setAlertType(type)
    setAlertText(text)
    setTimeout(() => {
      setOpenAlertStatus(true)
    }, 200)
  }

  return (
    <CustomLayout
      content={
        <Box>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              open={openAlertStatus}
              autoHideDuration={6000}
              onClose={() => setOpenAlertStatus(false)}
            >
              <Alert severity={AlertType} onClose={() => setOpenAlertStatus(false)} sx={{ mb: 6, ml: 2 }}>
                <AlertTitle sx={{ m: 0, p: 0 }}>{alertText}</AlertTitle>
                {/* <AlertTitle sx={{ m: 0, p: 0 }}>ได้ เพิ่ม ENGSEXXX ในเทอมการศึกษาที่ 1/2023</AlertTitle> */}
              </Alert>
            </Snackbar>
          </Stack>
          <Dialog open={false} maxWidth={'sm'} fullWidth>
            <DialogTitle sx={{ background: grey[400], color: 'white' }}>เลือกปีการศึกษา</DialogTitle>
            <DialogContent sx={{ height: 400, m: 6 }}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel sx={{ fontSize: '0.875rem' }}>ประเภทปีการศึกษา</FormLabel>
                    <RadioGroup
                      row
                      defaultValue='normal'
                      aria-label='semestertype'
                      onChange={e => handleChangeSemesterType(e.target.value)}
                    >
                      <FormControlLabel sx={{ mr: 8 }} value='normal' label='ภาคปกติ(normal)' control={<Radio />} />
                      <FormControlLabel value='summer' label='ภาคฤดูร้อน(summer)' control={<Radio />} />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {semesterType === 'normal' ? (
                  <Grid container sx={{ m: 3.5 }}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={{ m: 2.5 }}>ปีการศึกษา</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Selection
                        height={40}
                        width={'100%'}
                        // label={'แผนการศึกษา'}
                        // disabled={true}
                        selectionValue={currentTerm || 0}
                        defaultValue={0}
                        handleChange={e => {
                          // setPlanSelected(e.target.value)
                          setSwitchContent(1)
                          setMenuSubjectCursor(0)
                          setMenuSemesterCursor(0)
                          handleChangeTerm(e.target.value)
                        }}
                        Items={termLabel?.map((item, index) => (
                          <MenuItem key={index} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container sx={{ m: 3.5 }}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={{ m: 2.5 }}>ปีการศึกษา</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Selection
                        height={40}
                        width={'100%'}
                        // label={'แผนการศึกษา'}
                        // disabled={true}
                        selectionValue={currentTerm || 0}
                        defaultValue={0}
                        handleChange={e => {
                          // setPlanSelected(e.target.value)
                          setSwitchContent(1)
                          setMenuSubjectCursor(0)
                          setMenuSemesterCursor(0)
                          handleChangeTerm(e.target.value)
                        }}
                        Items={summerLabel?.map((item, index) => (
                          <MenuItem key={index} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <Button>click</Button>
          </Dialog>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <Typography variant='h4'>Update Study Plan</Typography>
                  <Typography variant='body2'>Add subjects you have learned</Typography>
                </Grid>
                <Hidden smDown>
                  <Grid item sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <BookOpenPageVariantOutline sx={{ fontSize: 72 }} />
                  </Grid>
                </Hidden>
              </Grid>
            </CardContent>
          </Card>

          <Card variant='outlined' sx={{ marginTop: 6, display: 'flex' }}>
            <Hidden lgDown>
              <CardInfo
                setSwitchContent={setSwitchContent}
                setFilterState={setFilterState}
                closeDrawer={() => 0}
                currentTerm={currentTerm}
                setCurrentTerm={setCurrentTerm}
                termLabel={termLabel}
                summerLabel={summerLabel}
              />
            </Hidden>
            <Grid container>
              <Grid item xs={12} sm={6} lg={5}>
                <Subjects
                  data={SubjectData}
                  switchContent={switchContent}
                  setSwitchContent={setSwitchContent}
                  filterState={filterState}
                  setSubjectSelected={setSubjectSelected}
                  subjectSelected={subjectSelected}
                  handleShowAlert={handleShowAlert}
                  setFilterState={setFilterState}
                  currentTerm={currentTerm}
                  setCurrentTerm={setCurrentTerm}
                  termLabel={termLabel}
                  summerLabel={summerLabel}
                />
              </Grid>
              {subjectSelected.subject_id !== undefined ? (
                <Hidden smDown>
                  <Grid item sm={6} lg={7}>
                    <SubjectDetails subjectSelected={subjectSelected} handleShowAlert={handleShowAlert} />
                  </Grid>
                </Hidden>
              ) : (
                <Hidden smDown>
                  <Grid item sm={6} lg={7}>
                    <Grid container>
                      <Grid item xs={6} sx={{ padding: '1em 1em 0em' }}>
                        <Typography sx={{ fontSize: { xs: 16, lg: 20 }, minWidth: 160 }}>Subject Details</Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                </Hidden>
              )}
            </Grid>
          </Card>
        </Box>
      }
    />
  )
}

Studyplans.getLayout = page => <BlankLayout>{page}</BlankLayout>
// ssr
export async function getServerSideProps() {
  const resSubjects = await axios.get(url.BASE_URL + `/subjects-by-curriculum/` + 2) // 2 for se 66
  return {
    props: {
      SubjectData: resSubjects.data.data
    }
  }
}

export default Studyplans
