// React import
import React, { useState, useEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const SubjectDetails = ({ subjectSelected }) => {
  return (
    <Box>
      <Box sx={{ padding: '1em 1em 0em' }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: { xs: 22, sm: 16, lg: 22 }, minWidth: 160 }}>Subject Details</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography fontWeight='bold' sx={{ fontSize: { xs: 22, sm: 16, lg: 22 } }}>
              {subjectSelected?.subject_code}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <Card>
        <CardContent>
          <Grid container sx={{ padding: 0 }}>
            <Grid item xs={1} sm={2} md={1.5}>
              <Typography variant='h3' fontWeight='bold'>
                {subjectSelected?.subject_credit}
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sm={10}
              md={8.5}
              sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            >
              <Typography variant='subtitle1' noWrap>
                {subjectSelected?.subject_name_th}
              </Typography>
              <Typography variant='subtitle2' noWrap>
                {subjectSelected?.subject_name_en}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={12} md={2}>
              <Typography
                variant='body2'
                align='center'
                sx={{
                  color: '#ffb93d',
                  backgroundColor: '#fef5e5',
                  borderRadius: 2,
                  minWidth: 80,
                  maxWidth: 120,
                  mr: { xs: 0, md: 12, lg: 0 },
                  mt: { xs: 0, sm: 4 }
                }}
              >
                General
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: 4 }}>
            <Grid item>
              <Typography variant='subtitle2' color={grey[500]}>
                Previous Subject
              </Typography>
              <Typography variant='body2' sx={{ display: 'flex', mt: -2.5 }} noWrap>
                <p style={{ fontWeight: 'bold' }}>ENGXX000</p>
                <p style={{ marginLeft: 4 }}>Something..........................</p>
              </Typography>
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
        <Box sx={{ padding: '1em 1em 0em' }}>
          <Button variant='contained'>Add</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default SubjectDetails
