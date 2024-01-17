// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Cookies
import Cookies from 'js-cookie'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Urls
import { url } from 'src/configs/urlConfig'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const setCookie = (name, value, expires) => {
  document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

const deleteCookie = name => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

const api = axios.create({
  baseURL: url.BASE_URL,
  withCredentials: true // Include credentials (cookies) with cross-origin requests
})

const isCookieExpired = cookieName => {
  const cookie = Cookies.get(cookieName)

  if (!cookie) {
    // Cookie not found
    console.log(`Cookie '${cookieName}' not found.`)
    return true
  }

  const expirationDate = new Date(cookie.expires)
  const currentDate = new Date()

  // Log the expiration date for debugging purposes
  console.log(`Cookie '${cookieName}' expiration date: ${expirationDate}`)

  // Compare the expiration date with the current date
  return expirationDate < currentDate
}

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

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    email: 'user@example.com',
    password: 'password',
    showPassword: false
  })

  const [user, setUser] = useState(userInitialState)

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

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

      const { token } = response.data

      console.log('Login successful')
      Cookies.set('token', token.token, { expires: new Date(token.expires_at) })
      setUser(userInitialState)
      setUser(prevUser => ({
        ...prevUser,
        token: token.token
      }))

      // Handle the response as needed, e.g., redirect or update state
    } catch (error) {
      console.error(error)
      // Handle the error, e.g., display an error message
    }
  }

  const handleCheckLogin = async e => {
    e.preventDefault()
    const token = Cookies.get('token')

    try {
      const response = await api.get('/check-login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('check-login', response)

      // Handle the response as needed, e.g., redirect or update state
    } catch (error) {
      console.error(error)
      // Handle the error, e.g., display an error message
    }
  }

  const handleLogout = async () => {
    const token = Cookies.get('token')

    try {
      const response = await api.post(
        'logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('Logout response', response)
      Cookies.remove('token')
      setUser(userInitialState)
      // Handle the response as needed, e.g., redirect or update state
    } catch (error) {
      console.error('Logout error', error)
      // Handle the error, e.g., display an error message
    }
  }

  const handleGetUser = async () => {
    const token = Cookies.get('token')

    try {
      const response = await api.get('get-user-data', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('Get user response', response)
      console.log('Get user response.data', response.data.data)
      const dateOnly = response.data.data.col_birthday.split('T')[0]
      const formattedDate = dateOnly.substring(0, 10)
      console.log(formattedDate)
      setUser(prevUser => ({
        ...prevUser,
        prefix: response.data.data.prefix,
        first_name: response.data.data.col_first_name,
        last_name: response.data.data.col_last_name,
        CollegianCode: response.data.data.col_code,
        email: response.data.data.col_email,
        status: response.data.data.col_status,
        curriculum: response.data.data.curriculum,
        section: response.data.data.section,
        birthDate: formattedDate
      }))
    } catch (error) {
      console.error('Get user error', error)
      // Handle the error, e.g., display an error message
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Email'
              sx={{ marginBottom: 4 }}
              value={values.email}
              onChange={handleChange('email')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
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
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={handleLogin}>
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
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

      <Card sx={{ m: 5, p: 5 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(2, 9)} !important` }}>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            Token: {user.token}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            login status: {user.status}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            name: {user.prefix} {user.first_name} {user.last_name}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            email: {user.email}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            CollegianCode: {user.CollegianCode}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            curriculum: {user.curriculum}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            section: {user.section}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            birthDate: {user.birthDate}
          </Typography>

          <Button onClick={handleCheckLogin}>check-login</Button>

          <Button onClick={handleLogout}>logout</Button>

          <Button onClick={handleGetUser}>get-user</Button>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
