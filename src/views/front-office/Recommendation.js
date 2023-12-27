import { Box, Button, Card, Divider, Fab, Grid, Hidden, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import TypographyHeadings from '../typography/TypographyHeadings'

const Recommendation = () => {
  return (
    <Box className='content-center' sx={{ maxWidth: 1200 }}>
      <Grid container spacing={4} sx={{ minHeight: 500 }}>
        <Grid item xs={6}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', color: grey[800] }}>
            Job Position
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ height: 55, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography
            sx={{ width: 40, borderRadius: 2, p: 1.5, pl: 3.5, ':hover': { cursor: 'pointer', background: grey[200] } }}
          >
            {'<'}
          </Typography>
          <Typography variant='h5' sx={{ letterSpacing: 1, mx: 4, mt: 1, fontWeight: 'bold', color: grey[800] }}>
            1/8
          </Typography>
          <Typography
            sx={{ width: 40, borderRadius: 2, p: 1.5, pl: 3.5, ':hover': { cursor: 'pointer', background: grey[200] } }}
          >
            {'>'}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: -18 }}>
          <Typography variant='caption' sx={{ textAlign: 'justify' }}>
            Software engineering is a discipline within the broader field of computer science that focuses on the
            systematic design, development, testing, and maintenance of software applications and systems. It involves
            applying engineering principles to software development in order to ensure the reliability, efficiency, and
            maintainability of software..
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} sx={{ mt: -12 }}>
          <Card sx={{ backgroundColor: '#EBEBEB', color: '#FFF' }}>
            <Box
              sx={{
                mt: { xs: 1, md: 5 },
                p: 2.5,
                backgroundColor: '#FFF',
                height: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                  ENGCEXXX
                </Typography>
                <Typography variant='body2' sx={{ marginLeft: 6, maxWidth: { xs: 400, md: 400 } }} noWrap>
                  Lorem ipsum dolor sit amet.......
                </Typography>
              </Box>
              {/* <Box sx={{ marginLeft: 4 }}>
                <Fab
                  variant='extended'
                  size='small'
                  disabled
                  sx={{ p: 2.5, backgroundColor: '#EBEBEB', color: '#AAA', height: 16, fontSize: 12 }}
                >
                  General
                </Fab>
              </Box> */}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} sx={{ mt: -12 }}>
          <Card sx={{ backgroundColor: '#EBEBEB', color: '#FFF' }}>
            <Box
              sx={{
                mt: { xs: 1, md: 5 },
                p: 2.5,
                backgroundColor: '#FFF',
                height: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                  ENGCEXXX
                </Typography>
                <Typography variant='body2' sx={{ marginLeft: 6, maxWidth: { xs: 400, md: 400 } }} noWrap>
                  Lorem ipsum dolor sit amet.......
                </Typography>
              </Box>
              {/* <Box sx={{ marginLeft: 4 }}>
                <Fab
                  variant='extended'
                  size='small'
                  disabled
                  sx={{ p: 2.5, backgroundColor: '#EBEBEB', color: '#AAA', height: 16, fontSize: 12 }}
                >
                  General
                </Fab>
              </Box> */}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} sx={{ mt: -12 }}>
          <Card sx={{ backgroundColor: '#EBEBEB', color: '#FFF' }}>
            <Box
              sx={{
                mt: { xs: 1, md: 5 },
                p: 2.5,
                backgroundColor: '#FFF',
                height: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                  ENGCEXXX
                </Typography>
                <Typography variant='body2' sx={{ marginLeft: 6, maxWidth: { xs: 400, md: 400 } }} noWrap>
                  Lorem ipsum dolor sit amet.......
                </Typography>
              </Box>
              {/* <Box sx={{ marginLeft: 4 }}>
                <Fab
                  variant='extended'
                  size='small'
                  disabled
                  sx={{ p: 2.5, backgroundColor: '#EBEBEB', color: '#AAA', height: 16, fontSize: 12 }}
                >
                  General
                </Fab>
              </Box> */}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ mt: -12 }}>
          <Button variant='contained' sx={{ width: 200, marginTop: '1rem', backgroundColor: '#000000' }}>
            More Details
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Recommendation
