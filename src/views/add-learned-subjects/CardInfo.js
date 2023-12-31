// React import
import React, { useState, useEffect } from 'react'

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
  ListItemButton
} from '@mui/material'

// Icon import URL: https://materialdesignicons.com/
import SelectAll from 'mdi-material-ui/SelectAll'
import BookOpenBlankVariant from 'mdi-material-ui/BookOpenBlankVariant'
import FileTreeOutline from 'mdi-material-ui/FileTreeOutline'
import FolderOpenOutline from 'mdi-material-ui/FolderOpenOutline'
import { grey } from '@mui/material/colors'

const CardInfo = ({ setSwitchContent, setFilterState }) => {
  const [menuSubjectCursor, setMenuSubjectCursor] = useState(1)
  const [menuSemesterCursor, setMenuSemesterCursor] = useState(0)

  const handleChangeFilter = type => {
    setFilterState(type)
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
        <Box sx={{ ml: 6, mt: 6, mb: 2 }}>
          <Typography variant='body2'>Academic Year</Typography>
        </Box>
        <Box>
          <List>
            {[
              { icon: <FolderOpenOutline />, name: '1/2023' },
              { icon: <FolderOpenOutline />, name: '2/2023' }
            ].map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  setSwitchContent(1)
                  setMenuSemesterCursor(index + 1)
                  setMenuSubjectCursor(0)
                }}
              >
                <ListItemButton
                  sx={{ borderRadius: '7px', background: index + 1 === menuSemesterCursor ? grey[100] : null }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default CardInfo
