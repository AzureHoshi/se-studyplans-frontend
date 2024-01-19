import React, { useEffect, useLayoutEffect, useState } from 'react'

// ** MUI Components
import { Box, Alert, AlertTitle, Stack, Snackbar, Card, Typography } from '@mui/material'

// ** Axios
import axios from 'axios'

// ** Components
import InterestForm from 'src/views/InterestSurvey/InterestForm'
import InterestResult from 'src/views/InterestSurvey/InterestResult'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { userProfile } from 'src/dummy'
import { url } from 'src/configs/urlConfig'
import { handleCheckLogin, handleGetUser } from 'src/authentication'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const InterestSurveyPage = ({ dataSurvey, collegianCode, user }) => {
  const [resultDisplay, setResultDisplay] = useState(null)
  const [alertAnswer, setAlertAnswer] = useState(false)
  const router = useRouter()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertAnswer(false)
  }

  // useLayoutEffect(() => {
  //   checkTokenAndRedirect(router)
  // }, [])

  return (
    <Box sx={{ width: '100%' }}>
      {/* {resultDisplay ? (
        <InterestResult />
      ) : ( */}
      <InterestForm
        user={user}
        dataSurvey={dataSurvey}
        collegianCode={collegianCode}
        setAlertAnswer={setAlertAnswer}
        setResultDisplay={setResultDisplay}
      />
      {/* )} */}

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={alertAnswer}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity='warning' onClose={handleClose}>
            <AlertTitle>Warning</AlertTitle>
            กรุณาตอบคำถามให้ครบทุกข้อ
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  )
}
InterestSurveyPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

// ssr
export async function getServerSideProps(context) {
  const { req } = context

  const checkIsLogin = await handleCheckLogin(req)
  console.log('checkIsLogin', checkIsLogin)

  if (!checkIsLogin) {
    return {
      redirect: {
        destination: '/pages/login/', // if is not login return login path
        permanent: false
      }
    }
  }

  const userByToken = await handleGetUser(req)
  console.log('checkUser', userByToken)

  const res = await axios.get(url.BASE_URL + `/interest-surveys/${userByToken?.curriculum_id}`)

  try {
    const checkAlreadyHaveSurvey = await axios.get(url.BASE_URL + `/interest-results/${userByToken?.col_code}`)
    // Handle the response as needed
    console.log('Survey results:', checkAlreadyHaveSurvey.data)
    return {
      redirect: {
        destination: '/pages/front-office/student-systems/dashboard/',
        permanent: false
      }
    }
    // Continue with the rest of your code...
  } catch (error) {
    console.error('Error fetching survey results:', error)

    // Handle the error, e.g., display an error message, redirect, etc.

    // Optionally, you can rethrow the error if you want to propagate it to the calling code
    // throw error;
  }

  return {
    props: {
      dataSurvey: res.data.data,
      collegianCode: userByToken?.col_code,
      user: userByToken
    }
  }
}

export default InterestSurveyPage
