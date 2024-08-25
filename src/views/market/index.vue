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
          <el-input v-if="command.editable" v-model="command.content" type="textarea" :rows="3"></el-input>
          <markdownIt v-else :content="command.content">
            <el-empty class="pt-6 pb-0" description=" " :image-size="40"></el-empty>
          </markdownIt>
          <template #footer>
            <el-button>复制</el-button>
            <el-button type="success">使用</el-button>
            <el-button type="danger" @click="handleExec(command)">运行</el-button>
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
const commands = ref([
  {
    name: '自定义',
    description: '自定义命令',
    wait: true,
    content: '',
    editable: true
  }
])
const handleExec = ({ wait, content }) => {
  if (content) {
    api.exec({
      wait,
      commandLines: content.replace(/^\n+|\n+$/g, '')
    })
  }
}
const initData = () => {
  api.market({}).then(res => {
    commands.value = commands.value.slice(0, 1).concat(res.data)
  }).catch(console.log)
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
