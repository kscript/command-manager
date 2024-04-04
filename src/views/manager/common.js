import { reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import { ElMessage, ElMessageBox } from 'element-plus'

import api from '@/api'
import { downloadFile } from '@/utils'

const state = reactive({
  import: false,
  export: false
})

export const manifest = useStorage(
  'manifest',
  {},
  localStorage,
  { mergeDefaults: true }
)

export const handleImportBefore = (event) => {
  if (!state.import) {
    ElMessageBox.confirm('导入配置后, 将会覆盖当前配置, 是否确认?', {
      title: '确认导入配置',
      type: 'warning'
    }).then(() => {
      state.import = true
      event.target.click()
    }).catch(console.log)
    event.stopPropagation()
  }
}
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

export const handleExportBefore = (event) => {
  if (!state.export) {
    manifest.value.path && ElMessageBox.confirm(`是否要导出配置到 ${manifest.value.path}`, {
      title: '确认导出配置',
      type: 'warning'
    }).then(() => {
      state.export = true
      handleExport()
    }).catch(console.log)
  } else {
    handleExport()
  }
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
