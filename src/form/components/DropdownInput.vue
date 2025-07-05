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
            :model-value="modelValue"
            v-bind="$attrs"
            :disabled="disabled"
            :options="options"
            :class="[
                !!errorMessage ? 'input-error dropdown-input-error' : '',
                inputClass,
            ]"
            @update:model-value="handleUpdate"
            @search="search"
            @close="blur"
            @open="open"
            @option:deselecting="optionDeselecting"
            :taggable="taggable"
            :multiple="multiple"
            append-to-body
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
            <p v-if="!!errorMessage" class="italic text-red-600 text-xs mt-2">
                {{ errorMessage }}
            </p>
        </slot>
    </div>
</template>

<script>
import VSelect from "vue-select";
export default {
    components: { VSelect },
    emits: ["update:modelValue", "search", "blur", "open", "deselecting"],
    props: {
        id: {
            type: String,
            default: null,
        },
        formLabel: {
            type: String,
            default: null,
        },
        modelValue: {
            type: [String, Number, Array, Object, Boolean],
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
            originalValue: this.modelValue,
            errorMessage: this.error,
            emptyMessage: "Please fill in this field",
        };
    },
    computed: {
        isEmpty() {
            return Array.isArray(this.modelValue)
                ? this.modelValue.length == 0
                : this.modelValue == null;
        },
    },
    watch: {
        error: {
            handler(message) {
                this.errorMessage = message;
            },
        },
    },
    methods: {
        handleUpdate(e) {
            this.focused = false;
            this.$emit("update:modelValue", e);

            if (Array.isArray(e) ? e.length == 0 : e == null) {
                this.errorMessage = this.emptyMessage;
            } else {
                this.errorMessage = null;
            }
        },
        search(e) {
            this.$emit("search", e);
        },
        blur() {
            this.$emit("blur");
            if (this.required && this.isEmpty) {
                this.errorMessage = this.emptyMessage;
            }
        },
        open() {
            this.focused = true;
            this.$emit("open");
        },
        optionDeselecting(option) {
            this.$emit("deselecting", option);
        },
    },
};
</script>

<style scoped>
.dropdown-input-error {
    border-radius: 5px;
}
</style>
