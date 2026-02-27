<script setup>
// Define props
const props = defineProps({
    label: {
        type: String,
        default: "Label",
    },
    modelValue: {
        type: String,
        default: null,
    },
    showError: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: "Missing information",
    },
    showDefault: {
        type: Boolean,
        default: true,
    },
    defaultMessage: {
        type: String,
        default: "N/A",
    },
});
</script>

<template>
    <div>
        <slot name="label">
            <label class="font-bold">{{ label }}</label>
        </slot>
        <div v-if="modelValue" class="leading-normal">
            <slot>
                {{ modelValue }}
            </slot>
        </div>
        <div v-if="!modelValue && showError" class="italic text-red-500">
            {{ errorMessage }}
        </div>
        <div v-if="!modelValue && showDefault && !showError" class="italic">
            {{ defaultMessage }}
        </div>
    </div>
</template>
