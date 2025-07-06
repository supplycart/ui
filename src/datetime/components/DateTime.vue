<script setup>
import { computed } from "vue";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { format } from "date-fns";

const props = defineProps({
    value: { type: String, default: "", required: true },
    timezone: { type: String, default: "Asia/Kuala_Lumpur" },
    format: { type: String, default: "yyyy-MM-dd HH:mm:ss" },
    isUtc: { type: Boolean, default: false },
});

const localTime = computed(() => {
    if (!props.value) return "";

    let dateValue;

    if (props.value.endsWith("Z") || props.value.includes("GMT")) {
        dateValue = new Date(props.value);
    } else {
        dateValue = new Date(`${props.value}Z`);
    }

    if (isNaN(dateValue.getTime())) return "Invalid Date";

    const zonedDate = utcToZonedTime(dateValue, props.timezone);

    if (props.isUtc) {
        const utcDate = zonedTimeToUtc(zonedDate, props.timezone);
        return (
            format(utcDate, props.format) + " " + format(utcDate, "XXX")
        );
    }

    return format(zonedDate, props.format);
});
</script>

<template>
    <div>
        <slot :time="localTime">
            {{ localTime }}
        </slot>
    </div>
</template>
