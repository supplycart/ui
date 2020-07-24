<template>
    <div>
        <TextInput
            label="Billing Entity Name"
            v-model="value.entity_name"
            :required="true"
            class="w-full mb-4"
            input-class="p-2 rounded border border-gray-200"
        />
        <div class="grid grid-cols-2 gap-2">
            <TextInput
                label="Finance PIC Name"
                v-model="value.pic_name"
                :required="true"
                class="w-full mb-4"
                input-class="p-2 rounded border border-gray-200"
            />

            <TextInput
                label="Finance PIC Phone No."
                v-model="value.pic_phone"
                :required="true"
                class="w-full mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
        </div>
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
                    label="District"
                    v-model="value.city"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Zipcode"
                    v-model="value.postcode"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <TextInput
                    label="Province"
                    v-model="value.state"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <TextInput
                    label="Country"
                    v-model="value.country"
                    :required="true"
                    :disabled="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <TextInput
                label="E-Invoice Mailbox"
                v-model="value.einvoice_email"
                class="w-full mr-4 mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
            <TextInput
                label="Registration No."
                v-model="value.registration_no"
                class="w-full mr-4 mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
        </div>
    </div>
</template>
<script>
import TextInput from "../../../form/components/TextInput";
import AddressFormMixins from '../../mixins/addressForm'

export default {
    name: "PhilippinesBillingAddressForm",
    mixins: [AddressFormMixins],
    components: {
        TextInput
    }
};
</script>