<template>
    <div>
        <div>
            <div class="grid grid-cols-3 gap-2">
                <div class="mb-4">
                    <TextInput
                        label="Unit"
                        v-model="value.unit"
                        :disabled="disabledFields['unit']"
                        class="w-full"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-unit" />
                </div>

                <div class="mb-4">
                    <TextInput
                        label="Floor"
                        v-model="value.floor"
                        :disabled="disabledFields['floor']"
                        class="w-full"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-floor" />
                </div>

                <div class="mb-4">
                    <TextInput
                        label="Building"
                        v-model="value.building"
                        :disabled="disabledFields['building']"
                        class="w-full"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-building" />
                </div>
            </div>
            <div class="mb-4">
                <TextInput
                    label="Street"
                    v-model="value.street"
                    :disabled="disabledFields['street']"
                    :required="true"
                    class="w-full mr-4"
                    input-class="p-2 rounded border border-gray-200"
                />
                <portal-target name="address-street" />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div class="mb-4">
                    <TextInput
                        label="District"
                        v-model="value.city"
                        :disabled="disabledFields['city']"
                        :required="true"
                        class="w-full mr-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-district" />
                </div>

                <div>
                    <label for="country">
                        Country <small class="italic text-red-600">*</small>
                    </label>
                    <VSelect
                        :options="countries"
                        :disabled="disabledFields['country']"
                        v-model="setCountry"
                        class="mt-2 select-country"
                    ></VSelect>
                    <portal-target name="address-country" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TextInput from "../../../form/components/TextInput";
import AddressFormMixins from "../../mixins/addressForm";
export default {
    name: "JapanDefaultAddressForm",
    mixins: [AddressFormMixins],
    components: {
        TextInput,
    },
};
</script>
