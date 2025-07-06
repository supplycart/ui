<script setup>
import { computed } from "vue";
import { useAddressForm } from "../composables/useAddressForm";
import { useMalaysiaStates } from "../composables/useMalaysiaStates";
import "vue-select/dist/vue-select.css";
import VSelect from "vue-select";
import TextInput from "../../form/components/TextInput.vue";

const props = defineProps({
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
});

const emit = defineEmits(["update:modelValue", "changeCountry"]);

const { labels: LABELS, addressCountryConfig, disabledFields } = useAddressForm(props);
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
</script>

<template>
    <div>
        <div>
            <TextInput
                label="Billing Entity Name"
                :model-value="value.entity_name"
                @update:model-value="(val) => (value.entity_name = val)"
                :disabled="disabledFields['entity_name']"
                :required="true"
                class="w-full mb-4"
                input-class="p-2 rounded border border-gray-200"
            />

            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="Finance PIC Name"
                    :model-value="value.pic_name"
                    @update:model-value="(val) => (value.pic_name = val)"
                    :disabled="disabledFields['pic_name']"
                    :required="true"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Finance PIC Phone No."
                    :model-value="value.pic_phone"
                    @update:model-value="(val) => (value.pic_phone = val)"
                    :disabled="disabledFields['pic_phone']"
                    :required="true"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>

            <div class="grid grid-cols-3 gap-2">
                <TextInput
                    v-if="addressCountryConfig.unit"
                    label="Unit"
                    :model-value="value.unit"
                    @update:model-value="(val) => (value.unit = val)"
                    :disabled="disabledFields['unit']"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    v-if="addressCountryConfig.floor"
                    label="Floor"
                    :model-value="value.floor"
                    @update:model-value="(val) => (value.floor = val)"
                    :disabled="disabledFields['floor']"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    v-if="addressCountryConfig.building"
                    label="Building"
                    :model-value="value.building"
                    @update:model-value="(val) => (value.building = val)"
                    :disabled="disabledFields['building']"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div>
                <TextInput
                    v-if="addressCountryConfig.street"
                    label="Street"
                    :model-value="value.street"
                    @update:model-value="(val) => (value.street = val)"
                    :disabled="disabledFields['street']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    v-if="addressCountryConfig.city"
                    label="City"
                    :model-value="value.city"
                    @update:model-value="(val) => (value.city = val)"
                    :disabled="disabledFields['city']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    v-if="addressCountryConfig.district"
                    label="District"
                    :model-value="value.city"
                    @update:model-value="(val) => (value.city = val)"
                    :disabled="disabledFields['city']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    v-if="addressCountryConfig.postcode"
                    label="Postcode"
                    :model-value="value.postcode"
                    @update:model-value="(val) => (value.postcode = val)"
                    :disabled="disabledFields['postcode']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    v-if="addressCountryConfig.zipcode"
                    label="Zipcode"
                    :model-value="value.postcode"
                    @update:model-value="(val) => (value.postcode = val)"
                    :disabled="disabledFields['postcode']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div v-if="addressCountryConfig.state">
                    <label for="state">
                        State <small class="italic text-red-600">*</small>
                    </label>
                    <VSelect
                        :disabled="disabledFields['state']"
                        :options="states"
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
                        :model-value="setCountry"
                        @update:model-value="(val) => (setCountry = val)"
                        :disabled="disabledFields['country']"
                        :required="true"
                        :clearable="false"
                        class="mt-2 select-country"
                    ></VSelect>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    :label="LABELS.E_INVOICE_MAILBOX"
                    :model-value="value.einvoice_email"
                    @update:model-value="(val) => (value.einvoice_email = val)"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
                <TextInput
                    label="Registration No."
                    :model-value="value.registration_no"
                    @update:model-value="(val) => (value.registration_no = val)"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    :label="LABELS.BILLING_ENTITY_CODE"
                    :model-value="value.ref_no"
                    @update:model-value="(val) => (value.ref_no = val)"
                    :disabled="disabledFields['ref_no']"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
        </div>
    </div>
</template>
