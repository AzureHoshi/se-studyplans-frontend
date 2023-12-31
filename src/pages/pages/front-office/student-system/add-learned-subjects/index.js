// React import
import React, { useState, useEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import { Card, CardContent, Container, Grid, Hidden, Typography } from '@mui/material'

// Icon import URL: https://materialdesignicons.com/
import BookOpenPageVariantOutline from 'mdi-material-ui/BookOpenPageVariantOutline'

// Components import
import CardInfo from 'src/views/add-learned-subjects/CardInfo'
import Subjects from 'src/views/add-learned-subjects/Subjects'
import SubjectDetails from 'src/views/add-learned-subjects/SubjectDetails'

const addLearnedSubjects = () => {
  const [switchContent, setSwitchContent] = useState(0)

  return (
    <Container maxWidth='lg'>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography variant='h4' fontSize='22px bold'>
                Add Learned Subjects
              </Typography>
              <Typography variant='h6' fontSize='14px'>
                Add subjects you have learned
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid item sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BookOpenPageVariantOutline sx={{ fontSize: 72 }} />
              </Grid>
            </Hidden>
          </Grid>
        </CardContent>
      </Card>
      <Card variant='outlined' sx={{ marginTop: 6, display: 'flex' }}>
        <Hidden lgDown>
          <CardInfo setSwitchContent={setSwitchContent} />
        </Hidden>
        <Grid container>
          <Grid item xs={12} sm={6} lg={5}>
            <Subjects switchContent={switchContent} setSwitchContent={setSwitchContent} />
          </Grid>
          <Hidden smDown>
            <Grid item sm={6} lg={7}>
              <SubjectDetails />
            </Grid>
          </Hidden>
        </Grid>
      </Card>
    </Container>
  )
}

export default addLearnedSubjects
