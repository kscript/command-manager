<template>
  <el-form :model="form" label-width="140px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="脚本名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="脚本路径" prop="path">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="端口" prop="port">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="关键词(逗号分割)" prop="keywords">
          <el-input v-model="form.keywords"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="node版本" prop="nodeVersion">
          <el-input v-model="form.nodeVersion"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="自动运行" prop="autoRun">
          <el-switch
            v-model="form.autoRun"
            active-text="开启"
            inactive-text="关闭"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="命令组(换行符分割)" prop="commands">
      <el-input v-model="form.commands" type="textarea" :rows="5"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onConfirm">{{ row.uuid ? '修改' : '添加' }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { v4 as uuid } from 'uuid'
import { ref, defineEmits, defineProps } from 'vue'
import { useStorage } from '@vueuse/core'

const emit = defineEmits(['back'])

const props = defineProps({
  row: {
    type: Object,
    default: () => ({})
  }
})
const config = useStorage(
  'package',
  {},
  localStorage,
  { mergeDefaults: true }
)
const tableData = useStorage(
  'scripts',
  [],
  localStorage,
  { mergeDefaults: true }
)
const defaultRef = () => ({
  form: Object.assign({
    name: '',
    path: '',
    port: '',
    nodeVersion: '',
    keywords: '',
    commands: '',
    autoRun: false
  }, props.row.uuid ? props.row : {})
})
const form = ref(defaultRef().form)
const onConfirm = () => {
  if (props.row.uuid) {
    tableData.value = tableData.value.map((item) => {
      return item.uuid === props.row.uuid ? Object.assign({}, item, form.value) : item
    })
  } else {
    tableData.value = tableData.value.concat(Object.assign({}, form.value, {
      uuid: uuid()
    }))
    form.value = defaultRef().form
  }
  config.value = Object.assign({}, config.value, {
    scripts: tableData.value
  })
  setTimeout(() => {
    emit('back')
  }, 50000)
}
</script>
