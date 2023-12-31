// React import
import React, { useState, useEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

const SubjectDetails = () => {
  return (
    <Box>
      <Box sx={{ padding: '1em 1em 0em' }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant='h6' fontSize='22px'>
              Subject Details
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant='h6' fontSize='22px' fontWeight='bold'>
              ENGXX000
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Card>
        <CardContent>
          <Grid container sx={{ padding: 2 }}>
            <Grid item xs={1.5}>
              <Typography variant='h3' align='center' fontWeight='bold'>
                3
              </Typography>
            </Grid>
            <Grid item xs={8.5} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <Typography variant='subtitle1'> Subject Code </Typography>
              <Typography variant='subtitle2'> Subject Name </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                align='center'
                sx={{ color: '#ffb93d', backgroundColor: '#fef5e5', borderRadius: 2, minWidth: 80 }}
              >
                General
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: 4 }}>
            <Grid item>
              <Typography variant='subtitle2'> Previous Subject </Typography>
              <Typography variant='body2'> Next Subject </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: 4 }}>
            <Grid item>
              <Typography variant='subtitle2'> Subject description </Typography>
              <Typography variant='body2'>
                <p style={{ textAlign: 'justify' }}> ................................</p>
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
