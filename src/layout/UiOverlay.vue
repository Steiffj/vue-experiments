<script setup lang="ts">
import { inject } from 'vue';
import { uiStateKey } from './UiStateKey';
import { UiState } from './UiState';

const ui = inject(uiStateKey, () => new UiState(), true);
</script>

<template>
    <div class="ui-layout">
        <div class="ui title">
            <slot name="title"></slot>
        </div>
        <div class="ui details">
            <slot name="details"></slot>
        </div>
        <div class="ui palette hide hide__left" :data-hidden="ui.isHidden('palette').value">
            <slot name="options"></slot>
        </div>
        <div class="ui controls">
            <slot name="controls"></slot>
        </div>
        <div class="viewport"></div>
    </div>
</template>

<style>
.title {
    grid-area: title;
}

.viewport {
    grid-area: viewport;
}

.palette,
.details {
    align-self: center;
}

.details {
    grid-area: ui;
}

.palette {
    grid-area: ui;
}

.controls {
    grid-area: controls;
    justify-self: center;
}

.ui * {
    pointer-events: initial;
}

.ui:hover {
    z-index: 9999;
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