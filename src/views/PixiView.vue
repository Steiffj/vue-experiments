<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { onMounted, ref } from 'vue';

const renderTarget = ref<HTMLElement>(null as unknown as HTMLElement);

onMounted(() => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    antialias: true,
    background: '#1099bb',
    resizeTo: renderTarget.value
  })
  
  renderTarget.value.appendChild(app.view);
})
</script>

<template>
  <div ref="renderTarget" class="render-target"></div>
</template>

<style scoped>
.render-target {
  width: 100%;
  height: 100%;
}
</style>
