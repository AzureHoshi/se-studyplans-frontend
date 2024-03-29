import React, { useEffect, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import {
  Typography,
  Grid,
  Box,
  Autocomplete,
  MenuItem,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Chip,
  Card
} from '@mui/material'

import { CustomLayout } from 'src/views/custom-layout-surveys'
import { mdiPen, mdiTrashCan } from '@mdi/js'
import { Btn, CircleLoading, Selection } from 'src/components'
import Icon from '@mdi/react'
import { url } from 'src/configs/urlConfig'
import { useFetch } from 'src/hooks'
import axios from 'axios'

function InterestsurveysPage() {
  const [curriculumSelected, setCurriculumSelected] = useState(0)
  const [interestVersionSelected, setInterestVersionSelected] = useState(0)
  const [interestTemp, setInterestTemp] = useState([])

  const [openInsert, setOpenInsert] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogTextFieldValue, setDialogTextFieldValue] = useState('')

  const [question, setQuestion] = useState([])
  const [jobsRelatedType1, setJobsRelatedType1] = useState([])
  const [jobsRelatedType1Temp, setJobsRelatedType1Temp] = useState([]) // type1 for compare when update jobs

  const questionTypes = [
    { interest_question_type: 1, label: 'แบบให้คะแนน' },
    { interest_question_type: 2, label: 'แบบตัวเลือก' }
  ]
  const [selectedQuestionType, setSelectedQuestionType] = useState(1)
  const [questionInsertTitle, setQuestionInsertTitle] = useState(null)
  const [jobSelected, setJobSelected] = useState('')

  const [jobsRelatedType2, setJobsRelatedType2] = useState([])
  const [jobsRelatedType2Temp, setJobsRelatedType2Temp] = useState([]) // type2 for compare when update jobs
  const [jobsType2, setJobType2] = useState([])

  const [answer, setAnswer] = useState([])
  const [answerChoiceTitle, setAnswerChoiceTitle] = useState('')

  const URL_GET_CURRICULUM = `${url.BASE_URL}/curriculums/`
  const URL_GET_INTEREST_SURVEYS = `${url.BASE_URL}/interest-surveys/`
  const URL_GET_JOBS = `${url.BASE_URL}/job-positions/`
  const URL_PUT_INTEREST_QUESTION = `${url.BASE_URL}/interest-questions/`
  const URL_POST_INTEREST_ANSWER = `${url.BASE_URL}/interest-answers/`
  const URL_POST_INTEREST_ANSWER_JOB = `${url.BASE_URL}/interest-answers-jobs/`

  const {
    error: CurriculumError,
    data: Curriculums,
    setData: setCurriculums,
    loading: CurriculumLoading,
    reFetch: reFetchCurriculums
  } = useFetch(URL_GET_CURRICULUM)

  const {
    error: InterestSurveysError,
    data: InterestSurveys,
    setData: setInterestSurveys,
    loading: InterestSurveysLoading,
    reFetch: reFetchInterestSurveys
  } = useFetch(URL_GET_INTEREST_SURVEYS + curriculumSelected)

  const {
    error: JobsError,
    data: Jobs,
    setData: setJobs,
    loading: JobsLoading,
    reFetch: reFetchJobs
  } = useFetch(URL_GET_JOBS)

  const [isDone, setIsDone] = useState(null) // for delay after process

  const handleCreateSurveys = () => {
    let result = window.confirm('Create survey in curriculum?')

    if (result) {
      setIsDone(false)
      axios
        .post(URL_GET_INTEREST_SURVEYS, {
          curriculum_id: curriculumSelected,
          interest_survey_version: 1
        })
        .then(res => {
          if (res.data) {
            // console.log(res.data)
            reFetchInterestSurveys()
          }
        })
        .catch(err => console.log('err from create new survey', err))
        .finally(() => setIsDone(false))
    }
  }

  const handleInsertQuestion = () => {
    if (!questionInsertTitle && interestTemp[0]?.interest_survey_id !== undefined) {
      return
    }

    // console.log(interestTemp)
    setIsDone(false)
    // console.log({
    //   interest_survey_id: interestTemp[0]?.interest_survey_id,
    //   interest_question_title: questionInsertTitle,
    //   interest_question_type: selectedQuestionType,
    //   job_position_id: jobSelected
    // })
    setOpenInsert(false)
    axios
      .post(URL_PUT_INTEREST_QUESTION, {
        interest_survey_id: interestTemp[0]?.interest_survey_id,
        interest_question_title: questionInsertTitle,
        interest_question_type: selectedQuestionType,
        job_position_id: jobSelected
      })
      .then(res => {
        if (res.data) {
          reFetchInterestSurveys()
          setQuestionInsertTitle('')
          // console.log(res.data)
        }
      })
      .catch(err => console.log('err from insert new Question : ', err))
      .finally(setIsDone(true))
  }

  const handleEditQuestion = (type, object, jobs) => {
    setOpenEdit(true)
    setQuestion(object)
    if (type === 1 && object && jobs) {
      // for edit question type 1 -> point 1-5
      setDialogTitle('Edit Question (Point 1-5)')
      setDialogTextFieldValue(object?.interest_question_title)

      // console.log('jobs', jobs)
      const jobsData = Object.values(jobs)?.map(job => ({
        interest_answer_job_id: job.interest_answer_job_id,
        job_position_id: job.jobPosition.job_position_id,
        job_position_name: job.jobPosition.job_position_name
      }))
      // console.log(jobsData)
      setJobsRelatedType1Temp(jobsData)
      setJobsRelatedType1(jobsData)

      // console.log('interest_survey_id :', object?.interest_survey_id)
    } else if (type === 2 && object) {
      // console.log(object?.interest_answers.interest_answers_job)
      const jobsData = object?.interest_answers?.map(interestJob => interestJob.interest_answers_job)

      // console.log(test)
      // console.log('object?.interest_answers', object?.interest_answers.interest_answers_job)

      setAnswer(object?.interest_answers)
      // console.log(jobsData)

      // console.log('jobsData', jobsData)

      setJobsRelatedType2(jobsData)
      setJobsRelatedType2Temp(jobsData)

      // for edit  question type 2 -> have choice

      setDialogTitle('Edit Question (Choices)')
      setDialogTextFieldValue(object?.interest_question_title)

      // console.log('interest_question_id :', object?.interest_survey_id)
    }
  }

  const handleUpdateQuestion = (questionLabel, object) => {
    if (questionLabel && object) {
      setIsDone(false)
      axios
        .put(URL_PUT_INTEREST_QUESTION + object?.interest_question_id, {
          interest_survey_id: object?.interest_survey_id,
          interest_question_title: questionLabel,
          interest_question_type: object?.interest_question_type
        })
        .then(res => {
          if (res.data) {
            // console.log(res.data)
            reFetchInterestSurveys()
          }
        })
        .catch(err => console.log(err))
        .finally(() => setIsDone(true))
    }
  }

  const handleDeleteQuestion = questionId => {
    if (questionId) {
      let result = window.confirm('Confirm to Delete?')
      if (result) {
        setIsDone(false)
        axios
          .delete(URL_PUT_INTEREST_QUESTION + questionId)
          .then(res => {
            if (res.data) {
              // console.log(res.data)
              reFetchInterestSurveys()
            }
          })
          .catch(err => console.log(err))
          .finally(() => setIsDone(true))
      }
    }
  }

  const handleInsertChoiceType2 = () => {
    if (answerChoiceTitle && question.interest_question_id) {
      setIsDone(false)
      axios
        .post(URL_POST_INTEREST_ANSWER, {
          interest_question_id: question.interest_question_id,
          interest_answer_title: answerChoiceTitle
        })
        .then(res => {
          if (res.data) {
            // console.log(res.data)
            const tempAnswer = question
            tempAnswer.interest_answers.push(res.data.data)
            reFetchInterestSurveys()
            setAnswerChoiceTitle('')
          }
        })
        .catch(err => console.log('err from insert choice question type 2', err))
        .finally(() => setIsDone(true))
    }
  }

  const handleDeleteAnswer = anwserId => {
    let result = window.confirm('Confirm to Delete?')
    if (anwserId && result) {
      setIsDone(false)
      axios
        .delete(URL_POST_INTEREST_ANSWER + anwserId)
        .then(res => {
          if (res.data) {
            // console.log(res.data)

            const updateAnswer = question.interest_answers.filter(
              q => q.interest_answer_id !== res.data.data.interest_answer_id
            )

            const tempAnswer = question
            tempAnswer.interest_answers = updateAnswer
            reFetchInterestSurveys()
            setAnswerChoiceTitle('')
          }
        })
        .catch(err => console.log('err from delete choice question type 2', err))
        .finally(() => setIsDone(true))
    }
  }

  const handleUpdateJobs = (type, index, ansId) => {
    const insertNewJobs = newJobs => {
      if (newJobs?.length > 0) {
        // console.log('newJobs', newJobs)

        newJobs?.map(job => {
          setIsDone(false)

          const jobState = {
            interest_answer_id: question?.interest_answers[0]?.interest_answer_id,
            job_position_id: job.job_position_id,
            interest_answers_job_score: null
          }
          // console.log('jobsState', jobState)
          axios
            .post(URL_POST_INTEREST_ANSWER_JOB, jobState)
            .then(res => {
              if (res.data) {
                // console.log(res.data)
                reFetchInterestSurveys()
              }
            })
            .catch(err => console.log(`err from insert job, jobState = ${jobState} with err ${err}`))
            .finally(setIsDone(true))
        })
      }
    }

    const insertNewJobsType2 = newJobs => {
      if (newJobs?.length > 0) {
        // console.log('newJobs', newJobs)
        newJobs?.map(job => {
          setIsDone(false)

          const jobState = {
            interest_answer_id: ansId,
            job_position_id: job.job_position_id,
            interest_answers_job_score: null
          }
            // console.log('jobsState', jobState)
            // axios
            .post(URL_POST_INTEREST_ANSWER_JOB, jobState)
            .then(res => {
              if (res.data) {
                // console.log(res.data)
                reFetchInterestSurveys()
              }
            })
            .catch(err => console.log(`err from insert job, jobState = ${jobState} with err ${err}`))
            .finally(setIsDone(true))
        })
      }
    }

    const deleteJobs = removeJobs => {
      // console.log('deleteState', removeJobs)
      if (removeJobs?.length > 0) {
        setIsDone(false)
        removeJobs?.map(del => {
          axios
            .delete(URL_POST_INTEREST_ANSWER_JOB + del.interest_answer_job_id)
            .then(res => {
              if (res.data) {
                // console.log(res.data)
                reFetchInterestSurveys()
              }
            })
            .catch(err => console.log(`err from delete job, deleteState = ${removeJobs} with err ${err}`))
            .finally(setIsDone(true))
        })
      }
    }

    if (type == 1) {
      const newJobs1 = jobsRelatedType1?.filter(
        job => !jobsRelatedType1Temp?.find(temp => temp.job_position_id === job.job_position_id)
      )

      const deleteState = jobsRelatedType1Temp.filter(
        temp => !jobsRelatedType1?.find(job => temp.job_position_id === job.job_position_id)
      )
      // console.log('newJobs', newJobs1)

      if (jobsRelatedType1?.length > jobsRelatedType1Temp?.length) {
        // console.log('job have added')
        insertNewJobs(newJobs1)
      } else if (jobsRelatedType1 == jobsRelatedType1Temp) {
        // console.log('nothing happened')
      } else if (newJobs1.length > 0) {
        // console.log('some job have removed and added new job')
        deleteJobs(deleteState)
        insertNewJobs(newJobs1)
      } else {
        deleteJobs(deleteState)
        // console.log('job have removed')
      }
    } else {
      const newJobs2 = jobsRelatedType2[index]
        ?.map(d => d.jobPosition)
        .filter(job => !jobsRelatedType2Temp[index]?.find(temp => temp.job_position_id === job.job_position_id))

      const deleteState2 = jobsRelatedType2Temp[index]?.filter(
        temp => !jobsRelatedType2[index]?.find(job => temp.job_position_id === job.job_position_id)
      )

      // console.log('newJobs', newJobs2)
      // console.log('deleteState', deleteState2)
      if (jobsRelatedType2[index]?.length > jobsRelatedType2Temp[index]?.length) {
        // console.log('job have added')
        insertNewJobsType2(newJobs2)
      } else if (jobsRelatedType2[index] == jobsRelatedType2Temp[index]) {
        // console.log('nothing happened')
      } else if (newJobs2.length > 0) {
        // console.log('some job have removed and added new job')
        deleteJobs(deleteState2)
        insertNewJobsType2(newJobs2)
      } else {
        deleteJobs(deleteState2)
        // console.log('job have removed')
      }
    }
  }

  // const handleUpdate = (type, object, text) => {
  //   if (type === 1 && object && text !== '') {
  //     // for edit question
  //     axios
  //       .put(URL_PUT_INTEREST_QUESTION + object?.interest_question_id, {
  //         interest_survey_id: object?.interest_survey_id,
  //         interest_question_title: text,
  //         interest_question_number: object?.interest_question_number
  //       })
  //       .then(res => res.data && console.log(res.data))
  //       .catch(err => console.log(err))
  //   } else if (type === 2 && object && text !== '') {
  //     axios
  //       .put(URL_PUT_INTEREST_ANSWER + object?.interest_answer_id, {
  //         interest_question_id: object?.interest_question_id,
  //         interest_answer_choice: text,
  //         interest_answer_number: object?.interest_answer_number
  //       })
  //       .then(res => res.data && console.log(res.data))
  //       .catch(err => console.log(err))
  //     // for edit answer
  //   }
  // }

  useEffect(() => {
    if (Jobs) {
      const jobsMenu = Jobs?.map(j => ({ jobPosition: { ...j } }))

      // console.log('test new jobs menu', jobsMenu)
      setJobType2(jobsMenu)

      // for insert question form
      const maxJobId = Jobs?.reduce((max, obj) => (obj.job_position_id < max ? obj.job_position_id : max), Infinity)
      setJobSelected(maxJobId)
    }
  }, [Jobs])

  useEffect(() => {
    if (curriculumSelected) {
      reFetchInterestSurveys()
    }
  }, [curriculumSelected])

  useEffect(() => {
    // console.log('jobsRelatedType2', jobsRelatedType2)
  }, [jobsRelatedType2])

  useEffect(() => {
    if (Curriculums.length > 0) {
      const findMaxId = Curriculums?.reduce(
        (max, current) => (current.curriculum_id > max.curriculum_id ? current : max),
        Curriculums[0]
      )

      // console.log(findMaxId)
      setCurriculumSelected(findMaxId.curriculum_id)
    }
  }, [Curriculums])
  useEffect(() => {
    if (InterestSurveys?.length > 0) {
      const findMaxId = InterestSurveys?.reduce(
        (max, current) => (current.interest_survey_version > max.interest_survey_version ? current : max),
        InterestSurveys[0]
      )

      // console.log(findMaxId)
      setInterestVersionSelected(findMaxId.interest_survey_version)
      setInterestTemp(InterestSurveys)
    } else {
      setInterestVersionSelected(0)
      setInterestTemp([])
    }
    // console.log(InterestSurveys)
  }, [InterestSurveys])

  useEffect(() => {
    if (InterestSurveysError) {
      setInterestTemp([])
    }
  }, [InterestSurveysError])

  return (
    <CustomLayout
      content={
        <>
          <Typography variant='h6'>Interest Surveys</Typography>
          <Grid container spacing={6} sx={{ mt: 5 }}>
            <Grid item xs={12} md={8} lg={8}>
              <Box display={'flex'} flexDirection={'row'}>
                <Selection
                  label={'Curriculum'}
                  height={40}
                  width={interestTemp?.length > 0 ? '70%' : '100%'}
                  selectionValue={curriculumSelected}
                  handleChange={e => setCurriculumSelected(e.target.value)}
                  Items={Object.values(Curriculums)
                    ?.sort((a, b) => b.curriculum_id - a.curriculum_id)
                    .map(curri => (
                      <MenuItem key={curri.curriculum_id} value={curri.curriculum_id}>
                        {curri.curriculum_name_th + ' ' + curri.curriculum_year}
                      </MenuItem>
                    ))}
                />
                {interestTemp?.length !== 0 && (
                  <Selection
                    ml={2}
                    label={'Version'}
                    height={40}
                    width={'30%'}
                    selectionValue={interestVersionSelected}
                    handleChange={e => setInterestVersionSelected(e.target.value)}
                    Items={Object.values(InterestSurveys)?.map(inter => (
                      <MenuItem key={inter.interest_survey_version} value={inter.interest_survey_version}>
                        Version:{inter.interest_survey_version}
                      </MenuItem>
                    ))}
                  />
                )}
              </Box>
            </Grid>
            {interestTemp?.length > 0 && (
              <Grid item xs={12} md={4} lg={3.5}>
                <Btn width={'100%'} handleclick={() => setOpenInsert(true)} label={'+ Add New Question'} />
              </Grid>
            )}
            {interestTemp?.length === 0 && (
              <Grid item xs={12} md={4} lg={3.5}>
                <Btn width={'100%'} handleclick={() => handleCreateSurveys()} label={'Add New Survey'} />
              </Grid>
            )}
          </Grid>
          <Dialog
            open={!isDone && isDone !== null ? !isDone : false}
            PaperProps={{
              style: {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
          >
            <DialogContent sx={{ overflow: 'hidden' }}>
              <CircleLoading />
            </DialogContent>
          </Dialog>
          {InterestSurveysLoading && interestTemp[0] === undefined ? (
            <Box sx={{ height: 120, m: 12 }}>
              <CircleLoading />
            </Box>
          ) : interestTemp[0] !== undefined ? (
            <Grid container>
              <Grid item xs={12} sx={{ my: 6 }}>
                {interestTemp[0]?.interestQuestions.map((question, qIndex) => (
                  <Card sx={{ m: 2, pl: 3.5, py: 2 }} key={question.interest_question_id}>
                    <Grid container>
                      <Grid container item xs={8} direction={{ xs: 'column', md: 'row' }}>
                        <Grid item>
                          <Typography sx={{ mr: { xs: 0, md: 2 } }}>{qIndex + 1}).</Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontSize: { xs: 14, md: 16 }, ml: { xs: 6, md: 0 } }}>
                            {question.interest_question_title}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container item xs={3.8} direction={'row'} spacing={2.5} justifyContent={'flex-end'}>
                        <Grid item>
                          <Button
                            sx={{ p: 1 }}
                            onClick={() =>
                              handleEditQuestion(
                                question.interest_question_type,
                                question,
                                question.interest_answers[0]?.interest_answers_job
                              )
                            }
                          >
                            <Icon path={mdiPen} size={0.75} style={{ margin: 0.5 }} />
                            Edit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            color='error'
                            sx={{ p: 1 }}
                            onClick={() => handleDeleteQuestion(question.interest_question_id)}
                          >
                            <Icon path={mdiTrashCan} size={0.75} style={{ margin: 0.5 }} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box sx={{ ml: 4, my: 1 }}>
                      {question?.interest_answers.map((ans, ansIndex) => (
                        <Grid container key={ans.interest_answer_id}>
                          {question?.interest_question_type == 1 ? (
                            <Grid item xs={10}>
                              <Typography variant='body2' sx={{ ml: 2 }}>
                                ตอบแบบให้คะแนน 1-5 (น้อย - มาก)
                              </Typography>
                            </Grid>
                          ) : (
                            <Grid container item xs={10} direction={'row'}>
                              <Grid item>
                                <Typography variant='body2' sx={{ mr: 1 }}>
                                  {ansIndex + 1}).
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant='body2'>{ans.interest_answer_title}</Typography>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      ))}
                    </Box>

                    <Divider />
                  </Card>
                ))}
              </Grid>
            </Grid>
          ) : (
            <Typography sx={{ m: 6 }}>have not interest surveys</Typography>
          )}
          <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth={'md'} fullWidth>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent sx={{ pb: 12, minHeight: 500 }}>
              <Grid container sx={{ my: 2 }}>
                <Grid container spacing={2} sx={{ m: 2, mt: 0 }}>
                  <Grid item xs={12}>
                    <Typography>แก้ไขคำถาม</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      size={'small'}
                      sx={{ width: '100%' }}
                      label={'Question'}
                      value={dialogTextFieldValue || ''}
                      onChange={e => setDialogTextFieldValue(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      disabled={!isDone && isDone !== null ? true : false}
                      variant='contained'
                      sx={{ width: '100%', height: '100%' }}
                      onClick={() =>
                        (dialogTextFieldValue !== '') & handleUpdateQuestion(dialogTextFieldValue, question)
                      }
                    >
                      Update Question
                    </Button>
                  </Grid>
                  {question?.interest_question_type === 2 && (
                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={12}>
                        <Typography>เพิ่มคำตอบ</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          size={'small'}
                          sx={{ width: '100%' }}
                          label={'New choice'}
                          value={answerChoiceTitle || ''}
                          onChange={e => setAnswerChoiceTitle(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          disabled={!isDone && isDone !== null ? true : false}
                          variant='outlined'
                          sx={{ width: '100%', height: '100%' }}
                          onClick={() => handleInsertChoiceType2()}
                        >
                          Add New Choice
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {question?.interest_question_type === 1 && (
                  <Grid container spacing={2} sx={{ m: 2 }}>
                    <Grid item xs={12}>
                      <Typography>เกี่ยวข้องกับอาชีพ (Jobs Related)</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        size='small'
                        // key={clearAutoComplete} // if toggle will clear value of autocomplete
                        disablePortal
                        fullWidth
                        multiple
                        freeSolo
                        value={jobsRelatedType1}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              sx={{ m: 0, p: 0 }}
                              key={option?.job_position_id}
                              variant='outlined'
                              label={option?.job_position_name}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        // options={Jobs?.filter(sj => sj.subject_id !== subject.subject_id)}
                        options={
                          Jobs.filter(
                            jobFilter =>
                              !jobsRelatedType1.find(job1 => job1.job_position_id === jobFilter.job_position_id)
                          ) || []
                        }
                        getOptionLabel={option => option?.job_position_name || ''}
                        // getOptionSelected={(option, value) => option.job_position_id === value.job_position_id}
                        renderInput={params => <TextField {...params} label='Job Positions ' />}
                        onChange={(e, value) => {
                          // console.log(value)
                          setJobsRelatedType1(value)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disabled={!isDone && isDone !== null ? true : false}
                        variant='contained'
                        sx={{ width: '100%', height: '100%' }}
                        onClick={() => handleUpdateJobs(1)}
                      >
                        Update Jobs
                      </Button>
                    </Grid>
                  </Grid>
                )}
                <Grid container sx={{ m: 2 }} spacing={2}>
                  {question?.interest_question_type === 2 &&
                    question?.interest_answers.map((ans, index) => (
                      <Card key={ans.interest_answer_id} sx={{ width: '100%', p: 2, mb: 3.5 }}>
                        <Grid container sx={{ display: 'flex' }} direction={'row'} item xs={12} spacing={2}>
                          <Grid container item xs={12} sx={{ p: 2 }} justifyContent='space-between'>
                            <Grid item>
                              <Typography>แก้ไขคำตอบที่ {index + 1}).</Typography>
                            </Grid>
                            <Grid item>
                              <Button
                                color='error'
                                sx={{ p: 1 }}
                                onClick={() => handleDeleteAnswer(ans.interest_answer_id)}
                              >
                                <Icon path={mdiTrashCan} size={0.75} style={{ margin: 0.5 }} />
                              </Button>
                            </Grid>
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              size='small'
                              fullWidth
                              value={answer[index]?.interest_answer_title || ''}
                              onChange={e => {
                                const answerObject = answer.reduce((acc, a) => {
                                  acc[a.interest_answer_id] = a

                                  return acc
                                }, {})

                                // Update the answer
                                if (answerObject[ans.interest_answer_id]) {
                                  answerObject[ans.interest_answer_id].interest_answer_title = e.target.value
                                }

                                // Convert the object back to an array and sort it
                                const updatedAnswer = Object.values(answerObject).sort(
                                  (a, b) => a.interest_answer_id - b.interest_answer_id
                                )

                                setAnswer(updatedAnswer)
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Autocomplete
                              size='small'
                              // key={clearAutoComplete} // if toggle will clear value of autocomplete
                              disablePortal
                              fullWidth
                              multiple
                              freeSolo
                              value={jobsRelatedType2[index]}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    sx={{ m: 0, p: 0 }}
                                    key={option?.jobPosition?.job_position_id}
                                    variant='outlined'
                                    label={option?.jobPosition?.job_position_name}
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              // options={Jobs?.filter(sj => sj.subject_id !== subject.subject_id)}
                              options={
                                jobsType2.filter(
                                  jobFilter =>
                                    !jobsRelatedType2[index]?.find(
                                      job2 => job2.job_position_id === jobFilter.jobPosition.job_position_id
                                    )
                                ) || []
                              }
                              getOptionLabel={option => option?.jobPosition.job_position_name || ''}
                              renderInput={params => <TextField {...params} label='Jobs Related ' />}
                              onChange={(e, value) => {
                                // console.log(value)

                                // const tempState = question?.interest_answers.filter(
                                //   f => f.interest_answer_id !== ans.interest_answer_id
                                // )

                                const tempState = question?.interest_answers
                                const updateState = ans
                                updateState.interest_answers_job = [...value]
                                tempState[index] = updateState

                                const jobsData = tempState?.map(interestJob => interestJob.interest_answers_job)
                                // console.log(jobsData)
                                if (jobsData) {
                                  setJobsRelatedType2(() => Object.values(jobsData))
                                  // console.log('tempState', tempState)
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              disabled={!isDone && isDone !== null ? true : false}
                              variant='contained'
                              sx={{ width: '100%', height: '100%' }}
                              onClick={() => handleUpdateJobs(2, index, ans.interest_answer_id)}
                            >
                              Update Jobs
                            </Button>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>

          <Dialog open={openInsert} onClose={() => setOpenInsert(false)} maxWidth={'md'} fullWidth>
            <DialogTitle>Form insert new question</DialogTitle>
            <DialogContent sx={{ pb: 12, minHeight: 500 }}>
              <Grid container sx={{ my: 2 }} spacing={4}>
                <Grid item xs={12} md={12}>
                  <TextField
                    size={'small'}
                    sx={{ width: '100%' }}
                    label={'Question Title'}
                    value={questionInsertTitle || ''}
                    onChange={e => setQuestionInsertTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Selection
                    label={'Question Type'}
                    height={40}
                    width={'100%'}
                    selectionValue={selectedQuestionType}
                    handleChange={e => setSelectedQuestionType(e.target.value)}
                    Items={Object.values(questionTypes)?.map(type => (
                      <MenuItem key={type.interest_question_type} value={type.interest_question_type}>
                        {type.label}
                      </MenuItem>
                    ))}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Selection
                    label={'Job Related'}
                    height={40}
                    width={'100%'}
                    selectionValue={jobSelected}
                    handleChange={e => setJobSelected(e.target.value)}
                    Items={Object.values(Jobs)?.map(job => (
                      <MenuItem key={job.job_position_id} value={job.job_position_id}>
                        {job.job_position_name}
                      </MenuItem>
                    ))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={!isDone && isDone !== null ? true : false}
                    variant='contained'
                    sx={{ width: '100%', height: '100%' }}
                    onClick={() => handleInsertQuestion()}
                  >
                    Submit Question
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
InterestsurveysPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default InterestsurveysPage
