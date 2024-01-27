import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { mdiHeadCogOutline, mdiCog } from '@mdi/js'
import Icon from '@mdi/react'
import { Btn, DataGridTable, TextSearch } from 'src/components'
import PloDialogMangement from 'src/views/yloplo/PloDialogMangement'
import YloDialogMangement from 'src/views/yloplo/YloDialogManangement'
import SubPloDialogMapping from 'src/views/yloplo/SubPloDialogMapping'
import { useFetch } from 'src/hooks'
import { url } from 'src/configs/urlConfig'
import axios from 'axios'

function YLOPLOManagement() {
  const [openPloManagement, setOpenPloMangement] = useState(false)
  const [openYloManagement, setOpenYloMangement] = useState(false)
  const [openSubPloMapping, setOpenSubPloMapping] = useState(false)
  const [curriculumSelected, setCurriculumSelected] = useState(2)
  const [yloDisplayType, setYloDisplayType] = useState(0)
  const [YloSelected, setYloSelected] = useState([])
  const URL_GET_CURRICULUM = `${url.BASE_URL}/curriculums/`
  const URL_GET_YLOs = `${url.BASE_URL}/ylos/`
  const URL_GET_PLOs = `${url.BASE_URL}/plos/`

  const {
    error: CurriculumError,
    data: Curriculums,
    setData: setCurriculums,
    loading: CurriculumLoading,
    reFetch: reFetchCurriculums
  } = useFetch(URL_GET_CURRICULUM)

  const {
    error: YLOsDataError,
    data: YLOsData,
    setData: setYLOsData,
    loading: YLOsDataLoading,
    reFetch: reFetchYLOsData
  } = useFetch(URL_GET_YLOs + curriculumSelected)

  const {
    error: PLOsDataError,
    data: PLOsData,
    setData: setPLOsData,
    loading: PLOsDataLoading,
    reFetch: reFetchPLOsData
  } = useFetch(URL_GET_PLOs)

  const handleChangeCurriculum = currId => {
    setCurriculumSelected(currId)
  }
  const handleOpenYlo = (type, ylo) => {
    if (ylo) setYloSelected(ylo)
    else setYloSelected([])

    setYloDisplayType(type)
    setOpenYloMangement(true)
  }

  const handleUpdateYloSelect = ylo => {
    if (YLOsData) {
      axios
        .get(URL_GET_YLOs)
        .then(res => {
          if (res.data) {
            const resultData = res.data.data
            const YLOById = resultData?.find(y => y.ylo_id === ylo.ylo_id)
            // console.log('YLOById', YLOById)
            setYloSelected(YLOById)
          }
        })
        .catch(err => console.log('err from update Plo', err))
    }
  }

  const handleRemoveYLO = async ylo => {
    if (!ylo) return
    else {
      let result = window.confirm('ต้องการลบ YLO' + ylo.ylo_year + '?')
      if (result) {
        console.log('api endpoint', URL_GET_YLOs + ylo.ylo_id)
        await axios
          .delete(URL_GET_YLOs + ylo.ylo_id)
          .then(res => {
            if (res.data) {
              console.log(res.data)
              reFetchYLOsData()
            }
          })
          .catch(err => alert('err', err))
      }
    }
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
      field: 'edit',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item>
            <Button onClick={() => handleOpenYlo(1, params.row)} color='secondary' variant='outlined'>
              Edit
            </Button>
          </Grid>
        </Grid>
      )
    },
    {
      field: 'remove',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item>
            <Button onClick={() => handleRemoveYLO(params.row)} color='error' variant='outlined'>
              Remove
            </Button>
          </Grid>
        </Grid>
      )
    }
  ]

  return (
    <Box>
      <Typography variant='h6'>YLOs (Year Learning Outcomes)</Typography>
      <Typography variant='body2' sx={{ ml: 1.5 }}>
        ผลลัพธ์การเรียนรู้ที่คาดหวังรายชั้นปี
      </Typography>
      <Select
        sx={{ width: 600 }}
        size='small'
        labelId='simple-dropdown-labels'
        id='simple-dropdown'
        value={curriculumSelected || 2}
        onChange={e => handleChangeCurriculum(e.target.value)}
      >
        {Curriculums?.map((cur, index) => (
          <MenuItem key={cur?.curriculum_id} value={cur?.curriculum_id}>
            {cur?.curriculum_name_th + '(' + cur?.curriculum_year + ')'}
          </MenuItem>
        ))}
      </Select>
      <Grid container spacing={6} sx={{ mt: 5 }}>
        <Grid item xs={6} sm={6} lg={3}>
          <Button variant='contained' onClick={() => handleOpenYlo(0)} sx={{ minWidth: 200 }} fullWidth>
            + Add New YLO
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} lg={3}>
          <Button onClick={() => setOpenPloMangement(true)} variant={'outlined'} sx={{ minWidth: 200 }} fullWidth>
            <Icon path={mdiCog} size={1} style={{ marginRight: 6 }} />
            PLO Management
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
        refetchYLOs={reFetchYLOsData}
        PLOsData={PLOsData}
        handleUpdateYloSelect={handleUpdateYloSelect}
        curriculumSelected={curriculumSelected}
        Curriculums={Curriculums}
      />
      <PloDialogMangement
        PLOsData={PLOsData}
        reFetchYLOsData={reFetchYLOsData}
        reFetchPLOsData={reFetchPLOsData}
        open={openPloManagement}
        handleClose={() => setOpenPloMangement(false)}
      />
      <SubPloDialogMapping
        PLOsData={PLOsData}
        open={openSubPloMapping}
        handleClose={() => setOpenSubPloMapping(false)}
        curriculumId={curriculumSelected}
      />
    </Box>
  )
}
export default YLOPLOManagement
