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
<script>
export default {
    emits: ["update:modelValue", "change"],
    props: {
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
    },
    methods: {
        handleChange(e) {
            this.$emit("update:modelValue", e.target.checked);
            this.$emit("change", e);
        },
    },
};
</script>
