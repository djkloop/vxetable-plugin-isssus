<template>
  <div>
    <input
      v-model="newValue"
      :placeholder="placeholder"
      placeholder-class="input-placeholder"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    value: {
      type: String,
      default: ''
    },
    colIndex: {
      type: Number,
      default: 0
    },
    rowIndex: {
      type: Number,
      default: 0
    }
  })

  const placeholder = ref('请求中')

  onMounted(() => {
    // 模拟请求
    setTimeout(() => {
      placeholder.value = '我渲染了'
    }, 1500)
  })

const newValue = ref('')
  //
  console.log(`我被渲染了！${props.rowIndex}_${props.colIndex}`)
</script>

<style scoped>

</style>