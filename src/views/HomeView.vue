<template>
  <div class="home">
    <el-header class="d-flex align-center justify-between bb-1 bb-gray bg-gray">
      <el-text class="d-flex align-center cursor-pointer mr-8" @click="toIndex">
        <el-image class="logo" :src="require('@/assets/svg/logo.svg')"></el-image>
        <span class="fs-16 el-text--info">
          命令管理器
        </span>
      </el-text>
      <el-space wrap>
        <el-button @click="toMarket" text>命令市场</el-button>
      </el-space>
    </el-header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import router from '@/router'
const toIndex = () => {
  router.push({ name: 'home' })
}
const toMarket = () => {
  router.push({ name: 'market' })
}
</script>
<style lang="scss">
.home {
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .logo {
    width: 32px;
    margin-right: 10px;
  }
}
</style>
