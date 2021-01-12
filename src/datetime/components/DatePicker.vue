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
    import moment from "moment";
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
        data() {
            return {
                dateConfig: {}
            }
        },
        computed: {
            input: {
                get() {
                    return this.value;
                },
                set(val) {
                    let dateFormat = moment(val).tz(this.timezone).format("YYYY-MM-DD")
                    this.$emit("input", dateFormat);
                }
            },
            
        },
        watch: {
            config: {
                handler: function(val){
                    this.dateConfig = merge(DefaultConfig, val);
                },
                deep: true,
                immediate: true
            }
        },
    };
</script>