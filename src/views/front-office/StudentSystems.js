import { Box, Button, Card, CardHeader, Grid, Typography } from '@mui/material'

const StudentSystems = () => {
  return (
    <Box className='content-center'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ color: '#909094' }}>
            Login for use Student Systems
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>
            Building a recommendation system for software engineering involves leveraging data to suggest relevant
            resources, tools, or technologies to users based on their preferences, skills, and the needs of their
            projects. Here's a high-level overview of how you could design such a system. Building an effective
            recommendation system requires ongoing refinement based on user feedback and changing industry trends.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' sx={{ marginTop: '1rem', backgroundColor: '#000000' }}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StudentSystems
