<template>
  <el-table :data="tableData" @dblclick="row => handleRow('managerEdit', row)">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="name" label="名称" width="120" />
    <el-table-column prop="port" label="端口" width="120" />
    <el-table-column prop="nodeVersion" label="node版本" width="90" />
    <el-table-column prop="terminal" label="终端" width="64" />
    <el-table-column prop="path" label="脚本路径" />
    <el-table-column prop="keywords" label="关键词" />
    <el-table-column prop="desc" label="备注" />
    <el-table-column prop="handle" label="操作" width="240">
      <template #default="{ row }">
        <el-button type="info" size="small" @click="handleOpen(row)">打开路径</el-button>
        <el-button type="warning" size="small" @click="handleRow('managerEdit', row)">修改</el-button>
        <el-button type="primary" size="small" @click="handleRow('managerCopy', row)">复制</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { manifest } from './common'
import router from '@/router'
const handleRow = (type, row) => {
  router.push({
    name: type,
    query: {
      uuid: row.uuid
    }
  })
}
const handleOpen = (row) => {
  api.open(row)
}
const tableData = ref(manifest.value.commands)
</script>
<style scoped>
.el-space {
  margin-top: 20px;
}
</style>
