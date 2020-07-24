<template>
    <div>
        <TextInput
            label="Branch Name"
            v-model="value.branch_name"
            :required="true"
            class="w-full mr-4 mb-4"
            input-class="p-2 rounded border border-gray-200"
        />
        <div>
            <div class="grid grid-cols-3 gap-2">
                <TextInput
                    label="Unit"
                    v-model="value.unit"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Floor"
                    v-model="value.floor"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Building"
                    v-model="value.building"
                    class="w-full mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <TextInput
                label="Street"
                v-model="value.street"
                :required="true"
                class="w-full mr-4 mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="City"
                    v-model="value.city"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Postcode"
                    v-model="value.postcode"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="State"
                    v-model="value.state"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <div>
                    <label for="country" >
                        Country <small class="italic text-red-600" >*</small>
                    </label>
                    <VSelect :options="countries" v-model="setCountry" class="mt-2 select-country"></VSelect>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <div>
                <Checkbox
                    label="This address has lift access (uncheck if none)"
                    v-model="value.lift_access"
                    input-class="mr-2 form-checkbox h-4 w-4"
                />
            </div>
            <div>
                <Checkbox
                    label="This address requires delivery permit (tick if permit required)"
                    v-model="value.requires_permit"
                    input-class="mr-2 form-checkbox h-4 w-4"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from "../../../form/components/TextInput";
import Checkbox from "../../../form/components/Checkbox";
import AddressFormMixins from '../../mixins/addressForm'
export default {
    name: "IndonesiaDeliveryAddressForm",
    components: { TextInput, Checkbox },
    mixins: [AddressFormMixins]
};
</script>