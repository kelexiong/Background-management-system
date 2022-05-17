import { v4 as uuidv4 } from 'uuid'
// export default getUuid()
export const getUuidToken = () => {
  let token = localStorage.getItem('uuid_token')
  if (!token) {
    token = uuidv4()
    localStorage.setItem('uuid_token', token)
  }
  return token
}
