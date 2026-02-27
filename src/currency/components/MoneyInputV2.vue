<script setup>
import { computed, ref } from "vue";
import MoneyInputBase from "./MoneyInputV2Base.vue";
import FormLabel from "../../form/components/FormLabel.vue";
import { useFilteredAttrs } from "../../form/composables/useFilteredAttrs.js";

const props = defineProps({
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
    value: {
        type: [Number, String],
        default: 0,
    },
    inputClass: {
        type: [String, Object],
        default: null,
    },
});

const emit = defineEmits(["update:modelValue", "input", "keydown"]);

const showError = ref(false);

const input = computed({
    get() {
        return props.modelValue !== undefined ? props.modelValue : props.value;
    },
    set(value) {
        emit("update:modelValue", value);
        emit("input", value);
    },
});

const handleKeydown = () => {
    emit("keydown");
};

// Use filtered attrs to handle Vue 3 compatibility
const { filteredAttrs, attrsClass } = useFilteredAttrs();

// Define options
defineOptions({
    inheritAttrs: false,
});
</script>

<template>
    <div>
        <slot name="label">
            <FormLabel
                :id="filteredAttrs.id"
                :label="label"
                :required="required"
                :disabled="disabled"
            />
        </slot>

        <MoneyInputBase
            v-model="input"
            v-bind="filteredAttrs"
            :class="[showError ? 'input-error' : '', inputClass, attrsClass]"
            :disabled="disabled"
            :required="required"
            @keydown="handleKeydown"
        />

        <slot name="error">
            <p v-if="showError" class="italic text-red-600 text-xs mt-2">
                {{ error }}
            </p>
        </slot>
        <slot name="description" />
    </div>
</template>
