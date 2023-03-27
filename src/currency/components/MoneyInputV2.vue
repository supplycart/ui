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
import FormLabel from "../../form/components/FormLabel.vue";
import MoneyInputBase from "./MoneyInputV2Base.vue";
export default {
    components: {
        FormLabel,
        MoneyInputBase,
    },
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
                return this.value;
            },
            set(value) {
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
