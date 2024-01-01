// React import
import React, { useState, useEffect, useLayoutEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import {
  Box,
  Button,
  CardContent,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  MenuItem
} from '@mui/material'

// Icon import URL: https://materialdesignicons.com/
import SelectAll from 'mdi-material-ui/SelectAll'
import BookOpenBlankVariant from 'mdi-material-ui/BookOpenBlankVariant'
import FileTreeOutline from 'mdi-material-ui/FileTreeOutline'
import FolderOpenOutline from 'mdi-material-ui/FolderOpenOutline'
import { grey } from '@mui/material/colors'
import { userProfile } from 'src/dummy'
import { Selection } from 'src/components'

const CardInfo = ({
  setSwitchContent,
  setFilterState,
  closeDrawer,
  setCurrentTerm,
  currentTerm,
  termLabel,
  summerLabel
}) => {
  const [menuSubjectCursor, setMenuSubjectCursor] = useState(1)
  const [menuSemesterCursor, setMenuSemesterCursor] = useState(0)

  const handleChangeFilter = type => {
    setFilterState(type)
    closeDrawer()
  }

  const handleChangeTerm = term => {
    setCurrentTerm(term)
  }

  return (
    <Box>
      <Box sx={{ width: '220px', height: '100vh', borderRight: { xs: 'none', sm: '2px solid #e5eaef' } }}>
        <Box>
          <CardContent>
            <Button variant='contained' fullWidth>
              what is this?
            </Button>
          </CardContent>
        </Box>
        <Box>
          <List>
            {[
              { icon: <SelectAll />, name: 'All Subjects' },
              { icon: <BookOpenBlankVariant />, name: 'General' },
              { icon: <FileTreeOutline />, name: 'Specific' }
            ].map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  setSwitchContent(0)
                  handleChangeFilter(index)
                  setMenuSubjectCursor(index + 1)
                  setMenuSemesterCursor(0)
                }}
              >
                <ListItemButton
                  sx={{ borderRadius: '7px', background: index + 1 === menuSubjectCursor ? grey[100] : null }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box sx={{ m: 6 }}>
          <Typography variant='body2' sx={{ mb: 2.5 }}>
            Academic Year
          </Typography>
          <Box>
            <Selection
              height={40}
              width={'100%'}
              selectionValue={currentTerm || 0}
              defaultValue={0}
              handleChange={e => {
                setSwitchContent(1)
                setMenuSubjectCursor(0)
                setMenuSemesterCursor(0)
                handleChangeTerm(e.target.value)
              }}
              Items={termLabel?.map((item, index) => (
                <MenuItem key={index} value={item.label} onClick={() => setSwitchContent(1)}>
                  {item.label}
                </MenuItem>
              ))}
            />
          </Box>
        </Box>
        <Box sx={{ m: 6 }}>
          <Typography variant='body2'>Summer</Typography>
          <Selection
            height={40}
            width={'100%'}
            selectionValue={currentTerm || 0}
            defaultValue={0}
            handleChange={e => {
              setSwitchContent(1)
              setMenuSubjectCursor(0)
              setMenuSemesterCursor(0)
              handleChangeTerm(e.target.value)
            }}
            Items={summerLabel?.map((item, index) => (
              <MenuItem key={index} value={item.label} onClick={() => setSwitchContent(1)}>
                {item.label}
              </MenuItem>
            ))}
          />
        </Box>

        {/* <List sx={{ mt: -10 }}>
          {summerLabel?.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                setSwitchContent(1)
                setMenuSemesterCursor(index + 1)
                setMenuSubjectCursor(0)
                handleChangeTerm(item.label)
              }}
            >
              <ListItemButton
                sx={{ borderRadius: '7px', background: index + 1 === menuSemesterCursor ? grey[100] : null }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Box>
    </Box>
  )
}

export default CardInfo
