import config from '@/config'

export const fetchApi = (url, method, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.baseUrl}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(reject)
  })
}

export const downloadFile = (content) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([content]))
  link.download = 'manifest.json'
  link.click()
}
