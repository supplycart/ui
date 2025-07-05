<template>
    <input ref="input" type="text" />
</template>
<script>
import { merge } from "lodash-es";
import flatpickr from "flatpickr";

export default {
    emits: ["update:modelValue", "input"],
    props: {
        modelValue: {
            type: Object,
            default: () => ({
                from: null,
                to: null,
            }),
        },
        // Keep value for backward compatibility
        value: {
            type: Object,
            default: () => ({
                from: null,
                to: null,
            }),
        },
        config: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        const currentValue = this.modelValue || this.value;
        return {
            instance: null,
            selected: {
                from: currentValue.from,
                to: currentValue.to,
            },
        };
    },
    watch: {
        modelValue(val) {
            if (val) {
                this.selected = val;
            }
        },
        value(val) {
            if (val && !this.modelValue) {
                this.selected = val;
            }
        },
        selected(val) {
            if (this.instance.config._minDate > flatpickr.parseDate(val.from)) {
                this.instance.set("minDate", flatpickr.parseDate(val.from));
            }

            if (this.instance.config._maxDate < flatpickr.parseDate(val.to)) {
                this.instance.set("maxDate", flatpickr.parseDate(val.to));
            }

            this.instance.setDate(Object.values(val));
        },
    },
    methods: {
        onClose(selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                // set to hours to end of day
                selectedDates[1].setHours(23, 59, 59, 999);

                const result = {
                    from: flatpickr.formatDate(
                        selectedDates[0],
                        this.instance.config.dateFormat,
                    ),
                    to: flatpickr.formatDate(
                        selectedDates[1],
                        this.instance.config.dateFormat,
                    ),
                };

                this.$emit("update:modelValue", result);
                // Keep backward compatibility with input event
                this.$emit("input", result);
            }
        },
    },
    mounted() {
        const config = merge(
            {
                mode: "range",
                altInput: true,
                altFormat: "j M Y",
                minDate: "today",
            },
            this.config,
        );

        this.instance = flatpickr(this.$refs.input, {
            ...config,
            onClose: this.onClose,
            defaultDate: Object.values(this.selected),
        });

        if (
            this.instance.config._minDate >
            flatpickr.parseDate(this.selected.from)
        ) {
            this.instance.set(
                "minDate",
                flatpickr.parseDate(this.selected.from),
            );
            this.instance.setDate(Object.values(this.selected));
        }

        if (
            this.instance.config._maxDate <
            flatpickr.parseDate(this.selected.to)
        ) {
            this.instance.set("maxDate", flatpickr.parseDate(this.selected.to));
            this.instance.setDate(Object.values(this.selected));
        }
    },
    beforeUnmount() {
        this.instance.destroy();
    },
};
</script>
