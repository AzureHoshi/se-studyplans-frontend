import React, { useState } from 'react'

// ** MUI Components
import { Box, Alert, AlertTitle, Stack, Snackbar, Card, Typography } from '@mui/material'

// ** Axios
import axios from 'axios'

// ** Components
import InterestForm from 'src/views/InterestSurvey/InterestForm'
import InterestResult from 'src/views/InterestSurvey/InterestResult'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const InterestSurveyPage = ({ dataSurvey, collegianCode }) => {
  const [resultDisplay, setResultDisplay] = useState(false)
  const [alertAnswer, setAlertAnswer] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertAnswer(false)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {resultDisplay ? (
        <InterestResult />
      ) : (
        <InterestForm
          dataSurvey={dataSurvey}
          collegianCode={collegianCode}
          setAlertAnswer={setAlertAnswer}
          setResultDisplay={setResultDisplay}
        />
      )}

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
export async function getServerSideProps() {
  const res = await axios.get(`https://my-backend-adonis.onrender.com/api/v1/interest-surveys/${2}`)

  return {
    props: {
      dataSurvey: res.data.data,
      collegianCode: '1'
    }
  }
}

export default InterestSurveyPage
