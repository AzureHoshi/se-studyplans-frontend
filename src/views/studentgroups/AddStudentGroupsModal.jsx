import { Dialog, Typography, DialogContent, Grid, TextField, DialogActions, Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { handleChangeEN, handleChangeTH } from 'src/hooks/useValidation'

function AddStudentGroupsModal({ open, handleClose, handleSubmit }) {
  const initialsState = {
    collegian_group_name_th: '',
    collegian_group_name_en: '',
    collegian_group_short_name_th: '',
    collegian_group_short_name_en: ''
  }

  const [state, setState] = useState({
    collegian_group_name_th: '',
    collegian_group_name_en: '',
    collegian_group_short_name_th: '',
    collegian_group_short_name_en: ''
  })

  const checkIsEmpty = object => {
    var isEmpty = false

    Object.keys(object).forEach(function (key) {
      var val = object[key]
      if (val === '' || val === 0) {
        isEmpty = true
      }
    })

    if (isEmpty) {
      alert('Please Fill All TextFields')
    }

    return isEmpty
  }

  useEffect(() => {
    // console.log(state)
  }, [state])

  return (
    <Dialog open={open} onClose={() => handleClose(setState(initialsState))} maxWidth={'lg'} fullWidth>
      <DialogContent sx={{ minHeight: 450 }}>
        <Typography variant='h6' sx={{ mt: 5, ml: 5 }}>
          Add new Student Group
        </Typography>
        <DialogContent sx={{ display: 'flex' }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                fullWidth
                name={'collegian_group_name_th'}
                label='Group Name TH*'
                placeholder='Thai Only'
                onChange={e => handleChangeTH(e, setState)}
                value={state.collegian_group_name_th}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                fullWidth
                name={'collegian_group_name_en'}
                label='Group Name EN*'
                placeholder='English Only'
                onChange={e => handleChangeEN(e, setState)}
                value={state.collegian_group_name_en}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                fullWidth
                name={'collegian_group_short_name_th'}
                label='Group Short Name TH*'
                placeholder='Thai Only'
                onChange={e => handleChangeTH(e, setState)}
                value={state.collegian_group_short_name_th}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                fullWidth
                name={'collegian_group_short_name_en'}
                label='Group Short Name EN*'
                placeholder='English Only'
                onChange={e => handleChangeEN(e, setState)}
                value={state.collegian_group_short_name_en}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(setState(initialsState))} color='secondary'>
          Cancel
        </Button>
        {/* <Button onClick={() => !checkIsEmpty(state) && handleSubmit(state)}>Submit</Button> */}
        <Button onClick={() => !checkIsEmpty(state) && handleSubmit(state, setState(initialsState))}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddStudentGroupsModal
