<template>
  <el-main>
    <el-row :gutter="20">
      <el-col v-for="(command, index) in commands" :key="index" :span="4">
        <el-card class="text-center" body-class="pa-2" shadow="hover">
          <template #header>
            <div class="text-center">
              <div class="fs-16 pb-2">{{ command.name }}</div>
              <div class="desc fs-12 opa-70">{{ command.description }}</div>
            </div>
          </template>
          <markdownIt :content="command.content">
            <el-empty class="pt-6 pb-0" description=" " :image-size="40"></el-empty>
          </markdownIt>
          <template #footer>
            <el-button>复制</el-button>
            <el-button type="success">使用</el-button>
            <el-button type="danger">运行</el-button>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script setup>
import { ref } from 'vue'
import api from '@/api'
import markdownIt from '@/components/markdown-it'
const commands = ref([])
const initData = () => {
  api.market({}).then(res => {
    commands.value = res.data
  })
}
initData()
</script>
<style lang="scss" scoped>
.desc {
  height: 32px;
}
.markdown-body {
  height: 80px;
  overflow: auto;
  padding: 5px;
  margin: 5px;
  background: #333;
  text-align: left;
}
</style>
