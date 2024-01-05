import { Box, Button, Card, CardHeader, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const Simulator = () => {
  const handleClicktoSimSyst = () => {
    window.open('/pages/studyplansimulator/', '_blank')
    // router.push('/pages/studyplansimulator/')
  }

  return (
    <Box sx={{ maxWidth: 1200, m: 8 }}>
      <Grid container spacing={2} sx={{ pb: 58 }}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ color: grey[800], fontWeight: 'bold' }}>
            Study Plan Simulator (SE 2566)
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 6 }}>
          <Typography variant='caption' sx={{ color: '#909094' }}>
            Building a recommendation system for software engineering involves leveraging data to suggest relevant
            resources, tools, or technologies to users based on their preferences, skills, and the needs of their
            projects. Here's a high-level overview of how you could design such a system. Building an effective
            recommendation system requires ongoing refinement based on user feedback and changing industry trends.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 12 }}>
          <Button
            onClick={handleClicktoSimSyst}
            variant='contained'
            sx={{
              marginTop: '1rem',
              backgroundColor: '#000000',
              width: 300,
              letterSpacing: 0.5,
              fontFamily: 'Segoe UI'
            }}
          >
            Go to Simulator System
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Simulator
