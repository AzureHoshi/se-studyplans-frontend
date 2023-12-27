import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import { styled } from '@mui/material/styles'

const HeadTypography = styled(Typography)(({ theme }) => ({
  variant: 'subtitle1',
  color: '#909094',
  fontWeight: 'bold',
  marginBottom: '1rem',
  fontSize: 14
}))

const Roadmap = () => {
  return (
    <Box className='content-center'>
      <Hidden mdDown>
        <Grid container spacing={2} sx={{ minWidth: 320 }}>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              sx={{ color: grey[800], fontFamily: 'Segoe UI', mb: 2.5, fontSize: { xs: 28, md: 24 } }}
            >
              Curriculum: Software Engineering
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Hidden mdDown>
              <HeadTypography>Introduction to Computer Science:</HeadTypography>
              <Typography variant='caption' sx={{ color: '#909094' }}>
                <ul style={{ marginLeft: -12 }}>
                  <li>Basic programming concepts (variables, loops, conditionals)</li>
                  <li>Data structures (arrays, linked lists)</li>
                  <li>Algorithms</li>
                </ul>
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Hidden mdDown>
              <HeadTypography>Databases:</HeadTypography>
              <Typography variant='caption' sx={{ color: '#909094' }}>
                <ul style={{ marginLeft: -12 }}>
                  <li>Relational databases (SQL)</li>
                  <li>NoSQL databases</li>
                  <li>Database design and normalization</li>
                </ul>
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Hidden mdDown>
              <HeadTypography>Object-Oriented Programming (OOP):</HeadTypography>
              <Typography variant='caption' sx={{ color: '#909094' }}>
                <ul style={{ marginLeft: -12 }}>
                  <li>Principles of OOP (encapsulation, inheritance, polymorphism)</li>
                  <li>Design patterns</li>
                </ul>
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Hidden mdDown>
              <HeadTypography>Web Development:</HeadTypography>
              <Typography variant='caption' sx={{ color: '#909094' }}>
                <ul style={{ marginLeft: -12 }}>
                  <li>HTML, CSS, JavaScript</li>
                  <li>Front-end frameworks (React, Angular, Vue.js)</li>
                  <li>Back-end frameworks (Node.js, Django, Flask)</li>
                </ul>
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Hidden mdDown>
              <HeadTypography>Data Structures:</HeadTypography>
              <Typography variant='caption' sx={{ color: '#909094' }}>
                <ul style={{ marginLeft: -12 }}>
                  <li>Advanced data structures (trees, graphs, hash tables)</li>
                  <li>Algorithmic analysis and complexity</li>
                  <li>Back-end frameworks (Node.js, Django, Flask)</li>
                </ul>
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={12} sx={{ mt: 6 }}>
            <Button variant='contained' sx={{ width: 180, marginTop: '1rem', backgroundColor: '#000000' }}>
              Subjects
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ width: 180, marginTop: '1rem', marginLeft: '1rem', backgroundColor: '#000000' }}
            >
              Study Plan
            </Button>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container sx={{ minHeight: { xs: 800, sm: 550 }, maxWidth: 700 }}>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              color={grey[800]}
              sx={{ fontFamily: 'Segoe UI', letterSpacing: 0.5, fontWeight: 'bold', mb: 4 }}
            >
              Curriculum: Software Engineering
            </Typography>
            <Typography variant='caption'>
              Software engineering is a discipline that involves the systematic design, development, testing,
              maintenance, and documentation of software in a methodical way. It applies engineering principles to
              software development, aiming to create reliable, efficient, and scalable software solutions. Here are key
              aspects and concepts related to software engineering:
            </Typography>
            <ul style={{ paddingLeft: -12 }}>
              <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                Understanding and documenting the needs of stakeholders to establish system requirements.
              </li>
              <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                Designing the high-level structure and organization of the software components.
              </li>
              <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                Writing code using programming languages based on the design specifications.
              </li>
              <li style={{ marginRight: 6, paddingBottom: 12, fontSize: 14, textAlign: 'justify' }}>
                Conducting various types of testing (unit testing, integration testing, system testing, etc.) to ensure
                software reliability and functionality.
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} sx={{ mt: { xs: -24, sm: 6, md: 0 } }}>
            <Button variant='contained' fullWidth sx={{ maxWidth: 250, marginTop: '1rem', backgroundColor: '#000000' }}>
              Subjects
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} sx={{ mt: { xs: -24, sm: 6, md: 0 } }}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ maxWidth: 250, marginTop: '1rem', marginLeft: '1rem', backgroundColor: '#000000' }}
            >
              Study Plan
            </Button>
          </Grid>
        </Grid>
      </Hidden>
    </Box>
  )
}

export default Roadmap
