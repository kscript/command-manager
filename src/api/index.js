import { fetchApi } from '@/utils'
export default {
  export (data) {
    return fetchApi('export', 'post', data)
  },
  open (data) {
    return fetchApi('open', 'post', data)
  }
}
