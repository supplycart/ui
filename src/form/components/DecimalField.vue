<template>
    <div>
        <slot name="label">
            <label v-if="label" class="font-bold">{{ label }}</label>
        </slot>
        <div v-if="modelValue !== null" class="leading-normal">
            <slot>
                {{ input }}
            </slot>
        </div>
        <div v-if="showError" class="italic text-red-500">
            {{ errorMessage }}
        </div>
        <div
            v-if="modelValue == null && showDefault && !showError"
            class="italic"
        >
            {{ defaultMessage }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
        },
        modelValue: {
            type: [String, Number],
            default: null,
        },
        showError: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
            default: "Missing information",
        },
        showDefault: {
            type: Boolean,
            default: true,
        },
        defaultMessage: {
            type: String,
            default: "N/A",
        },
        maxDecimal: {
            type: Number,
            default: 0,
        },
        minDecimal: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        input() {
            if (this.minDecimal > 0 || this.maxDecimal > 0) {
                if (this.maxDecimal < this.minDecimal) {
                    return this.modelValue;
                }
                return new Intl.NumberFormat("en", {
                    style: "decimal",
                    useGrouping: true,
                    minimumFractionDigits: this.minDecimal,
                    maximumFractionDigits: this.maxDecimal,
                }).format(this.modelValue);
            } else {
                return this.modelValue;
            }
        },
    },
};
</script>
