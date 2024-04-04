import { useStorage } from '@vueuse/core'
import { ElMessage } from 'element-plus'

import api from '@/api'
import { downloadFile } from '@/utils'

export const manifest = useStorage(
  'manifest',
  {},
  localStorage,
  { mergeDefaults: true }
)

export const handleImport = async (file) => {
  try {
    const data = await file.text()
    // eslint-disable-next-line
    manifest.value = eval('(' + data + ')')
  } catch (err) {
    console.warn(err)
  }
  return false
}

export const handleExport = () => {
  api.export(manifest.value).then(() => {
    ElMessage.success('导出成功')
  })
    .catch(() => {
      downloadFile(JSON.stringify(manifest.value, null, 2))
    })
}

export const handleOutput = () => {
  console.log(manifest.value)
}
