<script setup>
import { ref, computed } from "vue"

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
        type: String,
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
        default: () => /^.{0,255}$/,
    },
    required: {
        type: Boolean,
        default: false,
    },
    format: {
        type: String,
        default: "Max 255 characters",
    },
    inputClass: {
        type: String,
        default: null,
    },
    rows: {
        type: Number,
        default: 4,
    },
})

// Define emits
const emit = defineEmits(["update:modelValue", "blur", "keydown"])

// Reactive state
const focused = ref(false)

// Computed properties
const showError = computed(() => {
    return props.error && props.required && !props.modelValue && focused.value
})

const isInvalid = computed(() => {
    if (!props.regex) return false
    const value = props.modelValue
        ? props.modelValue.length <= 255
        : false

    return !value && focused.value && props.modelValue
})

const charLeft = computed(() => {
    return props.modelValue ? 255 - props.modelValue.length : 255
})

// Methods
const handleInput = (e) => {
    const str = e.target.value.slice(0, 255)
    emit("update:modelValue", str)
}

const blur = (e) => {
    emit("blur", e)
}

const focus = (e) => {
    focused.value = true
}

const charCount = (event) => {
    if (!props.modelValue) return

    if (props.modelValue.length >= 255) {
        if (event.keyCode >= 48 && event.keyCode <= 90) {
            event.preventDefault()
            return
        }
    }
    emit("keydown")
}

// Define options
defineOptions({
    inheritAttrs: false
})
</script>

<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="label" :for="$attrs.id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>

        <textarea
            :value="modelValue"
            :rows="rows"
            v-bind="$attrs"
            class="h-textarea"
            :class="[showError || isInvalid ? 'error' : '', inputClass]"
            :required="required"
            @input="handleInput"
            @focus="focus"
            @blur="blur"
            @keydown="charCount($event)"
        />

        <slot name="counter" :counter="charLeft">
            <p v-if="charLeft >= 0" class="text-desc">
                {{ charLeft }} characters left
            </p>
        </slot>

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

<style>
.h-textarea {
    resize: none;
    overflow-y: auto;
}
</style>
