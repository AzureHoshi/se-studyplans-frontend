import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CustomLayout } from 'src/views/custom-layout-student-systems'

function StudentComcetencies() {
  const dummy = [
    { year: 2563, semester: 1 },
    { year: 2563, semester: 2 },
    { year: 2564, semester: 1 },
    { year: 2564, semester: 2 },
    { year: 2565, semester: 1 },
    { year: 2565, semester: 2 },
    { year: 2566, semester: 1 },
    { year: 2566, semester: 2 }
  ]
  return (
    <CustomLayout
      content={
        <Box sx={{ width: '100%', position: 'relative', p: 6 }}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography variant='h6'>Competencies(สมรรถนะที่ได้จากแผนการเรียน)</Typography>
            </Grid>
            <Grid item xs={12} sx={{ pt: 6 }}>
              {dummy.map((d, index) => (
                <Card key={index} sx={{ mb: 6 }}>
                  <CardContent>
                    <Typography variant='body2' sx={{ mb: 2.5 }}>
                      ปีการศึกษา {d.year} เทอม {d.semester} ({d.semester}/{d.year})
                    </Typography>
                    {Array.from({ length: 6 }, (_, index) => (
                      <Grid container key={index}>
                        <Grid item xs={12} lg={3} sx={{ display: { xs: 'flex', lg: 'grid' }, mb: { xs: 0, lg: 2 } }}>
                          <Typography variant='caption'> ENGSEXX000</Typography>
                          <Typography variant='caption' sx={{ ml: { xs: 2, lg: 0 } }}>
                            subject .............
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={9}>
                          <Typography variant='caption'> competencies</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          {index + 1 !== dummy.length && <Divider sx={{ mt: 2 }} />}
                        </Grid>
                      </Grid>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      }
    />
  )
}
StudentComcetencies.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default StudentComcetencies
