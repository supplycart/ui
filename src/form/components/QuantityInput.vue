<script setup>
import BaseInput from "./BaseInput.vue";
import { useInput } from "../composables/useInput";
import { ref, computed, onMounted, nextTick, getCurrentInstance } from "vue";
import numeral from "numeral";

const props = defineProps({
    label: { type: String },
    modelValue: { type: [String, Number], default: "" },
    error: { type: String },
    inputClass: { type: String },
    description: { type: String },
    required: { type: Boolean, default: false },
    maximumValue: { type: Number, default: null },
    minimumValue: { type: Number, default: null },
    maxDecimal: { type: Number, default: 0 },
    minDecimal: { type: Number, default: 0 },
    allowNegative: { type: Boolean, default: true },
    nullable: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "error", "keydown", "blur"]);

const { blur: useInputBlur } = useInput(emit);
const instance = getCurrentInstance();

const onFocus = ref(false);
const showMaxValueError = ref(null);
const showMinValueError = ref(null);

const maxValueErrorMessage = computed(() => `Maximum number allowed is ${props.maximumValue}`);
const minValueErrorMessage = computed(() => `Minimum number allowed is ${props.minimumValue}`);

const formattedInput = computed(() => {
    if (props.nullable && (props.modelValue == "" || props.modelValue == null)) {
        return null;
    }
    return numeral(props.modelValue).format(numeralFormat.value);
});

const numeralFormat = computed(() => {
    let format = "0,0";
    if (props.minDecimal > 0) {
        format += ".";
        let i = 0;
        while (i < props.minDecimal) {
            format += "0";
            i++;
        }
        if (props.maxDecimal > props.minDecimal) {
            const remainingDP = props.maxDecimal - props.minDecimal;
            let appendOptionalDP = "";
            let i = 0;
            while (i < remainingDP) {
                appendOptionalDP += "0";
                i++;
            }
            format = `${format}[${appendOptionalDP}]`;
        }
    }
    return format;
});

const getEmitValue = (value) => {
    let emitValue = value;
    if (!props.allowNegative && value < 0) {
        emitValue = Number(value) * -1;
    }

    if (props.maximumValue != null && emitValue > props.maximumValue) {
        showMaxValueError.value = maxValueErrorMessage.value;
        emitValue = props.maximumValue;
        emit("error", maxValueErrorMessage.value);
    } else {
        showMaxValueError.value = null;
    }

    if (props.minimumValue != null && emitValue < props.minimumValue) {
        showMinValueError.value = minValueErrorMessage.value;
        emit("error", minValueErrorMessage.value);
    } else {
        showMinValueError.value = null;
    }

    return emitValue;
};

const update = (e) => {
    emit("update:modelValue", getEmitValue(e));
};

const blur = (e) => {
    emit("blur", e);
    onFocus.value = false;
};

const focus = () => {
    nextTick(() => {
        const input = instance.proxy.$el.querySelector("input");
        input.focus();
        input.select();
    });
};

const keydown = () => {
    emit("keydown");
};

const handleFocus = () => {
    onFocus.value = true;
    focus();
};

onMounted(() => {
    if (props.maximumValue != null && props.modelValue > props.maximumValue) {
        update(props.maximumValue);
    }
});
</script>

<template>
    <BaseInput
        v-if="onFocus"
        v-bind="$attrs"
        type="number"
        :max="maximumValue"
        :min="minimumValue"
        :label="label"
        :model-value="modelValue"
        :error="error || showMaxValueError || showMinValueError"
        :description="description"
        :required="required"
        :input-class="inputClass"
        @update:model-value="update"
        @blur="blur"
        @keydown="keydown"
    />
    <BaseInput
        v-else
        v-bind="$attrs"
        type="text"
        :label="label"
        :model-value="formattedInput"
        :error="error || showMaxValueError || showMinValueError"
        :description="description"
        :required="required"
        :input-class="inputClass"
        @focus="handleFocus"
    />
</template>
