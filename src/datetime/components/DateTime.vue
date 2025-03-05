<template>
    <div>
        <slot :time="localTime">
            {{ localTime }}
        </slot>
    </div>
</template>

<script>
import { format, parseISO } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

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
            default: "yyyy-MM-dd HH:mm:ss",
        },
        isUtc: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        localTime() {
            // Convert the value to a Date object
            const dateValue = parseISO(this.value);

            // If isUtc is true, convert to UTC and format
            if (this.isUtc) {
                const utcDate = zonedTimeToUtc(dateValue, this.timezone);
                return (
                    format(utcDate, this.format) + " " + format(utcDate, "XXX")
                );
            }

            // Convert value into timezone local time and format
            const zonedDate = utcToZonedTime(dateValue, this.timezone);
            return format(zonedDate, this.format);
        },
    },
};
</script>
