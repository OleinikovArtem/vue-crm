import { deleteCookie, setCookie } from './cookieService'

export type TOKENS = {
  access_token: string
  refresh_token: string
}

export const login = (tokens: TOKENS) => {
  setCookie('access_token', tokens.access_token, 1)
  setCookie('refresh_token', tokens.refresh_token, 24 * 7)
}

export const logOut = () => {
  deleteCookie('access_token')
  deleteCookie('refresh_token')
}
