<template>
  <el-container>
    <el-aside width="240px">
      <el-row @click="active = 'list'">
        命令列表
      </el-row>
      <el-row @click="active = 'add'">
        新增命令
      </el-row>
    </el-aside>
    <el-main>
      <Add v-if="['add', 'edit'].includes(active)" :row="activeRow" @back="active = 'list'"/>
      <List v-if="active === 'list'" @edit="handleEdit"/>
    </el-main>
    <el-aside width="100px"></el-aside>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import Add from './add'
import List from './list'
const active = ref('list')
const activeRow = ref({})
const handleEdit = (row) => {
  active.value = 'edit'
  activeRow.value = row
}
</script>
<style lang="scss" scoped>
.el-aside {
  padding: 10px;
  &:first-child {
    border-right: 1px solid #eee;
    margin-right: 10px;
  }
  .el-row {
    padding: 10px;
    cursor: pointer;
    transition: all 1s;
    &:hover {
      color: #111;
      background: #eee;
    }
  }
}
</style>
