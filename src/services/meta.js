import axios from 'axios'

import authHeader from '../helpers/auth-header'

let config = () => {
  let auth = authHeader()
  return {
    headers: auth,
  }
}

const getMetaData = async (link) => {
  let result = await axios.post('/api/meta/', { url: link }, config())
  return result.data
}

export default { getMetaData }
