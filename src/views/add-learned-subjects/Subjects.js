// React import
import React, { useState, useEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Drawer,
  Grid,
  InputBase,
  IconButton,
  Hidden,
  Tooltip,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material'

// Mui components import URL: https://mui.com/material-ui/react-list/
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'

// Mui components import URL: https://mui.com/material-ui/react-list/
import DockLeft from 'mdi-material-ui/DockLeft'
import Magnify from 'mdi-material-ui/Magnify'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import FolderOpenOutline from 'mdi-material-ui/FolderOpenOutline'

import CardInfo from './CardInfo'
import SubjectDetails from './SubjectDetails'

const Subjects = ({ switchContent, setSwitchContent }) => {
  const [open, setOpen] = useState(false)
  const [openSubjectDetails, setOpenSubjectDetails] = useState(false)

  const handleCheckScreen = () => {
    if (window.innerWidth > 600) {
      setOpenSubjectDetails(false)
    } else {
      setOpenSubjectDetails(true)
    }
  }

  return (
    <Box sx={{ height: '100vh', borderRight: { xs: 'none', sm: '2px solid #e5eaef' } }}>
      {switchContent === 0 && (
        <Box sx={{ paddingTop: 4, paddingX: 4, marginBottom: 4, display: 'flex' }}>
          <Hidden lgUp>
            <IconButton onClick={() => setOpen(true)}>
              <DockLeft />
            </IconButton>
            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
              <CardInfo setSwitchContent={setSwitchContent} />
            </Drawer>
          </Hidden>
          <TextField
            variant='outlined'
            placeholder='Search...'
            fullWidth
            size='small'
            sx={{ borderRadius: '7px', backgroundColor: '#e5eaef' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify />
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}{' '}
      {switchContent === 1 && (
        <Box sx={{ paddingTop: 4, paddingX: 4, marginBottom: 4, display: 'flex' }}>
          <Hidden lgUp>
            <IconButton onClick={() => setOpen(true)}>
              <DockLeft />
            </IconButton>
            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
              <CardInfo setSwitchContent={setSwitchContent} />
            </Drawer>
          </Hidden>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' fontSize='16px'>
              1/2023
            </Typography>
            <Typography variant='h6' fontSize='16px'>
              16 Credits
            </Typography>
          </Box>
        </Box>
      )}
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleCheckScreen()}>
              <ListItemText>
                <Grid container>
                  <Grid item xs={1}>
                    <Typography variant='h5' sx={{ marginTop: '20%', fontWeight: 'bold' }}>
                      3
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    sx={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bold', marginBottom: '-5px' }}>
                      Subjects Code
                    </Typography>
                    <Typography variant='caption'>Subjects Name</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Tooltip title='Edit'>
                      <AlertCircleOutline sx={{ fontSize: 20 }} />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant='body2'
                      align='center'
                      sx={{ color: '#ffb93d', backgroundColor: '#fef5e5', borderRadius: 2 }}
                    >
                      General
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Drawer anchor='right' open={openSubjectDetails} onClose={() => setOpenSubjectDetails(false)}>
        <Box sx={{ p: '16px 10px 0px', mb: 5 }}>
          <Button variant='outlined' onClick={() => setOpenSubjectDetails(false)}>
            Back
          </Button>
        </Box>
        <SubjectDetails />
      </Drawer>
    </Box>
  )
}

export default Subjects

{
  /* <List>
<ListItem disablePadding>
  <ListItemButton sx={{ borderRadius: '7px' }}>
    <ListItemIcon>
      <AlertCircleOutline />
    </ListItemIcon>
    <ListItemText primary='No subjects found' />
  </ListItemButton>
</ListItem>
</List> */
}
