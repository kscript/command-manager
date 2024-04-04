<template>
  <el-container>
    <el-aside width="240px">
      <el-row @click="active = 'manifest'">
        配置
      </el-row>
      <el-row @click="active = 'list'">
        命令列表
      </el-row>
      <el-row @click="active = 'add'">
        新增命令
      </el-row>
    </el-aside>
    <el-main>
      <Add :active="active" v-if="['add', 'edit', 'copy'].includes(active)" :row="activeRow" @back="active = 'list'" />
      <List v-if="active === 'list'" @edit="row => handleEdit('edit', row)" @copy="row => handleEdit('copy', row)" />
      <Manifest v-if="active === 'manifest'" />
    </el-main>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import Add from './add'
import List from './list'
import Manifest from './manifest'
const active = ref('manifest')
const activeRow = ref({})
const handleEdit = (type, row) => {
  active.value = type
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
