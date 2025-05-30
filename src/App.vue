<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 10px 0 20px;
  margin-bottom: 15px;
}

.main {
  margin-bottom: 25px;
}
</style>
