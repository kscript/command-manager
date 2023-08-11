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
        <el-form-item label="终端" prop="terminal">
          <el-select placeholder="选择要使用的终端" v-model="form.terminal">
            <el-option lable="cmd" value="cmd"></el-option>
            <el-option lable="git" value="git"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="默认运行" prop="defaultRun">
          <el-switch
            v-model="form.defaultRun"
            active-text="开启"
            inactive-text="关闭"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="命令组(换行符分割)" prop="commandLines">
      <el-input v-model="form.commandLines" type="textarea" :rows="5"></el-input>
    </el-form-item>
    <el-form-item label="备注说明" prop="desc">
      <el-input v-model="form.desc" type="textarea" :rows="5"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onConfirm">{{ active === 'edit' ? '修改' : '添加' }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { v4 as uuid } from 'uuid'
import { ref, defineEmits, defineProps, watch } from 'vue'
import { manifest } from './common'

const emit = defineEmits(['back'])

const props = defineProps({
  active: {
    type: String
  },
  row: {
    type: Object,
    default: () => ({})
  }
})

const tableData = ref(manifest.value.commands)
const defaultRef = () => ({
  form: Object.assign({
    name: '',
    path: '',
    port: '',
    nodeVersion: '',
    keywords: '',
    commandLines: '',
    desc: '',
    defaultRun: false
  }, props.row.uuid ? props.row : {})
})
const form = ref(defaultRef().form)
const onConfirm = () => {
  if (props.active === 'edit' && props.row.uuid) {
    tableData.value = tableData.value.map((item) => {
      return item.uuid === props.row.uuid ? Object.assign({}, item, form.value) : item
    })
  } else {
    tableData.value = tableData.value.concat(Object.assign({}, form.value, {
      uuid: uuid()
    }))
    form.value = defaultRef().form
  }
  manifest.value = Object.assign({}, manifest.value, {
    commands: tableData.value
  })
  setTimeout(() => {
    emit('back')
  }, 500)
}
watch(() => props.active, () => {
  form.value = defaultRef().form
})
</script>
<style lang="scss" scoped>
.el-form-item {
  .el-select, :deep(.el-input,.el-select) {
    width: 100%;
  }
}
</style>
