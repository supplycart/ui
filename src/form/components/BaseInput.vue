<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="label" :for="id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>
        <input
            :value="modelValue"
            v-bind="$attrs"
            :class="[{ 'input-error': showError || isInvalid }, inputClass]"
            :required="required"
            @input="handleInput"
            @focus="focus"
            @change="change"
            @blur="blur"
            @keydown="keydown"
        />

        <slot name="error" :invalid="isInvalid">
            <p v-if="showError" class="text-error">
                {{ error }}
            </p>
            <p v-if="isInvalid && !showError" class="text-error">
                {{ format }}
            </p>
        </slot>

        <slot name="description">
            <p v-if="description" class="text-desc">
                {{ description }}
            </p>
        </slot>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'

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
    regex: {
        type: RegExp,
        default: null,
    },
    required: {
        type: Boolean,
        default: false,
    },
    format: {
        type: String,
        default: "Invalid format",
    },
    inputClass: {
        type: String,
        default: null,
    },
})

// Define emits
const emit = defineEmits(["update:modelValue", "blur", "change", "focus", "keydown"])

// Reactive state
const focused = ref(false)
const showError = ref(false)

// Computed properties
const isInvalid = computed(() => {
    if (!props.regex) return false
    
    const value = props.regex.test(props.modelValue?.toString() || '')
    return !value && focused.value && props.modelValue
})

// Watchers
watch(() => props.error, (val) => {
    if (val && props.required) {
        showError.value = true
    } else {
        showError.value = false
    }
})

// Methods
const handleInput = (e) => {
    const target = e.target
    emit("update:modelValue", target.value)
}

const blur = (e) => {
    emit("blur", e)
}

const change = (e) => {
    emit("change", e)
}

const focus = (e) => {
    emit("focus", e)
    focused.value = true
}

const keydown = () => {
    emit("keydown")
}

// Define options
defineOptions({
    inheritAttrs: false
})
</script>
