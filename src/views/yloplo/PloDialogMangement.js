import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { url } from 'src/configs/urlConfig'

function PloDialogMangement({ PLOsData, open, handleClose, reFetchPLOsData, reFetchYLOsData }) {
  const [displayController, setDisplayController] = useState(0)
  const [fakeLoading, setFakeLoading] = useState(false)
  const [openPloEdit, setOpenPloEdit] = useState(false)
  const [openSubPloEdit, setOpenSubPloEdit] = useState(false)
  const [PLOSelected, setPLOSelected] = useState([])
  const [PLOCreateForm, setPLOCreateForm] = useState({ plo_name: '', plo_description: '' })
  const [subPLOSelected, setSubPLOSelected] = useState([])
  const [subPLOCreateForm, setSubPLOCreateForm] = useState({ sub_plo_title: '', sub_plo_description: '' })
  const initialPLOForm = { plo_name: '', plo_description: '' }
  const initialSubPLOForm = { sub_plo_title: '', sub_plo_description: '' }

  const URL_PLO = `${url.BASE_URL}/plos/`
  const URL_SubPLO = `${url.BASE_URL}/sub-plos/`

  const handleOpenEditPLO = plo => {
    setPLOSelected(plo)
    console.log(plo)
    setOpenPloEdit(true)
  }

  const PloTextField = ({ label, value, multiline = false, onChange }) => {
    const handleChange = event => {
      // Call the provided onChange callback with the new value
      onChange(event.target.value)
    }

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
        onChange={handleChange} // Attach the onChange callback
        sx={{ mt: 2, mb: 1 }}
        fullWidth
      />
    )
  }

  // for create form (PLO)
  const handleChangePloDesc = newValue => {
    // Update the state with the new value
    setPLOCreateForm(pre => ({ ...pre, plo_description: newValue }))
  }
  const handleChangePloTitle = newValue => {
    // Update the state with the new value
    setPLOCreateForm(pre => ({ ...pre, plo_name: newValue }))
  }

  // for dialog (PLO)
  const handleChangeEditPloDesc = newValue => {
    // Update the state with the new value
    setPLOSelected(pre => ({ ...pre, plo_description: newValue }))
  }
  const handleChangeEditPloTitle = newValue => {
    // Update the state with the new value
    setPLOSelected(pre => ({ ...pre, plo_name: newValue }))
  }

  // for create form (Sub PLO)
  const handleChangeSubPloDesc = newValue => {
    // Update the state with the new value
    setSubPLOCreateForm(pre => ({ ...pre, sub_plo_description: newValue }))
  }
  const handleChangeSubPloTitle = newValue => {
    // Update the state with the new value
    setSubPLOCreateForm(pre => ({ ...pre, sub_plo_title: newValue }))
  }

  // for dialog (Sub PLO)
  const handleChangeEditSubPloDesc = newValue => {
    // Update the state with the new value
    setSubPLOSelected(pre => ({ ...pre, sub_plo_description: newValue }))
  }
  const handleChangeEditSubPloTitle = newValue => {
    // Update the state with the new value
    setSubPLOSelected(pre => ({ ...pre, sub_plo_title: newValue }))
  }

  const handleCreatePlo = () => {
    if (PLOCreateForm.plo_name !== '' && PLOCreateForm.plo_description !== '') {
      axios
        .post(URL_PLO, {
          plo_name: PLOCreateForm.plo_name,
          plo_description: PLOCreateForm.plo_description
        })
        .then(res => {
          if (res.data) {
            console.log(res.data)
            reFetchPLOsData()
            reFetchYLOsData()
            setPLOCreateForm(initialPLOForm)
          }
        })
        .catch(err => console.log('err from create PLO', err))
    }
  }
  const handleUpdatePlo = () => {
    if (PLOSelected.plo_name !== '' && PLOSelected.plo_description !== '') {
      axios
        .put(URL_PLO + PLOSelected.plo_id, {
          plo_name: PLOSelected.plo_name,
          plo_description: PLOSelected.plo_description
        })
        .then(res => {
          if (res.data) {
            console.log(res.data)
            reFetchPLOsData()
            reFetchYLOsData()
            setOpenPloEdit(false)
          }
        })
        .catch(err => console.log('err from update PLO', err))
    }
  }
  const handleRemovePlo = plo_id => {
    if (PLOSelected) {
      axios
        .delete(URL_PLO + plo_id)
        .then(res => {
          if (res.data) {
            console.log(res.data)
            reFetchPLOsData()
            reFetchYLOsData()
          }
        })
        .catch(err => console.log('err from update PLO', err))
    }
  }

  const handleCreateSubPlo = () => {
    if (subPLOCreateForm.sub_plo_title !== '' && subPLOCreateForm.sub_plo_description !== '') {
      axios
        .post(URL_SubPLO, {
          plo_id: PLOSelected.plo_id,
          sub_plo_title: subPLOCreateForm.sub_plo_title,
          sub_plo_description: subPLOCreateForm.sub_plo_description
        })
        .then(res => {
          if (res.data) {
            console.log(res.data)
            reFetchPLOsData()
            reFetchYLOsData()
            setSubPLOCreateForm(initialSubPLOForm)
            const tempSubPlos = PLOSelected?.sub_plos
            tempSubPlos = [...tempSubPlos, res.data.data]
            console.log('tempSubPlos', tempSubPlos)
            setPLOSelected(pre => ({ ...pre, sub_plos: tempSubPlos }))
          }
        })
        .catch(err => console.log('err from create PLO', err))
    }
  }

  const handleUpdateSubPlo = () => {
    if (subPLOSelected.sub_plo_title !== '' && subPLOSelected.sub_plo_description !== '') {
      axios
        .put(URL_SubPLO + subPLOSelected.sub_plo_id, {
          sub_plo_title: subPLOSelected.sub_plo_title,
          sub_plo_description: subPLOSelected.sub_plo_description
        })
        .then(res => {
          if (res.data) {
            console.log(res.data)
            reFetchPLOsData()
            reFetchYLOsData()
            setOpenPloEdit(false)
          }
        })
        .catch(err => console.log('err from update PLO', err))
    }
  }

  useEffect(() => {
    console.log('PLOSelected', PLOSelected)
  }, [PLOSelected])

  const columns = [
    { field: 'plo_name', headerName: 'Title', width: 200 },
    {
      field: 'edit',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button onClick={() => handleOpenEditPLO(params.row)} color='secondary' variant='outlined' fullWidth>
          Edit
        </Button>
      )
    },
    {
      field: 'subPLOs',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button
          onClick={() => {
            setDisplayController(1)
            setPLOSelected(params.row)
          }}
          color='secondary'
          variant='outlined'
          fullWidth
        >
          Sub PLOs
        </Button>
      )
    },
    {
      field: 'delete',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button onClick={() => handleRemovePlo(params.row.plo_id)} color='error' variant='outlined' fullWidth>
          Remove
        </Button>
      )
    }
  ]
  const subcolumns = [
    { field: 'sub_plo_title', headerName: 'Title', width: 100 },
    { field: 'sub_plo_description', headerName: 'Desc', width: 300 },
    {
      field: 'edit',
      headerName: 'Desciption',
      width: 130,
      renderCell: params => (
        <Button
          onClick={() => {
            setSubPLOSelected(params.row)
            setOpenSubPloEdit(true)
          }}
          color='secondary'
          variant='outlined'
          fullWidth
        >
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
          {/* <PloTextField label={'Title :'} /> */}
          {PloTextField({
            label: 'PLO Title :',
            value: PLOCreateForm.plo_name || '',
            onChange: handleChangePloTitle
          })}
        </Grid>
        <Grid item xs={12}>
          {/* <PloTextField label={'Description :'} multiline={true} />
           */}
          {PloTextField({
            multiline: true,
            label: 'PLO Description :',
            value: PLOCreateForm.plo_description || '',
            onChange: handleChangePloDesc
          })}
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleCreatePlo} variant='contained' fullWidth>
            Create PLO
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='body2'>PLO Data</Typography>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{ my: 2 }}
            getRowId={row => row.plo_id}
            rows={PLOsData}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
            hideFooter
          />
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
            {PloTextField({
              label: 'Sub Title :',
              value: subPLOCreateForm.sub_plo_title || '',
              onChange: handleChangeSubPloTitle
            })}
          </Grid>
          <Grid item xs={12}>
            {PloTextField({
              multiline: true,
              label: 'Sub Description :',
              value: subPLOCreateForm.sub_plo_description || '',
              onChange: handleChangeSubPloDesc
            })}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleCreateSubPlo} variant='contained' fullWidth>
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
              getRowId={row => row.sub_plo_id}
              sx={{ my: 2 }}
              rows={PLOSelected?.sub_plos || []}
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

  useEffect(() => {
    if (fakeLoading === true)
      setTimeout(() => {
        setFakeLoading(false)
      }, 200)
  }, [fakeLoading])
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
        <DialogTitle sx={{ background: grey[100], mb: 3 }}>
          PLO Management {PLOSelected?.plo_name !== undefined ? '(' + PLOSelected?.plo_name + ')' : null}
        </DialogTitle>
        {displayController === 0 && <DialogContent sx={{ minHeight: 600 }}> {DisplayPLO}</DialogContent>}
        {displayController === 1 && <DialogContent sx={{ minHeight: 600 }}> {DisplaySubPLO}</DialogContent>}
        <DialogActions>
          {displayController > 0 && (
            <Button
              onClick={() => {
                setPLOSelected([])
                setDisplayController(pre => pre - 1)
              }}
              variant='outlined'
            >
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
              {/* <PloTextField label={'PLO Title :'} value={PLOSelected.plo_name || ''} /> */}
              {PloTextField({
                label: 'PLO Title :',
                value: PLOSelected.plo_name || '',
                onChange: handleChangeEditPloTitle
              })}
            </Grid>
            <Grid item xs={12}>
              {PloTextField({
                label: 'Description :',
                multiline: true,
                value: PLOSelected.plo_description || '',
                onChange: handleChangeEditPloDesc
              })}
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleUpdatePlo} variant='contained' fullWidth>
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
              {PloTextField({
                label: 'Sub PLO Title:',

                value: subPLOSelected.sub_plo_title || '',
                onChange: handleChangeEditSubPloTitle
              })}
            </Grid>
            <Grid item xs={12}>
              {PloTextField({
                label: 'Sub PLO Description :',
                multiline: true,
                value: subPLOSelected.sub_plo_description || '',
                onChange: handleChangeEditSubPloDesc
              })}
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
