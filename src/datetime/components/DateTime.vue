<template>
    <div>
        <slot :time="localTime">
            {{ localTime }}
        </slot>
    </div>
</template>

<script>
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { format } from "date-fns";

export default {
    props: {
        value: { type: String, default: "", required: true },
        timezone: { type: String, default: "Asia/Kuala_Lumpur" },
        format: { type: String, default: "yyyy-MM-dd HH:mm:ss" },
        isUtc: { type: Boolean, default: false },
    },
    computed: {
        localTime() {
            if (!this.value) return "";

            let dateValue;

            // Ensure the date is correctly interpreted as UTC if needed
            if (this.value.endsWith("Z") || this.value.includes("GMT")) {
                dateValue = new Date(this.value);
            } else {
                // Treat as local time (assumed to be in system timezone)
                dateValue = new Date(`${this.value}Z`); // Assume UTC to avoid local misinterpretation
            }

            if (isNaN(dateValue.getTime())) return "Invalid Date";

            // Convert to target timezone
            const zonedDate = utcToZonedTime(dateValue, this.timezone);

            // Handle UTC conversion if isUtc is true
            if (this.isUtc) {
                const utcDate = zonedTimeToUtc(zonedDate, this.timezone);
                return (
                    format(utcDate, this.format) + " " + format(utcDate, "XXX")
                );
            }

            return format(zonedDate, this.format);
        },
    },
};
</script>
