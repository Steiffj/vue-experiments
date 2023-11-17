<script setup lang="ts">
import PixiView from './views/PixiView.vue';
import LayoutView from './LayoutView.vue'
</script>

<template>
  <div class="ui-layout">
    <LayoutView />
  </div>
  <main class="data-vis">
    <PixiView />
  </main>
</template>

<style scoped>
.ui-layout {
  pointer-events: none;
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.data-vis {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
