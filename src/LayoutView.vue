<script setup lang="ts">
import { provide } from 'vue';
import { UiState } from './layout/UiState';
import { uiStateKey } from './layout/UiStateKey';
import UiOverlay from './layout/UiOverlay.vue';
import UiTitle from './layout/UiTitle.vue';
import UiDetails from './layout/UiDetails.vue';
import UiOptions from './layout/UiOptions.vue';
import UiControls from './layout/UiControls.vue';

provide(uiStateKey, new UiState());
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
            <UiControls />
        </template>
    </UiOverlay>
</template>
