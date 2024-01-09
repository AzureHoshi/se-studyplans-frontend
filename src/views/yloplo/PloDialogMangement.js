import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
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
    { field: 'firstName', headerName: 'Title', width: 200 },
    {
      field: 'lastName',
      headerName: 'Desciption',
      width: 130,
      renderCell: params => (
        <Button color='secondary' variant='outlined' fullWidth>
          Edit
        </Button>
      )
    },
    {
      field: 'subPLOs',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button color='secondary' variant='outlined' fullWidth>
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

  const rows = [
    { id: 1, firstName: 'PLO1', lastName: '..........................................' },
    { id: 2, firstName: 'PLO2', lastName: '..........................................' },
    { id: 3, firstName: 'PLO3', lastName: '..........................................' },
    { id: 4, firstName: 'PLO4', lastName: '..........................................' },
    { id: 5, firstName: 'PLO5', lastName: '..........................................' }
    // Add more dummy data as needed
  ]

  const DisplayPLO = (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} container spacing={2} sx={{ height: { xs: null, md: 350 } }}>
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth>
      <DialogTitle sx={{ background: grey[100], mb: 3 }}>PLO Management</DialogTitle>
      {displayController === 0 && <DialogContent sx={{ minHeight: 600 }}> {DisplayPLO}</DialogContent>}
      <DialogActions>
        <Button color='secondary'>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PloDialogMangement
