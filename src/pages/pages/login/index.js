// ** React Imports
import { useEffect, useState } from 'react'

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
import { handleCheckLogin, handleGetUser } from 'src/authentication'
import { useGlobalContext } from 'src/configs/context'

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

// const setCookie = (name, value, expires) => {
//   document.cookie = `${name}=${value}; expires=${expires}; path=/`
// }

// const deleteCookie = name => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
// }

const api = axios.create({
  baseURL: url.BASE_URL
  // withCredentials: true // Include credentials (cookies) with cross-origin requests
})

const isCookieExpired = cookieName => {
  const cookie = Cookies.get(cookieName)

  if (!cookie) {
    // Cookie not found
    // console.log(`Cookie '${cookieName}' not found.`)
    return true
  }

  const expirationDate = new Date(cookie.expires)
  const currentDate = new Date()

  // Log the expiration date for debugging purposes
  // console.log(`Cookie '${cookieName}' expiration date: ${expirationDate}`)

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
  const [LoginSuccess, setLoginSuccess] = useState(false)
  const { state, setUserData } = useGlobalContext()

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

      const { token, role } = response.data

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

  useEffect(() => {
    const fetchData = async () => {
      if (!LoginSuccess) {
        return
      }

      try {
        const userByToken = await handleGetUser(/* pass your req object here if needed */)
        // console.log('checkUser', userByToken)
        setUserData(userByToken)
        router.push('/pages/front-office/student-systems/interest-survey/')
        // Uncomment the following lines if you want to update the global user data
        // if (userByToken) {
        //   setUserData(userByToken);
        // }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [LoginSuccess])

  // useEffect(() => {
  //   console.log('State', state)
  // }, [state])

  const handleCheckLogin = async e => {
    e.preventDefault()
    const token = Cookies.get('token')

    try {
      const response = await api.get('/check-login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // console.log('check-login', response)
      // router.push('/pages/front-office/student-systems/interest-survey/')

      // Handle the response as needed, e.g., redirect or update state
    } catch (error) {
      console.error(error)
      setUser(userInitialState)
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

      // console.log('Logout response', response)
      Cookies.remove('token')
      setUser(userInitialState)
      // Handle the response as needed, e.g., redirect or update state
    } catch (error) {
      console.error('Logout error', error)
      setUser(userInitialState)
      // Handle the error, e.g., display an error message
    }
  }

  // const handleGetUser = async () => {
  //   const token = Cookies.get('token')

  //   try {
  //     const response = await api.get('get-user-data', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })

  //     console.log('Get user response', response)
  //     console.log('Get user response.data', response.data.data)
  //     const dateOnly = response.data.data.col_birthday.split('T')[0]
  //     const formattedDate = dateOnly.substring(0, 10)
  //     console.log(formattedDate)
  //     setUser(prevUser => ({
  //       ...prevUser,
  //       prefix: response.data.data.prefix,
  //       first_name: response.data.data.col_first_name,
  //       last_name: response.data.data.col_last_name,
  //       CollegianCode: response.data.data.col_code,
  //       email: response.data.data.col_email,
  //       status: response.data.data.col_status,
  //       curriculum: response.data.data.curriculum,
  //       section: response.data.data.section,
  //       birthDate: formattedDate
  //     }))
  //   } catch (error) {
  //     console.error('Get user error', error)
  //     setUser(userInitialState)
  //     // Handle the error, e.g., display an error message
  //   }
  // }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logos/logo.png' alt='logo' style={{ width: 140, height: 'auto', marginTop: 16 }} />
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
            {/* <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box> */}
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

      {/* <Card sx={{ m: 5, p: 5 }}>
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
      </Card> */}
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

// ssr
export async function getServerSideProps(context) {
  const { req } = context

  const checkIsLogin = await handleCheckLogin(req)
  // console.log('checkIsLogin', checkIsLogin)

  if (checkIsLogin) {
    return {
      redirect: {
        destination: '/pages/front-office/student-systems/dashboard/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
export default LoginPage
