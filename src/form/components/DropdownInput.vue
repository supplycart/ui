<script setup>
import { ref, computed, watch } from "vue"
import "vue-select/dist/vue-select.css";
import VSelect from "vue-select";
import { useFilteredAttrs } from "../composables/useFilteredAttrs.js";

// Define props
const props = defineProps({
    id: {
        type: String,
        default: null,
    },
    formLabel: {
        type: String,
        default: null,
    },
    modelValue: {
        type: [String, Number, Array, Object, Boolean],
        default: null,
    },
    error: {
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
    options: {
        type: Array,
        default: () => [],
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    taggable: {
        type: Boolean,
        default: false,
    },
    invalid: {
        type: Boolean,
        default: false,
    },
});

// Define emits
const emit = defineEmits([
    "update:modelValue",
    "search",
    "blur",
    "open",
    "deselecting",
]);

// Reactive state
const focused = ref(false);
const originalValue = ref(props.modelValue);
const errorMessage = ref(props.error);
const emptyMessage = "Please fill in this field";

// Computed properties
const isEmpty = computed(() => {
    return Array.isArray(props.modelValue)
        ? props.modelValue.length == 0
        : props.modelValue == null;
});

// Watchers
watch(
    () => props.error,
    (message) => {
        errorMessage.value = message;
    },
);

// Methods
const handleUpdate = (e) => {
    focused.value = false;
    emit("update:modelValue", e);

    if (Array.isArray(e) ? e.length == 0 : e == null) {
        errorMessage.value = emptyMessage;
    } else {
        errorMessage.value = null;
    }
};

const search = (e) => {
    emit("search", e);
};

const blur = () => {
    emit("blur");
    if (props.required && isEmpty.value) {
        errorMessage.value = emptyMessage;
    }
};

const open = () => {
    focused.value = true;
    emit("open");
};

const optionDeselecting = (option) => {
    emit("deselecting", option);
};

// Use filtered attrs to handle Vue 3 compatibility
const { filteredAttrs, attrsClass } = useFilteredAttrs();

// Define options
defineOptions({
    inheritAttrs: false,
});
</script>

<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="formLabel" :for="filteredAttrs.id">
                {{ formLabel }}
                <small v-if="required" class="italic text-red-600">*</small>
                <slot name="info" />
            </label>
        </slot>

        <VSelect
            :model-value="modelValue"
            v-bind="filteredAttrs"
            :disabled="disabled"
            :options="options"
            :class="[
                !!errorMessage ? 'input-error dropdown-input-error' : '',
                inputClass,
                attrsClass,
            ]"
            @update:model-value="handleUpdate"
            @search="search"
            @close="blur"
            @open="open"
            @option:deselecting="optionDeselecting"
            :taggable="taggable"
            :multiple="multiple"
            append-to-body
        >
            <template #option="option">
                <slot name="option" :option="option" />
            </template>
            <template #no-options>
                <slot name="no-option" />
            </template>
            <template #selected-option="option">
                <slot name="selected-option" :option="option" />
            </template>
        </VSelect>
        <slot name="error">
            <p v-if="!!errorMessage" class="italic text-red-600 text-xs mt-2">
                {{ errorMessage }}
            </p>
        </slot>
    </div>
</template>

<style scoped>
.dropdown-input-error {
    border-radius: 5px;
}
</style>
