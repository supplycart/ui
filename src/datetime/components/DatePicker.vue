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
        <VueDatePicker
            :id="id"
            :model-value="modelValue"
            @update:model-value="$emit('update:modelValue', $event)"
            :disabled="disabled"
            :timezone="timezone"
            :format="dateFormat"
            :enable-time-picker="config.enableTime || false"
            :min-date="config.minDate"
            :max-date="config.maxDate"
        />
    </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { Timezones } from "../constants";

export default {
    name: 'DatePicker',
    components: {
        VueDatePicker,
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
         * The selected date value (Vue 3 v-model prop)
         */
        modelValue: {
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
         * Date picker configuration options
         */
        config: {
            type: Object,
            default: () => ({}),
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
        /**
         * Date format string
         */
        dateFormat: {
            type: String,
            default: 'yyyy-MM-dd',
        },
    },
    emits: ['update:modelValue'],
};
</script>
