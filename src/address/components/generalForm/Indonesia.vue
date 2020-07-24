<template>
    <div>
        <div>
            <div class="grid grid-cols-3 gap-2">
                <TextInput
                    label="Unit"
                    v-model="value.unit"
                    :disabled="disabledFields['unit']"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Floor"
                    v-model="value.floor"
                    :disabled="disabledFields['floor']"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Building"
                    v-model="value.building"
                    :disabled="disabledFields['building']"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <TextInput
                label="Street"
                v-model="value.street"
                :disabled="disabledFields['street']"
                :required="true"
                class="w-full mr-4 mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="City"
                    v-model="value.city"
                    :disabled="disabledFields['city']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Postcode"
                    v-model="value.postcode"
                    :disabled="disabledFields['postcode']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="State"
                    v-model="value.state"
                    :disabled="disabledFields['state']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                 <div>
                    <label for="country" >
                        Country <small class="italic text-red-600" >*</small>
                    </label>
                    <VSelect :options="countries" :disabled="disabledFields['country']" v-model="setCountry" class="mt-2 select-country"></VSelect>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import TextInput from "../../../form/components/TextInput";
import AddressFormMixins from '../../mixins/addressForm'
export default {
    name: "IndonesiaDefaultAddressForm",
    mixins: [AddressFormMixins],
    props: {
        value: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>