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
import axios from 'axios'
import { url } from 'src/configs/urlConfig'
import { CircleLoading } from 'src/components'

function YloDialogMangement({
  YloSelected,
  open,
  handleClose,
  displayType,
  refetchYLOs,
  PLOsData,
  handleUpdateYloSelect
}) {
  const initialDesc = [{ id: 0, ylo_description: '' }]
  const [displayController, setDisplayController] = useState(displayType)
  const [fakeLoading, setFakeLoading] = useState(false)
  const [yloState, setYloState] = useState(YloSelected)
  const [yloPLO, setYloPLO] = useState([])
  const [descriptionArray, setDescriptionArray] = useState(initialDesc)
  const [openDescEdit, setOpenDescEdit] = useState(false)
  const [openAddDescription, setOpenAddDescription] = useState(false)
  const [descId, setDescId] = useState(0)
  const [descriptionSelected, setDescriptionSelected] = useState('')
  const [yloYear, setYloYear] = useState(1)

  const URL_YLO = `${url.BASE_URL}/ylos/`
  const URL_YLO_DESC = `${url.BASE_URL}/ylo-descriptions/`
  const URL_YLO_PLO_RELATED = `${url.BASE_URL}/ylo-plos/`

  const YloTextField = ({ label, value, multiline = false, type, disabled, onChange }) => {
    return (
      <TextField
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        type={type}
        multiline={multiline}
        size={'small'}
        rows={3}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Typography variant='body2'>{label}</Typography>
            </InputAdornment>
          ),
          style: { fontSize: 15 }
        }}
        value={value}
        fullWidth
      />
    )
  }

  const handleAddDescription = () => {
    if (displayController === 0) {
      const newDescriptionArray = [
        ...descriptionArray,
        {
          id: descriptionArray.length,
          ylo_description: ''
        }
      ]

      setDescriptionArray(newDescriptionArray)
    }
  }

  const handleChangeDesc = (value, i) => {
    const DescDataByIndex = descriptionArray?.find((d, index) => index === i)
    DescDataByIndex.ylo_description = value
    const updatedDescObject = {
      ...descriptionArray.map(yloDesc => (yloDesc.id === i ? { ...DescDataByIndex } : yloDesc))
    }
    // console.log('updatedDescObject', Object.values(updatedDescObject))
    // console.log('descriptionArray', descriptionArray)
    setDescriptionArray(Object.values(updatedDescObject))
  }

  const handleCreateYLO = () => {
    const checkDesc = descriptionArray?.find(d => d.ylo_description !== '')
    console.log('checkDesc', checkDesc)
    if (checkDesc && yloYear) {
      const removeEmptyStringArray = descriptionArray
        ?.filter(d => d.ylo_description !== '')
        .map(onlyString => onlyString.ylo_description)
      console.log('removeEmptyStringArray', removeEmptyStringArray)
      axios
        .post(URL_YLO, { ylo_year: yloYear, ylo_description: removeEmptyStringArray })
        .then(res => {
          if (res.data) {
            console.log(res.data)
            refetchYLOs
            handleClose()
          }
        })
        .catch(err => console.log('err from create YLO', err))
    } else {
      alert('Please fill description of at least one')
    }
  }

  const handleOpenDescEdit = desc => {
    setDescriptionSelected(desc.ylo_description)
    setDescId(desc.ylo_des_id)
    setOpenDescEdit(true)
  }
  const handleOpenAddDesc = () => {
    setDescriptionSelected('')
    setDescId(0)
    setOpenAddDescription(true)
  }

  const updateYloDescriptionLocal = (userObject, yloDesId, newValue, setState) => {
    const updatedUserObject = {
      ...userObject,
      ylo_description: userObject.ylo_description.map(yloDesc =>
        yloDesc.ylo_des_id === yloDesId ? { ...yloDesc, ylo_description: newValue } : yloDesc
      )
    }
    setState(updatedUserObject)
  }

  const handleUpdateDesc = async descId => {
    if (!descId) return

    await axios
      .put(URL_YLO_DESC + descId, { ylo_id: yloState.ylo_id, ylo_description: descriptionSelected })
      .then(res => {
        if (res.data) {
          // console.log(res.data)
          updateYloDescriptionLocal(yloState, descId, descriptionSelected, setYloState)
          setOpenDescEdit(false)
          refetchYLOs()
        }
      })
      .catch(err => alert('err', err))
  }

  const handleRemovePLORelated = ylo_plo_id => {
    console.log('ylo_plo_id', ylo_plo_id)
    axios
      .delete(`${URL_YLO_PLO_RELATED}?ylo_plo_id=${ylo_plo_id}`)
      .then(res => {
        if (res.data) {
          console.log(res.data)
          refetchYLOs()
          setTimeout(() => {
            handleUpdateYloSelect(yloState)
          }, 500)
        }
      })
      .catch(err => console.log('err from remove plo related', err))
  }

  const handleAddDesc = async () => {
    await axios
      .post(URL_YLO_DESC, { ylo_id: yloState.ylo_id, ylo_description: descriptionSelected })
      .then(res => {
        if (res.data) {
          console.log(res.data)
          const updatedUserObject = {
            ...yloState,
            ylo_description: [...yloState.ylo_description, { ...res.data.data }]
          }

          // console.log(updatedUserObject)
          setYloState(updatedUserObject)
          setOpenAddDescription(false)
          refetchYLOs()
        }
      })
      .catch(err => alert('err', err))
  }

  const handleRemoveDesc = async descId => {
    if (!descId) return
    console.log('api endpoint', URL_YLO_DESC + descId)
    await axios
      .delete(URL_YLO_DESC + descId)
      .then(res => {
        if (res.data) {
          console.log(res.data)
          const filterData = yloState?.ylo_description?.filter(d => d.ylo_des_id !== descId)
          // console.log(updatedUserObject)
          const updatedUserObject = {
            ...yloState,
            ylo_description: [...filterData, { ...res.data.data }]
          }
          setYloState(updatedUserObject)
          refetchYLOs()
        }
      })
      .catch(err => alert('err', err))
  }

  const columns = [
    { field: 'plo_title', headerName: 'Title', width: 100 },
    { field: 'plo_desc', headerName: 'Desc', width: 400 },
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

  const PLOcolumns = [
    { field: 'plo_name', headerName: 'Title', width: 100 },
    { field: 'plo_description', headerName: 'Desc', width: 400 },
    {
      field: 'delete',
      headerName: '',
      width: 130,
      renderCell: params => (
        <Button
          onClick={() => handleRemovePLORelated(params.row.ylo_plos.ylo_plo_id)}
          color='error'
          variant='outlined'
          fullWidth
        >
          Remove
        </Button>
      )
    }
  ]

  // const rows = [
  //   { id: 1, plo_title: 'PLO1', plo_desc: 'มีความรู้ ความเข้าใจในหลักการและทฤษฎีที่สำคัญของวิศวกรรมซอฟแวร์' },
  //   {
  //     id: 2,
  //     plo_title: 'PLO2',
  //     plo_desc:
  //       'มีความรู้พื้นฐานของกระบวนการวิเคราะห์ระบบงาน การออกแบบ พัฒนา และการใช้งานซอฟต์แวร์ โดยคำนึงถึงสถาปัตยกรรมที่เหมาะสม'
  //   },
  //   { id: 3, plo_title: 'PLO3', plo_desc: 'มีความสามารถพัฒนาซอฟต์แวร์ในงานอุตสาหกรรม' }
  //   // Add more dummy data as needed
  // ]

  const DisplayCreateForm = (
    <Grid container spacing={6}>
      <Grid item xs={12} container spacing={2} sx={{ minHeight: 200 }}>
        <Grid item xs={3}>
          <TextField
            value={yloYear}
            onChange={e => setYloYear(e.target.value)}
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
          <Grid key={index} item xs={12}>
            <TextField
              value={d.ylo_description}
              multiline={true}
              onChange={e => handleChangeDesc(e.target.value, index)}
              size={'small'}
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Typography variant='body2'>Description :</Typography>
                  </InputAdornment>
                ),
                style: { fontSize: 15 }
              }}
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={4}>
          <Button onClick={handleAddDescription} variant='outlined' fullWidth>
            + Description
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button onClick={handleCreateYLO} variant='contained' fullWidth>
            Create YLO
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

  const DisplayEditYloPLOs = (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
      <Box sx={{ width: { xs: '100%', lg: '60%' }, p: 2 }}>
        <Typography variant='body2' sx={{ mb: 4 }}>
          YLO
        </Typography>
        <Box sx={{ my: 2 }}>
          <TextField
            disabled
            value={yloState?.ylo_year}
            // onChange={e => setYloState(pre => ({ ...pre, ylo_year: e.target.value }))}
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

        {descriptionArray?.map((ylo, index) => (
          <Grid item xs={12} container key={index} spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={10}>
              <YloTextField
                disabled={true}
                value={ylo.ylo_description}
                label={'Description :'}
                multiline={true}
                onChange={e => handleChangeDesc(e.target.value, index)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() => handleOpenDescEdit(ylo)}
                variant='contained'
                color={'secondary'}
                fullWidth
                sx={{ height: '42%', mb: 1.5 }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleRemoveDesc(ylo.ylo_des_id)}
                variant='contained'
                color={'error'}
                fullWidth
                sx={{ height: '42%' }}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button onClick={handleOpenAddDesc} sx={{ mr: 2 }} variant='outlined' fullWidth>
            + Description
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body2'>PLO Relation</Typography>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              sx={{ my: 2 }}
              getRowId={param => param.plo_id}
              rows={yloPLO || []}
              columns={PLOcolumns}
              pageSize={5}
              disableRowSelectionOnClick
              hideFooter
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Autocomplete
              // value={searchSubject || []}
              size='small'
              disablePortal
              fullWidth
              freeSolo
              options={PLOsData.filter(plo => !yloPLO?.find(y => y.plo_id === plo.plo_id))}
              getOptionLabel={option => option.plo_name || ''}
              renderInput={params => <TextField {...params} label='+Add PLO Relation' />}
              onChange={(e, value) => {
                if (value !== null) {
                  console.log(value)
                  let result = window.confirm('ต้องการเพิ่ม ' + value.plo_name + 'ใน YLO' + yloState.ylo_year)
                  if (result) {
                    axios
                      .post(URL_YLO_PLO_RELATED, { ylo_id: yloState.ylo_id, plo_id: value.plo_id })
                      .then(res => {
                        if (res.data) {
                          console.log(res.data)
                          setTimeout(() => {
                            handleUpdateYloSelect(yloState)
                          }, 500)
                        }
                      })
                      .catch(err => console.log('err from add plo in ylo', err))
                  }
                } else {
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )

  useEffect(() => {
    if (open) {
      setDisplayController(displayType)
      setYloState(YloSelected)
      setFakeLoading(true)
    } else {
      setTimeout(() => {
        setYloState([])
        setDescriptionArray([])
      }, 100)
    }
  }, [open, YloSelected])

  useEffect(() => {
    if (YloSelected) {
      setYloState(YloSelected)
    }
  }, [YloSelected])

  useEffect(() => {
    if (yloState) {
      const filteredPlos = yloState?.plos?.filter(plo => plo.ylo_plos !== null)
      console.log('yloState', yloState)
      // Create an object to store the first item for each unique plo_id
      const firstItems = {}

      // Iterate through the filteredPlos and store the first item for each plo_id
      filteredPlos?.forEach(plo => {
        if (!firstItems[plo.plo_id]) {
          firstItems[plo.plo_id] = plo
        }
      })

      // Convert the object values back to an array
      const resultArray = Object.values(firstItems)
      setYloPLO(resultArray)
    } else {
      setYloPLO([])
    }
  }, [yloState])

  useEffect(() => {
    console.log('yloPLO', yloPLO)
  }, [yloPLO])

  useEffect(() => {
    if (fakeLoading === true)
      setTimeout(() => {
        setFakeLoading(false)
      }, 200)
  }, [fakeLoading])

  useEffect(() => {
    if (!yloState) {
      return
    }
    if (displayController === 0) {
      setDescriptionArray(initialDesc)
    } else if (displayController === 1) {
      var descArray = []
      yloState?.ylo_description?.map(ylo => descArray.push(ylo))
      setDescriptionArray(descArray)
    }
  }, [yloState, displayController])

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          handleClose()
          setTimeout(() => {
            setDescriptionArray([])
          }, 200)
        }}
        maxWidth={displayController === 0 ? 'md' : 'xl'}
        fullWidth
      >
        <DialogTitle sx={{ background: grey[100], mb: 3 }}>
          {displayController === 0 && 'YLO Create Form'}
          {displayController === 1 && 'YLO Edit Form'}
        </DialogTitle>
        {fakeLoading ? (
          <DialogContent
            sx={{
              minHeight: 600
            }}
          >
            <Box sx={{ m: 60, overflow: 'hidden' }}>
              <CircleLoading />
            </Box>
          </DialogContent>
        ) : (
          <DialogContent sx={{ minHeight: 600 }}>
            {displayController === 0 && DisplayCreateForm}
            {displayController === 1 && DisplayEditYloPLOs}
          </DialogContent>
        )}

        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              setTimeout(() => {
                setDescriptionArray([])
              }, 200)
            }}
            color='secondary'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDescEdit}
        onClose={() => {
          setOpenDescEdit(false)
          setDescriptionSelected('')
          setDescId(0)
        }}
        maxWidth={'sm'}
        fullWidth
      >
        <DialogContent sx={{ minHeight: 250 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body2'>YLO Description Edit Form</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={'small'}
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Typography variant='body2'>Description</Typography>
                    </InputAdornment>
                  ),
                  style: { fontSize: 14 }
                }}
                value={descriptionSelected}
                multiline={true}
                onChange={e => setDescriptionSelected(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => handleUpdateDesc(descId)} variant='contained' fullWidth>
                Update Description
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setOpenDescEdit(false)
                  setDescriptionSelected('')
                  setDescId(0)
                }}
                variant='outlined'
                color={'secondary'}
                fullWidth
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAddDescription}
        onClose={() => {
          setOpenAddDescription(false)
          setDescriptionSelected('')
          setDescId(0)
        }}
        maxWidth={'sm'}
        fullWidth
      >
        <DialogContent sx={{ minHeight: 250 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body2'>Add YLO Description Form</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={'small'}
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Typography variant='body2'>Description</Typography>
                    </InputAdornment>
                  ),
                  style: { fontSize: 14 }
                }}
                value={descriptionSelected}
                multiline={true}
                onChange={e => setDescriptionSelected(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => handleAddDesc()} variant='contained' fullWidth>
                Add New Description
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setOpenAddDescription(false)
                  setDescriptionSelected('')
                  setDescId(0)
                }}
                variant='outlined'
                color={'secondary'}
                fullWidth
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default YloDialogMangement
