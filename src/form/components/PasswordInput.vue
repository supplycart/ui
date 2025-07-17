<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="label" :for="id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>
        
        <div class="relative">
            <input
                :id="id"
                :value="modelValue"
                v-bind="filteredAttrs"
                :type="type"
                :required="required"
                :class="[
                    'w-full pr-10',
                    { 'input-error': error || isInvalid },
                    inputClass,
                    attrsClass,
                ]"
                @input="update"
                @blur="blur"
            />
            <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-600 transition-colors duration-150 focus:outline-none"
                @click="togglePassword"
            >
                <EyeOff v-if="showPassword" :size="18" />
                <Eye v-else :size="18" />
            </button>
        </div>

        <slot name="error" :invalid="isInvalid">
            <p v-if="error" class="text-error">
                {{ error }}
            </p>
            <p v-if="isInvalid && !error" class="text-error">
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
<script setup>
import { ref, computed } from "vue";
import { Eye, EyeOff } from "lucide-vue";
import { useFilteredAttrs } from "../composables/useFilteredAttrs.js";

// Define props
const props = defineProps({
    id: {
        type: String,
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
    modelValue: {
        type: [String, Number],
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
    required: {
        type: Boolean,
        default: false,
    },
    inputClass: {
        type: String,
        default: null,
    },
    format: {
        type: String,
        default: "Password must be at least 8 characters",
    },
});

// Define emits
const emit = defineEmits(["update:modelValue", "blur"]);

// Define computed properties
const type = computed(() => (showPassword.value ? "text" : "password"));

const isInvalid = computed(() => {
    if (!regex.value) return false;
    const value = regex.value.test(props.modelValue?.toString() || "");
    return !value && props.modelValue;
});

// Methods
const blur = (e) => {
    emit("blur", e);
};

const update = (e) => {
    console.log(e.target.value)
    const target = e.target;
    emit("update:modelValue", target.value);
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

// Reactive state
const showPassword = ref(false);

// Password-specific regex (minimum 8 characters)
const regex = ref(/^(.{8,})+/);

// Use filtered attrs to handle Vue 3 compatibility
const { filteredAttrs, attrsClass } = useFilteredAttrs();

// Define options
defineOptions({
    inheritAttrs: false,
});
</script>
