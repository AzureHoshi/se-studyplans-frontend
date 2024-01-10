import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Autocomplete,
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

function YloDialogMangement({ state, open, handleClose, displayType }) {
  const [displayController, setDisplayController] = useState(displayType)
  const initialYlo = [{ id: 0, desc: '' }]
  const [descriptionArray, setDescriptionArray] = useState(initialYlo)

  const YloTextField = ({ label, value, multiline = false, type }) => {
    return (
      <TextField
        type={type}
        rows={2}
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
        fullWidth
      />
    )
  }

  const handleAddDescription = () => {
    // Create a new object with a unique id and the provided description
    const newObj = { id: descriptionArray.length, desc: '' }
    const updateState = [...descriptionArray, newObj]

    // Update the state by spreading the previous array and adding the new object
    setDescriptionArray(updateState)
  }

  const columns = [
    { field: 'firstName', headerName: 'Title', width: 400 },

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
    { id: 1, firstName: 'PLO1' },
    { id: 2, firstName: 'PLO2' },
    { id: 3, firstName: 'PLO3' }
    // Add more dummy data as needed
  ]

  const DisplayCreateForm = (
    <Grid container spacing={6}>
      <Grid item xs={12} container spacing={2} sx={{ minHeight: 200 }}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            type='number'
            size={'small'}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Typography variant='body2'>Year</Typography>
                </InputAdornment>
              ),
              inputProps: {
                max: 4,
                min: 1
              }
            }}
          />
        </Grid>

        {Object.values(descriptionArray)?.map((d, index) => (
          <Grid item xs={12}>
            <YloTextField label={'Description :'} multiline={true} />
          </Grid>
        ))}
        <Grid item xs={4}>
          <Button onClick={handleAddDescription} variant='outlined' fullWidth>
            + Description
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button variant='contained' fullWidth>
            Create YLO
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  const DisplayEditYloPLOs = (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ width: { xs: '100%', md: '60%' }, p: 2 }}>
        <Typography variant='body2' sx={{ mb: 4 }}>
          YLO
        </Typography>
        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            type='number'
            size={'small'}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Typography variant='body2'>Year</Typography>
                </InputAdornment>
              ),
              inputProps: {
                max: 4,
                min: 1
              }
            }}
          />
        </Box>

        {Object.values(descriptionArray)?.map((d, index) => (
          <Grid item xs={12} container key={index} spacing={2} sx={{ my: 2 }}>
            <Grid item xs={10}>
              <YloTextField label={'Description :'} multiline={true} />
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' color={'error'} fullWidth sx={{ height: '100%' }}>
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row' }}>
          <Button sx={{ mr: 2 }} onClick={handleAddDescription} variant='outlined' fullWidth>
            + Description
          </Button>
          <Button variant='contained' fullWidth>
            Update YLO
          </Button>
        </Box>
      </Box>

      <Grid item xs={12} md={6} container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant='body2'>PLO Relation</Typography>
        </Grid>
        <Grid item xs={12}>
          <DataGrid sx={{ my: 2 }} rows={rows} columns={columns} pageSize={5} disableRowSelectionOnClick hideFooter />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Autocomplete
            // value={searchSubject || []}
            size='small'
            disablePortal
            fullWidth
            freeSolo
            // options={customSubjects}
            // getOptionLabel={option => option.label || ''}
            renderInput={params => <TextField {...params} label='Search PLO' />}
            // onChange={(e, value) => {
            //   if (value !== null) {
            //     setSearchSubject(value)
            //     setSubjectSelected(data?.find(s => s.subject_id === value.subject_id))
            //     // setState(pre => ({ ...pre, subject_group_id: value.subject_group_id }))
            //   } else {
            //     setSearchSubject([])
            //     setSubjectSelected([])
            //     // setState(pre => ({ ...pre, subject_group_id: null }))
            //   }
            // }}
          />
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button sx={{ mr: 2 }} variant='outlined' fullWidth>
              + Add PLO
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )

  useEffect(() => {
    if (open) {
      setDisplayController(displayType)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose()
        setDescriptionArray(initialYlo)
      }}
      maxWidth={displayController === 0 ? 'md' : 'xl'}
      fullWidth
    >
      <DialogTitle sx={{ background: grey[100], mb: 3 }}>
        {displayController === 0 && 'YLO Create Form'}
        {displayController === 1 && 'YLO Edit Form'}
      </DialogTitle>
      {displayController === 0 && <DialogContent sx={{ minHeight: 600 }}> {DisplayCreateForm}</DialogContent>}
      {displayController === 1 && <DialogContent sx={{ minHeight: 600 }}> {DisplayEditYloPLOs}</DialogContent>}
      <DialogActions>
        <Button
          onClick={() => {
            handleClose()
            setDescriptionArray(initialYlo)
          }}
          color='secondary'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default YloDialogMangement
