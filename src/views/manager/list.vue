<template>
  <el-table :data="tableData">
    <el-table-column type="index" label="序号" width="64"/>
    <el-table-column prop="name" label="脚本名称" />
    <el-table-column prop="path" label="脚本路径" />
    <el-table-column prop="port" label="端口" />
    <el-table-column prop="keywords" label="关键词" />
    <el-table-column prop="nodeVersion" label="node版本" />
    <el-table-column prop="handle" label="操作">
      <template #default="{ row }">
        <el-button @click="handleEdit(row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useStorage } from '@vueuse/core'
const emit = defineEmits(['edit'])
const scripts = useStorage(
  'scripts',
  [],
  localStorage,
  { mergeDefaults: true }
)
const tableData = ref(scripts)
const handleEdit = (row) => {
  emit('edit', row)
}
</script>
