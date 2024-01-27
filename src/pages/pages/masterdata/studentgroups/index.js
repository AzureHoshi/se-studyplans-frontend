import React from 'react'
import {
  useFetch as UseFetch,
  useSubmit as UseSubmit,
  useUpdate as UseUpdate,
  useDelete as UseDelete,
  useSearchText as UseSearchText
} from 'src/hooks'
import { useMemo, useState } from 'react'

import { Btn, CircleLoading, ConfirmModal, DataGridTable, TextSearch } from 'src/components'
import { Box, Grid, Typography, Button, Select, MenuItem } from '@mui/material'
import Icon from '@mdi/react'

import { mdiPen, mdiAlertRhombus } from '@mdi/js/'

import AddStudentGroupsModal from 'src/views/studentgroups/AddStudentGroupsModal'
import EditStudentGroupModal from 'src/views/studentgroups/EditStudentGroupModal'
import { url } from 'src/configs/urlConfig'

const Studentgroups = () => {
  const [open, setOpen] = useState(false)
  const [editState, setEditState] = useState([])
  const [curriculumIdSelected, setcurriculumIdSelected] = useState(2)

  const URL_GET_STUDENT_GROUPS = `${url.BASE_URL}/collegian-groups`

  const URL_INSERT = `${url.BASE_URL}/collegian-groups/`
  const URL_UPDATE = `${url.BASE_URL}/collegian-groups/${editState.collegian_group_id}`
  const URL_DELETE = `${url.BASE_URL}/collegian-groups/${editState.collegian_group_id}`
  const URL_GET_CURRICULUM = `${url.BASE_URL}/curriculums/`

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleChangeCurriculum = currId => {
    setcurriculumIdSelected(currId)
  }

  const handleClose = setInitialState => {
    setOpen(false)
    setInitialState
  }

  const [openEdit, setOpenEdit] = useState(false)

  const handleClickOpenEdit = value => {
    setEditState(value)
    setOpenEdit(true)
  }

  const handleCloseEdit = setInitialState => {
    setOpenEdit(false)
    setInitialState
  }

  const [openDetails, setOpenDetails] = useState(false)

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true)
  }

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false)
  }

  const {
    error: StudentGroupsError,
    data: STUDENT_GROUPS,
    setData: setSTUDENT_GROUPS,
    loading: StudentGroupsLoading,
    reFetch: reFetchSTUDENT_GROUPS
  } = UseFetch(URL_GET_STUDENT_GROUPS)

  // console.log('stdgrtoup', STUDENT_GROUPS)

  const {
    error: CurriculumError,
    data: Curriculums,
    setData: setCurriculums,
    loading: CurriculumLoading,
    reFetch: reFetchCurriculums
  } = UseFetch(URL_GET_CURRICULUM)

  const columnsStudentGroups = [
    'collegian_group_name_th',
    'collegian_group_name_en',
    'collegian_group_short_name_th',
    'collegian_group_short_name_en'
  ]

  const [STUDENT_GROUPSTemp, setSTUDENT_GROUPSTemp] = useState([])

  const [searchText, setSearchText] = useState('')

  const handleChangeSearch = text => {
    UseSearchText(text, setSTUDENT_GROUPS, setSearchText, STUDENT_GROUPSTemp, columnsStudentGroups)
  }

  useMemo(() => {
    if (!StudentGroupsLoading) {
      setSTUDENT_GROUPSTemp(STUDENT_GROUPS)
    } else {
    }
  }, [StudentGroupsLoading])

  const handleSubmit = submitState => {
    if (submitState.curriculum_id === 0) {
      return alert('Please Select Curriculum')
    }
    UseSubmit(URL_INSERT, submitState, () => setOpen(false), reFetchSTUDENT_GROUPS)
  }

  const handleUpdate = updateState => {
    UseUpdate(URL_UPDATE, updateState, () => setOpenEdit(false), reFetchSTUDENT_GROUPS)
  }

  const handleDelete = () => {
    UseDelete(
      URL_DELETE,
      () => {
        setOpenConfirmDelete(false)
        setOpenEdit(false)
      },
      reFetchSTUDENT_GROUPS
    )
  }

  const loadingState = StudentGroupsLoading
  const errorState = StudentGroupsError

  // if (loadingState) {
  //   return <CircleLoading />
  // }
  if (errorState) {
    return <Box>Error Fetching...</Box>
  }

  const columns = [
    { field: 'collegian_group_name_th', headerName: 'Group Name TH', width: 200 },
    { field: 'collegian_group_name_en', headerName: 'Group Name EN', width: 200 },
    { field: 'collegian_group_short_name_th', headerName: 'Group Short Name TH', width: 200 },
    { field: 'collegian_group_short_name_en', headerName: 'Group Short Name EN', width: 200 },
    { field: 'collegian_group_short_name_en', headerName: 'Group Short Name EN', width: 200 },
    {
      field: 'fn',
      headerName: '',
      width: 200,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item>
            <Button color='secondary' variant='outlined' onClick={() => handleClickOpenEdit(params.row)}>
              <Icon path={mdiPen} size={1} />
            </Button>
          </Grid>
        </Grid>
      )
    }
  ]

  return (
    <Box>
      {/* // header */}
      <Box display={'flex'} flexDirection={'row'}>
        <Typography variant='h6'>Student Groups</Typography>
      </Box>
      <Select
        sx={{ width: 600 }}
        size='small'
        labelId='simple-dropdown-labels'
        id='simple-dropdown'
        value={curriculumIdSelected || 2}
        onChange={e => handleChangeCurriculum(e.target.value)}
      >
        {Curriculums?.sort((a, b) => b.curriculum_id - a.curriculum_id).map((cur, index) => (
          <MenuItem key={cur?.curriculum_id} value={cur?.curriculum_id}>
            {cur?.curriculum_name_th + '(' + cur?.curriculum_year + ')'}
          </MenuItem>
        ))}
      </Select>
      <Grid container spacing={6} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Box display={'flex'} flexDirection={'row'}>
            <TextSearch onChange={e => handleChangeSearch(e.target.value)} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={2}>
          <Btn handleclick={handleClickOpen} label={'+ Add New'} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12} mt={6}>
          <DataGridTable
            rows={STUDENT_GROUPS?.filter(sg => sg.curriculum_id === curriculumIdSelected)}
            columns={columns}
            uniqueKey={'collegian_group_id'}
            isLoading={StudentGroupsLoading === null ? true : StudentGroupsLoading}
          />
        </Grid>
      </Grid>
      <Grid container>
        <AddStudentGroupsModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          Curriculums={Curriculums}
          curriculumIdSelected={curriculumIdSelected}
          setcurriculumIdSelected={setcurriculumIdSelected}
        />
      </Grid>

      <Grid container>
        <EditStudentGroupModal
          state={editState}
          open={openEdit}
          handleClose={handleCloseEdit}
          handleUpdate={handleUpdate}
          openConfirmDelete={handleOpenConfirmDelete}
          Curriculums={Curriculums}
          setcurriculumIdSelected={setcurriculumIdSelected}
        />
      </Grid>

      <Grid container>
        <ConfirmModal
          title={`DELETE Student Groups`}
          text={`Are you sure you want to delete ${editState.collegian_group_name_th}?`}
          displayIcon={mdiAlertRhombus}
          submitLabel={'DELETE'}
          open={openConfirmDelete}
          handleClose={handleCloseConfirmDelete}
          handleSubmit={handleDelete}
          Curriculums={Curriculums}
        />
      </Grid>
    </Box>
  )
}

export default Studentgroups
