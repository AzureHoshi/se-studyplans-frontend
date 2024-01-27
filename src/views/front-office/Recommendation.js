import { Box, Button, Card, Divider, Fab, Grid, Hidden, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Recommendation = ({ jobRecommended, jobCompetencies }) => {
  const [jobPosition, setJobPosition] = useState([])
  const [currentIndex, setCurentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [dummyDesc, setDummyDesc] = useState([
    'วิศวกรซอฟต์แวร์คือผู้เชี่ยวชาญที่รับผิดชอบในการออกแบบ พัฒนา ทดสอบ และดูแลรักษาระบบซอฟต์แวร์ พวกเขามีบทบาทสำคัญในวงจรชีวิตการพัฒนาซอฟต์แวร์ มContributing to the creation of applications, tools, and systems that meet specific business or user needs.',
    'นักพัฒนา/โปรแกรมเมอร์เป็นผู้เชี่ยวชาญที่รับผิดชอบในการสร้าง บริการซอฟต์แวร์ พวกเขาเป็นส่วนสำคัญของกระบวนการพัฒนาซอฟต์แวร์ แปลความต้องการเป็นโค้ด และรักษาความสามารถและประสิทธิภาพของแอปพลิเคชัน',
    'นักวิเคราะห์ IT หรือนักวิเคราะห์เทคโนโลยีสารสนเทศเป็นผู้เชี่ยวชาญที่รับผิดชอบในการประเมินและดำเนินการสร้างความสามารถทางเทคโนโลยีสารสนเทศเพื่อตอบสนองความต้องการทางธุรกิจขององค์กร พวกเขามีบทบาทสำคัญในการวิเคราะห์สถานะปัจจุบันของเทคโนโลยี การระบุพื้นที่ที่ต้องปรับปรุง และการแนะนำและการดำเนินการ',
    'นักวิเคราะห์และออกแบบระบบเป็นผู้เชี่ยวชาญที่รับผิดชอบในการวิเคราะห์และออกแบบระบบสารสนเทศเพื่อตอบสนองความต้องการที่เฉพาะเจาะจงขององค์กร บทบาทนี้เน้นที่การเข้าใจกระบวนการธุรกิจ การรวบรวมความต้องการ และสร้างข้อมูลสเปคระบบอย่างละเอียด นอกจากนี้ นักวิเคราะห์และออกแบบระบบยังมีส่วนร่วมในการพัฒนาโครงการให้มีประสิทธิภาพและมีประสิทธิผลเพื่อเสริมสร้างกระบวนการและการทำงานขององค์กร',
    'วิศวกรประกันคุณภาพซอฟต์แวร์ (SQA) เป็นผู้เชี่ยวชาญที่รับผิดชอบในการตรวจสอบว่าผลิตภัณฑ์ซอฟต์แวร์ตรงตามมาตรฐานและความต้องการที่กำหนดก่อนที่จะเผยแพร่ วิศวกร SQA เล่น perimental testing processes, identifying defects, and collaborating with development teams to deliver high-quality software.',
    'นักสถาปนิกซอฟต์แวร์เป็นผู้เชี่ยวชาญที่มีความสามารถสูงรับผิดชอบในการออกแบบและดูแลการปฏิบัติของโซลูชั่นซอฟต์แวร์ที่ซับซ้อน พวกเขามีบทบาทสำคัญในการปั้นโครงสร้างทั้งหมด ฟังก์ชัน และประสิทธิภาพของระบบซอฟต์แวร์ เพื่อให้พวกเขาตรงตามความต้องการทางธุรกิจและสอดคล้องกับเป้าหมายขององค์กรในระยะยาว',
    'การประกอบการซอฟต์แวร์เป็นกระบวนการสร้าง พัฒนา และจัดการผลิตภัณฑ์หรือบริการที่ใช้เทคโนโลยีซอฟต์แวร์เพื่อการก่อตั้งและการเจริญเติบโตของธุรกิจที่ประสบความสำเร็จ ผู้ประกอบการในวงการนี้นำทางที่พลวัตของเทคโนโลยี การระบุโอกาสทางตลาด และการใช้นวัตกรรมในการแก้ไขความต้องการที่เฉพาะเจาะจง'
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
      // console.log('jobRecommended', jobRecommended)
      const uniqueJobPositions = jobRecommended.reduce((result, currentItem) => {
        const { job_position_id, job_position } = currentItem
        if (!result[job_position_id]) {
          result[job_position_id] = job_position
        }
        return result
      }, {})
      const addJobDesc = Object.values(uniqueJobPositions)?.map((j, index) => ({ ...j, desc: dummyDesc[index] }))
      setJobPosition(addJobDesc)
      // console.log(Object.values(uniqueJobPositions))
    }
  }, [jobRecommended])

  // useEffect(() => {
  //   console.log(
  //     'jobCompetencies',
  //     jobCompetencies?.map(d => d.job_competencies?.map(com => com.job_com_description))
  //   )
  // }, [jobCompetencies])

  return (
    <Box sx={{ p: 16, mt: 24, mx: { xs: 4, md: 12 }, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 6 }}>
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
        <Grid container item xs={12}>
          {jobCompetencies
            ?.filter(job => job.job_position_id === jobPosition[currentIndex]?.job_position_id)
            .map(d =>
              d.job_competencies?.map(com => (
                <Grid item xs={6} key={com.job_com_id}>
                  <Typography variant='caption'>
                    <li>{com.job_com_description}</li>
                  </Typography>
                </Grid>
              ))
            )}
          {/* jobCompetencies?.map(d => d.job_competencies?.map(com => com.job_com_description) */}
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
                          <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
                            <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                              {sjRecommend.subject.subject_code}
                            </Typography>
                            <Typography variant='body2' sx={{ marginLeft: 6 }} noWrap>
                              {sjRecommend.subject.subject_name_th}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                )
            )}
        </Grid>
        {/* <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }}>
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
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default Recommendation
