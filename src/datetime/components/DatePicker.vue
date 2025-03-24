<template>
    <div>
        <FormLabel
            :id="id"
            :label="label"
            :required="required"
            :disabled="disabled"
            :class="labelClass"
        />
        <FlatPickr
            :id="id"
            v-model="input"
            :config="dateConfig"
            :disabled="disabled"
        />
    </div>
</template>

<script>
import FlatPickr from "vue-flatpickr-component";
import { Timezones } from "../constants";
import { DefaultConfig } from "../constants/flatpickr";

export default {
    components: {
        FlatPickr,
        FormLabel: () => import("../../form/components/FormLabel.vue"),
    },
    props: {
        id: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        labelClass: {
            type: String,
            default: "inline-block mb-2",
        },
        value: {
            type: [String, Date],
            default: null,
        },
        timezone: {
            type: [String, Object],
            default() {
                return Timezones.MALAYSIA.timezone;
            },
        },
        config: {
            type: Object,
            default: () => {},
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            dateConfig: {},
        };
    },
    computed: {
        input: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
    watch: {
        config: {
            handler: function (val) {
                this.dateConfig = {
                    ...DefaultConfig,
                    ...val,
                };
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>
