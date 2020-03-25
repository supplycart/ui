<template>
    <input ref="input" type="text">
</template>
<script>
    import { merge } from "lodash";

    export default {
        props: {
            value: {
                type: Object,
                default: () => ({
                    from: null,
                    to: null
                })
            },
            config: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                instance: null,
                selected: {
                    from: this.value.from,
                    to: this.value.to
                }
            };
        },
        watch: {
            value(val) {
                this.selected = val;
            },
            selected(val) {
                if (this.instance.config._minDate > flatpickr.parseDate(val.from)) {
                    this.instance.set("minDate", flatpickr.parseDate(val.from));
                }

                if (this.instance.config._maxDate < flatpickr.parseDate(val.to)) {
                    this.instance.set("maxDate", flatpickr.parseDate(val.to));
                }

                this.instance.setDate(Object.values(val));
            }
        },
        methods: {
            onClose(selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    this.$emit("input", {
                        from: flatpickr.formatDate(selectedDates[0], this.instance.config.dateFormat),
                        to: flatpickr.formatDate(selectedDates[1], this.instance.config.dateFormat)
                    });
                }
            }
        },
        mounted() {
            let config = merge({
                mode: "range",
                altInput: true,
                altFormat: "j M Y",
                minDate: "today"
            }, this.config);

            this.instance = flatpickr(this.$refs.input, {
                ...config,
                onClose: this.onClose,
                defaultDate: Object.values(this.selected)
            });

            if (this.instance.config._minDate > flatpickr.parseDate(this.selected.from)) {
                this.instance.set("minDate", flatpickr.parseDate(this.selected.from));
                this.instance.setDate(Object.values(this.selected));
            }

            if (this.instance.config._maxDate < flatpickr.parseDate(this.selected.to)) {
                this.instance.set("maxDate", flatpickr.parseDate(this.selected.to));
                this.instance.setDate(Object.values(this.selected));
            }
        },
        beforeDestroy() {
            this.instance.destroy();
        }
    };
</script>