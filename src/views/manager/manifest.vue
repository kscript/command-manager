<template>
  <el-container>
    <el-main style="--el-main-padding: 0px 20px;">
      <el-form :model="form" label-width="120px">
        <el-form-item v-for="item in baseForm" :key="item.prop" :label="item.prop">
          <el-input v-model="form[item.prop]">
            <template #append>
              <el-button @click="handleRemove(item)" icon>
                <el-icon>
                  <Minus />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleAddDialog">新增配置</el-button>
          <el-button type="primary" @click="handleSave">暂存配置</el-button>
          <span style="padding-right: 50px;"></span>
          <el-upload class="el-button el-button--text" :before-upload="handleImport" :show-file-list="false">
            <template #trigger>
              <el-button type="warning" @click="handleImportBefore">
                <span class="text--white">
                  导入配置
                </span>
              </el-button>
            </template>
          </el-upload>
          <el-button type="danger" @click="handleExportBefore">导出配置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-aside width="300px"></el-aside>
    <el-dialog width="450px" v-model="addDialogVisible">
      <template #header>新增配置</template>
      <el-form :model="baseForm">
        <el-form-item>
          <el-input placeholder="属性名" v-model="property"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="属性值" v-model="value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="类型" v-model="type">
            <el-option v-for="item in types" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, watch, ref } from 'vue'
import { manifest, handleImport, handleExport } from './common'
const type = ref('String')
const types = ref(['String', 'Number', 'Boolean'])
const property = ref('')
const value = ref('')
const addDialogVisible = ref(false)
const propertys = reactive({})
const form = reactive({})
const baseForm = reactive({})
const state = reactive({
  import: false,
  export: false
})
const handleImportBefore = (event) => {
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
const handleExportBefore = (event) => {
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
const handleAddDialog = () => {
  addDialogVisible.value = true
}
const handleAdd = () => {
  if (['commands'].includes(property.value)) {
    ElMessage.error(`不能添加属性${property.value}`)
    return
  }
  if (!property.value) {
    ElMessage.error('不能添加空属性')
    return
  }
  propertys[property.value] = { Boolean, String, Number }[type.value](value.value)
  property.value = value.value = ''
  addDialogVisible.value = false
  ElMessage.success('添加成功')
}
const handleSave = () => {
  manifest.value = Object.assign({}, manifest.value, form)
}
const handleRemove = (item) => {
  if (item.prop === 'path') {
    ElMessage.error('不能删除path属性')
    return
  }
  ElMessageBox.confirm(`是否删除属性${item.prop}`).then(() => {
    delete baseForm[item.prop]
    delete propertys[item.prop]
  }).catch(console.log)
}

watch(() => [manifest.value, property.value], () => {
  const data = Object.assign({}, propertys, manifest.value)
  Object.keys(data).forEach(key => {
    if (!(data[key] instanceof Object)) {
      const value = data[key]
      form[key] = value
      baseForm[key] = { prop: key, value, type: typeof value }
    }
  })
  data.path = data.path || ''
}, {
  immediate: true
})
</script>

<style lang="scss" scoped>
.el-form-item {

  .el-select,
  :deep(.el-input, .el-select) {
    width: 100%;
  }
}

.text--white {
  color: #fff;

  &:hover {
    color: #fff;
  }
}
</style>
