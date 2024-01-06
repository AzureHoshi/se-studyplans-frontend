// React import
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

// Mui components import URL: https://material-ui.com/
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
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

const Studyplans = ({ SubjectData, StudyPlanByStdNo, curriculumScope }) => {
  const [switchContent, setSwitchContent] = useState(0) // for switch between search bar and display current term
  const [filterState, setFilterState] = useState(0) // 0 unfilter, 1 general, 2 specific
  const [openAlertStatus, setOpenAlertStatus] = useState(false) // hide | show alert
  const [alertText, setAlertText] = useState('') // text to display
  const [AlertType, setAlertType] = useState('success') // type of alert
  const [subjectSelected, setSubjectSelected] = useState([]) // cursor subject is selected
  const [currentTerm, setCurrentTerm] = useState('') // cursor current term
  const [semesterType, setSemesterType] = useState('normal') // for radio button in add subject dialog
  const [openAddDialog, setOpenAddDialog] = useState(false) // state control add dialog
  const [showScope, setShowScope] = useState(false)
  const [gradeSelected, setGradeSelected] = useState('A+')
  const AddAPI = url.BASE_URL + `/stu-acad-recs/`

  const [stdStudyPlans, setStdStudyPlans] = useState(StudyPlanByStdNo)
  const [curriculumScopeToDisplay, setCurriculumScopeToDisplay] = useState(curriculumScope)

  const gradeItems = ['A+', 'A', 'A−', 'B+', 'B', 'B−', 'C+', 'C', 'C−', 'D+', 'D', 'D−', 'F']

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

  function getUniqueValues(arr, propertyPath) {
    const uniqueValuesSet = new Set()

    arr.forEach(obj => {
      // Use propertyPath to access nested properties
      const nestedProperties = propertyPath.split('.')
      let propertyValue = obj

      for (let prop of nestedProperties) {
        if (propertyValue && propertyValue.hasOwnProperty(prop)) {
          propertyValue = propertyValue[prop]
        } else {
          // Handle cases where the nested property doesn't exist
          propertyValue = undefined
          break
        }
      }

      // Add the value to the Set
      uniqueValuesSet.add(propertyValue)
    })

    // Convert the Set back to an array and return it

    const uniqueValuesArray = Array.from(uniqueValuesSet)

    return uniqueValuesArray
  }
  const getUniqueMultiValues = (arr, propertyPath1, propertyPath2, outputName1, outputName2) => {
    const uniqueValuesSet = new Set()

    arr.forEach(obj => {
      const nestedProperties1 = propertyPath1.split('.')
      const nestedProperties2 = propertyPath2.split('.')
      let propertyValue1 = obj
      let propertyValue2 = obj

      for (let prop of nestedProperties1) {
        if (propertyValue1 && propertyValue1.hasOwnProperty(prop)) {
          propertyValue1 = propertyValue1[prop]
        } else {
          propertyValue1 = undefined
          break
        }
      }

      for (let prop of nestedProperties2) {
        if (propertyValue2 && propertyValue2.hasOwnProperty(prop)) {
          propertyValue2 = propertyValue2[prop]
        } else {
          propertyValue2 = undefined
          break
        }
      }

      const uniqueObject = {
        [outputName1]: propertyValue1,
        [outputName2]: propertyValue2
      }

      uniqueValuesSet.add(JSON.stringify(uniqueObject))
    })

    const uniqueValuesArray = Array.from(uniqueValuesSet).map(str => JSON.parse(str))

    return uniqueValuesArray
  }

  const UniqueCategories = getUniqueValues(curriculumScope, 'subjectCategory.subject_category_name')

  const UniqueTypes = getUniqueMultiValues(
    curriculumScope,
    'subjectCategory.subject_category_name',
    'subjectType.subject_type_name',
    'subject_category_name',
    'subject_type_name'
  )

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

  const totalCurrentSubjectCredit = stdStudyPlans.reduce((sum, currentItem) => {
    // Check if the subject property exists and has the subject_credit property
    if (currentItem.subject && currentItem.subject.subject_credit) {
      // Add the subject_credit to the sum
      return sum + currentItem.subject.subject_credit
    } else {
      // If the property is missing or doesn't have subject_credit, return the current sum
      return sum
    }
  }, 0)

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
    setSummerLabel(createSummerLabel)
    setTermLabel(createTermLabel)
    setCurrentTerm(createTermLabel[0].label)
  }, [userProfile])

  useLayoutEffect(() => {
    if (!StudyPlanByStdNo) {
      return
    }
    const createTermLabel = StudyPlanByStdNo?.map(pre => {
      const yearFromStdNo =
        '25' + (parseInt(userProfile.std_no.substring(0, 2)) + (pre.stu_acad_rec_year - 1)).toString()
      return {
        ...pre,
        subject_code: pre.subject.subject_code,
        termLabel: String(pre.stu_acad_rec_semester + '/' + yearFromStdNo)
      }
    })
    setStdStudyPlans(createTermLabel)
    console.log('createTermLabel', createTermLabel)
  }, [StudyPlanByStdNo])

  // updatescope
  useEffect(() => {
    if (!stdStudyPlans || !curriculumScope) return
    const newUpdates = []
    stdStudyPlans?.map(s => {
      // console.log(s)
      if (s?.subject_structure[0]?.subjectGroup !== undefined) {
        const finetoUpdateScope = curriculumScope
          .filter(
            scope => scope.subjectGroup?.subject_group_id === s?.subject_structure?.subjectGroup?.subject_group_id
          )
          .map(pre => ({
            ...pre,
            // countScope: pre.countScope !== s?.subject_credit ? pre.countScope - s?.subject_credit : s?.subject_credit
            countScope: s?.subject.subject_credit
          }))
        if (finetoUpdateScope) {
          const newUpdate = finetoUpdateScope[0]
          // console.log('newUpdate1', newUpdate)
          newUpdates.push(newUpdate)
        }
      } else {
        const finetoUpdateScope = curriculumScope
          .filter(scope => scope.subjectGroup?.subject_group_id === s?.subject_structure?.subject_group_id)
          .map(pre => ({
            ...pre,
            // countScope: pre.countScope !== s?.subject_credit ? pre.countScope - s?.subject_credit : s?.subject_credit
            countScope: s?.subject.subject_credit
          }))
        if (finetoUpdateScope) {
          const newUpdate = finetoUpdateScope[0]
          // console.log('newUpdate2', newUpdate)
          newUpdates.push(newUpdate)
        }
      }
    })
    console.log('newUpdates', newUpdates)

    const sumMap = {}

    // Count occurrences of each curriculum_structures_v2_id in newUpdates
    const occurrencesMap = {}

    // Sum countScope for each curriculum_structures_v2_id in newUpdates
    newUpdates.forEach(update => {
      const curriculumStructuresV2Id = parseInt(update.curriculum_structures_v2_id)
      // console.log('update.countScope', update.countScope)
      // Accumulate countScope for each unique curriculum_structures_v2_id
      sumMap[curriculumStructuresV2Id] = (sumMap[curriculumStructuresV2Id] || 0) + update.countScope

      // Count occurrences of each curriculum_structures_v2_id
      occurrencesMap[curriculumStructuresV2Id] = (occurrencesMap[curriculumStructuresV2Id] || 0) + 1
    })

    // Create an array with unique curriculum_structures_v2_id and set countScope to corresponding sums or keep original countScope
    const uniqueNewUpdates = Object.keys(sumMap).map(curriculumStructuresV2Id => {
      const matchingCurriculumStructure = newUpdates.find(
        structure => structure.curriculum_structures_v2_id === parseInt(curriculumStructuresV2Id)
      )

      if (matchingCurriculumStructure) {
        return {
          ...matchingCurriculumStructure,
          countScope: sumMap[curriculumStructuresV2Id]
        }
      } else {
        // Handle the case where there is no matching structure (optional)
        console.warn(
          `No matching CurriculumStructure found for curriculum_structures_v2_id ${curriculumStructuresV2Id}`
        )
        return null // or provide default values
      }
    })

    // Update curriculumStructures state based on uniqueNewUpdates
    const updatedCurriculumStructures = curriculumScope.map(item => {
      const curriculumStructuresV2Id = item.curriculum_structures_v2_id
      // console.log('curriculumStructuresV2Id', curriculumStructuresV2Id)

      // Find the corresponding entry in uniqueNewUpdates
      const uniqueUpdate = uniqueNewUpdates.find(
        update => update.curriculum_structures_v2_id === curriculumStructuresV2Id
      )
      if (uniqueUpdate) {
      }
      // Update countScope based on the difference
      return {
        ...item,
        countScope:
          uniqueUpdate && item.countScope + uniqueUpdate.countScope > 0
            ? item.countScope + uniqueUpdate.countScope
            : uniqueUpdate && item.countScope + uniqueUpdate.countScope === 0
            ? 0
            : item.countScope
      }
    })
    console.log('updatedCurriculumStructures', updatedCurriculumStructures)
    setCurriculumScopeToDisplay(updatedCurriculumStructures)
  }, [curriculumScope, stdStudyPlans])

  const handleShowScope = () => {
    setShowScope(true)
  }
  const handleCloseScope = () => {
    setShowScope(false)
  }

  const handleChangeGrade = grade => {
    setGradeSelected(grade)
  }

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

  const handleOpenAddDialog = subject => {
    if (!subject) return
    setSubjectSelected(subject)
    setCurrentTerm(termLabel[0].label)
    setOpenAddDialog(true)
  }

  const handleAddStudyPlans = async type => {
    if (type === 'normal') {
      const getTerm = termLabel?.find(t => t.label === currentTerm)
      console.log('term', getTerm)
      console.log('All Plans', stdStudyPlans)
      if (subjectSelected?.continue_subjects[0]?.parent_id !== null) {
        const checkParentinPlan = stdStudyPlans?.find(
          cp =>
            (cp.subject_id === subjectSelected?.continue_subjects[0]?.parent_id &&
              cp.stu_acad_rec_year < getTerm.year) ||
            (cp.subject_id === subjectSelected?.continue_subjects[0]?.parent_id &&
              cp.stu_acad_rec_year === getTerm.year &&
              cp.stu_acad_rec_semester < getTerm.semester)
        )
        console.log('checkParentinPlan', checkParentinPlan)
        if (!checkParentinPlan)
          return alert(
            'วิชานี้มีวิชาก่อนหน้ากรุณาเลือกลงให้ถูกลำดับ, วิชาก่อนหน้า :' +
              subjectSelected?.continue_subjects[0]?.parent?.subject_code
          )
      }
      // console.log('subjectSelected', subjectSelected)
      const newLocalObject = {
        subject: {
          ...subjectSelected
        },
        subject_code: subjectSelected.subject_code,
        subject_id: subjectSelected.subject_id,
        stu_acad_rec_year: getTerm.year,
        stu_acad_rec_semester: getTerm.semester,
        stu_acad_rec_grade: gradeSelected,
        continue_subjects: [...subjectSelected.continue_subjects],
        subject_structure: subjectSelected.subject_structures[0],
        termLabel: currentTerm
      }

      const newPostObject = {
        collegian_code: String(userProfile.std_no),
        subject_id: String(subjectSelected.subject_id),
        stu_acad_rec_year: String(getTerm.year),
        stu_acad_rec_semester: String(getTerm.semester),
        stu_acad_rec_grade: gradeSelected
      }
      console.log('newPostObject', newPostObject)
      console.log('newLocalObject', newLocalObject)
      try {
        axios.post(AddAPI, newPostObject)

        const updatePlan = [...stdStudyPlans, newLocalObject]
        setStdStudyPlans(updatePlan)
        setOpenAddDialog(false)
        handleShowAlert(
          'ได้เพิ่มวิชา' +
            subjectSelected.subject_code +
            ' ' +
            subjectSelected.subject_name_th +
            ' ' +
            'ในปีการศึกษา ' +
            currentTerm
        )
        setGradeSelected('A+')
        // Handle the successful response here
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (Not Found) here
          console.error('Resource not found')
          // You can redirect to a custom 404 page or do any other necessary actions
        } else {
          // Handle other errors
          console.error('An error occurred:', error.message)
        }
      }
    } else if (type === 'summer') {
      const getTerm = summerLabel?.find(t => t.label === currentTerm)
      // console.log(getTerm)
      if (subjectSelected?.continue_subjects[0]?.parent_id !== null) {
        const checkParentinPlan = stdStudyPlans?.find(
          cp =>
            cp.subject.subject_id === subjectSelected?.continue_subjects[0]?.parent_id &&
            cp.stu_acad_rec_year < getTerm.year
        )
        if (!checkParentinPlan)
          return alert(
            'วิชานี้มีวิชาก่อนหน้ากรุณาเลือกลงให้ถูกลำดับ, วิชาก่อนหน้า :' +
              subjectSelected?.continue_subjects[0]?.parent?.subject_code
          )
      }
      const newLocalObject = {
        subject: {
          ...subjectSelected
        },
        subject_code: subjectSelected.subject_code,
        subject_id: subjectSelected.subject_id,
        stu_acad_rec_year: getTerm.year,
        stu_acad_rec_semester: getTerm.semester,
        stu_acad_rec_grade: gradeSelected,
        continue_subjects: [...subjectSelected.continue_subjects],
        subject_structure: subjectSelected.subject_structures[0],
        termLabel: currentTerm
      }
      const newPostObject = {
        collegian_code: String(userProfile.std_no),
        subject_id: String(subjectSelected.subject_id),
        stu_acad_rec_year: String(getTerm.year),
        stu_acad_rec_semester: String(getTerm.semester),
        stu_acad_rec_grade: gradeSelected
      }

      console.log('newPostObject', newPostObject)
      try {
        axios.post(AddAPI, newPostObject)
        const updatePlan = [...stdStudyPlans, newLocalObject]

        setStdStudyPlans(updatePlan)
        setOpenAddDialog(false)
        handleShowAlert(
          'ได้เพิ่มวิชา' +
            subjectSelected.subject_code +
            ' ' +
            subjectSelected.subject_name_th +
            ' ' +
            'ในปีการศึกษา ' +
            currentTerm
        )
        setGradeSelected('A+')
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (Not Found) here
          console.error('Resource not found')
          // You can redirect to a custom 404 page or do any other necessary actions
        } else {
          // Handle other errors
          console.error('An error occurred:', error.message)
        }
      }
    }
  }

  const handleRemoveStudyPlan = studyPlan => {
    if (!studyPlan) return
    const checkChildren = stdStudyPlans?.filter(s => s.continue_subjects[0]?.parent_id === studyPlan?.subject_id)
    console.log('checkChildren', checkChildren)
    if (checkChildren.length > 0) {
      // alert 'this subject have childrens in studyplan please remove all children before remove this subject'
      const propertyValues = checkChildren.map(obj => obj['subject_code'])
      const alertMessage = propertyValues.join(', ')
      alert(
        'ไม่สามารถลบวิชาได้ เนื่องจากวิชานี้มีวิชาต่อเนื่องในแผนการเรียนปัจจุบันของคุณ, ต้องลบวิชาพวกนี้ทั้งหมดก่อน ' +
          alertMessage
      )
    } else {
      // remove studyplan
      try {
        axios.delete(AddAPI + studyPlan.stu_acad_rec_id)
        const removeSubject = stdStudyPlans?.filter(s => s.subject_id !== subjectSelected.subject_id)
        setStdStudyPlans(removeSubject)
        handleShowAlert(
          'ได้ลบวิชา' +
            subjectSelected.subject_code +
            ' ' +
            subjectSelected.subject_name_th +
            ' ออกจากแผนการเรียนปัจจุบัน'
        )
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (Not Found) here
          console.error('Resource not found')
          // You can redirect to a custom 404 page or do any other necessary actions
        } else {
          // Handle other errors
          console.error('An error occurred:', error.message)
        }
      }
    }
  }

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false)
  }

  const handleAddSemester = type => {
    if (!type) return
    if (type === 'normal') {
      let newYear =
        '25' + (parseInt(userProfile.std_no.substring(0, 2)) + termLabel[termLabel.length - 1].year).toString()
      let newSemester = termLabel[termLabel.length - 1].semester === 2 ? 1 : 2
      let newTermLabel = String(newSemester + '/' + newYear)
      let result = window.confirm('ต้องสร้างปีการศึกษา ' + newTermLabel + ' เพิ่ม?')
      if (result) {
        const newObject = [
          ...termLabel,
          {
            i: termLabel[termLabel.length - 1].i + 1,
            year:
              termLabel[termLabel.length - 1].semester === 2
                ? termLabel[termLabel.length - 1].year
                : termLabel[termLabel.length - 1].year + 1,
            semester: newSemester,
            label: newTermLabel
          }
        ]

        setTermLabel(newObject)
        setSemesterType('normal')
        setCurrentTerm(newTermLabel)
      }
    } else if (type === 'summer') {
      let newYear =
        '25' + (parseInt(userProfile.std_no.substring(0, 2)) + summerLabel[summerLabel.length - 1].year).toString()

      let newTermLabel = String(3 + '/' + newYear)
      let result = window.confirm('ต้องสร้างปีการศึกษา ' + newTermLabel + ' เพิ่ม?')
      if (result) {
        const newObject = [
          ...summerLabel,
          {
            i: summerLabel[summerLabel.length - 1].i + 1,
            year: summerLabel[summerLabel.length - 1].year + 1,
            semester: 3,
            label: newTermLabel
          }
        ]

        setSummerLabel(newObject)
        setSemesterType('summer')
        setCurrentTerm(newTermLabel)
      }
    }
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

          {/* add subject dialog */}
          <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth={'sm'} fullWidth>
            <DialogTitle sx={{ background: grey[400], color: 'white' }}>เลือกปีการศึกษา</DialogTitle>
            <DialogContent sx={{ height: 400 }}>
              <Grid container sx={{ border: 1, borderRadius: 2, borderColor: grey[300], p: 3, mt: 2.5 }}>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel sx={{ fontSize: '0.875rem' }}>ประเภทปีการศึกษา</FormLabel>
                    <RadioGroup
                      row
                      defaultValue='normal'
                      value={semesterType}
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
                        selectionValue={currentTerm || 0}
                        defaultValue={0}
                        handleChange={e => {
                          setSwitchContent(1)
                          setCurrentTerm(e.target.value)
                          // setMenuSubjectCursor(0)
                          // setMenuSemesterCursor(0)
                          // handleChangeTerm(e.target.value)
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
                        selectionValue={currentTerm || 0}
                        defaultValue={0}
                        handleChange={e => {
                          setSwitchContent(1)
                          setCurrentTerm(e.target.value)
                          // setMenuSubjectCursor(0)
                          // setMenuSemesterCursor(0)
                          // handleChangeTerm(e.target.value)
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
              <Grid container sx={{ border: 1, borderRadius: 2, borderColor: grey[300], mt: 2.5 }}>
                <DialogContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel sx={{ fontSize: '0.875rem' }}>เพิ่มปีการศึกษา</FormLabel>

                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1.5 }}>
                          <Button
                            onClick={() => {
                              handleAddSemester('normal')
                            }}
                            variant='text'
                            sx={{ width: 200 }}
                            fullWidth={true}
                            style={{ justifyContent: 'flex-start' }}
                          >
                            + ภาคปกติ(normal)
                          </Button>
                          <Button
                            onClick={() => {
                              handleAddSemester('summer')
                            }}
                            variant='text'
                            sx={{ width: 200 }}
                            fullWidth={true}
                            style={{ justifyContent: 'flex-start' }}
                          >
                            + ภาคฤดูร้อน(summer)
                          </Button>
                        </Box>
                      </FormControl>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Grid>
              {/* กรอกเกรด */}
              <Grid container sx={{ border: 1, borderRadius: 2, borderColor: grey[300], mt: 2.5 }}>
                <Grid container sx={{ m: 3.5 }}>
                  <Grid item xs={12} md={3}>
                    <Typography sx={{ m: 2.5 }}>เกรดที่ได้รับ</Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Selection
                      height={40}
                      width={'100%'}
                      selectionValue={gradeSelected || 'A+'}
                      handleChange={e => {
                        handleChangeGrade(e.target.value)
                      }}
                      Items={gradeItems?.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleAddStudyPlans(semesterType)} variant='outlined'>
                ADD Subject
              </Button>
              <Button sx={{ color: grey[400] }} onClick={() => setOpenAddDialog(false)}>
                Close
              </Button>
            </DialogActions>
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
                handleShowScope={handleShowScope}
                setShowScope={setShowScope}
              />
            </Hidden>
            {!showScope ? (
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
                    handleOpenAddDialog={handleOpenAddDialog}
                    stdStudyPlans={stdStudyPlans}
                    setStdStudyPlans={setStdStudyPlans}
                    handleRemoveStudyPlan={handleRemoveStudyPlan}
                    handleShowScope={handleShowScope}
                  />
                </Grid>
                {subjectSelected.subject_id !== undefined ? (
                  <Hidden smDown>
                    <Grid item sm={6} lg={7}>
                      <SubjectDetails
                        subjectSelected={subjectSelected}
                        handleShowAlert={handleShowAlert}
                        handleOpenAddDialog={handleOpenAddDialog}
                        stdStudyPlans={stdStudyPlans}
                        handleRemoveStudyPlan={handleRemoveStudyPlan}
                      />
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
            ) : (
              <Grid container sx={{ p: 6 }}>
                <Grid item xs={12} sx={{ display: 'block' }}>
                  <Button variant='outlined' onClick={handleCloseScope}>
                    Back
                  </Button>

                  {/* show scope here */}
                  <Box sx={{ m: 6, ml: 0 }}>
                    <Grid container sx={{ width: '100%', px: 4 }}>
                      <Grid item xs={12} sx={{ pb: 6 }}>
                        <Typography variant='body2'>
                          {' '}
                          {'current total credit : ' + totalCurrentSubjectCredit + '/' + totalCreditByScope}
                        </Typography>
                      </Grid>
                      {UniqueCategories.map(categoryHeader => (
                        <Grid
                          item
                          xs={12}
                          key={categoryHeader}
                          maxWidth={'100%'}
                          sx={{ pl: 3, pr: 6, mb: 6, borderLeft: 1, borderColor: 'lightgrey' }}
                        >
                          {curriculumScopeToDisplay?.filter(
                            categoryHasCredit =>
                              categoryHasCredit.subject_category_id !== null &&
                              categoryHasCredit.subject_type_id === null &&
                              categoryHasCredit.subject_group_id === null &&
                              categoryHasCredit.subjectCategory?.subject_category_name === categoryHeader
                          ).length > 0 ? (
                            curriculumScopeToDisplay
                              ?.filter(
                                categoryHasCredit =>
                                  categoryHasCredit.subject_category_id !== null &&
                                  categoryHasCredit.subject_type_id === null &&
                                  categoryHasCredit.subject_group_id === null &&
                                  categoryHasCredit.subjectCategory?.subject_category_name === categoryHeader
                              )
                              .map(categoryHasCreditResult => (
                                <Box
                                  key={categoryHasCreditResult.curriculum_structures_v2_id}
                                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                  <Typography variant='body1'>
                                    {categoryHasCreditResult?.subjectCategory?.subject_category_name}
                                  </Typography>
                                  <Box sx={{ display: 'flex' }}>
                                    <Typography variant='body2' sx={{ display: 'inline' }}>
                                      {categoryHasCreditResult?.credit_total}
                                    </Typography>
                                    <Typography variant='body2' sx={{ ml: 2 }}>
                                      Credit
                                    </Typography>
                                  </Box>
                                </Box>
                              ))
                          ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant='body1' key={categoryHeader}>
                                {categoryHeader}
                              </Typography>
                              <Typography variant='body2'>Credit</Typography>
                            </Box>
                          )}

                          {curriculumScopeToDisplay
                            ?.filter(
                              case1 =>
                                // condition category && type or category && group
                                (case1.subject_category_id !== null &&
                                  case1.subject_type_id !== null &&
                                  case1.subjectCategory?.subject_category_name === categoryHeader &&
                                  case1.subject_group_id === null) ||
                                (case1.subject_category_id !== null &&
                                  case1.subject_group_id !== null &&
                                  case1.subjectCategory?.subject_category_name === categoryHeader &&
                                  case1.subject_type_id === null)
                            )
                            .map(case1Result => (
                              <Box key={case1Result.curriculum_structures_v2_id}>
                                {case1Result.subject_type_id !== null ? (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2 }}>
                                    <Typography variant='body2'>
                                      {case1Result.subjectType?.subject_type_name}
                                    </Typography>
                                    <Box>
                                      {case1Result.countScope > case1Result.credit_total && (
                                        <Typography variant='body2' color={'error'} sx={{ display: 'inline', mr: 2 }}>
                                          (overflow)
                                        </Typography>
                                      )}

                                      {case1Result.countScope
                                        ? case1Result.countScope + ' of ' + case1Result?.credit_total
                                        : '0 of ' + case1Result?.credit_total}
                                    </Box>
                                  </Box>
                                ) : (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2 }}>
                                    <Typography variant='body2'>
                                      {case1Result.subjectGroup?.subject_group_name}
                                    </Typography>
                                    <Box>
                                      {case1Result.countScope > case1Result.credit_total && (
                                        <Typography variant='body2' color={'error'} sx={{ display: 'inline', mr: 2 }}>
                                          (overflow)
                                        </Typography>
                                      )}

                                      {case1Result.countScope
                                        ? case1Result.countScope + ' of ' + case1Result?.credit_total
                                        : '0 of ' + case1Result?.credit_total}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            ))}

                          {UniqueTypes.filter(filterType => filterType.subject_category_name === categoryHeader).map(
                            typeHeader => (
                              <Box key={typeHeader.subject_type_name} sx={{ ml: 3 }}>
                                {/* {typeHeader.subject_type_name} */}

                                {curriculumScopeToDisplay
                                  ?.filter(
                                    case1 =>
                                      // condition category && type
                                      case1.subject_category_id !== null &&
                                      case1.subject_type_id !== null &&
                                      case1.subject_group_id === null
                                  )
                                  .map(case1Duplicate => (
                                    <Box key={case1Duplicate.curriculum_structures_v2_id}>
                                      {case1Duplicate.subjectType.subject_type_name !==
                                        typeHeader.subject_type_name && (
                                        <Typography>{typeHeader.subject_type_name}</Typography>
                                      )}
                                    </Box>
                                  ))}

                                {/* <Typography>{typeHeader.subject_type_name}</Typography> */}

                                {/* case 2 */}

                                {curriculumScopeToDisplay
                                  ?.filter(
                                    case2 =>
                                      // condition category && type && group
                                      case2.subject_category_id !== null &&
                                      case2.subject_type_id !== null &&
                                      case2.subject_group_id !== null &&
                                      case2.subjectCategory?.subject_category_name === categoryHeader &&
                                      case2.subjectType?.subject_type_name === typeHeader.subject_type_name
                                  )
                                  .map(case2Result => (
                                    <Box key={case2Result.curriculum_structures_v2_id} sx={{ ml: 3 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2 }}>
                                        <Typography variant='body2'>
                                          {case2Result.subjectGroup?.subject_group_name}
                                        </Typography>
                                        <Typography variant='body1' display='inline'>
                                          {' ' + case2Result.credit_total + ' credit'}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  ))}
                              </Box>
                            )
                          )}
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Card>
        </Box>
      }
    />
  )
}

Studyplans.getLayout = page => <BlankLayout>{page}</BlankLayout>
// ssr
export async function getServerSideProps() {
  const apiEndpoints = [
    `/subjects-by-curriculum/2`,
    `/stu-acad-recs/${userProfile.std_no}`,
    `/curriculum-structures-v2/${userProfile.curriculum_id}`,
    `/interest-results/${userProfile.std_no}`
  ]

  const apiData = []

  for (let i = 0; i < apiEndpoints.length; i++) {
    try {
      const response = await axios.get(url.BASE_URL + apiEndpoints[i])
      apiData[i] = i !== 3 ? response.data.data : response.data // Assuming data is stored in a property named "data" for consistency

      console.log(`Data from endpoint ${apiEndpoints[i]}:`, apiData[i])
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(`API request ${apiEndpoints[i]} returned a 404 status code. Handling it gracefully.`)

        if (i === 0) {
          return {
            redirect: {
              destination: '/pages/front-office/student-systems/interest-survey/',
              permanent: false
            }
          }
        }
      } else {
        console.error(`Error fetching data for ${apiEndpoints[i]}:`, error.message)
      }
    }
  }

  const [SubjectData, StudyPlanByStdNo, addCountScope, InterestResults] = apiData

  // Your logic with the retrieved data
  console.log('Data from endpoint SubjectData:', SubjectData)
  console.log('Data from endpoint StudyPlanByStdNo:', StudyPlanByStdNo)
  console.log('Data from endpoint curriculumScope:', addCountScope)

  if (InterestResults.labels === undefined) {
    return {
      redirect: {
        destination: '/pages/front-office/student-systems/interest-survey/',
        permanent: false
      }
    }
  }

  const curriculumScope = addCountScope.map(c => ({ ...c, countScope: 0 }))

  return {
    props: {
      SubjectData,
      StudyPlanByStdNo,
      curriculumScope
    }
  }
}

export default Studyplans
