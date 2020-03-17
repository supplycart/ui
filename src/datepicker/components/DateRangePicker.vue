<template>
    <div>
        <input ref="field"
               class="w-full"
               type="text">
        <br>
    </div>
</template>
<script>
    import flatpickr from "flatpickr";
    import { DefaultDateRangeConfig } from "../constants/flatpickr";
    import { DateTime } from "luxon";
    import { merge } from "lodash";
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
                        from: this.value.from ? DateTime.fromFormat(this.value.from, "yyyy-MM-dd", {zone: "UTC"}).setZone(this.timezoneString) : DateTime.utc(),
                        to: this.value.to ? DateTime.fromFormat(this.value.to, "yyyy-MM-dd", {zone: "UTC"}).setZone(this.timezoneString) : DateTime.utc()
                    };
                }
            },
            utcValue() {
                return {
                    from: this.value.from ? DateTime.fromFormat(this.value.from, "yyyy-MM-dd", {zone: "UTC"}) : DateTime.utc(),
                    to: this.value.to ? DateTime.fromFormat(this.value.to, "yyyy-MM-dd", {zone: "UTC"}) : DateTime.utc()
                };
            }
        },
        methods: {
            init() {
                this.instance = this.instance ? this.instance : flatpickr(this.$refs.field, {
                    mode: "range",
                    defaultHour: 0,
                    onChange: this.onChange
                });

                this.instance.setDate([
                    this.value.from ? DateTime.fromFormat(this.value.from, "yyyy-MM-dd", {zone: "UTC"}).setZone(this.timezoneString).toJSDate() : null,
                    this.value.to ? DateTime.fromFormat(this.value.to, "yyyy-MM-dd", {zone: "UTC"}).setZone(this.timezoneString).toJSDate() : null
                ]);
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
        mounted() {
            this.init();
        }
    };
</script>