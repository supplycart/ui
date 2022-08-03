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
            class="h-textarea"
            :class="[showError || isInvalid ? 'error' : '', inputClass]"
            :required="required"
            @focus="focus"
            @blur="blur"
            @keydown="charCount($event)"
        />

        <slot name="counter" :counter="charLeft">
            <p v-if="charLeft >= 0" class="text-desc">
                {{ charLeft }} characters left
            </p>
        </slot>

        <slot name="error" :invalid="isInvalid">
            <p v-if="showError" class="text-error">
                {{ error }}
            </p>
            <p v-if="isInvalid && !showError" class="text-error">
                {{ format }}
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
export default {
    inheritAttrs: false,
    props: {
        id: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        value: {
            type: String,
            default: null,
        },
        error: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        regex: {
            type: RegExp,
            default: () => /^.{0,255}$/,
        },
        required: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: "Max 255 characters",
        },
        inputClass: {
            type: String,
            default: null,
        },
        rows: {
            type: Number,
            default: 4,
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
                var str = e.slice(0, 255);
                this.$emit("input", str);
                this.$forceUpdate();
            },
        },
        showError() {
            return this.error && this.required && !this.input && this.focused;
        },
        isInvalid() {
            if (!this.regex) return false;
            const value = this.input ? this.input.length <= 255 : false;

            return !value && this.focused && this.input;
        },
        charLeft() {
            return this.input ? 255 - this.input.length : 255;
        },
    },
    methods: {
        blur(e) {
            this.$emit("blur", e);
        },
        focus(e) {
            this.focused = true;
        },
        charCount(event) {
            if (!this.input) return;

            if (this.input.length >= 255) {
                if (event.keyCode >= 48 && event.keyCode <= 90) {
                    event.preventDefault();
                    return;
                }
            }
            this.$emit("keydown");
        },
    },
};
</script>
