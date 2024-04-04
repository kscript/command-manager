import { fetchApi } from '@/utils'
export default {
  export (data) {
    return fetchApi('export', 'post', data)
  },
  open (data) {
    return fetchApi('open', 'post', data)
  },
  exec (data) {
    return fetchApi('exec', 'post', data)
  },
  stop (data) {
    return fetchApi('stop', 'post', data)
  }
}
