<template>
    <VueDatePicker
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        range
        :min-date="config.minDate"
        :max-date="config.maxDate"
        :format="dateFormat"
        :disabled="disabled"
    />
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: 'DateRangePicker',
    components: {
        VueDatePicker,
    },
    props: {
        /**
         * The selected date range (Vue 3 v-model) - array with start and end dates
         */
        modelValue: {
            type: [Object, Array],
            default: () => null,
        },
        /**
         * Date range picker configuration options
         */
        config: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Whether the date range picker is disabled
         */
        disabled: {
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