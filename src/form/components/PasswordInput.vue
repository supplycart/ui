<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :model-value="modelValue"
        :regex="regex"
        :error="error"
        :input-class="inputClass"
        :description="description"
        :required="required"
        type="password"
        @update:model-value="update"
        @blur="blur"
    />
</template>
<script setup>
import { ref } from 'vue'
import BaseInput from "./BaseInput.vue"

// Define props
const props = defineProps({
    id: {
        type: String,
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
    modelValue: {
        type: [String, Number],
        default: null,
    },
    error: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    required: {
        type: Boolean,
        default: false,
    },
    inputClass: {
        type: String,
        default: null,
    },
})

// Define emits
const emit = defineEmits(["update:modelValue", "blur"])

// Methods
const blur = (e) => {
    emit('blur', e)
}

const update = (value) => {
    emit('update:modelValue', value)
}

// Password-specific regex (minimum 8 characters)
const regex = ref(/^(.{8,})+/)

// Define options
defineOptions({
    inheritAttrs: false
})
</script>
