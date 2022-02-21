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
                <portal-target name="address-branch-name" class="italic" />
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
                <portal-target name="address-unit" class="italic" />
            </div>
            <div v-if="addressCountryConfig.floor" class="mb-4">
                <TextInput
                    label="Floor"
                    v-model="value.floor"
                    :disabled="disabledFields['floor']"
                    class="w-full"
                    input-class="p-2 rounded border border-gray-200"
                />
                <portal-target name="address-floor" class="italic" />
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
            <portal-target name="address-building" class="italic" />
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
            <portal-target name="address-street" class="italic" />
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
                <portal-target name="address-city" class="italic" />
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
                <portal-target name="address-city" class="italic" />
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
                <portal-target name="address-postcode" class="italic" />
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
                <portal-target name="address-postcode" class="italic" />
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
                <portal-target name="address-state" class="italic" />
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
                <portal-target name="address-country" class="italic" />
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
import Checkbox from "../../form/components/Checkbox";
import TextInput from "../../form/components/TextInput";
import AddressFormMixins from "../mixins/addressForm";
import StateMixins from "../mixins/malaysiaStates";

export default {
    name: "DeliveryAddressForm",
    components: { TextInput, Checkbox },
    mixins: [AddressFormMixins, StateMixins],
};
</script>
