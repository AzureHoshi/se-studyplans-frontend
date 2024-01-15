import {
  Autocomplete,
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Hidden,
  MenuItem,
  Radio,
  RadioGroup,
  TablePagination,
  TextField,
  Typography,
  alpha
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { styled } from '@mui/material/styles'
import { TreeItem, TreeView, treeItemClasses } from '@mui/x-tree-view'
import { ChevronDown, ChevronRight } from 'mdi-material-ui'
import { useEffect, useLayoutEffect, useState } from 'react'
import { CircleLoading, Selection } from 'src/components'
import { url } from 'src/configs/urlConfig'
import { useFetch } from 'src/hooks'

const HeadTypography = styled(Typography)(({ theme }) => ({
  variant: 'subtitle1',
  color: '#909094',
  fontWeight: 'bold',
  marginBottom: '1rem',
  fontSize: 14
}))

const Roadmap = ({ curriculumTree, subjectsSE66, curriculumScopeSE66, studyPlanSE66 }) => {
  const [displayMode, setDisplayMode] = useState(0) // 0 : roadmap detail, 1: Subjects ,2: Study Plan
  const [expandedNodes, setExpandedNodes] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)

  const [openDetails, setOpenDetails] = useState(false)

  const [subjectSelected, setSubjectSelected] = useState([])
  const URL_GET_SUBJECTS_RELATIONS = `${url.BASE_URL}/continue-subjects-subject/`

  const [subjectView, setSubjectView] = useState('treeview') // show treeview as default

  // for gridview
  const [SubjectsTemp, setSubjectsTemp] = useState([])
  const [page, setPage] = useState(0)
  const [categoriesSelected, setCategoriesSelected] = useState(0)
  const [typesSelected, setTypesSelected] = useState(0)
  const [groupsSelected, setGroupsSelected] = useState(0)

  const [categoriesSubject, setCategoriesSubject] = useState([])
  const [typesSubject, setTypesSubject] = useState([])
  const [groupsSubject, setGroupsSubject] = useState([])
  const [customSubjects, setCustomSubjects] = useState([]) // for autocomplete

  // for display study plan
  const yearSemesterArray = [
    { year: 1, semester: 1 },
    { year: 1, semester: 2 },
    { year: 2, semester: 1 },
    { year: 2, semester: 2 },
    { year: 3, semester: 1 },
    { year: 3, semester: 2 },
    { year: 4, semester: 1 },
    { year: 4, semester: 2 }
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // for gridview

  const handleChangeView = e => {
    setSubjectView(e.target.value)
  }

  console.log('showSubjectSelected', subjectSelected)

  const {
    error: SubjectsRelationsError,
    data: SubjectsRelations,
    setData: setSubjectsRelations,
    loading: SubjectsRelationsLoading,
    reFetch: reFetchSubjectsRelations
  } = useFetch(URL_GET_SUBJECTS_RELATIONS + subjectSelected.subject_id) // 1 for ce 60 curriculum

  const handleOpenDetails = subject => {
    if (!subject) return

    setSubjectSelected(subject)
    setOpenDetails(true)
  }

  const handleChangeDisplayMode = mode => {
    setDisplayMode(mode)
  }

  const handleMoreInfo = event => {
    setAnchorEl(anchorEl ? null : event.target)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'test-popper' : undefined

  const recursionContinueSubjects = nodes => {
    return (
      <TreeItem
        onClick={() => handleOpenDetails(nodes.subjects)}
        aria-describedby={id}
        sx={{
          mb: 2,
          ml: nodes?.level !== 1 && { xs: 1, sm: 1, lg: 4 },
          position: 'relative',
          '&:before': {
            pointerEvents: 'none',
            content: '""',
            position: 'absolute',
            width: { xs: 29, sm: 29, lg: 40 },
            left: { xs: -29, sm: -29, lg: -40 },
            top: 28,
            borderBottom:
              // only display if the TreeItem is not root node
              nodes?.level !== 1 ? `1px dashed #000` : 'none'
          },

          [`& .${treeItemClasses.group}`]: {
            marginLeft: { xs: 4, sm: 6, lg: 12 },
            paddingLeft: 6,
            marginBottom: 6,
            borderLeft: `1px dashed #000`
          },
          ['& .MuiTreeItem-content']: {
            border: 1,
            borderRadius: 1,
            borderColor: alpha('#000', 0.3),
            paddingX: { xs: 2, sm: 2, lg: 6 },
            marginBottom: 2,
            background: subjectSelected?.subject_id === nodes.subject_id && 'rgba(255, 165, 0, 0.2)'
          },
          ['& .MuiTreeItem-label']: { marginX: 2, marginY: 0, padding: 2 }
        }}
        key={String(nodes?.continue_subject_id)}
        nodeId={String(nodes?.continue_subject_id)}
        label={
          <Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 'bold',
                  mr: 1,
                  fontSize: { xs: 12, sm: 12, lg: 14 },
                  lineHeight: 1
                }}
              >
                {nodes?.subjects?.subject_code}
              </Typography>
              <Typography sx={{ fontSize: { xs: 12, sm: 12, lg: 14 }, letterSpacing: 0.5, lineHeight: 1 }}>
                Level:{nodes?.level}
              </Typography>
            </Box>
            <Hidden lgUp>
              <Typography variant='caption' sx={{ lineHeight: 0 }}>
                {nodes?.subjects?.subject_name_th}
              </Typography>
            </Hidden>
            <Hidden lgDown>
              <Typography variant='body2'>{nodes?.subjects?.subject_name_th}</Typography>
            </Hidden>
          </Typography>
        }
      >
        {nodes.children ? Object.values(nodes?.children).map(node => recursionContinueSubjects(node)) : null}
      </TreeItem>
    )
  }

  const recursionGetNodeID = (store, nodes) => {
    return Object.values(nodes)?.map(item => {
      store.push(String(item?.continue_subject_id))

      if (item.children && item.children.length > 0) {
        recursionGetNodeID(store, item.children)
      }

      return store
    })
  }

  function getUniqueValues(arr, propertyPath) {
    const uniqueValuesSet = new Set()

    arr?.forEach(obj => {
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

    arr?.forEach(obj => {
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

  const UniqueCategories = getUniqueValues(curriculumScopeSE66, 'subjectCategory.subject_category_name')

  const UniqueTypes = getUniqueMultiValues(
    curriculumScopeSE66,
    'subjectCategory.subject_category_name',
    'subjectType.subject_type_name',
    'subject_category_name',
    'subject_type_name'
  )

  useEffect(() => {
    if (subjectsSE66) {
      setSubjectsTemp(subjectsSE66)
      // console.log('Subjects', Subjects)

      // Use Set to store unique values
      const uniqueCategories = new Set()
      const uniqueTypes = new Set()
      const uniqueGroups = new Set()

      const subjectStructure = subjectsSE66?.map(v => v.subject_structures)

      // console.log('subjectStructure', subjectStructure)

      //   // Iterate over the array and populate the sets
      Object.values(subjectStructure)?.forEach(subject => {
        uniqueCategories.add(subject[0]?.subjectCategory?.subject_category_name)
        uniqueTypes.add(subject[0]?.subjectType?.subject_type_name)
        uniqueGroups.add(subject[0]?.subjectGroup?.subject_group_name)
      })

      // Convert sets to arrays if needed
      const uniqueCategoriesArray = Array.from(uniqueCategories)
      const uniqueTypesArray = Array.from(uniqueTypes)
      const uniqueGroupsArray = Array.from(uniqueGroups)

      setCategoriesSubject(uniqueCategoriesArray)
      setTypesSubject(uniqueTypesArray)
      setGroupsSubject(uniqueGroupsArray)

      // console.log('Unique Subject Categories:', uniqueCategoriesArray)
      // console.log('Unique Subject Types:', uniqueTypesArray)
      // console.log('Unique Subject Groups:', uniqueGroupsArray)
    } else {
      return
    }
  }, [subjectsSE66, SubjectsTemp])

  useEffect(() => {
    if (displayMode === 0) {
      setSubjectSelected([])
    }
  }, [displayMode])

  useLayoutEffect(() => {
    if (curriculumTree) {
      const dummy = []
      const getNodeID = recursionGetNodeID(dummy, curriculumTree)
      setExpandedNodes(...getNodeID)
      const customLabelForAutocomplete = curriculumTree?.map(d => ({
        ...d,
        label: d.subjects.subject_code + ' ' + d.subjects.subject_name_th
      }))
      // console.log('customLabelForAutocomplete', customLabelForAutocomplete)
      setCustomSubjects(customLabelForAutocomplete)
      // console.log(...getNodeID)

      // console.log(...getNodeID)
    }
    // console.log('curriculumTree', curriculumTree)
  }, [curriculumTree])

  return (
    <Box sx={{ p: 16, mt: 24, mx: { xs: 4, md: 12 }, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 6 }}>
      <Grid container spacing={2} sx={{ minWidth: 320 }}>
        <Hidden mdDown>
          {displayMode === 0 && (
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 'bold',
                    color: grey[800],
                    fontFamily: 'Segoe UI',
                    mb: 2.5,
                    fontSize: { xs: 28, md: 24 }
                  }}
                >
                  Curriculum: Software Engineering 2566
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Hidden mdDown>
                  <HeadTypography>Introduction to Software Engineering:</HeadTypography>

                  <Typography variant='caption' sx={{ color: '#909094' }}>
                    <ul style={{ marginLeft: -12 }}>
                      <li>Basic programming concepts (variables, loops, conditionals)</li>
                      <li>Data structures (arrays, linked lists)</li>
                      <li>Algorithms</li>
                    </ul>
                  </Typography>
                </Hidden>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Hidden mdDown>
                  <HeadTypography>Databases:</HeadTypography>
                  <Typography variant='caption' sx={{ color: '#909094' }}>
                    <ul style={{ marginLeft: -12 }}>
                      <li>Relational databases (SQL)</li>
                      <li>NoSQL databases</li>
                      <li>Database design and normalization</li>
                    </ul>
                  </Typography>
                </Hidden>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Hidden mdDown>
                  <HeadTypography>Object-Oriented Programming (OOP):</HeadTypography>
                  <Typography variant='caption' sx={{ color: '#909094' }}>
                    <ul style={{ marginLeft: -12 }}>
                      <li>Principles of OOP (encapsulation, inheritance, polymorphism)</li>
                      <li>Design patterns</li>
                    </ul>
                  </Typography>
                </Hidden>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Hidden mdDown>
                  <HeadTypography>Web Development:</HeadTypography>
                  <Typography variant='caption' sx={{ color: '#909094' }}>
                    <ul style={{ marginLeft: -12 }}>
                      <li>HTML, CSS, JavaScript</li>
                      <li>Front-end frameworks (React, Angular, Vue.js)</li>
                      <li>Back-end frameworks (Node.js, Django, Flask)</li>
                    </ul>
                  </Typography>
                </Hidden>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Hidden mdDown>
                  <HeadTypography>Data Structures:</HeadTypography>
                  <Typography variant='caption' sx={{ color: '#909094' }}>
                    <ul style={{ marginLeft: -12 }}>
                      <li>Advanced data structures (trees, graphs, hash tables)</li>
                      <li>Algorithmic analysis and complexity</li>
                      <li>Back-end frameworks (Node.js, Django, Flask)</li>
                    </ul>
                  </Typography>
                </Hidden>
              </Grid>
              <Grid item xs={12} sx={{ mt: 6 }}>
                <Button
                  onClick={() => handleChangeDisplayMode(1)}
                  variant='contained'
                  sx={{ width: 180, marginTop: '1rem', backgroundColor: '#000000' }}
                >
                  Subjects
                </Button>
                <Button
                  onClick={() => handleChangeDisplayMode(2)}
                  variant='contained'
                  color='primary'
                  sx={{ width: 180, marginTop: '1rem', marginLeft: '1rem', backgroundColor: '#000000' }}
                >
                  Study Plan
                </Button>
              </Grid>
            </Grid>
          )}
        </Hidden>
        <Hidden mdUp>
          {displayMode === 0 && (
            <Grid container sx={{ minHeight: { xs: 800, sm: 550 }, maxWidth: 700 }}>
              <Grid item xs={12}>
                <Typography
                  variant='h5'
                  color={grey[800]}
                  sx={{ fontFamily: 'Segoe UI', letterSpacing: 0.5, fontWeight: 'bold', mb: 4 }}
                >
                  Curriculum: Software Engineering
                </Typography>
                <Typography variant='caption'>
                  <p style={{ textAlign: 'justify' }}>
                    Software engineering is a discipline that involves the systematic design, development, testing,
                    maintenance, and documentation of software in a methodical way. It applies engineering principles to
                    software development, aiming to create reliable, efficient, and scalable software solutions. Here
                    are key aspects and concepts related to software engineering:
                  </p>
                </Typography>
                <ul style={{ paddingLeft: -12 }}>
                  <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                    Understanding and documenting the needs of stakeholders to establish system requirements.
                  </li>
                  <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                    Designing the high-level structure and organization of the software components.
                  </li>
                  <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                    Writing code using programming languages based on the design specifications.
                  </li>
                  <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                    Conducting various types of testing (unit testing, integration testing, system testing, etc.) to
                    ensure software reliability and functionality.
                  </li>
                </ul>
              </Grid>

              <Grid item xs={6} sm={4} sx={{ mt: { xs: -24, sm: 6, md: 0 } }}>
                <Button
                  onClick={() => handleChangeDisplayMode(1)}
                  variant='contained'
                  fullWidth
                  sx={{
                    maxWidth: 250,
                    marginTop: '1rem',
                    backgroundColor: '#000000',
                    letterSpacing: 0.5,
                    fontFamily: 'Segoe UI'
                  }}
                >
                  Subjects
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} sx={{ mt: { xs: -24, sm: 6, md: 0 } }}>
                <Button
                  onClick={() => handleChangeDisplayMode(2)}
                  variant='contained'
                  color='primary'
                  fullWidth
                  sx={{
                    maxWidth: 250,
                    marginTop: '1rem',
                    marginLeft: '1rem',
                    backgroundColor: '#000000',
                    letterSpacing: 0.5,
                    fontFamily: 'Segoe UI'
                  }}
                >
                  Study Plan
                </Button>
              </Grid>
            </Grid>
          )}
        </Hidden>
        {/* show curriculum in treeview and gridview */}
        {displayMode === 1 && (
          <Grid container item xs={12} sx={{ mt: 0 }}>
            <Grid item xs={12} md={3}>
              <Button onClick={() => handleChangeDisplayMode(0)} variant={'contained'} sx={{ mb: 6 }}>
                Back
              </Button>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Segoe UI' }}>
                  RMUTL Software Engineering 2566
                </Typography>
              </Grid>
            </Hidden>

            <Hidden mdUp>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3.5, px: 4 }}>
                <Typography variant='h5' sx={{ fontFamily: 'Segoe UI' }}>
                  RMUTL SE 2566
                </Typography>
              </Grid>
            </Hidden>
            <Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', px: { xs: 2, md: 0 } }}>
              <Grid item xs={12} sm={6}>
                <RadioGroup
                  name='radioOptions'
                  value={subjectView}
                  onChange={handleChangeView}
                  row
                  sx={{
                    // width: { xs: '50%', lg: '30%' },
                    pb: 6,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    pr: 2
                  }}
                >
                  <FormControlLabel value='treeview' control={<Radio />} label='tree' />
                  <FormControlLabel value='normalview' control={<Radio />} label='grid' />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  // sx={{ width: { xs: '50%', lg: '70%' } }}
                  // sx={{ width: { xs: 250, sm: 600 } }}
                  value={subjectSelected || []}
                  size='small'
                  disablePortal
                  fullWidth
                  freeSolo
                  options={customSubjects}
                  getOptionLabel={option => option.label || ''}
                  renderInput={params => <TextField {...params} label='Subject Name, Code' />}
                  onChange={(e, value) => {
                    if (value !== null) {
                      setSubjectSelected(value)
                      setCategoriesSelected(0)
                      setTypesSelected(0)
                      setGroupsSelected(0)
                      // setState(pre => ({ ...pre, subject_group_id: value.subject_group_id }))
                    } else {
                      setSubjectSelected([])
                      setCategoriesSelected(0)
                      setTypesSelected(0)
                      setGroupsSelected(0)
                      // setState(pre => ({ ...pre, subject_group_id: null }))
                    }
                  }}
                />
              </Grid>
            </Grid>
            {/* treeview */}
            {subjectView === 'treeview' ? (
              <Grid item xs={12}>
                {expandedNodes && (
                  <TreeView
                    expanded={expandedNodes} // expand node by nodeId
                    defaultCollapseIcon={<ChevronDown />}
                    defaultExpandIcon={<ChevronRight />}
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      height: 600,
                      overflowY: 'auto',
                      overflowX: 'hidden'
                    }}
                  >
                    {curriculumTree?.length !== 0 && curriculumTree !== null && subjectSelected.subject_id === undefined
                      ? Object.values(curriculumTree)?.map(nodes => recursionContinueSubjects(nodes))
                      : curriculumTree !== null &&
                        Object.values(curriculumTree)
                          .sort((a, b) =>
                            a.subject_id === subjectSelected.subject_id
                              ? -1
                              : b.id === subjectSelected.subject_id
                              ? 1
                              : a.id - b.id
                          )
                          .map(nodes => recursionContinueSubjects(nodes))}
                  </TreeView>
                )}
              </Grid>
            ) : (
              <Grid
                container
                item
                xs={12}
                md={10}
                sx={{ m: { xs: 0, sm: 2 }, height: 600, maxWidth: { xs: 320, sm: 1200 } }}
              >
                {/* Filter */}
                {/* gridview */}
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  {/* Pagination */}
                  <TablePagination
                    rowsPerPageOptions={[]}
                    component='div'
                    size='small'
                    count={
                      subjectsSE66?.filter(
                        f =>
                          // case 1 select all filters
                          (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                            f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                            f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected) ||
                          // case 2 select two of three
                          // category and type
                          (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                            f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                            !groupsSelected) ||
                          // category and group
                          (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                            f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected &&
                            !typesSelected) ||
                          // type and group
                          (f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                            f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected &&
                            !categoriesSelected) ||
                          // case 3 select only one of three
                          // only category
                          (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                            !typesSelected &&
                            !groupsSelected) ||
                          // only type
                          (f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                            !categoriesSelected &&
                            !groupsSelected) ||
                          // only group
                          (f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected &&
                            !categoriesSelected &&
                            !typesSelected) ||
                          (!categoriesSelected && !typesSelected && !groupsSelected)
                      ).length
                    }
                    rowsPerPage={16}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </Grid>
                <Grid container item xs={12} sm={12} lg={8} spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Selection
                      disabled={categoriesSubject[0] === undefined}
                      label={'Category'}
                      height={40}
                      width={'100%'}
                      selectionValue={categoriesSelected}
                      firstItemText={'แสดงทั้งหมด'}
                      handleChange={e => {
                        setCategoriesSelected(e.target.value)
                      }}
                      Items={Object.values(categoriesSubject).map(menu => (
                        <MenuItem key={menu} value={menu}>
                          {menu}
                        </MenuItem>
                      ))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Selection
                      disabled={typesSubject[0] === undefined}
                      label={'Type'}
                      height={40}
                      width={'100%'}
                      selectionValue={typesSelected}
                      firstItemText={'แสดงทั้งหมด'}
                      handleChange={e => setTypesSelected(e.target.value)}
                      Items={Object.values(typesSubject).map(menu => (
                        <MenuItem key={menu} value={menu}>
                          {menu}
                        </MenuItem>
                      ))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Selection
                      disabled={groupsSubject[0] === undefined}
                      label={'Group'}
                      height={40}
                      width={'100%'}
                      selectionValue={groupsSelected}
                      firstItemText={'แสดงทั้งหมด'}
                      handleChange={e => setGroupsSelected(e.target.value)}
                      Items={Object.values(groupsSubject).map(menu => (
                        <MenuItem key={menu} value={menu}>
                          {menu}
                        </MenuItem>
                      ))}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 6, overflow: 'auto', minHeight: 600 }}>
                    <Grid container spacing={6} sx={{ p: 2 }}>
                      {subjectsSE66
                        .sort((a, b) =>
                          a.subject_id === subjectSelected.subject_id
                            ? -1
                            : b.id === subjectSelected.subject_id
                            ? 1
                            : a.id - b.id
                        )
                        .filter(
                          f =>
                            // case 1 select all filters
                            (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                              f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                              f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected) ||
                            // case 2 select two of three
                            // category and type
                            (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                              f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                              !groupsSelected) ||
                            // category and group
                            (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                              f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected &&
                              !typesSelected) ||
                            // type and group
                            (f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                              f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected &&
                              !categoriesSelected) ||
                            // case 3 select only one of three
                            // only category
                            (f.subject_structures[0]?.subjectCategory?.subject_category_name === categoriesSelected &&
                              !typesSelected &&
                              !groupsSelected) ||
                            // only type
                            (f.subject_structures[0]?.subjectType?.subject_type_name === typesSelected &&
                              !categoriesSelected &&
                              !groupsSelected) ||
                            // only group
                            (f.subject_structures[0]?.subjectGroup?.subject_group_name === groupsSelected &&
                              !categoriesSelected &&
                              !typesSelected) ||
                            (!categoriesSelected && !typesSelected && !groupsSelected)
                        )
                        .slice(page * 16, page * 16 + 16)

                        .map(value => (
                          <Grid item xs={12} sm={12} md={6} lg={4} key={value.subject_id}>
                            <Card
                              sx={{
                                height: 65,
                                background: 'white',
                                border: subjectSelected.subject_id === value.subject_id ? 1 : 0
                              }}
                            >
                              <Box
                                sx={{
                                  height: 30,

                                  background: 'lightgray',
                                  display: 'flex',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <Typography
                                  variant='body2'
                                  sx={{
                                    m: 1,
                                    ml: 2,
                                    fontWeight: 'bold',
                                    // color: simSubjects.find(v => v.subject_id === value.subject_id) && 'gray',
                                    color: 'gray',
                                    display: 'inline' // Ensure inline display
                                  }}
                                >
                                  {value.subject_code}
                                </Typography>
                              </Box>
                              <Box
                                onClick={() => handleOpenDetails(value)}
                                sx={{
                                  height: 35,
                                  ml: 1.5,
                                  p: 1,
                                  display: 'flex',
                                  direction: 'column',
                                  cursor: 'pointer'
                                }}
                              >
                                <Typography
                                  variant='body2'
                                  // color={simSubjects.find(v => v.subject_id === value.subject_id) && 'lightgray'}
                                  noWrap
                                >
                                  {/* Subject ................................................................... */}
                                  {value.subject_name_th}
                                </Typography>
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
        {displayMode === 2 && (
          <Grid container item xs={12} sx={{ pb: { xs: 0, lg: 12 } }}>
            <Grid item xs={12}>
              <Grid item xs={12} sx={{ mb: 6 }}>
                <Button onClick={() => handleChangeDisplayMode(0)} variant={'contained'}>
                  Back
                </Button>
              </Grid>
              <Box sx={{ textAlign: 'end', pr: 10, mt: { xs: 0, lg: -12 } }}>
                <Typography variant='h6' sx={{ fontFamily: 'Segoe UI', mb: 6 }}>
                  แผนแนะนำ มคอ.2 Software Engineering 66
                </Typography>
              </Box>
              <Grid container sx={{ width: '100%', px: 4 }}>
                {UniqueCategories.map(categoryHeader => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={categoryHeader}
                    maxWidth={'100%'}
                    sx={{ pl: 3, pr: 6, mb: 6, borderLeft: 1, borderColor: 'lightgrey' }}
                  >
                    {curriculumScopeSE66?.filter(
                      categoryHasCredit =>
                        categoryHasCredit.subject_category_id !== null &&
                        categoryHasCredit.subject_type_id === null &&
                        categoryHasCredit.subject_group_id === null &&
                        categoryHasCredit.subjectCategory?.subject_category_name === categoryHeader
                    ).length > 0 ? (
                      curriculumScopeSE66
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

                    {curriculumScopeSE66
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
                              <Typography variant='body2'>{case1Result.subjectType?.subject_type_name}</Typography>
                              <Typography variant='body2' display='inline'>
                                {case1Result?.credit_total}
                              </Typography>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2 }}>
                              <Typography variant='body2'>{case1Result.subjectGroup?.subject_group_name}</Typography>
                              <Typography variant='body2' display='inline'>
                                {case1Result?.credit_total}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      ))}

                    {UniqueTypes.filter(filterType => filterType.subject_category_name === categoryHeader).map(
                      typeHeader => (
                        <Box key={typeHeader.subject_type_name} sx={{ ml: 3 }}>
                          {/* {typeHeader.subject_type_name} */}

                          {curriculumScopeSE66
                            ?.filter(
                              case1 =>
                                // condition category && type
                                case1.subject_category_id !== null &&
                                case1.subject_type_id !== null &&
                                case1.subject_group_id === null
                            )
                            .map(case1Duplicate => (
                              <Box key={case1Duplicate.curriculum_structures_v2_id}>
                                {case1Duplicate.subjectType.subject_type_name !== typeHeader.subject_type_name && (
                                  <Typography>{typeHeader.subject_type_name}</Typography>
                                )}
                              </Box>
                            ))}

                          {/* <Typography>{typeHeader.subject_type_name}</Typography> */}

                          {/* case 2 */}

                          {curriculumScopeSE66
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
            </Grid>
            <Grid container item xs={12} spacing={3} sx={{ overflow: 'auto', maxHeight: 400 }}>
              {yearSemesterArray?.map(ys => (
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 6, height: 350 }}>
                    {studyPlanSE66
                      ?.filter(
                        planFilter =>
                          planFilter.study_plan_record_year === ys.year &&
                          planFilter.study_plan_record_semester === ys.semester
                      )
                      .map((plan, index) => (
                        <Grid container key={plan.study_plan_record_id}>
                          <Grid item xs={12}>
                            {index === 0 && (
                              <>
                                <Typography variant='body2' sx={{ color: grey[800], mb: 2 }}>
                                  {'ปีการศึกษาที่' + ys.year + ' เทอม' + ys.semester}
                                </Typography>
                                <Divider />
                              </>
                            )}
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant='caption'>
                              {plan.study_plan_record_elective_course ? '-' : plan.subjects?.subject_code}
                            </Typography>
                          </Grid>
                          <Grid item xs={8} sx={{ textAlign: 'start' }}>
                            <Typography variant='caption'>
                              {plan.study_plan_record_elective_course
                                ? plan.study_plan_record_elective_course
                                : plan.subjects?.subject_name_th}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
      {/* show subject details dialog */}
      <Dialog
        open={openDetails}
        onClose={() => {
          setOpenDetails(false)
          setSubjectSelected([])
        }}
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle
          sx={{
            background: 'lightgray',
            display: 'flex',
            justifyContent: 'space-between',
            pr: 6,
            borderBottom: 1,
            borderColor: grey[500]
          }}
        >
          <Typography variant='h6'>{subjectSelected.subject_code}</Typography>
          <Button
            onClick={() => {
              setOpenDetails(false)
              setSubjectSelected([])
            }}
            sx={{ fontFamily: 'Segoe UI', color: 'white', fontWeight: 'bold', letterSpacing: 1, opacity: 0.8 }}
          >
            Close
          </Button>
        </DialogTitle>
        <DialogContent sx={{ minHeight: 600, background: grey[200], p: 10 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 6 }}>
            <Typography variant='h3'>{subjectSelected.subject_credit}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mt: 1.5 }}>
              <Typography variant='body2' sx={{ color: 'gray' }}>
                {subjectSelected.subject_name_en}
              </Typography>
              <Typography variant='body2' sx={{ color: grey[800] }}>
                {subjectSelected.subject_name_th}
              </Typography>
            </Box>
          </Box>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', mt: 10 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ color: 'gray' }}>
                Previous Subject
              </Typography>
              {SubjectsRelationsLoading && 'Loading...'}
              <Typography variant='body2' sx={{ fontWeight: 'bold', color: grey[700] }} noWrap>
                {SubjectsRelations[0]?.parent
                  ? SubjectsRelations[0]?.parent?.subject_code + ' ' + SubjectsRelations[0]?.parent?.subject_name_en
                  : !SubjectsRelationsLoading && 'No Previous Subject'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography variant='body2' sx={{ color: 'gray' }}>
                Continue Subject
              </Typography>
              {SubjectsRelationsLoading && 'Loading...'}
              {SubjectsRelations[0]?.children.length > 0
                ? SubjectsRelations[0]?.children.map(ch => (
                    <div
                      key={ch.subject_id}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                          backgroundColor: '#e0e0e0' // Add your desired background color on hover
                        }
                      }}
                    >
                      <div style={{ marginRight: '8px' }}>•</div> {/* Bullet-like character */}
                      <Typography
                        variant='body2'
                        sx={{ color: grey[700], fontWeight: 'bold', display: 'inline' }}
                        noWrap
                      >
                        {ch.subjects.subject_code + ' ' + ch.subjects.subject_name_en}
                      </Typography>
                    </div>

                    // </li>
                  ))
                : !SubjectsRelationsLoading && (
                    <Typography variant='body2' sx={{ color: grey[700], fontWeight: 'bold', display: 'inline' }}>
                      No Continue Subject
                    </Typography>
                  )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ color: 'gray', mt: 8 }}>
                Subject Description
              </Typography>
              <Typography variant='body2' sx={{ color: grey[700] }} textAlign='justify'>
                {subjectSelected?.subject_description}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant='body2' sx={{ color: 'gray', mt: 8 }}>
                  Project Related
                </Typography>
              </Grid>
              {[1, 2, 3, 4].map((item, index) => (
                <Grid key={item} item xs={12} sm={6} lg={4}>
                  <Card sx={{ height: 65, background: 'white' }}>
                    <Box
                      sx={{
                        height: 30,
                        background: 'lightgray',
                        display: 'flex',
                        justifyContent: 'end'
                      }}
                    >
                      <Button
                        sx={{
                          color: 'white',
                          m: 1,
                          mx: -2
                        }}
                      >
                        ...
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        height: 35,
                        ml: 1.5,
                        p: 1,
                        display: 'flex',
                        direction: 'column'
                      }}
                    >
                      <Typography variant='body2' noWrap>
                        Application something
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Roadmap
