import { Box, Button, Card, CardHeader, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const Simulator = () => {
  const handleClicktoSimSyst = () => {
    window.open('/pages/studyplansimulator/', '_blank')
    // router.push('/pages/studyplansimulator/')
  }

  return (
    <Box sx={{ p: 16, mt: 24, mx: { xs: 4, md: 12 }, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 6 }}>
      <Grid container spacing={2} sx={{ pb: 58 }}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ color: grey[800], fontWeight: 'bold' }}>
            Study Plan Simulator (SE 2566)
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 6 }}>
          <Typography variant='caption' sx={{ color: '#909094' }}>
            ระบบจำลองแผนการเรียนถูกออกแบบมาเพื่อเพิ่มความสะดวกให้กับนักศึกษาในการเข้าถึงข้อมูลหลักสูตร
            โดยระบบนี้สามารถอ้างอิงข้อมูลจากรายวิชาทั้งหมดในหลักสูตร
            และให้มีตัวอย่างแผนการเรียนที่นักศึกษาสามารถนำมาปรับใช้ในการวางแผนการลงเรียนของตนเองได้โดยง่าย
            ทำให้นักศึกษาสามารถวางแผนการเรียนที่ตรงกับความต้องการของตนเองได้อย่างมีประสิทธิภาพ สามารถExport
            ข้อมูลการจำลองแผนการเรียนเป็นไฟล์ CSV ซึ่งเป็นวิธีที่ทันสมัยและทำให้นักศึกษาสามารถนำข้อมูลไปใช้ต่อได้ง่าย
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
            ไปยังระบบจำลองแผนการเรียน
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Simulator
