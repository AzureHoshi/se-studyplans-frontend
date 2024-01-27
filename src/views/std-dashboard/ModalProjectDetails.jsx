import { Box, Button, Dialog, DialogActions, DialogContent, Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from 'src/configs/urlConfig'

function ModalProjectDetails({ open, handleClose, projectId }) {
  const [projectDetails, setProjectDetails] = useState({
    PreprojectData: [],
    PreprojectSubAdviser: [],
    PreprojectStudent: [],
    PreprojectCommittee: [],
    Projectpotential: []
  })
  useEffect(() => {
    if (open) {
      axios
        .get(url.COLLAB_URL.project + '/project?project_id=' + projectId)
        .then(res => {
          setProjectDetails(res.data)
        })
        .catch(err => console.log('err from feching project data', err))
    }
  }, [projectId, open])

  return (
    <Dialog open={open} onClose={() => handleClose()} maxWidth={'lg'} fullWidth>
      <DialogContent sx={{ minHeight: 450 }}>
        <Typography variant='h6' sx={{ mt: 2.5, ml: 2.5, mb: 2.5 }}>
          Project Details
        </Typography>
        <DialogContent sx={{ display: 'flex', background: grey[100] }}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold', width: 155 }}>
                  รหัสโครงงาน :
                </Typography>
                <Typography variant='body2' sx={{ ml: 2 }}>
                  {projectDetails?.PreprojectData[0]?.project_code}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold', width: 155 }}>
                  ชื่อโครงงานภาษาไทย :
                </Typography>
                <Typography variant='body2' sx={{ ml: 2 }}>
                  {projectDetails?.PreprojectData[0]?.project_name_th}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold', width: 155 }}>
                  ชื่อโครงงานภาษาอังกฤษ :
                </Typography>
                <Typography variant='body2' sx={{ ml: 2 }}>
                  {projectDetails?.PreprojectData[0]?.project_name_eng}
                </Typography>
              </Box>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold', width: 155 }}>
                  วัน/เดือน/ปี ที่จัดทำ :
                </Typography>
                <Typography variant='body2' sx={{ ml: 2 }}>
                  {new Date(projectDetails?.PreprojectData[0]?.created_date_time).toLocaleString()}
                </Typography>
              </Box>

              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold', width: 155 }}>
                  อาจารย์ที่ปรึกษา :
                </Typography>
                <Typography variant='body2' sx={{ ml: 2 }}>
                  {projectDetails?.PreprojectData[0]?.status +
                    ' ' +
                    projectDetails?.PreprojectData[0]?.first_name +
                    ' ' +
                    projectDetails?.PreprojectData[0]?.last_name}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold', minHeight: 100, width: 155 }}>
                  รายชื่อนักศึกษา
                </Typography>
                <Box sx={{ ml: 2 }}>
                  {projectDetails?.PreprojectStudent?.map(std => (
                    <Typography key={std.student_id} variant='body2'>
                      {std.prefix + ' ' + std.first_name + ' ' + std.last_name + ' ' + std.id_rmutl}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 'bold', width: 155 }}>
                รายวิชาที่เกี่ยวข้อง :
              </Typography>
              {projectDetails?.Projectpotential?.map(s => (
                <Typography key={s.poten_id} variant='body2'>
                  {s.subject_code + ' ' + s.subject_name_th + '(' + s.subject_name_en + ')'}
                </Typography>
              ))}
              <Divider />
            </Grid>
          </Grid>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalProjectDetails
