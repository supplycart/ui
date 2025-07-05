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
                !!errorMessage ? 'input-error dropdown-input-error' : '',
                inputClass,
            ]"
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
            originalValue: this.value,
            errorMessage: this.error,
            emptyMessage: "Please fill in this field",
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

                if (Array.isArray(e) ? e.length == 0 : e == null) {
                    this.errorMessage = this.emptyMessage;
                } else {
                    this.errorMessage = null;
                }
            },
        },
        isEmpty() {
            return Array.isArray(this.value)
                ? this.value.length == 0
                : this.value == null;
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
