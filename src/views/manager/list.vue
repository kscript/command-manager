<template>
  <el-table :data="tableData">
    <el-table-column type="index" label="序号" width="64" />
    <el-table-column prop="name" label="脚本名称" />
    <el-table-column prop="path" label="脚本路径" />
    <el-table-column prop="port" label="端口" />
    <el-table-column prop="keywords" label="关键词" />
    <el-table-column prop="nodeVersion" label="node版本" />
    <el-table-column prop="terminal" label="终端" />
    <el-table-column prop="desc" label="备注" />
    <el-table-column prop="handle" label="操作" width="240">
      <template #default="{ row }">
        <el-button type="info" size="small" @click="emit('open', row)">打开路径</el-button>
        <el-button type="warning" size="small" @click="emit('edit', row)">修改</el-button>
        <el-button type="primary" size="small" @click="emit('copy', row)">复制</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-space>
    <el-button type="info" @click="handleOutput">输出配置</el-button>
    <el-button type="success" @click="handleDownload">导出配置</el-button>
  </el-space>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { handleOutput, handleDownload, manifest } from './common'
const emit = defineEmits(['edit', 'copy', 'open'])
const tableData = ref(manifest.value.commands)
</script>
<style scoped>
.el-space {
  margin-top: 20px;
}
</style>
