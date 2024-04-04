<template>
  <el-container>
    <el-aside width="240px">
      <el-row v-for="(item, index) in menus" :key="index" :class="{ 'active': item.name === route.name }"
        @click="handleClick(item.name)">
        {{ item.label }}
      </el-row>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
const menus = ref([
  {
    name: 'managerManifest',
    label: '配置'
  },
  {
    name: 'managerList',
    label: '命令列表'
  },
  {
    name: 'managerAdd',
    label: '新增命令'
  }
])
const handleClick = (active) => {
  router.push({ name: active })
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
    transition: all .3s;
    color: #555;

    &:hover {
      color: #111;
    }

    &.active {
      color: var(--el-color-primary);
    }
  }
}
</style>
