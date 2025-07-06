<script setup>
import { computed, ref, watch } from "vue";
import FlatPickr from "vue-flatpickr-component";
import { Timezones } from "../constants";
import { DefaultConfig } from "../constants/flatpickr";
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
        type: [String, Date],
        default: null,
    },
    value: {
        type: [String, Date],
        default: null,
    },
    timezone: {
        type: [String, Object],
        default() {
            return Timezones.MALAYSIA.timezone;
        },
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
        return props.modelValue !== undefined
            ? props.modelValue
            : props.value;
    },
    set(val) {
        emit("update:modelValue", val);
        emit("input", val);
    },
});

watch(
    () => props.config,
    (val) => {
        dateConfig.value = {
            ...DefaultConfig,
            ...val,
        };
    },
    { deep: true, immediate: true }
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
