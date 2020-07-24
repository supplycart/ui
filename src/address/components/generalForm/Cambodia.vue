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
                    class="w-full mb-4"
                    :disabled="disabledFields['floor']"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Building"
                    v-model="value.building"
                    class="w-full mb-4"
                    :disabled="disabledFields['building']"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <TextInput
                label="Street"
                v-model="value.street"
                :required="true"
                :disabled="disabledFields['street']"
                class="w-full mr-4 mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="District"
                    v-model="value.city"
                    :required="true"
                    :disabled="disabledFields['city']"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Postcode"
                    v-model="value.postcode"
                    :required="true"
                    :disabled="disabledFields['postcode']"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="Province"
                    v-model="value.state"
                    :required="true"
                    :disabled="disabledFields['state']"
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
    name: "CambodiaDefaultAddressForm",
    mixins: [AddressFormMixins],
    components: {
        TextInput
    }
};
</script>