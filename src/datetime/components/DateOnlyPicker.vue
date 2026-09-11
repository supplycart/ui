<script setup>
import { computed, ref, watch } from "vue";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { DefaultDateOnlyConfig } from "../constants/flatpickr";
import FormLabel from "../../form/components/FormLabel.vue";

const props = defineProps({
    id: {
        type: String,
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
    labelClass: {
        type: String,
        default: "inline-block mb-2",
    },
    modelValue: {
        type: String,
        default: null,
    },
    value: {
        type: String,
        default: null,
    },
    // flatpickr tokens, from companySettings.date_formats.input_date.
    altFormat: {
        type: String,
        default: DefaultDateOnlyConfig.altFormat,
    },
    config: {
        type: Object,
        default: () => {},
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue", "input"]);

const dateConfig = ref({});

const input = computed({
    get() {
        return props.modelValue !== undefined ? props.modelValue : props.value;
    },
    set(val) {
        emit("update:modelValue", val);
        emit("input", val);
    },
});

watch(
    [() => props.config, () => props.altFormat],
    ([config, altFormat]) => {
        dateConfig.value = {
            ...DefaultDateOnlyConfig,
            altFormat,
            ...config,
            // dateFormat drives the emitted value. The caller must not change it.
            dateFormat: "Y-m-d",
        };
    },
    { deep: true, immediate: true },
);
</script>

<template>
    <div>
        <FormLabel
            :id="id"
            :label="label"
            :required="required"
            :disabled="disabled"
            :class="labelClass"
        />
        <FlatPickr
            :id="id"
            v-model="input"
            :config="dateConfig"
            :disabled="disabled"
        />
    </div>
</template>
