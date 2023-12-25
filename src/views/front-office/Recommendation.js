import { Box, Button, Card, CardHeader, Grid, Typography } from '@mui/material'

const Recommendation = () => {
  return (
    <Box className='content-center'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ color: '#909094' }}>
            Job Position{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>
            Software engineering is a discipline within the broader field of computer science that focuses on the
            systematic design, development, testing, and maintenance of software applications and systems. It involves
            applying engineering principles to software development in order to ensure the reliability, efficiency, and
            maintainability of software..{' '}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ backgroundColor: '#ebebeb', color: '#ffffff' }}>
            <Box sx={{ marginTop: 5, backgroundColor: '#ffffff', display: 'flex' }}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', paddingLeft: 2 }}>
                ENGCEXXX
              </Typography>
              <Typography variant='body2' sx={{ padding: 0.25, marginLeft: 2, maxWidth: { xs: 400, md: 400 } }} noWrap>
                Lorem ipsum dolor sit amet.......
              </Typography>
              <Box sx={{ marginLeft: 4 }}>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{
                    fontWeight: 'regular',
                    color: '#aaaaaa',
                    backgroundColor: '#ebebeb',
                    borderRadius: 1.5,
                    height: '20px',
                    marginTop: 0.5
                  }}
                >
                  General
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={5} sx={{ marginLeft: 4 }}>
          <Card sx={{ backgroundColor: '#ebebeb', color: '#ffffff' }}>
            <Box sx={{ marginTop: 5, backgroundColor: '#ffffff', display: 'flex' }}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', paddingLeft: 2 }}>
                ENGCEXXX
              </Typography>
              <Typography variant='body2' sx={{ padding: 0.25, marginLeft: 2, maxWidth: { xs: 400, md: 400 } }} noWrap>
                Lorem ipsum dolor sit amet.......
              </Typography>
              <Box sx={{ marginLeft: 4 }}>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{
                    fontWeight: 'regular',
                    color: '#aaaaaa',
                    backgroundColor: '#ebebeb',
                    borderRadius: 1.5,
                    height: '20px',
                    marginTop: 0.5
                  }}
                >
                  General
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' sx={{ marginTop: '1rem', backgroundColor: '#000000' }}>
            More Details
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Recommendation
