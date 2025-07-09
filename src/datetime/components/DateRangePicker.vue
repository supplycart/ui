<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { merge } from "lodash-es";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({
            from: null,
            to: null,
        }),
    },
    value: {
        type: Object,
        default: () => ({
            from: null,
            to: null,
        }),
    },
    config: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(["update:modelValue", "input"]);

const input = ref(null);
const instance = ref(null);
const currentValue = props.modelValue || props.value;
const selected = ref({
    from: currentValue.from,
    to: currentValue.to,
});

const onClose = (selectedDates, dateStr, instanceRef) => {
    if (selectedDates.length === 2) {
        selectedDates[1].setHours(23, 59, 59, 999);

        const result = {
            from: flatpickr.formatDate(
                selectedDates[0],
                instance.value.config.dateFormat,
            ),
            to: flatpickr.formatDate(
                selectedDates[1],
                instance.value.config.dateFormat,
            ),
        };

        emit("update:modelValue", result);
        emit("input", result);
    }
};

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            selected.value = val;
        }
    }
);

watch(
    () => props.value,
    (val) => {
        if (val && !props.modelValue) {
            selected.value = val;
        }
    }
);

watch(
    selected,
    (val) => {
        if (instance.value.config._minDate > flatpickr.parseDate(val.from)) {
            instance.value.set("minDate", flatpickr.parseDate(val.from));
        }

        if (instance.value.config._maxDate < flatpickr.parseDate(val.to)) {
            instance.value.set("maxDate", flatpickr.parseDate(val.to));
        }

        instance.value.setDate(Object.values(val));
    }
);

onMounted(() => {
    const config = merge(
        {
            mode: "range",
            altInput: true,
            altFormat: "j M Y",
            minDate: "today",
        },
        props.config,
    );

    instance.value = flatpickr(input.value, {
        ...config,
        onClose: onClose,
        defaultDate: Object.values(selected.value),
    });

    if (
        instance.value.config._minDate >
        flatpickr.parseDate(selected.value.from)
    ) {
        instance.value.set(
            "minDate",
            flatpickr.parseDate(selected.value.from),
        );
        instance.value.setDate(Object.values(selected.value));
    }

    if (
        instance.value.config._maxDate <
        flatpickr.parseDate(selected.value.to)
    ) {
        instance.value.set("maxDate", flatpickr.parseDate(selected.value.to));
        instance.value.setDate(Object.values(selected.value));
    }
});

onBeforeUnmount(() => {
    instance.value.destroy();
});
</script>

<template>
    <input ref="input" type="text" />
</template>
