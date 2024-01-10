import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'

function PloDialogMangement({ state, open, handleClose }) {
  const [displayController, setDisplayController] = useState(0)
  const [openPloEdit, setOpenPloEdit] = useState(false)
  const [openSubPloEdit, setOpenSubPloEdit] = useState(false)

  const PloTextField = ({ label, value, multiline = false }) => {
    return (
      <TextField
        rows={8}
        multiline={multiline}
        size={'small'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Typography variant='body2'>{label}</Typography>
            </InputAdornment>
          )
        }}
        value={value}
        sx={{ mt: 2, mb: 1 }}
        fullWidth
      />
    )
  }

  const columns = [
    { field: 'plo_title', headerName: 'Title', width: 200 },
    {
      field: 'edit',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button onClick={() => setOpenPloEdit(true)} color='secondary' variant='outlined' fullWidth>
          Edit
        </Button>
      )
    },
    {
      field: 'subPLOs',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button onClick={() => setDisplayController(1)} color='secondary' variant='outlined' fullWidth>
          Sub PLOs
        </Button>
      )
    },
    {
      field: 'delete',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button color='error' variant='outlined' fullWidth>
          Remove
        </Button>
      )
    }
  ]
  const subcolumns = [
    { field: 'sub_plo_title', headerName: 'Title', width: 100 },
    { field: 'sub_plo_desc', headerName: 'Desc', width: 300 },
    {
      field: 'edit',
      headerName: 'Desciption',
      width: 130,
      renderCell: params => (
        <Button onClick={() => setOpenSubPloEdit(true)} color='secondary' variant='outlined' fullWidth>
          Edit
        </Button>
      )
    },

    {
      field: 'delete',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button color='error' variant='outlined' fullWidth>
          Remove
        </Button>
      )
    }
  ]

  const rows = [
    { id: 1, plo_title: 'PLO1' },
    { id: 2, plo_title: 'PLO2' },
    { id: 3, plo_title: 'PLO3' },
    { id: 4, plo_title: 'PLO4' },
    { id: 5, plo_title: 'PLO5' }
    // Add more dummy data as needed
  ]

  const subrows = [
    { id: 1, sub_plo_title: '1A', sub_plo_desc: '..........................................' },
    { id: 3, sub_plo_title: '1C', sub_plo_desc: '..........................................' },
    { id: 4, sub_plo_title: '1D', sub_plo_desc: '..........................................' },
    { id: 5, sub_plo_title: '1E', sub_plo_desc: '..........................................' },
    { id: 2, sub_plo_title: '1B', sub_plo_desc: '..........................................' },
    { id: 6, sub_plo_title: '1F', sub_plo_desc: '..........................................' },
    { id: 7, sub_plo_title: '1G', sub_plo_desc: '..........................................' }
    // Add more dummy data as needed
  ]

  const DisplayPLO = (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} container spacing={2} sx={{ minHeight: 350 }}>
        <Grid item xs={12}>
          <Typography variant='body2'>PLO Create Form</Typography>
        </Grid>
        <Grid item xs={12}>
          <PloTextField label={'Title :'} />
        </Grid>
        <Grid item xs={12}>
          <PloTextField label={'Description :'} multiline={true} />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' fullWidth>
            Create PLO
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='body2'>PLO Data</Typography>
        </Grid>
        <Grid item xs={12}>
          <DataGrid sx={{ my: 2 }} rows={rows} columns={columns} pageSize={5} disableRowSelectionOnClick hideFooter />
        </Grid>
      </Grid>
    </Grid>
  )
  const DisplaySubPLO = (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ width: { xs: '100%', md: '50%' }, mr: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body2'>Sub PLO Create Form</Typography>
          </Grid>
          <Grid item xs={12}>
            <PloTextField label={'Sub Title :'} />
          </Grid>
          <Grid item xs={12}>
            <PloTextField label={'Description :'} multiline={true} />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth>
              Create Sub PLO
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: { xs: 6, md: 0 }, width: { xs: '100%', md: '50%' } }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body2'>Sub PLO Data</Typography>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              sx={{ my: 2 }}
              rows={subrows}
              columns={subcolumns}
              pageSize={5}
              disableRowSelectionOnClick
              hideFooter
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          handleClose()
          setDisplayController(0)
        }}
        maxWidth={'xl'}
        fullWidth
      >
        <DialogTitle sx={{ background: grey[100], mb: 3 }}>PLO Management</DialogTitle>
        {displayController === 0 && <DialogContent sx={{ minHeight: 600 }}> {DisplayPLO}</DialogContent>}
        {displayController === 1 && <DialogContent sx={{ minHeight: 600 }}> {DisplaySubPLO}</DialogContent>}
        <DialogActions>
          {displayController > 0 && (
            <Button onClick={() => setDisplayController(pre => pre - 1)} variant='outlined'>
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              handleClose()
              setDisplayController(0)
            }}
            color='secondary'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit plo */}
      <Dialog
        open={openPloEdit}
        onClose={() => {
          setOpenPloEdit(false)
        }}
        maxWidth={'sm'}
        fullWidth
      >
        <DialogContent sx={{ minHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body2'>PLO Edit Form</Typography>
            </Grid>
            <Grid item xs={12}>
              <PloTextField label={'PLO Title :'} />
            </Grid>
            <Grid item xs={12}>
              <PloTextField label={'Description :'} multiline={true} />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth>
                Update PLO
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => setOpenPloEdit(false)} variant='outlined' color={'secondary'} fullWidth>
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* edit sub plo */}
      <Dialog
        open={openSubPloEdit}
        onClose={() => {
          setOpenSubPloEdit(false)
        }}
        maxWidth={'sm'}
        fullWidth
      >
        <DialogContent sx={{ minHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body2'>Sub PLO Edit Form</Typography>
            </Grid>
            <Grid item xs={12}>
              <PloTextField label={'Sub PLO Title :'} />
            </Grid>
            <Grid item xs={12}>
              <PloTextField label={'Description :'} multiline={true} />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth>
                Update Sub PLO
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => setOpenSubPloEdit(false)} variant='outlined' color={'secondary'} fullWidth>
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PloDialogMangement
