import { Box, Button, Grid, Typography } from '@mui/material'

import { styled } from '@mui/material/styles'

const HeadTypography = styled(Typography)(({ theme }) => ({
  variant: 'subtitle1',
  color: '#909094',
  fontWeight: 'bold',
  marginBottom: '1rem'
}))

const Roadmap = () => {
  return (
    <Box className='content-center'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ color: '#909094' }}>
            Curriculum ..........................{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <HeadTypography>Introduction to Computer Science:</HeadTypography>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>
            <ul>
              <li>Basic programming concepts (variables, loops, conditionals)</li>
              <li>Data structures (arrays, linked lists)</li>
              <li>Algorithms</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <HeadTypography>Databases:</HeadTypography>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>
            <ul>
              <li>Relational databases (SQL)</li>
              <li>NoSQL databases</li>
              <li>Database design and normalization</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <HeadTypography>Object-Oriented Programming (OOP):</HeadTypography>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>
            <ul>
              <li>Principles of OOP (encapsulation, inheritance, polymorphism)</li>
              <li>Design patterns</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <HeadTypography>Web Development:</HeadTypography>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>
            <ul>
              <li>HTML, CSS, JavaScript</li>
              <li>Front-end frameworks (React, Angular, Vue.js)</li>
              <li>Back-end frameworks (Node.js, Django, Flask)</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <HeadTypography>Data Structures:</HeadTypography>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>
            <ul>
              <li>Advanced data structures (trees, graphs, hash tables)</li>
              <li>Algorithmic analysis and complexity</li>
              <li>Back-end frameworks (Node.js, Django, Flask)</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' sx={{ marginTop: '1rem', backgroundColor: '#000000' }}>
            Subjects
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ marginTop: '1rem', marginLeft: '1rem', backgroundColor: '#000000' }}
          >
            Study Plan
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Roadmap
