<script setup lang="ts">
import { onMounted, ref } from 'vue';

// Lil close button wrapper
// Resizable
// Controls in the middle (still pos abs)
function resizable(content: HTMLElement) {
    const minWidthPx = 150;
    let widthStart = 0;
    let heightStart = 0;
    let xStart = 0;
    let yStart = 0;
    let xMouseStart = 0;
    let yMouseStart = 0;
}

const left = ref<HTMLElement>(null as unknown as HTMLElement);
const right = ref<HTMLElement>(null as unknown as HTMLElement);
onMounted(() => {

})
</script>

<template>
    <div class="ui-layout">
        <div ref="left" class="ui left-panel"></div>
        <div class="resize left-resize"></div>
        <div class="viewport"></div>
        <div ref="right" class="resize right-resize"></div>
        <div class="ui right-panel"></div>
    </div>
</template>

<style scoped lang="scss">
.ui-layout {
    display: flex;
    flex: 1;
}

.viewport {
    flex: 7;
}

.ui {
    pointer-events: initial;
    background-color: #1099bb44;
}

.left-panel {
    flex: 1.5;
    // transform: translateX(-100%);
}

.right-panel {
    flex: 1.5;
}

$resize-border-style: 1px dashed lightgray;

.resize {
    pointer-events: initial;
    cursor: ew-resize;
    width: 5px;
    opacity: 0%;
    transition: opacity 150ms;
}

.right-resize {
    border-right: $resize-border-style;
}

.left-resize {
    border-left: $resize-border-style;
}

.resize:hover {
    opacity: 65%;
}
</style>