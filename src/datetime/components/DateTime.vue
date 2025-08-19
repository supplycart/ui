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
    name: 'DateTime',
    props: {
        /**
         * The datetime value (ISO string or date string) - Required
         */
        value: {
            type: String,
            default: null,
            required: true,
        },
        /**
         * The timezone to display the time in
         */
        timezone: {
            type: String,
            default: "Asia/Kuala_Lumpur",
        },
        /**
         * Moment.js format string for displaying the time
         */
        format: {
            type: String,
            default: "YYYY-MM-DD HH:mm:ss",
        },
        /**
         * Whether to display in UTC format with timezone offset
         */
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
