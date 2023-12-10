<script setup lang="ts">
import { provide } from 'vue';
import UiControls from './layout/UiControls.vue';
import UiDetails from './layout/UiDetails.vue';
import UiOptions from './layout/UiOptions.vue';
import UiOverlay from './layout/UiOverlay.vue';
import { UiState } from './layout/UiState';
import { uiStateKey } from './layout/UiStateKey';
import UiTitle from './layout/UiTitle.vue';

const ui = new UiState();
provide(uiStateKey, ui);
</script>

<template>
    <UiOverlay>
        <template #title>
            <UiTitle />
        </template>
        <template #details>
            <UiDetails />
        </template>
        <template #options>
            <UiOptions />
        </template>
        <template #controls>
            <UiControls @hideToggle="() => ui.toggleHidden('palette')" />
        </template>
    </UiOverlay>
</template>
