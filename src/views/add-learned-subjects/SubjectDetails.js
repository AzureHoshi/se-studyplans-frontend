// React import
import React, { useState, useEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import { Box, Button, Card, CardContent, Divider, Grid, Hidden, Typography } from '@mui/material'
import { blue, grey, red } from '@mui/material/colors'

const SubjectDetails = ({ subjectSelected, handleShowAlert }) => {
  return (
    <Box>
      <Box sx={{ padding: '1em 1em 0em' }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: { xs: 16, lg: 20 }, minWidth: 160 }}>Subject Details</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography fontWeight='bold' sx={{ fontSize: { xs: 16, lg: 22 } }}>
              {subjectSelected?.subject_code}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <Card>
        <CardContent>
          <Grid container sx={{ padding: 0 }}>
            <Grid item xs={1.5} sm={2} md={1.5} lg={1.5} sx={{ display: 'flex' }}>
              <Typography variant='h3' fontWeight='bold' sx={{ fontSize: { xs: 32, md: 40 }, mt: 2, px: 3.5 }}>
                {subjectSelected?.subject_credit}
              </Typography>
            </Grid>
            <Grid
              item
              xs={10.5}
              sm={10}
              md={10.5}
              lg={10.5}
              sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'space-between', pr: 2 }}
            >
              <Box sx={{ width: '70%', mt: { xs: 3, lg: 2.5 } }}>
                <Typography variant='subtitle1' noWrap sx={{ fontSize: { xs: 14, lg: 16 }, lineHeight: 1 }}>
                  {subjectSelected?.subject_name_th}
                </Typography>
                <Typography variant='subtitle2' noWrap sx={{ fontSize: { xs: 14, lg: 16 } }}>
                  {subjectSelected?.subject_name_en}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '30%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <Hidden only={'sm'}>
                  <Typography
                    variant='body2'
                    align='center'
                    sx={{
                      color: subjectSelected.subject_structures[0]?.subject_category_id === 1 ? '#ffb93d' : 'white',
                      backgroundColor:
                        subjectSelected.subject_structures[0]?.subject_category_id === 1 ? '#fef5e5' : blue[100],
                      borderRadius: 2,
                      minWidth: 110,
                      mt: { xs: 0, sm: 4 }
                    }}
                  >
                    {subjectSelected.subject_structures[0]?.subject_category_id === 1
                      ? 'General'
                      : subjectSelected.subject_structures[0]?.subject_category_id === 2
                      ? 'Specific'
                      : null}
                  </Typography>
                </Hidden>
              </Box>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: 4 }}>
            <Grid item>
              <Typography variant='subtitle2' color={grey[500]}>
                Previous Subject
              </Typography>
              {subjectSelected?.continue_subjects[0].parent_id !== null ? (
                <Typography variant='body2' sx={{ display: 'flex', mt: -2.5 }}>
                  <p style={{ fontWeight: 'bold' }}>{subjectSelected?.continue_subjects[0]?.parent?.subject_code}</p>
                  <p style={{ marginLeft: 4 }}>{subjectSelected?.continue_subjects[0]?.parent?.subject_name_th}</p>
                </Typography>
              ) : (
                <Typography variant='caption' sx={{ display: 'flex', color: grey[400] }} noWrap>
                  No Previous Subject
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: 4 }}>
            <Grid item>
              <Typography variant='subtitle2' color={grey[500]}>
                Subject description
              </Typography>
              <Typography variant='caption'>
                <p style={{ textAlign: 'justify', marginTop: 3 }}>{subjectSelected?.subject_description}</p>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 6 }}>
          <Button
            variant='contained'
            sx={{ px: 4 }}
            onClick={() => handleShowAlert('ได้เพิ่ม ENGSEXXX ในเทอม 1/2023 สำเร็จ', 'success')}
          >
            + Add Subject
          </Button>
          <Button
            variant='contained'
            sx={{ px: 4, ml: 2, background: red[200], ':hover': { background: red[300] } }}
            onClick={() => handleShowAlert('ได้ลบ ENGSEXXX ออกจากเทอม 1/2023 สำเร็จ', 'warning')}
          >
            Remove Subject
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default SubjectDetails
