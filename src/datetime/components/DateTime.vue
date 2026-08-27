<script setup>
import { computed } from "vue";
import { formatInTimeZone } from "date-fns-tz";

const props = defineProps({
    modelValue: { type: String, default: "", required: true },
    timezone: { type: String, default: "Asia/Kuala_Lumpur" },
    format: { type: String, default: "yyyy-MM-dd HH:mm:ss" },
    isUtc: { type: Boolean, default: false },
});

const localTime = computed(() => {
    if (!props.modelValue) return "";

    const value = props.modelValue.trim();
    const hasExplicitTimezone =
        /(?:Z|[+-]\d{2}(?::?\d{2})?)$/i.test(value) || /\bGMT\b/i.test(value);
    const isoValue = value.includes("T") ? value : value.replace(" ", "T");
    const dateValue = new Date(hasExplicitTimezone ? isoValue : `${isoValue}Z`);

    if (isNaN(dateValue.getTime())) return "Invalid Date";

    try {
        const formatted = formatInTimeZone(
            dateValue,
            props.timezone,
            props.format,
        );

        return props.isUtc
            ? `${formatted} ${formatInTimeZone(dateValue, props.timezone, "XXX")}`
            : formatted;
    } catch {
        return "Invalid Date";
    }
});
</script>

<template>
    <div>
        <slot :time="localTime">
            {{ localTime }}
        </slot>
    </div>
</template>
