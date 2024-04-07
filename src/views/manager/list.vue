<template>
  <el-table :data="tableData" @row-dblclick="row => handleRow('managerEdit', row)" border>
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="name" label="名称" width="120" />
    <el-table-column prop="port" label="端口">
      <template #default="{ row }">
        <template v-for="(port, index) in row.port.split(',')">
          <el-button v-if="port" :key="index" type="primary" size="small" @click="toPortLink(row, port)" plain>
            {{ port }}
          </el-button>
        </template>
      </template>
    </el-table-column>
    <el-table-column prop="nodeVersion" label="node版本" width="90" />
    <el-table-column prop="terminal" label="终端" width="64" />
    <el-table-column prop="path" label="脚本路径" />
    <el-table-column prop="keywords" label="关键词" />
    <el-table-column prop="desc" label="备注" />
    <el-table-column prop="handle" label="操作" width="400">
      <template #default="{ row, $index }">
        <el-button size="small" @click="handleOpen(row)">打开路径</el-button>
        <el-button type="danger" size="small" @click="handleExec(row)">执行</el-button>
        <el-button type="info" size="small" @click="handleStop(row)">停止</el-button>
        <el-button type="success" size="small" @click="handleRow('managerEdit', row)">修改</el-button>
        <el-button type="primary" size="small" @click="handleRow('managerCopy', row)">复制</el-button>
        <el-button type="warning" size="small" @click="handleDelete(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { manifest } from './common'
import router from '@/router'
import { ElMessageBox } from 'element-plus'
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
const handleExec = (row) => {
  api.exec(row)
}
const handleStop = (row) => {
  api.stop(row)
}
const handleDelete = (row, $index) => {
  ElMessageBox.confirm(`是否删除 ${row.name} 命令？`, {
    title: '删除确认',
    type: 'warning'
  }).then(() => {
    tableData.value.splice($index)
  }).catch(console.log)
}
const toPortLink = (row, port) => {
  window.open(`http://localhost:${port}`)
}
const tableData = ref(manifest.value.commands)
</script>
<style scoped>
.el-space {
  margin-top: 20px;
}
</style>
