import React, { useEffect, useState } from 'react'
import { CustomLayout } from 'src/views/custom-layout-job-subjectrelated'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { url } from 'src/configs/urlConfig'
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  Alert,
  Divider,
  Autocomplete,
  DialogActions
} from '@mui/material'
import { useFetch } from 'src/hooks'
import { Btn, DataGridTable } from 'src/components'
import { mdiClose, mdiPen } from '@mdi/js'
import { grey } from '@mui/material/colors'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@mdi/react'
import axios from 'axios'
import { Iobroker } from 'mdi-material-ui'

function JobSubjectRelated() {
  const URL_GET_JOBS = `${url.BASE_URL}/job-positions/`
  const URL_GET_SUBJECT_RELATED = `${url.BASE_URL}/subject-job-relateds/`
  const URL_GET_SUBJECTS = `${url.BASE_URL}/subjects-by-curriculum/` + 2 // only curriculum se 66
  const URL_JOB_COMPETENCIES = `${url.BASE_URL}/job-competencies/`

  const {
    error: JobsError,
    data: Jobs,
    setData: setJobs,
    loading: JobsLoading,
    reFetch: reFetchJobs
  } = useFetch(URL_GET_JOBS)

  const {
    error: SubjectRelatedError,
    data: SubjectRelated,
    setData: setSubjectRelated,
    loading: SubjectRelatedLoading,
    reFetch: reFetchSubjectRelated
  } = useFetch(URL_GET_SUBJECT_RELATED)

  const {
    error: SubjectsError,
    data: Subjects,
    setData: setSubjects,
    loading: SubjectsLoading,
    reFetch: reFetchSubjects
  } = useFetch(URL_GET_SUBJECTS)

  const [open, setOpen] = useState(false)
  const [subjectJobRelated, setSubjectJobRelated] = useState([])
  const [jobId, setJobId] = useState(0)
  const [jobNameSelected, setJobNameSelected] = useState('')
  const [jobIdSelected, setJobIdSelected] = useState(0)
  const [openAlert, setOpenAlert] = useState(false)

  const [openInsert, setOpenInsert] = useState(false)
  const [job, setJob] = useState([])
  const [newJobName, setNewJobName] = useState('')
  const [subjectSelected, setSubjectSelected] = useState([])
  const [newCompetency, setNewCompetency] = useState('')

  const [openCompetencies, setOpenCompetencies] = useState(false)
  const [openCompetenciesEdit, setOpenCompetenciesEdit] = useState(false)
  const [competencySelected, setCompetencySelected] = useState([])

  const handleOpenComEdit = comRow => {
    setCompetencySelected(comRow)
    setOpenCompetenciesEdit(true)
  }

  const handleCloseComEdit = () => {
    setOpenCompetenciesEdit(false)
    setTimeout(() => {
      setCompetencySelected([])
    }, 500)
  }

  const handleUpdateJobComDesc = () => {
    if (!competencySelected?.job_com_description) return
    axios
      .put(URL_JOB_COMPETENCIES + competencySelected?.job_com_id, {
        job_position_id: competencySelected?.job_position_id,
        job_com_description: competencySelected?.job_com_description
      })
      .then(res => {
        if (res.data) {
          // console.log(res.data)
          const { job_competencies, ...rest } = job
          const jobComUpdate = job_competencies?.map(job => {
            if (job.job_com_id === res.data.data.job_com_id) return res.data.data
            else return job
          })
          const stateUpdate = { ...rest, job_competencies: jobComUpdate }
          // console.log('stateUpdate', stateUpdate)
          setJob(stateUpdate)
          setOpenCompetenciesEdit(false)
        }
      })
  }

  const handleRemoveJobCom = job_com_id => {
    if (!job_com_id) return
    axios.delete(URL_JOB_COMPETENCIES + job_com_id).then(res => {
      if (res.data) {
        // console.log(res.data)
        const { job_competencies, ...rest } = job
        const jobComUpdate = job_competencies?.filter(job => job.job_com_id !== job_com_id)
        const stateUpdate = { ...rest, job_competencies: jobComUpdate }
        // console.log('stateUpdate', stateUpdate)
        setJob(stateUpdate)
        reFetchJobs()
      }
    })
  }

  const handleChangeNewCompetency = value => {
    setNewCompetency(value)
  }
  const handleAddNewJobCompetency = () => {
    if (!newCompetency) return
    axios
      .post(URL_JOB_COMPETENCIES, { job_position_id: job.job_position_id, job_com_description: newCompetency })
      .then(res => {
        if (res.data) {
          // console.log(res.data)
          const { job_competencies, ...rest } = job
          const updatedJobCompetencies = [...job_competencies, res.data.data]
          const updatedObject = {
            ...rest,
            job_competencies: updatedJobCompetencies
          }
          setJob(updatedObject)
          reFetchJobs()
          setNewCompetency('')
        }
      })
      .catch(err => console.log('err from add new job competency', err))
  }

  const handleGetSubjectRelated = position => {
    if (!position) {
      return
    }
    setJob(position)
    setJobIdSelected(position.job_position_id)
    setJobNameSelected(position.job_position_name)
    setJobId(position.job_position_id)
    const groupedSubject = SubjectRelated.reduce((acc, obj) => {
      const key = obj.job_position_id
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})

    setSubjectJobRelated(groupedSubject[position.job_position_id])
    setTimeout(() => {
      setOpen(true)
    }, 200)
  }

  const handleDeleteJob = position => {
    if (!position.job_position_id) {
      return
    }
    let result = window.confirm('Confirm to Delete ' + position.job_position_name + '?')
    if (result) {
      axios
        .delete(URL_GET_JOBS + position.job_position_id)
        .then(res => {
          // console.log(res.data)
          reFetchJobs()
        })
        .catch(err => {
          // console.log('err from delete job position', err)
        })
    }
  }

  const handleChangeJobName = e => {
    setJobNameSelected(e.target.value)
  }

  const handleUpdateJobName = () => {
    if (jobNameSelected.length === 0 && jobId === 0) {
      return
    }
    axios
      .put(URL_GET_JOBS + jobId, { job_position_name: jobNameSelected })
      .then(res => {
        setOpenAlert(true)
        reFetchJobs()
      })
      .catch(err => console.log('err from update job name', err))
  }

  const handleSubmitNewJob = () => {
    if (newJobName === '') {
      return alert('Please fill the job mame.')
    }
    axios
      .post(URL_GET_JOBS, { job_position_name: newJobName })
      .then(res => {
        // console.log(res.data)
        reFetchJobs()
        setOpenInsert(false)
        setNewJobName('')
      })
      .catch(err => {
        // console.log('err from submit new job', err)
      })
  }

  const handleAddNewSubjectRelate = (positionId, subjectId) => {
    if (!positionId || !subjectId) {
      return
    }
    axios
      .post(URL_GET_SUBJECT_RELATED, { subject_id: subjectId, job_position_id: positionId })
      .then(res => {
        // console.log(res.data)
        reFetchSubjectRelated()
        if (subjectJobRelated?.length > 0) {
          const updateState = [...res.data.data, ...subjectJobRelated]
          setSubjectJobRelated(updateState)
        } else {
          const updateState = Object.values(res.data.data)
          setSubjectJobRelated(updateState)
        }
      })
      .catch(err => {
        // console.log('err from add new subject related', err)
      })
    setSubjectSelected([])
  }

  const handleDeleteSUbjectRelate = subjectRelateId => {
    if (!subjectRelateId) {
      return
    }
    axios
      .delete(URL_GET_SUBJECT_RELATED + subjectRelateId)
      .then(res => {
        // console.log(res.data)
        reFetchSubjectRelated()
        setSubjectJobRelated(() => subjectJobRelated.filter(s => s.subject_job_related_id !== subjectRelateId))
      })
      .catch(err => {
        // console.log('err from delete  subject related', err)
      })
    setSubjectSelected([])
  }

  const handleOpenJobCompetencies = jobRow => {
    setJob(jobRow)
    setJobNameSelected(jobRow.job_position_name)
    setJobIdSelected(jobRow.job_position_id)
    setOpenCompetencies(true)
  }

  // useEffect(() => {
  //   if (SubjectRelated) {
  //     console.log('SubjectRelated', SubjectRelated)
  //   }
  // }, [SubjectRelated])

  // useEffect(() => {
  //   if (job) {
  //     console.log('job', job)
  //   }
  // }, [job])

  const columns = [
    {
      field: 'job_position_name',
      headerName: 'Job Name',
      width: 450
    },
    {
      field: 'created_at',
      headerName: 'Ceated At',
      width: 300,
      valueGetter: params =>
        new Date(params.row.created_at)
          .toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          .replace(/\/|,|:|\s/g, '-')
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      width: 300,
      valueGetter: params =>
        new Date(params.row.updated_at)
          .toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          .replace(/\/|,|:|\s/g, '-')
    },
    {
      field: 'fn',
      headerName: '',
      width: 400,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item>
            <Button color='secondary' variant='outlined' onClick={() => handleGetSubjectRelated(params.row)}>
              {/* <Icon path={mdiPen} size={1} /> */}
              วิชาที่เกี่ยวข้อง
            </Button>
          </Grid>
          <Grid item>
            <Button color='secondary' variant='outlined' onClick={() => handleOpenJobCompetencies(params.row)}>
              {/* <Icon path={mdiPen} size={1} /> */}
              สมรรถนะ
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => handleDeleteJob(params.row)} color='error' variant='outlined'>
              Delete
            </Button>
          </Grid>
        </Grid>
      )
    }
  ]

  // useEffect(() => {
  //   console.log('subjectJobRelated', subjectJobRelated)
  // }, [subjectJobRelated])

  // console.log('subject job related', subjectJobRelated)

  return (
    <CustomLayout
      content={
        <>
          <Typography variant='h6'>Job & Subject Related </Typography>
          <Typography variant='h6' color={grey[400]}>
            Curriculum Software Enginerring 66{' '}
          </Typography>
          <Grid container spacing={6} sx={{ my: 5 }}>
            <Grid item xs={12} md={3} lg={2}>
              <Btn handleclick={() => setOpenInsert(true)} label={'+ Add New Job'} />
            </Grid>
            <Grid item xs={12}>
              <DataGridTable
                rows={Jobs}
                columns={columns}
                uniqueKey={'job_position_id'}
                isLoading={JobsLoading === null ? true : JobsLoading}
                noData='ไม่มีข้อมูลตำแหน่งงานในระบบ'
              />
            </Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false)
              setOpenAlert(false)
            }}
            // fullScreen
            fullWidth
            maxWidth={'lg'}
          >
            <DialogTitle
              sx={{
                height: 70,
                width: '100%',
                background: 'lightgray',
                pr: 6,
                borderBottom: 1,
                borderColor: grey[500],
                position: 'relative'
              }}
            >
              <Typography sx={{ pt: 2, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                Edit Job & Subject Related
              </Typography>

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
                  right: 18,
                  left: null,
                  top: 12
                }}
                onClick={() => {
                  setOpen(false)
                }}
              >
                <Icon path={mdiClose} size={1} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ m: 2, minHeight: 600, pb: 12 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ height: 40, position: 'absolute', right: 24 }}>
                    {openAlert && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <Alert
                          severity='success'
                          color='success'
                          action={
                            <IconButton
                              aria-label='close'
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setOpenAlert(false)
                              }}
                            >
                              <Icon path={mdiClose} size={1} />
                            </IconButton>
                          }
                          sx={{ mb: 2 }}
                        >
                          Update Successfully!
                        </Alert>
                      </motion.div>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ mt: 6 }}>Job name</Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={10}>
                  <TextField
                    size={'small'}
                    value={jobNameSelected}
                    onChange={handleChangeJobName}
                    sx={{ width: '100%', mb: 6 }}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <Button onClick={handleUpdateJobName} variant='contained' sx={{ width: '100%' }}>
                    Update
                  </Button>
                </Grid>
                <Box sx={{ ml: 2, maxHeight: 400, overflow: 'auto', width: '100%' }}>
                  {subjectJobRelated?.length > 0 ? (
                    subjectJobRelated?.map(subject => (
                      <Grid container spacing={2} item xs={12} key={subject.subject_job_related_id}>
                        <Grid item xs={12} md={2}>
                          <Typography>{subject.subject?.subject_code}</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Typography noWrap>{subject.subject?.subject_name_th}</Typography>
                          <Typography noWrap>{subject.subject?.subject_name_en}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            onClick={() => handleDeleteSUbjectRelate(subject.subject_job_related_id)}
                            variant='outlined'
                            color={'error'}
                            sx={{ width: '100%' }}
                          >
                            Delete
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant='body2'>ยังไม่มีรายวิชาที่เกี่ยวข้อง</Typography>
                    </Grid>
                  )}
                </Box>
                <Grid item xs={12}>
                  <Typography sx={{ mt: 6 }}>Add Subject Relate</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Autocomplete
                    value={subjectSelected || []}
                    size='small'
                    disablePortal
                    fullWidth
                    freeSolo
                    options={Subjects?.filter(obj => !subjectJobRelated?.some(s => s.subject_id === obj.subject_id))}
                    getOptionLabel={option =>
                      option ? `${option?.subject_code || ''} ${option?.subject_name_th || ''}` : ''
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

                <Grid item xs={12} md={2}>
                  <Button
                    onClick={() => handleAddNewSubjectRelate(jobIdSelected, subjectSelected.subject_id)}
                    variant='contained'
                    sx={{ width: '100%' }}
                  >
                    Add new
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openInsert}
            onClose={() => {
              setOpenInsert(false)
              setNewJobName('')
            }}
            // fullScreen
            fullWidth
            maxWidth={'lg'}
          >
            <DialogTitle
              sx={{
                height: 70,
                width: '100%',
                background: 'lightgray',
                pr: 6,
                borderBottom: 1,
                borderColor: grey[500],
                position: 'relative'
              }}
            >
              <Typography sx={{ pt: 2, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                Add New Job Position
              </Typography>

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
                  right: 18,
                  left: null,
                  top: 12
                }}
                onClick={() => {
                  setOpenInsert(false)
                  setNewJobName('')
                }}
              >
                <Icon path={mdiClose} size={1} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pb: 12 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography sx={{ mt: 6 }}>Job name</Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={10}>
                  <TextField
                    size={'small'}
                    value={newJobName}
                    onChange={e => setNewJobName(e.target.value)}
                    sx={{ width: '100%', mb: 6 }}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <Button onClick={handleSubmitNewJob} variant='contained' sx={{ width: '100%' }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openCompetencies}
            onClose={() => {
              setOpenCompetencies(false)
              setJobNameSelected('')
              setJobIdSelected(0)
            }}
            // fullScreen
            fullWidth
            maxWidth={'lg'}
          >
            <DialogTitle
              sx={{
                height: 70,
                width: '100%',
                background: 'lightgray',
                pr: 6,
                borderBottom: 1,
                borderColor: grey[500],
                position: 'relative'
              }}
            >
              <Typography sx={{ pt: 2, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                สมรรถนะอาชีพ {jobNameSelected}
              </Typography>

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
                  right: 18,
                  left: null,
                  top: 12
                }}
                onClick={() => {
                  setOpenCompetencies(false)
                  setJobNameSelected('')
                  setJobIdSelected(0)
                }}
              >
                <Icon path={mdiClose} size={1} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pb: 12, minHeight: 400 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {job?.job_competencies?.map((com, index) => (
                    <Box key={com.job_com_id}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
                        <Typography>{index + 1 + ') ' + com.job_com_description}</Typography>
                        <Box sx={{ width: 180, display: 'flex', justifyContent: 'space-between' }}>
                          <Button
                            onClick={() => handleOpenComEdit(com)}
                            size={'small'}
                            variant='outlined'
                            color='secondary'
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleRemoveJobCom(com.job_com_id)}
                            size={'small'}
                            variant='outlined'
                            color={'error'}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Grid>
              </Grid>
              <DialogActions sx={{ p: 0, m: 0, mt: 2.5 }}>
                <TextField
                  value={newCompetency || ''}
                  onChange={e => handleChangeNewCompetency(e.target.value)}
                  fullWidth
                  size='small'
                  label={'สมรรถนะ'}
                />
                <Button variant='outlined' onClick={handleAddNewJobCompetency}>
                  เพิ่ม
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openCompetenciesEdit}
            onClose={() => {
              handleCloseComEdit()
            }}
            maxWidth={'sm'}
            fullWidth
          >
            <DialogContent sx={{ minHeight: 400 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='body2'>Job Competency Edit Form ({job.job_position_name})</Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <PloTextField label={'PLO Title :'} value={PLOSelected.plo_name || ''} /> */}
                  <TextField
                    onChange={e => {
                      const { job_com_description, ...rest } = competencySelected

                      // Update job_com_description with the new value
                      const updatedJobComDescription = e.target.value

                      // Create a new object with the updated job_com_description
                      const updatedCompetencySelected = {
                        ...rest,
                        job_com_description: updatedJobComDescription
                      }

                      // Update the state with the new object
                      setCompetencySelected(updatedCompetencySelected)
                    }}
                    value={competencySelected?.job_com_description || ''}
                    label={'Desciption'}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button onClick={handleUpdateJobComDesc} variant='contained' fullWidth>
                    Update Description
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={() => handleCloseComEdit()} variant='outlined' color={'secondary'} fullWidth>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </>
      }
    />
  )
}

JobSubjectRelated.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default JobSubjectRelated
