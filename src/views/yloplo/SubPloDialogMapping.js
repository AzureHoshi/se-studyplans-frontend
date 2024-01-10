import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { url } from 'src/configs/urlConfig'
import { useFetch } from 'src/hooks'
import Icon from '@mdi/react'
import { mdiSitemapOutline } from '@mdi/js'

function SubPloDialogMapping({ state, open, handleClose }) {
  const [displayController, setDisplayController] = useState(0)
  const URL_GET_CURRICULUM = `${url.BASE_URL}/curriculums/`
  const [curriculumSelected, setCurriculumSelected] = useState([])

  const curriculumColumns = [
    { field: 'curriculum_year', headerName: 'Year', width: 100 },
    { field: 'curriculum_short_name_th', headerName: 'Curriculum Name TH', width: 200 },
    { field: 'curriculum_short_name_en', headerName: 'Curriculum Name EN', width: 200 },
    {
      field: 'faculty',
      headerName: 'Faculty',
      width: 200,
      valueGetter: params => params.row?.faculty?.faculty_name_th
    },
    {
      field: 'collegian_groups',
      headerName: 'Student',
      width: 100,
      valueGetter: params => params.row?.collegian_groups?.collegian_group_short_name_th
    },
    {
      field: 'mapping',
      headerName: '',
      width: 200,
      renderCell: params => (
        <Button onClick={() => handleCurriculumSelect(params.row)} color='info' variant='outlined' fullWidth>
          <Icon path={mdiSitemapOutline} size={1} style={{ marginRight: 6 }} /> Mapping
        </Button>
      )
    }
  ]
  const {
    error: CurriculumError,
    data: Curriculums,
    setData: setCurriculums,
    loading: CurriculumLoading,
    reFetch: reFetchCurriculums
  } = useFetch(URL_GET_CURRICULUM)

  const handleCurriculumSelect = row => {
    console.log(row)
    setCurriculumSelected(row)
    setDisplayController(1)
  }

  const DisplaySelecteCurriculums = (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography sx={{ m: 2 }} variant='body2'>
          Curriculums (หลักสูตร)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          checkboxSelection={false}
          disableSelectAllCheckbox
          getRowId={row => row.curriculum_id}
          rows={Curriculums}
          columns={curriculumColumns}
          pageSize={5}
        />
      </Grid>
    </Grid>
  )

  const DisplaySubPloSubjectMapping = (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography sx={{ m: 2 }} variant='body2'>
          หลักสูตร {' (' + curriculumSelected?.curriculum_name_th + ' ' + curriculumSelected?.curriculum_year}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        Show Subjects
      </Grid>
    </Grid>
  )
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose()
      }}
      maxWidth={'xl'}
      fullWidth
    >
      <DialogTitle sx={{ background: grey[100], mb: 3 }}>{displayController === 0 && 'Sub Plo Mapping'}</DialogTitle>
      {displayController === 0 && <DialogContent sx={{ minHeight: 600 }}> {DisplaySelecteCurriculums}</DialogContent>}
      {displayController === 1 && <DialogContent sx={{ minHeight: 600 }}> {DisplaySubPloSubjectMapping}</DialogContent>}
      <DialogActions>
        {displayController > 0 && (
          <Button onClick={() => setDisplayController(pre => pre - 1)} variant='outlined'>
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            handleClose()
          }}
          color='secondary'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubPloDialogMapping
