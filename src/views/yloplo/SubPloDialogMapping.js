import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  TablePagination,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { url } from 'src/configs/urlConfig'
import { useFetch } from 'src/hooks'
import Icon from '@mdi/react'
import { mdiSitemapOutline } from '@mdi/js'
import { CircleLoading } from 'src/components'

function SubPloDialogMapping({ PLOsData, open, handleClose }) {
  const [displayController, setDisplayController] = useState(0)
  const [fakeLoading, setFakeLoading] = useState(false)
  const [curriculumSelected, setCurriculumSelected] = useState([])
  const [AllSubPLOs, setAllSubPLOs] = useState([])
  const [SubjectsData, setSubjectsData] = useState([])
  const [page, setPage] = useState(0)
  const URL_GET_CURRICULUM = `${url.BASE_URL}/curriculums/`
  const URL_GET_SUBJECTS = `${url.BASE_URL}/subjects-by-curriculum/`

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

  const {
    error: SubjectsError,
    data: Subjects,
    setData: setSubjects,
    loading: SubjectsLoading,
    reFetch: reFetchSubjects
  } = useFetch(URL_GET_SUBJECTS + curriculumSelected.curriculum_id)

  const handleCurriculumSelect = row => {
    console.log(row)
    setCurriculumSelected(row)
    setTimeout(() => {
      setDisplayController(1)
    }, 500)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    if (PLOsData) {
      const newObjectArray = PLOsData?.flatMap(item =>
        item.sub_plos.map(subPlo => ({
          plo_id: item.plo_id,
          sub_plo_id: item.sub_plo_id,
          plo_name: item.plo_name,
          sub_plo_id: subPlo.sub_plo_id,
          sub_plo_title: subPlo.sub_plo_title,
          sub_plo_description: subPlo.sub_plo_description
          // ... other properties you want to include
        }))
      )
      setAllSubPLOs(newObjectArray)
      console.log('newObjectArray', newObjectArray)
    }
  }, [PLOsData])

  useEffect(() => {
    if (curriculumSelected) {
      setFakeLoading(true)
      reFetchSubjects(URL_GET_SUBJECTS + curriculumSelected.curriculum_id)
    }
  }, [curriculumSelected])

  useEffect(() => {
    if (Subjects) {
      setSubjectsData(Subjects)
    } else {
      setSubjectsData([])
    }
  }, [Subjects])

  useEffect(() => {
    if (fakeLoading === true)
      setTimeout(() => {
        setFakeLoading(false)
      }, 200)
  }, [fakeLoading])

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

  const calculateWidth = subPLOs => {
    const totalSubPLOs = subPLOs.length
    // You can adjust the multiplier as needed based on your preference
    return `${totalSubPLOs * 300 + 60}%` // Example formula: more sub-PLOs -> more width
  }
  const greyColors = [
    '#f7f7f7', // Lighter grey
    '#e5e5e5',
    '#d4d4d4',
    '#c2c2c2',
    '#b0b0b0' // Light grey
  ]

  const DisplaySubPloSubjectMapping = (
    <Grid container spacing={6}>
      <Grid item xs={12} container>
        <Grid container item xs={12} sx={{ pb: 3, pr: 3, pl: 1 }}>
          <Grid item xs={12}>
            <TablePagination
              rowsPerPageOptions={[]}
              component='div'
              size='small'
              count={Subjects.length}
              rowsPerPage={12}
              page={page}
              onPageChange={handleChangePage}
            />
          </Grid>
          <Grid item xs={2.4} />
          <Grid item xs={9.6} sx={{ display: 'flex' }}>
            {PLOsData?.map((PLO, index) => (
              <Typography
                variant='body1'
                sx={{
                  width: calculateWidth(PLO.sub_plos),
                  background: greyColors[index],
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {PLO.plo_name}
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Grid container item xs={12} sx={{ pb: 3, pr: 3, pl: 1 }}>
          <Grid item xs={2.4}>
            <Typography variant='body1'>รายวิชา</Typography>
          </Grid>
          <Grid item xs={9.6} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {AllSubPLOs?.map(subPLO => (
              <Typography variant='body1' sx={{ width: '100%', borderRight: 1, textAlign: 'center' }}>
                {subPLO.sub_plo_title}
              </Typography>
            ))}
          </Grid>
        </Grid>
        {SubjectsData.length > 0 ? (
          SubjectsData?.slice(page * 12, page * 12 + 12).map((s, index) => (
            <Grid key={s.subject_id} item xs={12} container>
              <Grid item xs={2.5}>
                <Typography variant='body2' sx={{ height: 40 }}>
                  {index + 1 + page * 12 + '. ' + s.subject_code + ' ' + s.subject_name_th}
                </Typography>
              </Grid>
              <Grid item xs={9.5} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {AllSubPLOs?.map(subPLO => (
                  <FormControlLabel
                    key={subPLO.sub_plo_id}
                    sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    control={<Checkbox size='small' />}
                  />
                ))}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>ไม่มีข้อมูลรายวิชาในหลักสูตร</Typography>
        )}
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
      fullScreen={displayController === 1 ? true : false}
      fullWidth
    >
      <Hidden lgDown>
        <DialogTitle sx={{ background: grey[100], mb: 3 }}>
          {displayController === 0 && 'Sub PLO Mapping'}
          {displayController === 1 &&
            'Sub PLO Mapping' +
              ' หลักสูตร' +
              ' (' +
              curriculumSelected?.curriculum_name_th +
              ') ' +
              curriculumSelected?.curriculum_year}
        </DialogTitle>
        {displayController === 0 && <DialogContent sx={{ height: 600 }}> {DisplaySelecteCurriculums}</DialogContent>}
        {displayController !== 0 && (fakeLoading || SubjectsLoading) ? (
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
          displayController === 1 && <DialogContent> {DisplaySubPloSubjectMapping}</DialogContent>
        )}

        <DialogActions sx={{}}>
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
      </Hidden>
      <Hidden lgUp>
        <DialogContent>
          <Typography>this page not support small screen</Typography>
        </DialogContent>
      </Hidden>
    </Dialog>
  )
}

export default SubPloDialogMapping
