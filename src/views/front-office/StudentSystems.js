import { Box, Button, Card, CardHeader, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useRouter } from 'next/router'

const StudentSystems = () => {
  const router = useRouter()
  return (
    <Box sx={{ p: 16, mt: 24, mx: { xs: 4, md: 12 }, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 6 }}>
      <Grid container spacing={2} sx={{ pb: 58 }}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ color: grey[800], fontWeight: 'bold' }}>
            Login for use Student Systems
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 6 }}>
          <Typography variant='caption' sx={{ color: '#909094' }}>
            ระบบที่ถูกพัฒนาขึ้นเพื่อช่วยให้นักศึกษาสามารถอัพเดทแผนการเรียนปัจจุบันของตนได้อย่างสะดวก
            ระบบนี้ได้รับการออกแบบเพื่อให้นักศึกษาสามารถมองเห็นความก้าวหน้าของแผนการเรียนปัจจุบันของตนในรูปแบบของเปอร์เซ็นต์
            ทำให้นักศึกษาสามารถติดตามและปรับปรุงแผนการเรียนของตนได้อย่างมีประสิทธิภาพ นอกจากนี้
            ระบบยังมีความสามารถในการเปรียบเทียบโครงสร้างหลักสูตร
            ทำให้นักศึกษาสามารถศึกษาและวิเคราะห์โครงสร้างหลักสูตรต่าง ๆ และนำไปใช้ในการออกแบบแผนการเรียนของตนเองในอนาคต
            การเปรียบเทียบนี้ช่วยให้นักศึกษาเข้าใจต่อโครงสร้างหลักสูตรและช่วยในการตัดสินใจในการวางแผนการเรียนที่เหมาะสมกับเป้าหมายและความสนใจของตนเองอย่างมีความเข้าใจทั้งด้านวิชาการและอาชีพของตนในอนาคต
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 12 }}>
          <Button
            onClick={() => router.push('pages/login')}
            variant='contained'
            sx={{
              marginTop: '1rem',
              backgroundColor: '#000000',
              width: 200,
              letterSpacing: 0.5,
              fontFamily: 'Segoe UI'
            }}
          >
            เข้าสู่ระบบ
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StudentSystems
