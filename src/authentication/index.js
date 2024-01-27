import axios from 'axios'
import Cookies from 'js-cookie'
import { url } from 'src/configs/urlConfig'

const api = axios.create({
  baseURL: url.BASE_URL
  //   withCredentials: true // Include credentials (cookies) with cross-origin requests
})

export const isCookieExpired = () => {
  const cookie = Cookies.get('token')

  if (!cookie) {
    // Cookie not found
    // console.log(`Cookie 'token' not found.`)
    return true
  }

  const expirationDate = new Date(cookie.expires)
  const currentDate = new Date()

  // Log the expiration date for debugging purposes
  // console.log(`Cookie 'token' expiration date: ${expirationDate}`)

  // Compare the expiration date with the current date
  return expirationDate < currentDate
}
export const handleCheckLogin = async req => {
  if (req && !req?.headers?.cookie) return false

  const cookies = req ? req?.headers?.cookie : document.cookie
  const tokenCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('token='))

  if (!tokenCookie) return false

  const token = tokenCookie.replace('token=', '').trim()

  try {
    const response = await api.get('/check-login', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // console.log('check-login', response)
    return true
    // Handle the response as needed, e.g., redirect or update state
  } catch (error) {
    console.error(error)
    return false
    // router.push('/pages/login/')
    // Handle the error, e.g., display an error message
  }
}

export const handleLogout = async () => {
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
    Cookies.remove('role')
    return true

    // Handle the response as needed, e.g., redirect or update state
  } catch (error) {
    console.error('Logout error', error)
    return alert('Can not logout Err' + error)
    // Handle the error, e.g., display an error message
  }
}

export const handleGetUser = async req => {
  if (req && !req?.headers?.cookie) return false

  const cookies = req ? req?.headers?.cookie : document.cookie
  const tokenCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('token='))

  if (!tokenCookie) return false

  const token = tokenCookie.replace('token=', '').trim()

  try {
    const response = await api.get('get-user-data', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userData = response.data.data
    return userData
  } catch (error) {
    console.error('Get user error', error)
    return null
    // Handle the error, e.g., display an error message
  }
}

export const handleGetRole = () => {
  const role = Cookies.get('role')
  return role
}

// export const checkTokenAndRedirect = router => {
//   const token = Cookies.get('token')
//   console.log('token', token)
//   if (!token) {
//     router.push('/pages/login')
//   }
// }
