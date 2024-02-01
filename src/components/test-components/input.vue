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

  const value = ref('')

  //
  console.log('render')
</script>

<style scoped>

</style>