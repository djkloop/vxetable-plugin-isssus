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

  defineProps({
    value: {
      type: String,
      default: ''
    }
  })

  const value = ref('')

  //
  console.log('我被渲染了！')
</script>

<style scoped>

</style>