<template>
  <div class="markdown-body" v-if="content" v-html="html">
  </div>
  <div class="markdown-body" v-else>
    <slot></slot>
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import markdownIt from 'markdown-it'
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  options: {
    type: Object,
    default: () => ({})
  }
})
const html = computed(() => {
  return markdownIt(Object.assign({
    html: true,
    linkify: true,
    typographer: true
  }, props.options)).render(props.content)
})
</script>
<style lang="scss">
.markdown-body {
  font-size: 14px !important;
  line-height: 1.4728 !important;
  padding: 4px 4px 2px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  blockquote,
  details,
  dl,
  ol,
  p,
  pre,
  table,
  ul {
    margin-top: 0;
    margin-bottom: 8px;
    word-break: break-all;
  }

  .anchor {
    pointer-events: none;

    .octicon-link {
      display: none;
    }
  }

  code {
    margin: -2px 2px 2px;
    padding: .1em .3em;
    vertical-align: middle;
    display: inline-block;
    color: rgb(255, 100, 100) !important;
  }

  pre {
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;

    code {
      background-color: transparent;
    }
  }

  font[color=warning] {
    color: rgb(234, 159, 0) !important;
  }

  img {
    max-width: 120px !important;
    max-height: 120px !important;
    cursor: pointer;
  }
}
</style>
