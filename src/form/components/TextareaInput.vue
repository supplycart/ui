<script setup>
import { useInput } from "../composables/useInput";
import { ref, computed } from "vue";

const props = defineProps({
    label: { type: String },
    modelValue: { type: String, default: "" },
    error: { type: String },
    inputClass: { type: String },
    description: { type: String },
    required: { type: Boolean, default: false },
    rows: { type: Number, default: 4 },
    placeholder: { type: String },
});

const emit = defineEmits(["update:modelValue", "keydown", "blur"]);

const { blur } = useInput(emit);
const focused = ref(false);

const showError = computed(() => {
    return props.error && props.required && !props.modelValue && focused.value;
});

const handleInput = (e) => {
    emit("update:modelValue", e.target.value);
};

const focus = (e) => {
    focused.value = true;
};

const keydown = () => {
    emit("keydown");
};

defineOptions({
    inheritAttrs: false,
});
</script>

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
