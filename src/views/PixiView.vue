<script setup lang="ts">
import { attachCamera } from '@/pixi/camera';
import { bunBunCircle, bunBunRandoDrag } from '@/pixi/hello-bunny';
import { initPixi } from '@/pixi/pixi-basics';
import { onMounted, ref } from 'vue';

const renderTarget = ref<HTMLElement>(null as unknown as HTMLElement);

onMounted(() => {
  initPixi(renderTarget.value, [attachCamera, bunBunCircle, bunBunRandoDrag]);
});
</script>

<template>
  <div ref="renderTarget" class="render-target"></div>
</template>

<style scoped>
.render-target {
  width: 100%;
  height: 100%;
}

/* @media (min-width: 1024px) {
  .render-target {
    min-height: 98vh;
  }
} */

</style>
