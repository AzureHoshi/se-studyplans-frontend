import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { Btn, DataGridTable, TextSearch } from 'src/components'
import PloDialogMangement from 'src/views/yloplo/PloDialogMangement'
import YloDialogMangement from 'src/views/yloplo/YloDialogManangement'

function YLOPLOManagement() {
  const [openPloManagement, setOpenPloMangement] = useState(false)
  const [openYloManagement, setOpenYloMangement] = useState(false)
  const dummyYLOs = [
    {
      ylo_id: 1,
      ylo_year: 1,
      updated_at: '2024-01-08T18:24:35.000+00:00',
      created_at: '2024-01-08T18:24:35.000+00:00'
    },
    {
      ylo_id: 2,
      ylo_year: 2,
      updated_at: '2024-01-08T18:24:35.000+00:00',
      created_at: '2024-01-08T18:24:35.000+00:00'
    },
    {
      ylo_id: 3,
      ylo_year: 3,
      updated_at: '2024-01-08T18:24:35.000+00:00',
      created_at: '2024-01-08T18:24:35.000+00:00'
    },
    { ylo_id: 4, ylo_year: 4, updated_at: '2024-01-08T18:24:35.000+00:00', created_at: '2024-01-08T18:24:35.000+00:00' }
  ]

  const columns = [
    { field: 'ylo_year', headerName: 'Title', width: 200, renderCell: params => 'YLO' + params.row.ylo_year + '' },
    {
      field: 'created_at',
      headerName: 'Created date',
      width: 300,
      renderCell: params =>
        new Date(params.row.created_at).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC' // Adjust the time zone as needed
        })
    },
    {
      field: 'fn',
      headerName: '',
      width: 200,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item>
            <Button color='secondary' variant='outlined'>
              Edit PLOs
            </Button>
          </Grid>
        </Grid>
      )
    }
  ]

  return (
    <Box>
      {/* // header */}

      <Typography variant='h6'>YLOs (Year Learning Outcomes)</Typography>

      <Typography variant='body2' sx={{ ml: 1.5 }}>
        ผลลัพธ์การเรียนรู้ที่คาดหวังรายชั้นปี
      </Typography>
      <Grid container spacing={6} sx={{ mt: 5 }}>
        {/* <Grid item xs={12} sm={12} md={4} lg={3}>
          <Box display={'flex'} flexDirection={'row'}>
            <TextSearch onChange={e => null} />
          </Box>
        </Grid> */}
        <Grid item xs={6} sm={6} md={3} lg={2}>
          <Button variant='contained' onClick={() => setOpenYloMangement(true)} sx={{ minWidth: 200 }} fullWidth>
            + Add New YLO
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={2}>
          <Button onClick={() => setOpenPloMangement(true)} variant={'outlined'} sx={{ minWidth: 200 }} fullWidth>
            PLO Mangement
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12} mt={6}>
          <DataGridTable
            rows={dummyYLOs}
            columns={columns}
            uniqueKey={'ylo_id'}

            // isLoading={StudentGroupsLoading === null ? true : StudentGroupsLoading}
          />
        </Grid>
      </Grid>
      <YloDialogMangement open={openYloManagement} handleClose={() => setOpenYloMangement(false)} />
      <PloDialogMangement open={openPloManagement} handleClose={() => setOpenPloMangement(false)} />
    </Box>
  )
}
export default YLOPLOManagement
