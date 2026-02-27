export default {
    inheritAttrs: false,
    emits: ["update:modelValue", "blur"],
    props: {
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
    },
    data() {
        return {
            regex: null,
        };
    },
    methods: {
        blur(e) {
            this.$emit("blur", e);
        },
        update(e) {
            this.$emit("update:modelValue", e);
        },
    },
};
