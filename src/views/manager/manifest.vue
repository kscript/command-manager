<template>
  <el-container>
    <el-main style="--el-main-padding: 0px 20px;">
      <el-form :model="form" label-width="120px">
        <el-form-item v-for="item in baseForm" :key="item.prop" :label="item.prop">
          <el-input v-model="form[item.prop]">
            <template #append>
              <el-button @click="handleRemove(item)" icon>
                <el-icon><Minus /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">
            <el-upload
              :before-upload="handleImport"
              :show-file-list="false"
            >
              <template #trigger>
                <span class="text--white">
                  导入配置
                </span>
              </template>
            </el-upload>
          </el-button>
          <el-button type="success" @click="handleDownload">导出配置</el-button>
          <el-button type="primary" @click="handleSave">保存配置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-aside width="300px">
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
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-aside>
  </el-container>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, watch, ref } from 'vue'
import { manifest, handleDownload } from './common'
const type = ref('String')
const types = ref(['String', 'Number', 'Boolean'])
const property = ref('')
const value = ref('')
const propertys = reactive({})
const form = reactive({})
const baseForm = reactive({})
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
}
const handleImport = async (file) => {
  try {
    const data = await file.text()
    // eslint-disable-next-line
    manifest.value = eval('(' + data + ')')
  } catch (err) {
    console.warn(err)
  }
  return false
}
const handleSave = () => {
  manifest.value = Object.assign({}, manifest.value, form)
}
const handleRemove = (item) => {
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
}, {
  immediate: true
})
</script>

<style lang="scss" scoped>
.el-form-item {
  .el-select, :deep(.el-input,.el-select) {
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
