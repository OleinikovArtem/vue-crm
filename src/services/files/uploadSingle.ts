import { getRefreshedAccessToken } from '../authService'

type Response = { file_url: string; message: string }

export const uploadSingle = async (file: File | null) => {
  try {
    if (!file) return
    const token = await getRefreshedAccessToken()

    const data = new FormData()
    data.append('image', file)

    const fileResponse = await fetch('http://localhost:3000/file-upload/single', {
      method: 'post',
      body: data,
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })

    return (await fileResponse.json()) as Response
  } catch (error) {
    console.error('UPLOAD FILE IS FAILED', error)
  }
}
