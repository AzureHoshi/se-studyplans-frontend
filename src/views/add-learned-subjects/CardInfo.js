// React import
import React, { useState, useEffect } from 'react'

// Mui components import URL: https://material-ui.com/
import { Box, Button, Card, CardContent, Container, Divider, Grid, IconButton, Hidden, Typography } from '@mui/material'

// Mui components import URL: https://mui.com/material-ui/react-list/
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'

// Icon import URL: https://materialdesignicons.com/
import SelectAll from 'mdi-material-ui/SelectAll'
import BookOpenBlankVariant from 'mdi-material-ui/BookOpenBlankVariant'
import FileTreeOutline from 'mdi-material-ui/FileTreeOutline'
import FolderOpenOutline from 'mdi-material-ui/FolderOpenOutline'

const CardInfo = ({ setSwitchContent }) => {
  return (
    <main>
      <nav>
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
                <ListItem key={index} onClick={() => setSwitchContent(0)}>
                  <ListItemButton sx={{ borderRadius: '7px' }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider />
          <Box>
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant='h6' fontSize='16px'>
                Academic Year
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <List>
              {[
                { icon: <FolderOpenOutline />, name: '1/2023' },
                { icon: <FolderOpenOutline />, name: '2/2023' }
              ].map((item, index) => (
                <ListItem key={index} onClick={() => setSwitchContent(1)}>
                  <ListItemButton sx={{ borderRadius: '7px' }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </nav>
    </main>
  )
}

export default CardInfo
