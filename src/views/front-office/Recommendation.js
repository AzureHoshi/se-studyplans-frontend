import { Box, Button, Card, Divider, Fab, Grid, Hidden, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Recommendation = ({ jobRecommended }) => {
  const [jobPosition, setJobPosition] = useState([])
  const [currentIndex, setCurentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const handlePlusIndex = () => {
    if (currentIndex >= jobPosition?.length) return
    setCurentIndex(pre => pre + 1)
    setIsVisible(true)
  }
  const handleMinusIndex = () => {
    if (currentIndex === 0) return
    setCurentIndex(pre => pre - 1)
    setIsVisible(true)
  }

  useEffect(() => {
    if (isVisible)
      setTimeout(() => {
        setIsVisible(false)
      }, 100)
  }, [isVisible])

  useEffect(() => {
    if (jobRecommended) {
      console.log('jobRecommended', jobRecommended)
      const uniqueJobPositions = jobRecommended.reduce((result, currentItem) => {
        const { job_position_id, job_position } = currentItem
        if (!result[job_position_id]) {
          result[job_position_id] = job_position
        }
        return result
      }, {})
      setJobPosition(Object.values(uniqueJobPositions))
      console.log(Object.values(uniqueJobPositions))
    }
  }, [jobRecommended])
  return (
    <Box className='content-center' sx={{ maxWidth: 1200, m: 8 }}>
      <Grid container spacing={4} sx={{ pb: 46 }}>
        <Grid item xs={12} sm={8}>
          <Typography
            variant='h5'
            sx={{
              mt: 4,
              height: 60,
              fontWeight: 'bold',
              color: grey[800],
              mt: { xs: 2, md: 0 },
              maxWidth: { xs: '100%', sm: 600, lg: 1200 },
              textAlign: { xs: 'center', sm: 'start' }
            }}
          >
            {jobPosition[currentIndex]?.job_position_name}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          sx={{ height: 55, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}
        >
          <Button
            onClick={handleMinusIndex}
            disabled={currentIndex === 0 && true}
            sx={{
              m: 0.5,
              borderRadius: 2,
              ':hover': { cursor: 'pointer', background: { xs: null, sm: grey[200] } }
            }}
          >
            {'<'}
          </Button>

          <Typography
            variant='h5'
            sx={{
              letterSpacing: 1,
              mx: { xs: 1, md: 2 },
              mt: 2,
              fontWeight: 'bold',
              color: grey[800]
            }}
          >
            {currentIndex + 1}/{jobPosition?.length}
          </Typography>

          <Button
            disabled={currentIndex === jobPosition.length - 1 && true}
            onClick={handlePlusIndex}
            sx={{ m: 0.5, borderRadius: 2, ':hover': { cursor: 'pointer', background: { xs: null, sm: grey[200] } } }}
          >
            {'>'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='caption'>
            <p style={{ textAlign: 'justify' }}>
              Software engineering is a discipline within the broader field of computer science that focuses on the
              systematic design, development, testing, and maintenance of software applications and systems. It involves
              applying engineering principles to software development in order to ensure the reliability, efficiency,
              and maintainability of software..
            </p>
          </Typography>
        </Grid>
        <Grid container spacing={4} sx={{ pl: 3, pt: 3 }}>
          {jobRecommended
            ?.filter(jobSubject => jobSubject.job_position_id === jobPosition[currentIndex]?.job_position_id)
            .map(
              (sjRecommend, index) =>
                index < 3 && (
                  <Grid key={sjRecommend.subject_id} item xs={12} sm={6} lg={4}>
                    <motion.div
                      initial='hidden'
                      animate={!isVisible ? 'visible' : 'hidden'}
                      variants={{ hidden: { opacity: 0.5 }, visible: { opacity: 1 } }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card sx={{ backgroundColor: '#EBEBEB', color: '#FFF' }}>
                        <Box
                          sx={{
                            mt: 5,
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
                              {sjRecommend.subject.subject_code}
                            </Typography>
                            <Typography variant='body2' sx={{ marginLeft: 6, maxWidth: { xs: 300, sm: 250 } }} noWrap>
                              {sjRecommend.subject.subject_name_en}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                )
            )}
        </Grid>
        <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }}>
          <Button
            variant='contained'
            sx={{
              marginTop: '1rem',
              backgroundColor: '#000000',
              width: 200,
              fontFamily: 'Segoe UI',
              letterSpacing: 0.5
            }}
          >
            More Details
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Recommendation
