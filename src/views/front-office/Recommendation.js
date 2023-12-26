import { Box, Button, Card, Fab, Grid, Hidden, Typography } from '@mui/material'

const Recommendation = () => {
  return (
    <Box className='content-center'>
      <Grid container spacing={4}>
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
        <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ backgroundColor: '#EBEBEB', color: '#FFF' }}>
            <Box
              sx={{
                marginTop: 5,
                backgroundColor: '#FFF',
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                ENGCEXXX
              </Typography>
              <Typography variant='body2' sx={{ marginLeft: 2, maxWidth: { xs: 400, md: 400 } }} noWrap>
                Lorem ipsum dolor sit amet.......
              </Typography>
              <Hidden mdDown>
                <Box sx={{ marginLeft: 4 }}>
                  <Fab
                    variant='extended'
                    size='small'
                    disabled
                    sx={{ backgroundColor: '#EBEBEB', color: '#AAA', height: 16 }}
                  >
                    General
                  </Fab>
                </Box>
              </Hidden>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ backgroundColor: '#EBEBEB', color: '#FFF' }}>
            <Box
              sx={{
                marginTop: 5,
                backgroundColor: '#FFF',
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                ENGCEXXX
              </Typography>
              <Typography variant='body2' sx={{ marginLeft: 2, maxWidth: { xs: 400, md: 400 } }} noWrap>
                Lorem ipsum dolor sit amet.......
              </Typography>
              <Box sx={{ marginLeft: 4 }}>
                <Fab
                  variant='extended'
                  size='small'
                  disabled
                  sx={{ backgroundColor: '#EBEBEB', color: '#AAA', height: 16 }}
                >
                  General
                </Fab>
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
