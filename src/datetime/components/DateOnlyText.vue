<script setup>
import { computed } from "vue";
import { format as formatDate, isValid, parse } from "date-fns";

// Prints a "Y-m-d" string with no timezone maths.
// The printed day is the same in every browser timezone.
// Use DateTime instead when the value is a real timestamp.

const props = defineProps({
    modelValue: { type: String, default: "" },
    // date-fns tokens, from companySettings.date_formats.label.
    format: { type: String, default: "yyyy-MM-dd" },
});

const text = computed(() => {
    if (!props.modelValue) return "";

    // slice covers a caller that still sends "2026-09-03T00:00:00Z".
    const parsed = parse(
        String(props.modelValue).slice(0, 10),
        "yyyy-MM-dd",
        new Date(),
    );

    return isValid(parsed) ? formatDate(parsed, props.format) : "Invalid Date";
});
</script>

<template>
    <div>
        <slot :date="text">
            {{ text }}
        </slot>
    </div>
</template>
