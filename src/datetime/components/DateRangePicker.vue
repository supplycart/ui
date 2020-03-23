<template>
    <input v-if="!disabled"
           ref="field"
           type="text">
    <input v-else
           :value="selectedDatesString"
           type="text"
           disabled>
</template>
<script>
    import flatpickr from "flatpickr";
    import { DefaultDateRangeConfig } from "../constants/flatpickr";
    import { DateTime } from "luxon";
    import { each, merge } from "lodash";
    import { Timezones } from "../constants";

    export default {
        props: {
            value: {
                type: Object,
                default: () => ({
                    from: null,
                    to: null
                })
            },
            timezone: {
                type: [String, Object],
                default() {
                    return Timezones.MALAYSIA.timezone;
                }
            },
            config: {
                type: Object,
                default: () => ({})
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                instance: null,
                selected: []
            };
        },
        computed: {
            dateConfig() {
                return merge(DefaultDateRangeConfig, this.config);
            },
            timezoneString() {
                return typeof this.timezone === "object" ? this.timezone.timezone : this.timezone;
            },
            dateFormat() {
                return this.config && this.config.format ? this.config.format : "YYYY-MM-DD";
            },
            isUTC() {
                return this.timezoneString === "UTC";
            },
            localValue: {
                get() {
                    return {
                        from: this.value.from ? DateTime.fromFormat(this.value.from, "yyyy-MM-dd", {zone: "UTC"}).setZone(this.timezoneString) : DateTime.local(),
                        to: this.value.to ? DateTime.fromFormat(this.value.to, "yyyy-MM-dd", {zone: "UTC"}).setZone(this.timezoneString) : DateTime.local()
                    };
                }
            },
            utcValue() {
                return {
                    from: this.value.from ? DateTime.fromFormat(this.value.from, "yyyy-MM-dd", {zone: "UTC"}) : DateTime.utc(),
                    to: this.value.to ? DateTime.fromFormat(this.value.to, "yyyy-MM-dd", {zone: "UTC"}) : DateTime.utc()
                };
            },
            selectedDatesString() {
                return this.localValue.from.toFormat("d MMM y") + " to " + this.localValue.to.toFormat("d MMM y");
            }
        },
        methods: {
            init() {
                if (this.$refs.field) {
                    this.instance = this.instance ? this.instance : flatpickr(this.$refs.field, {
                        mode: "range",
                        defaultHour: 0,
                        onChange: this.onChange,
                        ...this.dateConfig,
                        defaultDate: [
                            this.localValue.from.toFormat("yyyy-MM-dd"),
                            this.localValue.to.toFormat("yyyy-MM-dd")
                        ]
                    });
                }
            },
            onChange(selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    this.selected = selectedDates.map(date => {
                        return DateTime.fromObject({
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                            zone: this.timezoneString
                        });
                    });

                    this.$emit("input", {
                        from: this.selected[0].setZone("UTC").toFormat("yyyy-MM-dd"),
                        to: this.selected[1].setZone("UTC").toFormat("yyyy-MM-dd")
                    });
                }
            }
        },
        watch: {
            disabled(value) {
                value && this.instance ? this.instance.destroy() : this.init();
            },
            value(value) {
                if (this.instance) {
                    this.instance.setDate([
                        this.localValue.from.toFormat("yyyy-MM-dd"),
                        this.localValue.to.toFormat("yyyy-MM-dd")
                    ]);
                }
            },
            dateConfig: {
                handler: function (value) {
                    if (this.instance) {
                        this.instance.destroy();
                        this.instance = null;

                        this.init();
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.instance && this.instance.destroy();
        }
    };
</script>