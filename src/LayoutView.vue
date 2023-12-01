<script setup lang="ts">
import { ref } from 'vue';

const hidden = ref(false);
</script>

<template>
    <div class="ui-layout">
        <div class="title">
            <h1>Bunny Visualization</h1>
        </div>
        <div class="ui details">Details!</div>
        <div class="ui palette hide hide__left" :data-hidden="hidden">Palette!</div>
        <div class="ui controls">
            <button class="btn-control" @click="hidden = !hidden"><i class="ph-thin ph-eye"></i></button>
            <button class="btn-control" @click="hidden = !hidden"><i class="ph-thin ph-eye"></i></button>
        </div>
        <div class="viewport"></div>
    </div>
</template>

<style scoped lang="scss">
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
    display: flex;
    gap: 0.5rem;
    border: 2px solid blueviolet;
    text-align: center;
    justify-self: center;

    padding-block: 1rem;
}

// .ui {
//     background-color: #1099bb44;
// }

.ui * {
    pointer-events: initial;
}

.hide {
    transition:
        opacity 350ms ease-in-out,
        transform 350ms ease-in-out;
}

.hide[data-hidden=true] {
    pointer-events: none;
    opacity: 0;
}

.hide__left[data-hidden=true] {
    transform: translateX(-105%);
}

.hide__right[data-hidden=true] {
    transform: translateX(105%);
}

button.btn-control {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    border-radius: 50%;
    background-color: #1099bb;
    color: #fefefe;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2rem;
    box-shadow: -1px 16px 19px -7px rgba(0,0,0,0.55);
}

.ui-layout {
    display: grid;
    // gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr 1fr auto;
    grid-template-areas:
        'title    title'
        'details  viewport'
        'palette  viewport'
        'controls viewport';
}


.details {
    grid-row: details / palette;
    z-index: 1;
}

@media (min-width: 1200px) {
    .ui-layout {
        grid-template-columns: 1fr 1.5fr;
    }
}

@media (min-width: 1600px) {
    .ui-layout {
        grid-template-columns: 1fr 2fr;
    }
}

@media (min-width: 1850px) {
    .ui-layout {
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            'palette title    details'
            'palette viewport details'
            'palette viewport details'
            'palette controls details';
    }

    .title {
        grid-column: 1 / -1;
    }

    .controls {
        grid-column: 1 / -1;
    }
}
</style>