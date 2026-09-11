<script setup>
import { computed } from "vue";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

const props = defineProps({
    modelValue: { type: String, default: "", required: true },
    timezone: { type: String, default: "Asia/Kuala_Lumpur" },
    format: { type: String, default: "yyyy-MM-dd HH:mm:ss" },
    isUtc: { type: Boolean, default: false },
});

const localTime = computed(() => {
    if (!props.modelValue) return "";

    let dateValue;

    if (props.modelValue.endsWith("Z") || props.modelValue.includes("GMT")) {
        dateValue = new Date(props.modelValue);
    } else {
        dateValue = new Date(`${props.modelValue}Z`);
    }

    if (isNaN(dateValue.getTime())) return "Invalid Date";

    const zonedDate = fromZonedTime(dateValue, props.timezone);

    if (props.isUtc) {
        const utcDate = toZonedTime(zonedDate, props.timezone);
        return format(utcDate, props.format) + " " + format(utcDate, "XXX");
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
