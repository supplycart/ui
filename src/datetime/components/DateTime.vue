<template>
    <div>
        <slot :time="localTime">
            {{ localTime }}
        </slot>
    </div>
</template>
<script>
import moment from "moment-timezone";

export default {
    props: {
        value: {
            type: String,
            default: null,
            required: true,
        },
        timezone: {
            type: String,
            default: "Asia/Kuala_Lumpur",
        },
        format: {
            type: String,
            default: "YYYY-MM-DD HH:mm:ss",
        },
        isUtc: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        localTime() {
            // set default timezone as UTC
            moment.tz.setDefault("Etc/UTC");

            // return in utc format and specified timezone
            if (this.isUtc) {
                return (
                    moment(this.value).format(this.format) +
                    moment().tz(this.timezone).format("Z")
                );
            }

            // convert value into timezone local time
            return moment(this.value).tz(this.timezone).format(this.format);
        },
    },
};
</script>
