<script setup>
import { computed } from "vue"

// Define props
const props = defineProps({
    label: {
        type: String,
    },
    modelValue: {
        type: [String, Number],
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
    maxDecimal: {
        type: Number,
        default: 0,
    },
    minDecimal: {
        type: Number,
        default: 0,
    },
})

// Computed properties
const input = computed(() => {
    if (props.minDecimal > 0 || props.maxDecimal > 0) {
        if (props.maxDecimal < props.minDecimal) {
            return props.modelValue
        }
        return new Intl.NumberFormat("en", {
            style: "decimal",
            useGrouping: true,
            minimumFractionDigits: props.minDecimal,
            maximumFractionDigits: props.maxDecimal,
        }).format(props.modelValue)
    } else {
        return props.modelValue
    }
})
</script>

<template>
    <div>
        <slot name="label">
            <label v-if="label" class="font-bold">{{ label }}</label>
        </slot>
        <div v-if="modelValue !== null" class="leading-normal">
            <slot>
                {{ input }}
            </slot>
        </div>
        <div v-if="showError" class="italic text-red-500">
            {{ errorMessage }}
        </div>
        <div
            v-if="modelValue == null && showDefault && !showError"
            class="italic"
        >
            {{ defaultMessage }}
        </div>
    </div>
</template>
