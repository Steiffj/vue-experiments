<script setup lang="ts">
import { inject, ref } from 'vue';
import { UiState } from './UiState';
import { uiStateKey } from './UiStateKey';

const ui = inject(uiStateKey, () => new UiState(), true);

const layout = ref<HTMLElement | null>(null);
const resizeLeft = ref<HTMLElement | null>(null);
const resizeRight = ref<HTMLElement | null>(null);
const left = ref<HTMLElement | null>(null);
const right = ref<HTMLElement | null>(null);

let dragActive: 'left' | 'right' | undefined;
function setCursor(cursor: string) {
    if (layout.value) {
        layout.value.style.cursor = cursor;
    }
}
function startDrag(pos: 'left' | 'right') {
    dragActive = pos;
    setCursor('ew-resize');
    if (layout.value) {
        layout.value.style.pointerEvents = 'initial';
    }
}
function endDrag() {
    dragActive = undefined;
    setCursor('auto');
    if (layout.value) {
        layout.value.style.pointerEvents = 'none';
    }
}
function onDrag(event: MouseEvent) {
    if (!dragActive || !layout.value || !resizeLeft.value || !resizeRight.value || !left.value || !right.value) {
        return;
    }

    const leftColWidth = dragActive === 'left' ? +event.clientX : +left.value.offsetWidth;
    const rightColWidth = dragActive === 'right' ? +layout.value.offsetWidth - event.clientX : +right.value.offsetWidth;
    const gridTemplateColumns = `${leftColWidth}px 1fr ${rightColWidth}px`;
    layout.value.style.gridTemplateColumns = gridTemplateColumns;
}
</script>
<template>
    <div ref="layout" class="ui-layout" @mouseup="endDrag()" @mousemove="onDrag($event)">
        <div class="ui title">
            <slot name="title"></slot>
        </div>
        <div ref="right" class="ui scrollable details">
            <slot name="details"></slot>
            <div ref="resizeRight" class="resize resize__right" @mousedown="startDrag('right')"></div>
        </div>
        <div ref="left" class="ui scrollable palette hide hide__left" :data-hidden="ui.isHidden('palette').value">
            <slot name="options"></slot>
            <div ref="resizeLeft" class="resize resize__left" @mousedown="startDrag('left')"></div>
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

.resize {
    position: absolute;
    top: 0;
    pointer-events: initial;
    cursor: ew-resize;
    height: 100%;
    width: 5px;
    background-color: #dda0dd;
}

.resize__left {
    right: 0;
}

.resize__right {
    visibility: hidden;
    left: 0;
}

.viewport {
    grid-area: viewport;
}

.scrollable {
    --scroll-fg: #444444F0;
    --scroll-bg: #00000000;
    overflow: auto;
    align-self: center;
    max-height: 100%;
    pointer-events: initial;

    scrollbar-color: var(--scroll-fg) var(--scroll-bg);
}

.scrollable::-webkit-scrollbar {
    width: 13px;
}

.scrollable::-webkit-scrollbar-track {
    background: var(--scroll-bg);
}

.scrollable::-webkit-scrollbar-thumb {
    background: var(--scroll-fg);
    box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.7);
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

.ui {
    position: relative;
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
    grid-template-columns: 1fr auto 1fr;
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
        grid-template-columns: 1fr auto 1.5fr;
    }
}

@media (min-width: 1600px) {
    .ui-layout {
        grid-template-columns: 1fr auto 2fr;
    }
}

@media (min-width: 1850px) {
    .resize__right {
        visibility: visible;
    }

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