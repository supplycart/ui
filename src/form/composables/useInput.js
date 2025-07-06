import { ref } from "vue"

export function useInput(emit) {
    // Reactive state
    const regex = ref(null)

    // Methods
    const blur = (e) => {
        emit("blur", e)
    }

    const update = (e) => {
        emit("update:modelValue", e)
    }

    return {
        regex,
        blur,
        update,
    }
}

// Common props definition for input components
export const inputProps = {
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
}

// Common emits definition for input components
export const inputEmits = ["update:modelValue", "blur"]