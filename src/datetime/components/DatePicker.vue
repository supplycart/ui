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

<script>
import FlatPickr from "vue-flatpickr-component";
import { Timezones } from "../constants";
import { DefaultConfig } from "../constants/flatpickr";
import FormLabel from "../../form/components/FormLabel.vue";

export default {
    components: {
        FlatPickr,
        FormLabel,
    },
    emits: ["update:modelValue", "input"],
    props: {
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
        // Keep value for backward compatibility
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
    },
    data() {
        return {
            dateConfig: {},
        };
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
    },
    watch: {
        config: {
            handler: function (val) {
                this.dateConfig = {
                    ...DefaultConfig,
                    ...val,
                };
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>
