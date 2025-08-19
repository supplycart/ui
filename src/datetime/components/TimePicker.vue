<template>
    <VueDatePicker
        :id="id"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :disabled="disabled"
        time-picker
        :format="timeFormat"
    />
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: "TimePicker",
    components: { VueDatePicker },
    props: {
        /**
         * HTML id attribute for the input
         */
        id: {
            type: String,
            default: null,
        },
        /**
         * The selected time value (Vue 3 v-model)
         */
        modelValue: {
            type: String,
            default: null,
        },
        /**
         * Configuration options (for future extensibility)
         */
        config: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Whether the time picker is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Time format string
         */
        timeFormat: {
            type: String,
            default: 'HH:mm',
        },
    },
    emits: ['update:modelValue'],
};
</script>
