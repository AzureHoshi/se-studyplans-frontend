// React import
import React, { useState, useEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import { Box, Card, CardContent, Grid, Hidden, Typography } from '@mui/material'

// Icon import URL: https://materialdesignicons.com/
import BookOpenPageVariantOutline from 'mdi-material-ui/BookOpenPageVariantOutline'

// Components import
import CardInfo from 'src/views/add-learned-subjects/CardInfo'
import Subjects from 'src/views/add-learned-subjects/Subjects'
import SubjectDetails from 'src/views/add-learned-subjects/SubjectDetails'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CustomLayout } from 'src/views/custom-layout-student-systems'
import axios from 'axios'
import { url } from 'src/configs/urlConfig'

const Studyplans = ({ SubjectData }) => {
  const [switchContent, setSwitchContent] = useState(0)
  const [filterState, setFilterState] = useState(0) // 0 unfilter, 1 general, 2 specific

  return (
    <CustomLayout
      content={
        <Box>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <Typography variant='h4'>Update Study Plan</Typography>
                  <Typography variant='body2'>Add subjects you have learned</Typography>
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
              <CardInfo setSwitchContent={setSwitchContent} setFilterState={setFilterState} />
            </Hidden>
            <Grid container>
              <Grid item xs={12} sm={6} lg={5}>
                <Subjects
                  data={SubjectData}
                  switchContent={switchContent}
                  setSwitchContent={setSwitchContent}
                  filterState={filterState}
                />
              </Grid>
              <Hidden smDown>
                <Grid item sm={6} lg={7}>
                  <SubjectDetails />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
      }
    />
  )
}

Studyplans.getLayout = page => <BlankLayout>{page}</BlankLayout>
// ssr
export async function getServerSideProps() {
  const resSubjects = await axios.get(url.BASE_URL + `/subjects-by-curriculum/` + 2) // 2 for se 66
  return {
    props: {
      SubjectData: resSubjects.data.data
    }
  }
}

export default Studyplans
