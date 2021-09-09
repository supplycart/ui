<template>
    <div>
        <TextInput
            label="Billing Entity Name"
            v-model="value.entity_name"
            :disabled="disabledFields['entity_name']"
            :required="true"
            class="w-full mb-4"
            input-class="p-2 rounded border border-gray-200"
        />
        <div class="grid grid-cols-2 gap-2">
            <TextInput
                label="Finance PIC Name"
                v-model="value.pic_name"
                :disabled="disabledFields['pic_name']"
                :required="true"
                class="w-full mb-4"
                input-class="p-2 rounded border border-gray-200"
            />

            <TextInput
                label="Finance PIC Phone No."
                v-model="value.pic_phone"
                :disabled="disabledFields['pic_phone']"
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
                    label="District"
                    v-model="value.city"
                    :disabled="disabledFields['city']"
                    :required="true"
                    class="w-full mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />

                <div>
                    <label for="country">
                        Country <small class="italic text-red-600">*</small>
                    </label>
                    <VSelect
                        :options="countries"
                        v-model="setCountry"
                        :disabled="disabledFields['country']"
                        :required="true"
                        class="mt-2 select-country"
                    ></VSelect>
                </div>
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
        <div class="grid grid-cols-2 gap-2">
            <TextInput
                label="Billing ID"
                v-model="value.ref_no"
                :disabled="disabledFields['ref_no']"
                class="w-full mr-4 mb-4"
                input-class="p-2 rounded border border-gray-200"
            />
        </div>
    </div>
</template>
<script>
import TextInput from "../../../form/components/TextInput";
import AddressFormMixins from "../../mixins/addressForm";

export default {
    name: "UnitedStatesOfAmericaBillingAddressForm",
    mixins: [AddressFormMixins],
    components: {
        TextInput,
    },
};
</script>
