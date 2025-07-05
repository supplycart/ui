<template>
    <FlatPickr
        :id="id"
        v-model="input"
        :config="timeConfig"
        :disabled="disabled"
    />
</template>
<script>
import FlatPickr from "vue-flatpickr-component";
import { merge } from "lodash-es";
import { DefaultTimeConfig } from "../constants/flatpickr";

export default {
    name: "TimePicker",
    components: { FlatPickr },
    emits: ["update:modelValue", "input"],
    props: {
        id: {
            type: String,
            default: null,
        },
        modelValue: {
            type: String,
            default: null,
        },
        // Keep value for backward compatibility
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
    },
    computed: {
        input: {
            get() {
                // Use modelValue if provided, otherwise fall back to value for backward compatibility
                return this.modelValue !== undefined
                    ? this.modelValue
                    : this.value;
            },
            set(val) {
                this.$emit("update:modelValue", val);
                // Keep backward compatibility with input event
                this.$emit("input", val);
            },
        },
        timeConfig() {
            return merge(DefaultTimeConfig, this.config);
        },
    },
};
</script>
