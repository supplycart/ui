<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="label" :for="$attrs.id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>

        <textarea
            :value="modelValue"
            :rows="rows"
            v-bind="$attrs"
            :placeholder="placeholder"
            class="h-textarea"
            :class="[showError ? 'error' : '', inputClass]"
            :required="required"
            @input="handleInput"
            @blur="blur"
            @focus="focus"
            @keydown="keydown"
        />

        <slot name="error">
            <p v-if="showError" class="text-error">
                {{ error }}
            </p>
        </slot>

        <slot name="description">
            <p v-if="description" class="text-desc">
                {{ description }}
            </p>
        </slot>
    </div>
</template>
<style>
.h-textarea {
    resize: none;
    overflow-y: auto;
}
</style>
<script>
import InputMixins from "../mixins/input";
export default {
    mixins: [InputMixins],
    inheritAttrs: false,
    emits: ["update:modelValue", "keydown"],
    props: {
        rows: {
            type: Number,
            default: 4,
        },
        placeholder: {
            type: String,
        },
    },
    data() {
        return {
            focused: false,
        };
    },
    computed: {
        showError() {
            return (
                this.error && this.required && !this.modelValue && this.focused
            );
        },
    },
    methods: {
        handleInput(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        focus(e) {
            this.focused = true;
        },
        keydown() {
            this.$emit("keydown");
        },
    },
};
</script>
