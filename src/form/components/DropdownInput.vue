<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="formLabel" :for="$attrs.id">
                {{ formLabel }}
                <small v-if="required" class="italic text-red-600">*</small>
                <slot name="info" />
            </label>
        </slot>

        <VSelect
            v-model="input"
            v-bind="$attrs"
            :disabled="disabled"
            :options="options"
            :class="[
                showError ? 'input-error dropdown-input-error' : '',
                inputClass,
            ]"
            @search="search"
            @close="blur"
            @open="open"
            :taggable="taggable"
            :multiple="multiple"
            appendToBody
        >
            <template #option="option">
                <slot name="option" :option="option" />
            </template>
            <template #no-options>
                <slot name="no-option" />
            </template>
            <template #selected-option="option">
                <slot name="selected-option" :option="option" />
            </template>
        </VSelect>
        <slot name="error">
            <p v-if="showError" class="italic text-red-600 text-xs mt-2">
                {{ errorMessage }}
            </p>
        </slot>
    </div>
</template>

<script>
import VSelect from "vue-select";
export default {
    components: { VSelect },
    props: {
        id: {
            type: String,
            default: null,
        },
        formLabel: {
            type: String,
            default: null,
        },
        value: {
            type: [String, Number, Array],
            default: null,
        },
        error: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        inputClass: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        taggable: {
            type: Boolean,
            default: false,
        },
        invalid: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            focused: false,
            originalValue: this.value,
        };
    },
    computed: {
        input: {
            get() {
                return this.value;
            },
            set(e) {
                this.focused = false;
                this.$emit("input", e);
            },
        },
        isEmpty() {
            return Array.isArray(this.value)
                ? this.value.length == 0
                : this.value == null;
        },
        showError() {
            return (
                (this.required && this.focused && this.isEmpty) ||
                (this.error !== null && this.originalValue == this.value) ||
                this.invalid
            );
        },
        errorMessage() {
            if (this.required && this.focused && this.isEmpty) {
                return "Please fill in this field";
            } else {
                return this.error;
            }
        },
    },
    methods: {
        search(e) {
            this.$emit("search", e);
        },
        blur() {
            this.$emit("blur");
        },
        open() {
            this.focused = true;
            this.$emit("open");
        },
    },
};
</script>

<style scoped>
.dropdown-input-error {
    border-radius: 5px;
}
</style>
