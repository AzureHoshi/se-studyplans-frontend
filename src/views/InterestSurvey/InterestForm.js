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
  Hidden,
  Divider
} from '@mui/material'

// ** axios
import axios from 'axios'
import { url } from 'src/configs/urlConfig'
import { useRouter } from 'next/router'
import { userProfile } from 'src/dummy'
import { grey } from '@mui/material/colors'
import { mdiNewspaperVariantMultipleOutline, mdiTextBoxSearchOutline } from '@mdi/js'
import Icon from '@mdi/react'

const InterestForm = ({ dataSurvey, collegianCode, setAlertAnswer, setResultDisplay, user }) => {
  const router = useRouter()
  const Questions = dataSurvey[0].interestQuestions
  const [isLoading, setIsLoading] = useState(false)

  const [answers, setAnswers] = useState(
    Questions.map(question => ({
      question_type: question.interest_question_type,
      interest_answer_id: null,
      interest_question_score: null
    }))
  )

  const handleLinkClick = path => {
    window.open(path, '_blank')
  }

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
        collegian_code: collegianCode,
        interest_results: answers
      }

      // console.log('payload', payload)

      try {
        // ทำการ POST ไปยัง API
        const res = await axios.post(`${url.BASE_URL}/interest-results`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // console.log('res from sendding survay', res)
        // setTimeout(() => {
        //   router.push('/pages/front-office/student-systems/dashboard/')
        // }, 2000)

        // setResultDisplay(true)
      } catch (err) {
        // console.log(err)
        setResultDisplay(false)
      }
      // setIsLoading(false)
      setTimeout(() => {
        axios
          .get(url.BASE_URL + `/interest-results/${user?.col_code}`)
          .then(res => res.data && router.push('/pages/front-office/student-systems/dashboard/'))
          .catch(err => console.log('err from navigate to dashboard', err))
      }, 2000)

      // console.log(answers)
    }
  }

  // useEffect(() => {
  //   console.log('answers: ', answers)
  // }, [answers])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 24 }}>
        <CircularProgress />
        <Typography variant='h5' sx={{ ml: 6, mt: 1 }}>
          Sending Answer
        </Typography>
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
                    {user?.col_first_name + ' ' + user?.col_last_name}
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
                <Card
                  sx={{
                    height: 120,
                    background: `linear-gradient(to top right, ${grey[300]} 50%, transparent 80%)`,
                    mb: 6,
                    textAlign: 'center',
                    position: 'relative',
                    ':hover': { cursor: 'pointer', opacity: 0.7 }
                  }}
                >
                  <Box
                    sx={{
                      overflow: 'hidden',
                      position: 'absolute',
                      top: 11.5,
                      left: -50,
                      background: 'white',
                      borderRadius: 2,
                      width: 170,
                      height: '80%',
                      opacity: 0.8
                    }}
                  >
                    <Icon
                      path={mdiNewspaperVariantMultipleOutline}
                      // size={3.2}
                      color='gray'
                      style={{ marginLeft: 40, marginTop: 6, opacity: 0.4, width: 85 }}
                    />
                  </Box>
                  <Box sx={{ position: 'absolute', top: 0, left: 150 }}>
                    <Typography variant='body2' sx={{ my: 12, fontWeight: 'bold', letterSpacing: 0.5 }}>
                      CE Reform Portal
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', top: 65, left: 150 }}>
                    <Typography variant='caption' sx={{ my: 12, fontWeight: 'bold', letterSpacing: 0.5 }}>
                      เว็บไซต์คณะวิศวกรรมคอมพิวเตอร์
                    </Typography>
                  </Box>
                </Card>
                <Card
                  onClick={() => handleLinkClick('http://128.199.147.134:3003/')}
                  sx={{
                    height: 120,
                    background: `linear-gradient(to top right, ${grey[300]} 50%, transparent 80%)`,
                    mb: 6,
                    textAlign: 'center',
                    position: 'relative',
                    ':hover': { cursor: 'pointer', opacity: 0.7 }
                  }}
                >
                  <Box
                    sx={{
                      overflow: 'hidden',
                      position: 'absolute',
                      top: 11.5,
                      left: -50,
                      background: 'white',
                      borderRadius: 2,
                      width: 170,
                      height: '80%',
                      opacity: 0.8
                    }}
                  >
                    <Icon
                      path={mdiTextBoxSearchOutline}
                      // size={3.2}
                      color='gray'
                      style={{ marginLeft: 40, marginTop: 6, opacity: 0.4, width: 85 }}
                    />
                  </Box>
                  <Box sx={{ position: 'absolute', top: 0, left: 150 }}>
                    <Typography variant='body2' sx={{ my: 12, fontWeight: 'bold', letterSpacing: 0.5 }}>
                      Pre-Project/Project
                    </Typography>
                  </Box>
                </Card>

                <Typography variant='caption'>
                  <p style={{ textAlign: 'justify' }}>
                    มทร.ล้านนา การจัดทำโครงการระบบการจัดการสารสนเทศเพื่อการเรียน การสอน :
                    กรณีศึกษาหลักสูตรวิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เพื่อพัฒนาระบบของหลักสูตร
                    ขึ้นมาเพื่อที่จะใช้เทคโนโลยีทางด้านวิศวกรรมมาพัฒนาระบบการศึกษาและ วิจัยร่วมระหว่าง ภาครัฐ ภาคเอกชน
                    และ ภาคการศึกษา มาจัดการเพื่อเพิ่มประสิทธิภาพการจัดการเรียนการสอน ให้มีความ เข้าใจง่าย
                    และเข้าถึงข้อมูลของหลักสูตรได้ เพื่อตอบสนองต่อผู้ใช้งานระบบ และผู้พัฒนาระบบ
                    ซึ่งจะสามารถแบ่งประเด็นที่จะนำเอาเทคโนโลยีมาใช้ในการพัฒนาระบบที่ตอบสนองต่อผู้ใช้งาน
                  </p>
                </Typography>
                <Divider />
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 4 }}>
            {/* <Button variant='text' size='large' sx={{ width: 160, marginRight: 4, color: '#AAA' }}>
              Reset
            </Button> */}
            <Button
              onClick={handleSubmit}
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
