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

const CardInfo = ({ setSwitchContent, setFilterState, closeDrawer, setCurrentTerm, currentTerm }) => {
  const [menuSubjectCursor, setMenuSubjectCursor] = useState(1)
  const [menuSemesterCursor, setMenuSemesterCursor] = useState(0)
  const [termLabel, setTermLabel] = useState([
    { i: 1, year: 1, semester: 1, label: '' },
    { i: 2, year: 1, semester: 2, label: '' },
    { i: 3, year: 2, semester: 1, label: '' },
    { i: 4, year: 2, semester: 2, label: '' },
    { i: 5, year: 3, semester: 1, label: '' },
    { i: 6, year: 3, semester: 2, label: '' },
    { i: 7, year: 4, semester: 1, label: '' },
    { i: 8, year: 4, semester: 2, label: '' }
  ])
  const [summerLabel, setSummerLabel] = useState([
    { i: 1, year: 1, semester: 3, label: '' },
    { i: 2, year: 2, semester: 3, label: '' },
    { i: 3, year: 3, semester: 3, label: '' },
    { i: 4, year: 4, semester: 3, label: '' }
  ])

  const handleChangeFilter = type => {
    setFilterState(type)
    closeDrawer()
  }

  const handleChangeTerm = term => {
    setCurrentTerm(term)
  }

  useLayoutEffect(() => {
    if (!userProfile) return
    const createTermLabel = termLabel.map(pre => {
      const yearFromStdNo = '25' + (parseInt(userProfile.std_no.substring(0, 2)) + (pre.year - 1)).toString()
      return {
        ...pre,
        label: String(pre.semester + '/' + yearFromStdNo)
      }
    })
    const createSummerLabel = summerLabel.map(pre => {
      const yearFromStdNo = '25' + (parseInt(userProfile.std_no.substring(0, 2)) + (pre.year - 1)).toString()
      return {
        ...pre,
        label: String(pre.semester + '/' + yearFromStdNo)
      }
    })
    setTermLabel(createTermLabel)
    setSummerLabel(createSummerLabel)
  }, [userProfile])

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
              // label={'แผนการศึกษา'}
              // disabled={true}
              selectionValue={currentTerm || 0}
              defaultValue={0}
              handleChange={e => {
                // setPlanSelected(e.target.value)
                setSwitchContent(1)
                setMenuSubjectCursor(0)
                setMenuSemesterCursor(0)
                handleChangeTerm(e.target.value)
              }}
              Items={termLabel?.map((item, index) => (
                <MenuItem key={index} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            />
          </Box>
          <Typography variant='body2' sx={{ mt: 3 }}>
            Summer
          </Typography>
        </Box>
        <List sx={{ mt: -10 }}>
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
        </List>
      </Box>
    </Box>
  )
}

export default CardInfo
