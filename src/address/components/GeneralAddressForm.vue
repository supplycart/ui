<template>
    <div>
        <div>
            <div class="grid grid-cols-3 gap-2">
                <div v-if="addressCountryConfig.unit">
                    <TextInput
                        label="Unit"
                        :model-value="value.unit"
                        @update:model-value="(val) => (value.unit = val)"
                        :disabled="disabledFields['unit']"
                        class="w-full mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>

                <div v-if="addressCountryConfig.floor">
                    <TextInput
                        label="Floor"
                        :model-value="value.floor"
                        @update:model-value="(val) => (value.floor = val)"
                        :disabled="disabledFields['floor']"
                        class="w-full mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>

                <div v-if="addressCountryConfig.building">
                    <TextInput
                        label="Building"
                        :model-value="value.building"
                        @update:model-value="(val) => (value.building = val)"
                        :disabled="disabledFields['building']"
                        class="w-full mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>
            </div>
            <div>
                <div v-if="addressCountryConfig.street">
                    <TextInput
                        label="Street"
                        :model-value="value.street"
                        @update:model-value="(val) => (value.street = val)"
                        :disabled="disabledFields['street']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div v-if="addressCountryConfig.city">
                    <TextInput
                        label="City"
                        :model-value="value.city"
                        @update:model-value="(val) => (value.city = val)"
                        :disabled="disabledFields['city']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>

                <div v-if="addressCountryConfig.district">
                    <TextInput
                        label="District"
                        :model-value="value.city"
                        @update:model-value="(val) => (value.city = val)"
                        :disabled="disabledFields['city']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>

                <div v-if="addressCountryConfig.postcode">
                    <TextInput
                        label="Postcode"
                        :model-value="value.postcode"
                        @update:model-value="(val) => (value.postcode = val)"
                        :disabled="disabledFields['postcode']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>
                <div v-if="addressCountryConfig.zipcode">
                    <TextInput
                        label="Postcode"
                        :model-value="value.postcode"
                        @update:model-value="(val) => (value.postcode = val)"
                        :disabled="disabledFields['postcode']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div v-if="addressCountryConfig.state">
                    <label for="state">
                        State <small class="italic text-red-600">*</small>
                    </label>
                    <VSelect
                        :options="states"
                        :disabled="disabledFields['state']"
                        :model-value="value.state"
                        @update:model-value="(val) => (value.state = val)"
                        class="mt-2 select-country"
                    ></VSelect>
                </div>

                <div>
                    <label for="country">
                        Country <small class="italic text-red-600">*</small>
                    </label>
                    <VSelect
                        :options="countries"
                        :disabled="disabledFields['country']"
                        :model-value="setCountry"
                        @update:model-value="(val) => (setCountry = val)"
                        class="mt-2 select-country"
                    ></VSelect>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useAddressForm } from "../composables/useAddressForm";
import { useMalaysiaStates } from "../composables/useMalaysiaStates";
import "vue-select/dist/vue-select.css";
import VSelect from "vue-select";
import TextInput from "../../form/components/TextInput.vue";

export default defineComponent({
    name: "GeneralAddressForm",
    components: {
        TextInput,
        VSelect,
    },
    props: {
        modelValue: {
            type: Object,
            default: () => ({}),
        },
        countries: {
            type: [Object, Array],
            default: () => ["Malaysia"],
        },
        disableFields: {
            type: Array,
            default: () => [],
        },
    },
    emits: ["update:modelValue", "changeCountry"],
    setup(props, { emit }) {
        const { addressCountryConfig, disabledFields } = useAddressForm(props);
        const { states } = useMalaysiaStates();

        const value = computed({
            get() {
                return props.modelValue || {};
            },
            set(newValue) {
                emit("update:modelValue", newValue);
            },
        });

        const setCountry = computed({
            get() {
                return value.value.country || "Malaysia";
            },
            set(newCountry) {
                const updatedValue = { ...value.value, country: newCountry };
                emit("update:modelValue", updatedValue);
                emit("changeCountry", newCountry);
            },
        });

        return {
            value,
            setCountry,
            addressCountryConfig,
            disabledFields,
            states,
            countries: props.countries,
        };
    },
});
</script>
