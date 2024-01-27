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
  CircularProgress
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
      // console.log('index: ', index)
      // console.log('answerId: ', answerId)
      // console.log('value: ', event.target.value)

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

        // console.log(res)
        setResultDisplay(true)
      } catch (err) {
        // console.log(err)
        setResultDisplay(false)
      }

      // console.log(answers)
    }
  }

  useEffect(() => {
    // console.log('answers: ', answers)
  }, [answers])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          p: 4
        }}
      >
        <Typography variant='h3' component='h4' sx={{ fontWeight: 'bold' }}>
          แบบประเมินตำแหน่งตามความสนใจ
        </Typography>
      </Box>
      <Box sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            {Questions.map((question, index) => (
              <Card key={index} sx={{ marginBlock: 2, p: 4 }}>
                <Typography variant='h5' component='h6' sx={{ fontWeight: 'bold' }}>
                  ข้อที่ {index + 1} {question.interest_question_title}
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
                          label={<Typography variant='body1'>{answer}</Typography>}
                          sx={{ marginBlock: '0.5rem' }}
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
                          sx={{ marginBlock: '0.5rem' }}
                        />
                      ))}
                    </RadioGroup>
                  )}
                </FormControl>
              </Card>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', p: 4 }}>
            <Button variant='contained' color='error' size='large' sx={{ marginInline: 1 }}>
              รีเซ็ต
            </Button>
            <Button variant='contained' color='success' size='large' sx={{ marginInline: 1 }} type='submit'>
              ส่งแบบสอบถาม
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default InterestForm
