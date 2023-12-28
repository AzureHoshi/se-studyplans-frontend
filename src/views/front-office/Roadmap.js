import {
  Autocomplete,
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Hidden,
  TextField,
  Typography,
  alpha
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { styled } from '@mui/material/styles'
import { TreeItem, TreeView, treeItemClasses } from '@mui/x-tree-view'
import { ChevronDown, ChevronRight } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { url } from 'src/configs/urlConfig'
import { useFetch } from 'src/hooks'

const HeadTypography = styled(Typography)(({ theme }) => ({
  variant: 'subtitle1',
  color: '#909094',
  fontWeight: 'bold',
  marginBottom: '1rem',
  fontSize: 14
}))

const Roadmap = ({ curriculumTree }) => {
  const [displayMode, setDisplayMode] = useState(0) // 0 : roadmap detail, 1: Subjects ,2: Study Plan
  const [expandedNodes, setExpandedNodes] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)

  const [openDetails, setOpenDetails] = useState(false)

  const [subjectSelected, setSubjectSelected] = useState([])
  const URL_GET_SUBJECTS_RELATIONS = `${url.BASE_URL}/continue-subjects-subject/`

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

  useEffect(() => {
    if (curriculumTree) {
      const dummy = []
      const getNodeID = recursionGetNodeID(dummy, curriculumTree)
      setExpandedNodes(...getNodeID)

      // console.log(...getNodeID)

      // console.log(...getNodeID)
    }
  }, [curriculumTree])

  return (
    <Box className='content-center'>
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
                  <HeadTypography>Introduction to Computer Science:</HeadTypography>
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
        {displayMode === 1 && (
          <Grid container item xs={12}>
            <Grid item xs={2}>
              <Button onClick={() => handleChangeDisplayMode(0)} variant={'contained'} sx={{ mb: 6 }}>
                Back
              </Button>
            </Grid>
            <Grid item xs={10} sm={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Autocomplete
                sx={{ width: { xs: 250, sm: 600 } }}
                value={subjectSelected || []}
                size='small'
                disablePortal
                fullWidth
                freeSolo
                options={curriculumTree}
                getOptionLabel={option =>
                  option ? `${option?.subjects?.subject_code || ''} ${option?.subjects?.subject_name_th || ''}` : ''
                }
                renderInput={params => <TextField {...params} label='Subject Name, Code' />}
                onChange={(e, value) => {
                  if (value !== null) {
                    setSubjectSelected(value)
                    // setState(pre => ({ ...pre, subject_group_id: value.subject_group_id }))
                  } else {
                    setSubjectSelected([])
                    // setState(pre => ({ ...pre, subject_group_id: null }))
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={10} sx={{ m: 2 }}>
              {expandedNodes && (
                <TreeView
                  expanded={expandedNodes} // expand node by nodeId
                  defaultCollapseIcon={<ChevronDown />}
                  defaultExpandIcon={<ChevronRight />}
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxWidth: 1200,
                    maxHeight: 600,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                >
                  {curriculumTree?.length !== 0 && subjectSelected.subject_id === undefined
                    ? Object.values(curriculumTree).map(nodes => recursionContinueSubjects(nodes))
                    : Object.values(curriculumTree)
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
          </Grid>
        )}
      </Grid>
      {/* show subject details dialog */}
      <Dialog
        open={openDetails}
        onClose={() => {
          setOpenDetails(false)
          // setTimeout(() => {
          //   setSubjectSelected([])
          // }, 200)
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
              // setTimeout(() => {
              //   setSubjectSelected([])
              // }, 200)
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
              <Typography variant='body2' sx={{ fontWeight: 'bold' }} noWrap>
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
                {subjectSelected.subject_description}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant='body2' sx={{ color: 'gray', mt: 8 }}>
                  Project Related
                </Typography>
              </Grid>
              {[1, 2, 3, 4].map((item, index) => (
                <Grid key={item} item xs={6} lg={4}>
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
