// pages/coming-soon.js
import React from 'react'
import Head from 'next/head'
import { Container, Typography, CircularProgress, Box } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const ComingSoon = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url('/images/comingsoon_bg.jpg')`, // Replace with the path to your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Head>
        <title>Coming Soon</title>
        <meta name='description' content='Exciting things are coming soon!' />
      </Head>
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)' // Set the background opacity here
        }}
      ></div>
      <Container>
        <div
          style={{
            position: 'relative', // Change to 'relative'
            textAlign: 'center',
            color: '#fff',
            zIndex: 1 // Ensure the text is in front of the background
          }}
        >
          <Typography variant='h2' gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
            Coming Soon
          </Typography>
          <Typography variant='subtitle1' paragraph>
            this part still in development.
          </Typography>
        </div>
      </Container>
    </Box>
  )
}

ComingSoon.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ComingSoon
