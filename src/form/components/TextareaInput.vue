<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="label" :for="$attrs.id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>

        <textarea
            v-model="input"
            :rows="rows"
            v-bind="$attrs"
            :placeholder="placeholder"
            class="h-textarea"
            :class="[showError ? 'error' : '', inputClass]"
            :required="required"
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
        input: {
            get() {
                return this.value;
            },
            set(e) {
                this.$emit("input", e);
            },
        },
        showError() {
            return this.error && this.required && !this.input && this.focused;
        },
    },
    methods: {
        focus(e) {
            this.focused = true;
        },
        keydown() {
            this.$emit("keydown");
        },
    },
};
</script>
