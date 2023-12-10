<script setup lang="ts">
const emit = defineEmits<{
    (e: 'hideToggle'): void
}>();

function toggle() {
    emit('hideToggle');
}
</script>

<template>
    <div class="ui-controls">
        <div class="search">
            <input type="text" name="search" id="search">
        </div>
        <div class="control-buttons">
            <button class="btn-control" @click="toggle">
                <i class="ph-thin ph-eye"></i>
                <div class="btn-label">Toggle</div>
            </button>
            <button class="btn-control" @click="toggle">
                <i class="ph-thin ph-eye"></i>
                <div class="btn-label">Toggle</div>
            </button>
            <button class="btn-control" @click="toggle">
                <i class="ph-thin ph-eye"></i>
                <div class="btn-label">Toggle</div>
            </button>
            <button class="btn-control" @click="toggle">
                <i class="ph-thin ph-x"></i>
                <div class="btn-label">They all just toggle and this label is long!</div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.ui-controls {
    border: 2px solid blueviolet;
    padding-block: 1.5rem;
    text-align: center;
}

.search {
    margin-block: 1rem;
}

.control-buttons {
    display: flex;
    gap: 0.5rem;
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
    box-shadow: -1px 16px 19px -7px rgba(0, 0, 0, 0.55);
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
</style>