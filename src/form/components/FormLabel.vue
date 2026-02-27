<template>
    <label v-if="label" :for="id">
        {{ label }}
        <small v-if="required" class="italic text-red-600">*</small>
        <slot name="append"></slot>
    </label>
</template>
<script setup>
// Define props with defaults
defineProps({
    id: {
        type: String,
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>
