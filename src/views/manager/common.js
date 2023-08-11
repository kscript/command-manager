import { useStorage } from '@vueuse/core'

export const manifest = useStorage(
  'manifest',
  {},
  localStorage,
  { mergeDefaults: true }
)

const download = (content) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([content]))
  link.download = 'manifest.json'
  link.click()
}

export const handleDownload = () => {
  download(JSON.stringify(manifest.value, null, 2))
}
