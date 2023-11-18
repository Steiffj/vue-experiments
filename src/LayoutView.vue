<script setup lang="ts">
</script>

<template>
    <div class="ui-layout">
        <div class="title">
            <h1>Bunny Visualization</h1>
        </div>
        <div class="ui details">Details!</div>
        <div class="ui palette">Stuff!</div>
        <div class="controls">Controls!</div>
        <div class="viewport"></div>
    </div>
</template>

<style scoped lang="scss">
.ui-layout {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: auto 1fr 1fr auto;
    grid-template-areas:
        'title    title'
        'details  viewport'
        'palette  viewport'
        'controls viewport';
}

@media (min-width: 1000px) {
    .ui-layout {
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            'palette title    details'
            'palette viewport details'
            'palette viewport details'
            'palette controls details'
        ;
    }
}

.title {
    grid-area: title;
    border: 2px solid green;
    text-align: center;
}

.viewport {
    grid-area: viewport;
}

.details {
    grid-area: details;
    border: 2px solid yellowgreen;
}

.palette {
    grid-area: palette;
    border: 2px solid orangered;
}

.controls {
    grid-area: controls;
    border: 2px solid blueviolet;
}

.ui {
    pointer-events: initial;
    background-color: #1099bb44;
}
</style>