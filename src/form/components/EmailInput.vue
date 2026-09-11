<template>
    <BaseInput
        v-bind="filteredAttrs"
        :label="label"
        :model-value="modelValue"
        :regex="regex"
        :error="error"
        :description="description"
        :required="required"
        :input-class="inputClass"
        type="email"
        @update:model-value="update"
        @blur="blur"
    />
</template>
<script setup>
import { ref } from "vue";
import BaseInput from "./BaseInput.vue";
import { useFilteredAttrs } from "../composables/useFilteredAttrs.js";

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
});

// Define emits
const emit = defineEmits(["update:modelValue", "blur"]);

// Methods
const blur = (e) => {
    emit("blur", e);
};

const update = (value) => {
    emit("update:modelValue", value);
};

// Email-specific regex
const regex = ref(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
);

// Use filtered attrs to handle Vue 3 compatibility
const { filteredAttrs } = useFilteredAttrs();

// Define options
defineOptions({
    inheritAttrs: false,
});
</script>
