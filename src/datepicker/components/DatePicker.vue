<template>
    <FlatPickr
        :id="id"
        v-model="input"
        :config="dateConfig"
    />
</template>
<script>
    import FlatPickr from "vue-flatpickr-component";
    import moment from "moment-timezone";
    import { merge } from "lodash";
    import { Timezones } from "../constants";
    import { DefaultConfig } from "../constants/flatpickr";

    export default {
        props: {
            id: {
                type: String,
                default: null
            },
            value: {
                type: String,
                default: null
            },
            timezone: {
                type: [String, Object],
                default() {
                    return Timezones.MALAYSIA.timezone;
                }
            },
            config: {
                type: Object,
                default: () => {}
            }
        },
        components: {FlatPickr},
        computed: {
            input: {
                get() {
                    let timezone = this.timezone ? this.timezone : process.env.MIX_APP_TIMEZONE;

                    return moment.tz(this.value, timezone).format("YYYY-MM-DD");
                },
                set(val) {
                    this.$emit("input", moment.tz(val, "UTC").format("YYYY-MM-DD"));
                }
            },
            dateConfig() {
                return merge(DefaultConfig, this.config);
            }
        },
        mounted() {

        }
    };
</script>