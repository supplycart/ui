<template>
    <FlatPickr
        :id="id"
        v-model="input"
        :config="dateConfig"
        :disabled="disabled"
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
                type: [String, Date],
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
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        components: {FlatPickr},
        computed: {
            input: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit("input", val);
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