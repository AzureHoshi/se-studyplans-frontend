import { Dialog, Typography, DialogContent, Grid, TextField, DialogActions, Button, MenuItem } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Selection } from 'src/components'
import { handleChangeTH } from 'src/hooks/useValidation'

function AddSubjectGroupsModal({ Categories, open, handleClose, handleSubmit }) {
  const initialsState = {
    subject_type_id: '',
    subject_group_name: ''
  }

  const [state, setState] = useState({
    subject_type_id: '',
    subject_group_name: ''
  })

  const [typeSelection, setTypeSelection] = useState(0)

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
    setState(pre => ({ ...pre, subject_type_id: typeSelection }))
  }, [typeSelection])

  useEffect(() => {
    // console.log(state)
  }, [state])

  return (
    <Dialog open={open} onClose={() => handleClose(setState(initialsState))} maxWidth={'lg'} fullWidth>
      <DialogContent sx={{ minHeight: 450 }}>
        <Typography variant='h6' sx={{ mt: 5, ml: 5 }}>
          Add new Subject Group
        </Typography>
        <DialogContent sx={{ display: 'flex' }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Selection
                width={'100%'}
                firstItemText={'Choose Type*'}
                selectionValue={typeSelection}
                handleChange={e => setTypeSelection(e.target.value)}
                Items={Object.values(Categories)?.map(category => (
                  <MenuItem key={category.subject_type_id} value={category.subject_type_id}>
                    {category.subject_type_name}
                  </MenuItem>
                ))}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                fullWidth
                name={'subject_group_name'}
                label='Subject Group Name*'
                placeholder='Thai Only'
                onChange={e => handleChangeTH(e, setState)}
                value={state.subject_group_name}
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

export default AddSubjectGroupsModal
