// ** react imports
import React, { useEffect, useState } from 'react'

// ** mui components
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  CircularProgress,
  Grid,
  CardContent,
  Hidden
} from '@mui/material'

// ** axios
import axios from 'axios'

const InterestForm = ({ dataSurvey, collegianCode, setAlertAnswer, setResultDisplay }) => {
  const Questions = dataSurvey[0].interestQuestions
  const [isLoading, setIsLoading] = useState(false)

  const [answers, setAnswers] = useState(
    Questions.map(question => ({
      collegian_code: collegianCode,
      question_type: question.interest_question_type,
      interest_answer_id: null,
      interest_question_score: null
    }))
  )

  const handleInputChange = (event, index, type, answerId) => {
    if (type === 1) {
      console.log('index: ', index)
      console.log('answerId: ', answerId)
      console.log('value: ', event.target.value)

      // const answerId = answerId[0].interest_answer_id
      const value = parseInt(event.target.value, 10)
      setAnswers(prevAnswers => {
        const newAnswers = [...prevAnswers]
        newAnswers[index] = {
          ...newAnswers[index],
          interest_question_score: value,
          interest_answer_id: answerId
        }

        return newAnswers
      })
    } else if (type === 2) {
      const value = parseInt(event.target.value, 10)
      setAnswers(prevAnswers => {
        const newAnswers = [...prevAnswers]
        newAnswers[index] = { ...newAnswers[index], interest_answer_id: value }

        return newAnswers
      })
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    // ตรวจสอบเงื่อนไข
    if (
      answers.some(answer => {
        if (answer.question_type === 1) {
          return answer.interest_question_score === null
        } else if (answer.question_type === 2) {
          return answer.interest_answer_id === null
        }

        return false // ในกรณีที่ไม่ใช่ question_type ที่กำหนด
      })
    ) {
      setAlertAnswer(true)
    } else {
      setIsLoading(true)

      const payload = {
        interest_records: answers
      }

      try {
        // ทำการ POST ไปยัง API
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}interest-records`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log(res)
        setResultDisplay(true)
      } catch (err) {
        console.log(err)
        setResultDisplay(false)
      }

      console.log(answers)
    }
  }

  useEffect(() => {
    console.log('answers: ', answers)
  }, [answers])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ paddingX: { xs: 10, lg: 42 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid container spacing={4} direction={{ xs: 'column-reverse', lg: 'row' }}>
            <Grid item xs={12} lg={8}>
              <Box sx={{ paddingTop: 10 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  Interest Survey Study Plan System
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  backgroundColor: '#000',
                  height: '69px',
                  borderBottomLeftRadius: '12px',
                  borderBottomRightRadius: '12px'
                }}
              >
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography
                    noWrap
                    variant='body2'
                    sx={{ fontWeight: 'bold', color: '#7A7A7A', mr: 2, fontSize: { xs: 16, lg: 14 } }}
                  >
                    #{collegianCode}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'bold', color: '#FFF', fontSize: { xs: 16, lg: 14 } }}
                    noWrap
                  >
                    {''}Profile name
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Box>
                <form onSubmit={handleSubmit}>
                  {Questions.map((question, index) => (
                    <Card key={index} sx={{ marginBottom: 4 }}>
                      <CardContent>
                        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 14, lg: 15 } }}>
                          {index + 1}
                          {'). '} {question.interest_question_title}
                        </Typography>
                        <FormControl key={index} sx={{ marginBlock: 2 }}>
                          {question.interest_question_type === 1 ? (
                            <RadioGroup
                              row
                              value={answers[index].interest_question_score}
                              onChange={event =>
                                handleInputChange(event, index, 1, question.interest_answers[0].interest_answer_id)
                              }
                            >
                              {[1, 2, 3, 4, 5].map(answer => (
                                <FormControlLabel
                                  key={answer}
                                  value={answer}
                                  control={<Radio />}
                                  label={answer}
                                  sx={{ fontWeight: 'bold', mr: 3 }}
                                />
                              ))}
                            </RadioGroup>
                          ) : (
                            <RadioGroup
                              aria-labelledby='demo-controlled-radio-buttons-group'
                              name='controlled-radio-buttons-group'
                              value={answers[index].interest_answer_id}
                              onChange={event => handleInputChange(event, index, 2)}
                            >
                              {question.interest_answers.map((answer, index) => (
                                <FormControlLabel
                                  key={answer.interest_answer_id}
                                  value={answer.interest_answer_id}
                                  control={<Radio />}
                                  label={<Typography variant='body1'>{answer.interest_answer_title}</Typography>}
                                  sx={{ marginBlock: 0.5 }}
                                />
                              ))}
                            </RadioGroup>
                          )}
                        </FormControl>
                      </CardContent>
                    </Card>
                  ))}
                </form>
              </Box>
            </Grid>
            <Hidden lgDown>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardContent>
                    <Box>
                      <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                        Information describe interest survey
                      </Typography>
                      <Typography variant='body2'>
                        <p style={{ textAlign: 'justify' }}>
                          There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                          alteration in some form, by injected humour, or randomised words which don't look even
                          slightly believable.
                        </p>
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 4 }}>
                      <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                        Information describe study plan system
                      </Typography>
                      <Typography variant='body2'>
                        <p style={{ textAlign: 'justify' }}>
                          There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                          alteration in some form, by injected humour, or randomised words which don't look even
                          slightly believable.
                        </p>
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 4 }}>
                      <Card
                        sx={{
                          backgroundColor: '#EBEBEB',
                          height: '140px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: '#7A7A7A'
                        }}
                      >
                        Shortcut CE.Reform
                      </Card>
                    </Box>
                    <Box sx={{ marginTop: 4 }}>
                      <Card
                        sx={{
                          backgroundColor: '#EBEBEB',
                          height: '140px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: '#7A7A7A'
                        }}
                      >
                        Shortcut CE.Reform
                      </Card>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 4 }}>
            <Button variant='text' size='large' sx={{ width: 160, marginRight: 4, color: '#AAA' }}>
              Reset
            </Button>
            <Button
              variant='contained'
              size='large'
              type='submit'
              sx={{ width: 160, backgroundColor: '#EBEBEB', color: '#7A7A7A' }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default InterestForm
