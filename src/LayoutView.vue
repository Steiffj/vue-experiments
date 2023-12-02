<script setup lang="ts">
import { ref } from 'vue';

const hidden = ref(false);
</script>

<template>
    <div class="ui-layout">
        <div class="ui title">
            <h1>Bunny Visualization</h1>
        </div>
        <div class="tabs-overlay"></div>
        <div class="ui details"><h3>Details!</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis illo illum, expedita aliquam numquam quod dolor voluptates quibusdam voluptate quam et tempore quos! Sapiente aperiam repellat unde, animi esse aliquid.
                Cumque fuga, porro, labore cum, id error nihil quae laudantium corrupti facilis expedita tempore! Praesentium totam qui veritatis ratione voluptate, odit architecto cupiditate eligendi mollitia repellat! Saepe modi voluptatibus eum.
                Modi libero consequuntur inventore totam consequatur pariatur laboriosam sequi amet labore id est perspiciatis, quae harum autem quod, molestias dolore mollitia qui aut, voluptatum dolores blanditiis laborum quaerat cum! Error.
            </p>
        </div>
        <div class="ui palette hide hide__left" :data-hidden="hidden"><h3>Palette!</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum cumque odio itaque quos doloribus, obcaecati expedita qui, possimus quidem magni unde architecto ipsam sapiente adipisci voluptate! Hic et omnis adipisci!
            </p>
        </div>
        <div class="ui controls">
            <button class="btn-control" @click="hidden = !hidden">
                <i class="ph-thin ph-eye"></i>
                <div class="btn-label">Toggle</div>
            </button>
            <button class="btn-control" @click="hidden = !hidden">
                <i class="ph-thin ph-eye"></i>
                <div class="btn-label">Toggle</div>
            </button>
            <button class="btn-control" @click="hidden = !hidden">
                <i class="ph-thin ph-eye"></i>
                <div class="btn-label">Toggle</div>
            </button>
            <button class="btn-control" @click="hidden = !hidden">
                <i class="ph-thin ph-x"></i>
                <div class="btn-label">They all just toggle and this label is long!</div>
            </button>
        </div>
        <div class="viewport"></div>
    </div>
</template>

<style scoped lang="scss">

.tabs-overlay {
    display: none;
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
    grid-area: ui;
    border: 2px solid yellowgreen;
    background-color: #1099bb44;
    text-align: right;
}

.palette {
    grid-area: ui;
    border: 2px solid orangered;
    background-color: #bfc22044;
}

.controls {
    grid-area: controls;
    display: flex;
    gap: 0.5rem;
    border: 2px solid blueviolet;
    text-align: center;
    justify-self: center;

    padding-block: 1.5rem;
}

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
    position: relative;
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

.btn-label {
    font-size: 1rem;
    position: absolute;
    overflow-x: visible;
    width: 40em;
    top: 2.5rem;
    transform: scale(0.75);
    opacity: 0;
    transition:
        opacity 80ms ease-in-out,
        transform 80ms ease-in-out;
}

.btn-control:hover {
    .btn-label {
        transform: scale(1);
        opacity: 0.9;
    }
}

.ui-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr 1fr auto;
    grid-template-areas:
        'ui title'
        'ui viewport'
        'ui viewport'
        'ui controls';
}


.details {
    grid-area: ui;
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
            'ui-left title    ui-right'
            'ui-left viewport ui-right'
            'ui-left viewport ui-right'
            'ui-left controls ui-right';
    }

    .details {
        grid-area: ui-right;
    }

    .palette {
        grid-area: ui-left;
    }
}
</style>