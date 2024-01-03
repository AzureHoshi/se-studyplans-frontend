// React import
import React, { useState, useEffect, useLayoutEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Hidden,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
  AutoComplete,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Autocomplete,
  Divider
} from '@mui/material'

// Mui components import URL: https://mui.com/material-ui/react-list/
import DockLeft from 'mdi-material-ui/DockLeft'
import Magnify from 'mdi-material-ui/Magnify'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

import CardInfo from './CardInfo'
import SubjectDetails from './SubjectDetails'
import { blue, grey, red } from '@mui/material/colors'

const Subjects = ({
  data,
  switchContent,
  setSwitchContent,
  filterState,
  subjectSelected,
  setSubjectSelected,
  handleShowAlert,
  setFilterState,
  currentTerm,
  setCurrentTerm,
  termLabel,
  summerLabel,
  handleOpenAddDialog,
  stdStudyPlans,
  setStdStudyPlans,
  handleRemoveStudyPlan,
  handleShowScope
}) => {
  const [open, setOpen] = useState(false)
  const [openSubjectDetails, setOpenSubjectDetails] = useState(false)
  const [searchSubject, setSearchSubject] = useState([])
  const [customSubjects, setCustomSubjects] = useState([])

  const handleChangeSubject = subject => {
    setSubjectSelected(subject)
    console.log(subject)
  }

  const handleCheckScreen = () => {
    if (window.innerWidth > 600) {
      setOpenSubjectDetails(false)
    } else {
      setOpenSubjectDetails(true)
    }
  }

  const calculateSumByTermLabel = (data, targetTermLabel) => {
    // Calculate the sum of subject_credit for each termLabel
    const sumByTermLabel = data.reduce((acc, curr) => {
      const { termLabel } = curr
      acc[termLabel] = (acc[termLabel] || 0) + curr.subject?.subject_credit
      return acc
    }, {})

    // If a specific targetTermLabel is provided, return its sum
    if (targetTermLabel) {
      return sumByTermLabel[targetTermLabel] || 0
    }

    // Otherwise, return the entire sumByTermLabel object
    return sumByTermLabel
  }

  useLayoutEffect(() => {
    if (!data) return
    const customLabelForAutocomplete = data?.map(d => ({
      label: d.subject_code + ' ' + d.subject_name_th,
      subject_id: d.subject_id
    }))
    setCustomSubjects(customLabelForAutocomplete)
    // console.log('testLabel', customLabelForAutocomplete)
  }, [data])

  useEffect(() => {
    console.log('searchSubject', searchSubject)
  }, [searchSubject])

  console.log('stdStudyPlans', stdStudyPlans)
  return (
    <Box sx={{ height: '100vh', borderRight: { xs: 'none', sm: '2px solid #e5eaef' } }}>
      {switchContent === 0 && (
        <Box sx={{ paddingTop: 4, paddingX: 4, marginBottom: 4, display: 'flex' }}>
          <Hidden lgUp>
            <IconButton onClick={() => setOpen(true)}>
              <DockLeft />
            </IconButton>
            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
              <CardInfo
                setSwitchContent={setSwitchContent}
                setFilterState={setFilterState}
                closeDrawer={() => setOpen(false)}
                setCurrentTerm={setCurrentTerm}
                currentTerm={currentTerm}
                termLabel={termLabel}
                summerLabel={summerLabel}
                handleShowScope={handleShowScope}
              />
            </Drawer>
          </Hidden>
          <Autocomplete
            value={searchSubject || []}
            size='small'
            disablePortal
            fullWidth
            freeSolo
            options={customSubjects}
            getOptionLabel={option => option.label || ''}
            renderInput={params => <TextField {...params} label='Subject Name, Code' />}
            onChange={(e, value) => {
              if (value !== null) {
                setSearchSubject(value)
                setSubjectSelected(data?.find(s => s.subject_id === value.subject_id))
                // setState(pre => ({ ...pre, subject_group_id: value.subject_group_id }))
              } else {
                setSearchSubject([])
                setSubjectSelected([])
                // setState(pre => ({ ...pre, subject_group_id: null }))
              }
            }}
          />
        </Box>
      )}
      {switchContent === 1 && (
        <Box sx={{ paddingTop: 5, paddingX: 6, marginBottom: 4, display: 'flex' }}>
          <Hidden lgUp>
            <IconButton onClick={() => setOpen(true)} sx={{ mr: 1.5 }}>
              <DockLeft />
            </IconButton>
            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
              <CardInfo
                setSwitchContent={setSwitchContent}
                setFilterState={setFilterState}
                closeDrawer={() => setOpen(false)}
                setCurrentTerm={setCurrentTerm}
                currentTerm={currentTerm}
                termLabel={termLabel}
                summerLabel={summerLabel}
                handleShowScope={handleShowScope}
              />
            </Drawer>
          </Hidden>
          <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 16, md: 20 } }}>{currentTerm}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 16, md: 20 } }}>
                {calculateSumByTermLabel(stdStudyPlans, currentTerm)}
              </Typography>
              <Typography sx={{ ml: 2, fontWeight: 'bold', fontSize: { xs: 16, md: 20 } }}>Total Credit</Typography>
            </Box>
          </Box>
        </Box>
      )}
      {switchContent === 0 && (
        <Box sx={{ maxHeight: 800, overflow: 'auto' }}>
          {data
            ?.sort((a, b) =>
              searchSubject.subject_id === undefined
                ? a.subject_structures[0]?.subject_category_id - b.subject_structures[0]?.subject_category_id
                : a.subject_id === searchSubject.subject_id
                ? -1
                : b.id === searchSubject.subject_id
                ? 1
                : a.id - b.id
            )
            .filter(fS =>
              filterState === 0
                ? fS
                : filterState === 1
                ? fS.subject_structures[0]?.subject_category_id === 1
                : fS.subject_structures[0]?.subject_category_id === 2
            )
            .map(s => (
              <List
                onClick={() => handleChangeSubject(s)}
                key={s.subject_id}
                sx={{ mx: 2, background: searchSubject.subject_id === s.subject_id ? grey[100] : 'white' }}
              >
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleCheckScreen()}>
                    <ListItemText>
                      <Grid container>
                        <Grid item xs={1}>
                          <Typography variant='h5' sx={{ marginTop: '20%', fontWeight: 'bold' }}>
                            {s.subject_credit}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          sm={8}
                          md={7}
                          sx={{
                            width: '100%',
                            overflow: { xs: null, md: 'hidden' },
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            pr: 2
                          }}
                        >
                          <Typography variant='subtitle2' sx={{ fontWeight: 'bold', marginBottom: '-5px' }}>
                            {s.subject_code}
                          </Typography>
                          <Typography variant='caption' noWrap>
                            {s.subject_name_th}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sm={3} md={1} sx={{ pr: 4, pt: { xs: 0, md: 3 }, textAlign: 'end' }}>
                          {s.continue_subjects[0].parent !== null ? (
                            <Tooltip title='has previous subject'>
                              <AlertCircleOutline sx={{ fontSize: 20 }} />
                            </Tooltip>
                          ) : null}
                        </Grid>
                        <Grid container item xs={3} sm={12} md={3} spacing={0}>
                          <Grid item xs={12} sm={6} md={12}>
                            <Typography
                              variant='body2'
                              align='center'
                              sx={{
                                color: s.subject_structures[0]?.subject_category_id === 1 ? '#ffb93d' : 'white',
                                backgroundColor:
                                  s.subject_structures[0]?.subject_category_id === 1 ? '#fef5e5' : blue[100],
                                borderRadius: 2,
                                minWidth: 80,
                                mb: 1
                              }}
                            >
                              {s.subject_structures[0]?.subject_category_id === 1 ? 'General' : 'Specific'}
                            </Typography>
                          </Grid>
                          {stdStudyPlans?.find(subj => subj.subject?.subject_id === s.subject_id) && (
                            <Grid item xs={12} sm={6} md={12}>
                              <Typography
                                variant='body2'
                                align='center'
                                sx={{ color: grey[400], backgroundColor: grey[200], borderRadius: 2, minWidth: 80 }}
                              >
                                Added
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            ))}
        </Box>
      )}
      {switchContent === 1 && (
        <Box sx={{ maxHeight: 800, overflow: 'auto', mx: 6, mt: 12 }}>
          <Grid container>
            {stdStudyPlans
              ?.filter(s => s.termLabel === currentTerm)
              .map(stdp => (
                <Grid
                  key={stdp.subject_id}
                  container
                  item
                  xs={12}
                  sx={{
                    mb: 2.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: grey[50],
                    px: 4,
                    py: 2,
                    borderRadius: 2
                  }}
                >
                  <Grid item xs={6}>
                    <Typography variant='caption'>{stdp.subject?.subject_code}</Typography>
                    <Typography variant='body2' noWrap>
                      {stdp.subject?.subject_name_th}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ p: 2.5, textAlign: 'end' }}>
                    {stdp.stu_acad_rec_grade + '(' + stdp.subject?.subject_credit + ' Credit)'}
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
      <Drawer anchor='right' open={openSubjectDetails} onClose={() => setOpenSubjectDetails(false)}>
        <Box sx={{ m: 2.5, mb: 5, width: 300 }}>
          <Button variant='outlined' onClick={() => setOpenSubjectDetails(false)}>
            Back
          </Button>
          <SubjectDetails
            subjectSelected={subjectSelected}
            handleShowAlert={handleShowAlert}
            handleOpenAddDialog={handleOpenAddDialog}
            stdStudyPlans={stdStudyPlans}
            handleRemoveStudyPlan={handleRemoveStudyPlan}
          />
        </Box>
      </Drawer>
    </Box>
  )
}

export default Subjects
