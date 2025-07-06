<script setup>
import BaseInput from "./BaseInput.vue";
import { useInput } from "../composables/useInput";
import { ref } from "vue";

const props = defineProps({
    label: { type: String },
    modelValue: { type: String, default: "" },
    error: { type: String },
    inputClass: { type: String },
    description: { type: String },
    required: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "blur"]);

const { blur } = useInput(emit);
const regex = ref(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-]?[\s./0-9]*[x]?[\s./0-9]*$/);

const update = (e) => {
    const val = e.replace(/[^0-9+-\sx]/g, "");
    emit("update:modelValue", val);
};
</script>

<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :model-value="modelValue"
        :regex="regex"
        :error="error"
        :input-class="inputClass"
        :description="description"
        :required="required"
        @update:model-value="update"
        @blur="blur"
    />
</template>
