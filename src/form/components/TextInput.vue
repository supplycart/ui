<template>
    <div>
        <slot name="label">
            <FormLabel
                :id="$attrs.id"
                :label="label"
                :required="required"
                :disabled="disabled"
                class="inline-block mb-2"
            />
        </slot>
        <input
            :id="$attrs.id"
            :value="modelValue"
            v-bind="$attrs"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :maxlength="maxLength"
            :class="[showError ? 'input-error' : '', inputClass]"
            class="w-full"
            @input="handleInput"
            @focus="focus"
            @blur="blur"
            @keydown="keydown"
        />

        <slot name="error">
            <p
                v-if="showError && !modelValue"
                class="italic text-red-600 text-xs mt-2"
            >
                {{ error }}
            </p>
        </slot>
        <slot name="description">
            <p
                v-if="description"
                class="italic text-xs mt-1"
                :class="inputDescClass"
            >
                {{ description }}
            </p>
        </slot>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import FormLabel from "./FormLabel.vue"

// Define props with defaults
const props = defineProps({
    modelValue: {
        type: [String, Number],
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
    placeholder: {
        type: String,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: "Please fill in this field.",
    },
    description: {
        type: String,
        default: null,
    },
    inputClass: {
        type: String,
        default: null,
    },
    maxLength: {
        type: Number,
        default: null,
    },
    inputDescClass: {
        type: String,
        default: null,
    },
})

// Define emits
const emit = defineEmits(["update:modelValue", "blur", "focus", "keydown"])

// Reactive state
const showError = ref(false)

// Watch for error changes
watch(() => props.error, (val) => {
    if (!val && props.required) {
        showError.value = true
    }
})

// Methods
const handleInput = (e) => {
    const target = e.target
    const val = target.value
    emit("update:modelValue", val)
    if (props.required) {
        toggleError(val)
    }
}

const blur = (e) => {
    const target = e.target
    emit("blur", target.value)
}

const focus = () => {
    emit("focus")
    if (props.required) {
        toggleError(props.modelValue?.toString() || '')
    }
}

const toggleError = (val) => {
    showError.value = !val
}

const keydown = () => {
    emit("keydown")
}

// Define options for Vue component
defineOptions({
    inheritAttrs: false
})
</script>
<style>
.input-error {
    border-width: 1px;
    border-color: #f56565 !important;
}
</style>
