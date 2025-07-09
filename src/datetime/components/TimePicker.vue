<script setup>
import { computed } from "vue";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { merge } from "lodash-es";
import { DefaultTimeConfig } from "../constants/flatpickr";

const props = defineProps({
    id: {
        type: String,
        default: null,
    },
    modelValue: {
        type: String,
        default: null,
    },
    value: {
        type: String,
        default: null,
    },
    config: {
        type: Object,
        default: () => {},
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue", "input"]);

const input = computed({
    get() {
        return props.modelValue !== undefined
            ? props.modelValue
            : props.value;
    },
    set(val) {
        emit("update:modelValue", val);
        emit("input", val);
    },
});

const timeConfig = computed(() => {
    return merge(DefaultTimeConfig, props.config);
});
</script>

<template>
    <FlatPickr
        :id="id"
        v-model="input"
        :config="timeConfig"
        :disabled="disabled"
    />
</template>
