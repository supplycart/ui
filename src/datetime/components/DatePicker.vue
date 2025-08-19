<template>
    <div>
        <label 
            v-if="label" 
            :for="id"
            :class="labelClass"
        >
            {{ label }}
            <span v-if="required" class="text-red-600 ml-1">*</span>
        </label>
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

export default {
    name: 'DatePicker',
    components: {
        FlatPickr,
    },
    props: {
        /**
         * HTML id attribute for the input element
         */
        id: {
            type: String,
            default: null,
        },
        /**
         * Label text to display above the date picker
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * CSS classes to apply to the label element
         */
        labelClass: {
            type: String,
            default: "inline-block mb-2",
        },
        /**
         * The selected date value
         */
        value: {
            type: [String, Date],
            default: null,
        },
        /**
         * Timezone for date handling (defaults to Malaysia timezone)
         */
        timezone: {
            type: [String, Object],
            default() {
                return Timezones.MALAYSIA.timezone;
            },
        },
        /**
         * Flatpickr configuration options
         */
        config: {
            type: Object,
            default: () => {},
        },
        /**
         * Whether the date picker is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether the field is required
         */
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
                return this.value;
            },
            set(val) {
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
