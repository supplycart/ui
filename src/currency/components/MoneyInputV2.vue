<template>
    <div>
        <slot name="label">
            <FormLabel
                :id="$attrs.id"
                :label="label"
                :required="required"
                :disabled="disabled"
            />
        </slot>

        <MoneyInputBase
            v-model="input"
            v-bind="$attrs"
            :class="[showError ? 'input-error' : '', inputClass]"
            :disabled="disabled"
            :required="required"
            @keydown="$emit('keydown')"
        />

        <slot name="error">
            <p v-if="showError" class="italic text-red-600 text-xs mt-2">
                {{ error }}
            </p>
        </slot>
        <slot name="description" />
    </div>
</template>
<script>
import MoneyInputBase from "./MoneyInputV2Base.vue";
import FormLabel from "../../form/components/FormLabel.vue";

export default {
    components: {
        FormLabel,
        MoneyInputBase,
    },
    emits: ["update:modelValue", "input", "keydown"],
    props: {
        label: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: [Number, String],
            default: 0,
        },
        // Keep value for backward compatibility
        value: {
            type: [Number, String],
            default: 0,
        },
        inputClass: {
            type: [String, Object],
            default: null,
        },
    },
    computed: {
        input: {
            get() {
                // Use modelValue if provided, otherwise fall back to value for backward compatibility
                return this.modelValue !== undefined
                    ? this.modelValue
                    : this.value;
            },
            set(value) {
                this.$emit("update:modelValue", value);
                // Keep backward compatibility with input event
                this.$emit("input", value);
            },
        },
    },
    data() {
        return {
            showError: false,
        };
    },
};
</script>
