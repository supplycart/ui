<template>
    <label>
        <input
            v-model="input"
            type="checkbox"
            :class="inputClass"
            :disabled="disabled"
            @change="change"
        />
        <slot>{{ label }}</slot>
    </label>
</template>
<script>
export default {
    props: {
        value: {
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
    computed: {
        input: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
    methods: {
        change(e) {
            this.$emit("change", e);
        },
    },
};
</script>
