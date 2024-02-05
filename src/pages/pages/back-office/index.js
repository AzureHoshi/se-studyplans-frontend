import React, { useState } from 'react'
import { Typography, Grid, Box } from '@mui/material'
import {
  CardContent,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  TextField,
  InputLabel,
  IconButton,
  Button,
  Divider
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Link from 'next/link'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

/////////////Icon///////////////////
import { mdiFolderOpenOutline, mdiAccountCardOutline, mdiFileAccount } from '@mdi/js'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import CardMenu from 'src/components/CardMenu'
import { OnHover, Visible } from 'src/components/Motion'
import { useRouter } from 'next/router'
import { useGlobalContext } from 'src/configs/context'
import { url } from 'src/configs/urlConfig'
import axios from 'axios'
import Cookies from 'js-cookie'

const userInitialState = {
  prefix: '',
  first_name: '',
  last_name: '',
  CollegianCode: '',
  email: '',
  status: '',
  curriculum: '',
  section: '',
  birthDate: '',
  token: ''
}
// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const api = axios.create({
  baseURL: url.BASE_URL
  // withCredentials: true // Include credentials (cookies) with cross-origin requests
})

const BackOffice = () => {
  const router = useRouter()

  // const [values, setValues] = useState({
  //   email: 'admin@example.com',
  //   password: 'password',
  //   showPassword: false
  // })
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const [user, setUser] = useState(userInitialState)
  const [LoginSuccess, setLoginSuccess] = useState(false)
  const { state, setUserData } = useGlobalContext()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = async event => {
    event.preventDefault()
  }

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const response = await api.post('/login', {
        email: values.email,
        password: values.password
      })

      const { token, role } = response.data

      if (role !== 1) return alert('Can not login with student role')

      // console.log('Login successful')
      Cookies.set('token', token.token, { expires: new Date(token.expires_at) })
      Cookies.set('role', role)
      setUser(userInitialState)
      setUser(prevUser => ({
        ...prevUser,
        token: token.token
      }))
      setLoginSuccess(true)
      // Handle the response as needed, e.g., redirect or update state
    } catch (error) {
      console.error(error)
      setUser(userInitialState)
      alert('Invalid Username or Password')
      // Handle the error, e.g., display an error message
    }
  }

  const AdminLogin = (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <img src='/images/logos/logo.png' alt='logo' style={{ width: 140, height: 'auto', marginTop: 16 }} /> */}
            <Typography variant='h4'>Login Admin</Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Email'
              sx={{ marginBottom: 4 }}
              value={values.email || ''}
              onChange={handleChange('email')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <TextField
                label='Password'
                value={values.password || ''}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7, mt: 6 }} onClick={handleLogin}>
              Login
            </Button>

            <Divider sx={{ my: 5 }}>social media</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>

      <FooterIllustrationsV1 />
    </Box>
  )
  const BackOfficeMenu = (
    <Box m={12} mb={20}>
      <Grid container sx={{ mb: 10 }}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant='h5'>BackOffice Menu</Typography>
        </Grid>
      </Grid>

      {/* --------------------------------------Grid ใหญ่------------------------------------------ */}
      <Grid container spacing={8} sx={{ justifyContent: 'center', px: { xs: 0, md: 24 } }}>
        {/* -------------------------------------- Grid ลูกที่ 1---------------------------------------------------- */}

        <Grid item xs={12} lg={4} sx={{ justifyContent: 'center' }}>
          <Visible>
            <OnHover>
              <CardMenu
                handleclick={() => router.push('/pages/masterdata/curriculums')}
                MenuIcon={mdiFolderOpenOutline}
                MenuName={'Master Data'}
              />
            </OnHover>
          </Visible>
        </Grid>

        {/* -------------------------------------- Grid ลูกที่ 2---------------------------------------------------- */}

        <Grid item xs={12} lg={4} sx={{ justifyContent: 'center' }}>
          <Visible>
            <OnHover>
              <CardMenu
                handleclick={() => router.push('/pages/surveys/interestsurveys')}
                MenuIcon={mdiAccountCardOutline}
                MenuName={'Surveys & Forms'}
              />
            </OnHover>
          </Visible>
        </Grid>

        {/* -------------------------------------- Grid ลูกที่ 3---------------------------------------------------- */}

        <Grid item xs={12} lg={4} sx={{ justifyContent: 'center' }}>
          <Visible>
            <OnHover>
              <CardMenu
                handleclick={() => router.push('/pages/job-subjectrelated')}
                MenuIcon={mdiFileAccount}
                MenuName={'Job & Subjects Related'}
              />
            </OnHover>
          </Visible>
        </Grid>
      </Grid>
    </Box>
  )

  return LoginSuccess ? BackOfficeMenu : AdminLogin
}
BackOffice.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default BackOffice
