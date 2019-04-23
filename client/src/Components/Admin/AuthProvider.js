import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin'

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    // accept all username/password combinations
    if (username === 'admin' && password === 'admin') return Promise.resolve()
    else return Promise.reject()
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    return Promise.resolve()
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params
    if (status === 401 || status === 403) {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      return Promise.reject()
    }
    return Promise.resolve()
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return localStorage.getItem('username')
      ? Promise.resolve()
      : Promise.reject()
  }
  return Promise.reject('Unknown method')
}
