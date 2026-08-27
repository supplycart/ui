<script setup>
// Define props
defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: null,
    },
    inputClass: {
        type: String,
        default: "mr-2 h-4 w-4",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

defineOptions({
    name: "BaseCheckbox",
});

// Define emits
const emit = defineEmits(["update:modelValue", "change"]);

// Methods
const handleChange = (e) => {
    emit("update:modelValue", e.target.checked);
    emit("change", e);
};
</script>

<template>
    <label>
        <input
            :checked="modelValue"
            type="checkbox"
            :class="inputClass"
            :disabled="disabled"
            @change="handleChange"
        />
        <slot>{{ label }}</slot>
    </label>
</template>
