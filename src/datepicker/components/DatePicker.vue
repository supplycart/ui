<template>
    <FlatPickr
        :id="id"
        v-model="input"
        :config="dateConfig"
        class="input-holder"
    />
</template>
<script>
    import FlatPickr from "vue-flatpickr-component";
    import moment from "moment-timezone";
    import { merge } from "lodash";

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
                type: String | Object
            },
            config: {
                type: Object,
                default: () => {}
            }
        },
        components: {FlatPickr},
        data() {
            return {
                defaultConfig: {
                    altInput: true,
                    altFormat: "d M Y",
                    dateFormat: "Y-m-d",
                    minDate: this.moment().format("YYYY-MM-DD")
                }
            };
        },
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
                return merge(this.defaultConfig, this.config);
            }
        },
    };
</script>