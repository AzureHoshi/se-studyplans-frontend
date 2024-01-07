import { Box, Button, Card, Divider, Fab, Grid, Hidden, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Recommendation = ({ jobRecommended }) => {
  const [jobPosition, setJobPosition] = useState([])
  const [currentIndex, setCurentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [dummyDesc, setDummyDesc] = useState([
    'A Software Engineer is a professional responsible for designing, developing, testing, and maintaining software systems. They play a crucial role in the software development life cycle, contributing to the creation of applications, tools, and systems that meet specific business or user needs.',
    'A Developer/Programmer is a skilled professional responsible for creating, maintaining, and implementing software solutions. They are integral to the software development process, translating requirements into code and ensuring the functionality and performance of applications.',
    'An IT Analyst, or Information Technology Analyst, is a professional responsible for evaluating and implementing information technology solutions to meet the business needs of an organization. They play a critical role in analyzing the current state of technology, identifying areas for improvement, and recommending and implementing solutions.',
    'A System Analyst and Designer is a professional responsible for analyzing and designing information systems to meet the specific needs of an organization. This role involves understanding business processes, gathering requirements, and creating detailed system specifications. Additionally, System Analysts and Designers are involved in developing efficient and effective solutions to enhance organizational processes and workflows.',
    'A Software Quality Assurance (SQA) Engineer is a professional responsible for ensuring that software products meet the established quality standards and requirements before they are released. SQA Engineers play a crucial role in the software development life cycle by implementing testing processes, identifying defects, and collaborating with development teams to deliver high-quality software.',
    'A Software Architect is a highly skilled professional responsible for designing and overseeing the implementation of complex software solutions. They play a critical role in shaping the overall structure, functionality, and performance of software systems, ensuring they meet business requirements and align with the organization long-term goals.',
    'Software Entrepreneurship involves the creation, development, and management of software-based products or services with the goal of establishing and growing a successful business. Entrepreneurs in this field navigate the dynamic landscape of technology, identifying market opportunities, and leveraging innovative solutions to address specific needs.'
  ])

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
      const addJobDesc = Object.values(uniqueJobPositions)?.map((j, index) => ({ ...j, desc: dummyDesc[index] }))
      setJobPosition(addJobDesc)
      console.log(Object.values(uniqueJobPositions))
    }
  }, [jobRecommended])
  return (
    <Box sx={{ m: 8 }}>
      <Grid container spacing={4} sx={{ pb: { xs: 0, lg: 46 } }}>
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
            <p style={{ textAlign: 'justify' }}>{jobPosition[currentIndex]?.desc}</p>
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
