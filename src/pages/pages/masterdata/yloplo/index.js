import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { mdiHeadCogOutline, mdiCog } from '@mdi/js'
import Icon from '@mdi/react'
import { Btn, DataGridTable, TextSearch } from 'src/components'
import PloDialogMangement from 'src/views/yloplo/PloDialogMangement'
import YloDialogMangement from 'src/views/yloplo/YloDialogManangement'
import SubPloDialogMapping from 'src/views/yloplo/SubPloDialogMapping'
import { useFetch } from 'src/hooks'
import { url } from 'src/configs/urlConfig'

function YLOPLOManagement() {
  const [openPloManagement, setOpenPloMangement] = useState(false)
  const [openYloManagement, setOpenYloMangement] = useState(false)
  const [openSubPloMapping, setOpenSubPloMapping] = useState(false)
  const [yloDisplayType, setYloDisplayType] = useState(0)
  const [YloSelected, setYloSelected] = useState([])
  const URL_GET_YLOs = `${url.BASE_URL}/ylos/`

  const {
    error: YLOsDataError,
    data: YLOsData,
    setData: setYLOsData,
    loading: YLOsDataLoading,
    reFetch: reFetchYLOsData
  } = useFetch(URL_GET_YLOs)

  const handleOpenYlo = (type, ylo) => {
    if (ylo) setYloSelected(ylo)
    else setYloSelected([])

    setYloDisplayType(type)
    setOpenYloMangement(true)
  }

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
            <Button onClick={() => handleOpenYlo(1, params.row)} color='secondary' variant='outlined'>
              Edit
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
        <Grid item xs={6} sm={6} lg={3}>
          <Button variant='contained' onClick={() => handleOpenYlo(0)} sx={{ minWidth: 200 }} fullWidth>
            + Add New YLO
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} lg={3}>
          <Button onClick={() => setOpenPloMangement(true)} variant={'outlined'} sx={{ minWidth: 200 }} fullWidth>
            <Icon path={mdiCog} size={1} style={{ marginRight: 6 }} />
            PLO Mangement
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} lg={3}>
          <Button onClick={() => setOpenSubPloMapping(true)} variant={'outlined'} sx={{ minWidth: 200 }} fullWidth>
            <Icon path={mdiHeadCogOutline} size={1} style={{ marginRight: 6 }} /> Sub PLO Mapping
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12} mt={6}>
          {YLOsData.length === 0 && !YLOsDataLoading ? (
            <Typography variant='body2'> API response is null</Typography>
          ) : (
            <DataGridTable
              rows={YLOsData}
              columns={columns}
              uniqueKey={'ylo_id'}

              // isLoading={StudentGroupsLoading === null ? true : StudentGroupsLoading}
            />
          )}
        </Grid>
      </Grid>
      <YloDialogMangement
        open={openYloManagement}
        handleClose={() => setOpenYloMangement(false)}
        displayType={yloDisplayType}
        YloSelected={YloSelected}
      />
      <PloDialogMangement open={openPloManagement} handleClose={() => setOpenPloMangement(false)} />
      <SubPloDialogMapping open={openSubPloMapping} handleClose={() => setOpenSubPloMapping(false)} />
    </Box>
  )
}
export default YLOPLOManagement
