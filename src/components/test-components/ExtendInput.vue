<template>
  <div>
    <input
      v-model="value"
      placeholder=""
      placeholder-class="input-placeholder"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

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

  const value = ref('')

  //
  console.log(`我被渲染了！${props.rowIndex}_${props.colIndex}`)
</script>

<style scoped>

</style>