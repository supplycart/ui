<template>
    <div>
        <div>
            <div class="mb-4">
                <TextInput
                    label="Branch Name"
                    v-model="value.branch_name"
                    :disabled="disabledFields['branch_name']"
                    :required="true"
                    class="w-full mr-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
        </div>

        <div class="grid grid-cols-3 gap-2">
            <div v-if="addressCountryConfig.unit" class="mb-4">
                <TextInput
                    label="Unit"
                    v-model="value.unit"
                    :disabled="disabledFields['unit']"
                    class="w-full"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div v-if="addressCountryConfig.floor" class="mb-4">
                <TextInput
                    label="Floor"
                    v-model="value.floor"
                    :disabled="disabledFields['floor']"
                    class="w-full"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div v-if="addressCountryConfig.building" class="mb-4">
                <TextInput
                    label="Building"
                    v-model="value.building"
                    :disabled="disabledFields['building']"
                    class="w-full"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
        </div>
        <div v-if="addressCountryConfig.street" class="mb-4">
            <TextInput
                label="Street"
                v-model="value.street"
                :disabled="disabledFields['street']"
                :required="true"
                class="w-full mr-4"
                input-class="p-2 rounded border border-gray-200"
            />
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div v-if="addressCountryConfig.city" class="mb-4">
                <TextInput
                    label="City"
                    v-model="value.city"
                    :disabled="disabledFields['city']"
                    :required="true"
                    class="w-full mr-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>

            <div v-if="addressCountryConfig.district" class="mb-4">
                <TextInput
                    label="District"
                    v-model="value.city"
                    :disabled="disabledFields['city']"
                    :required="true"
                    class="w-full mr-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>

            <div v-if="addressCountryConfig.postcode" class="mb-4">
                <TextInput
                    label="Postcode"
                    v-model="value.postcode"
                    :disabled="disabledFields['postcode']"
                    :required="true"
                    class="w-full mr-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div v-if="addressCountryConfig.zipcode" class="mb-4">
                <TextInput
                    label="Zipcode"
                    v-model="value.postcode"
                    :disabled="disabledFields['postcode']"
                    :required="true"
                    class="w-full mr-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-2">
            <div v-if="addressCountryConfig.state">
                <label for="state">
                    State <small class="italic text-red-600">*</small>
                </label>
                <VSelect
                    :disabled="disabledFields['state']"
                    :options="states"
                    v-model="value.state"
                    class="mt-2 select-country"
                ></VSelect>
            </div>

            <div>
                <label for="country">
                    Country <small class="italic text-red-600">*</small>
                </label>
                <VSelect
                    :disabled="disabledFields['country']"
                    :options="countries"
                    v-model="setCountry"
                    class="mt-2 select-country"
                ></VSelect>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <TextInput
                label="Branch ID"
                v-model="value.ref_no"
                :disabled="disabledFields['ref_no']"
                class="w-full mr-4 mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
        </div>
        <div class="mt-2">
            <div>
                <Checkbox
                    label="This address has lift access (uncheck if none)"
                    v-model="value.lift_access"
                    :disabled="disabledFields['lift_access']"
                    input-class="mr-2 form-checkbox h-4 w-4"
                />
            </div>
            <div>
                <Checkbox
                    label="This address requires delivery permit (tick if permit required)"
                    v-model="value.requires_permit"
                    :disabled="disabledFields['requires_permit']"
                    input-class="mr-2 form-checkbox h-4 w-4"
                />
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
import Checkbox from "../../form/components/Checkbox.vue";

export default defineComponent({
    name: "DeliveryAddressForm",
    components: {
        TextInput,
        Checkbox,
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
        const { LABELS, addressCountryConfig, disabledFields } = useAddressForm(props);
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
            LABELS,
            addressCountryConfig,
            disabledFields,
            states,
            countries: props.countries,
        };
    },
});
</script>
