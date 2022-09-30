<template>
    <div>
        <div>
            <div class="grid grid-cols-3 gap-2">
                <div v-if="addressCountryConfig.unit">
                    <TextInput
                        label="Unit"
                        v-model="value.unit"
                        :disabled="disabledFields['unit']"
                        class="w-full mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-unit" />
                </div>

                <div v-if="addressCountryConfig.floor">
                    <TextInput
                        label="Floor"
                        v-model="value.floor"
                        :disabled="disabledFields['floor']"
                        class="w-full mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-floor" />
                </div>

                <div v-if="addressCountryConfig.building">
                    <TextInput
                        label="Building"
                        v-model="value.building"
                        :disabled="disabledFields['building']"
                        class="w-full mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-building" />
                </div>
            </div>
            <div>
                <div v-if="addressCountryConfig.street">
                    <TextInput
                        label="Street"
                        v-model="value.street"
                        :disabled="disabledFields['street']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-street" />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div v-if="addressCountryConfig.city">
                    <TextInput
                        label="City"
                        v-model="value.city"
                        :disabled="disabledFields['city']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-city" />
                </div>

                <div v-if="addressCountryConfig.district">
                    <TextInput
                        label="District"
                        v-model="value.city"
                        :disabled="disabledFields['city']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-city" />
                </div>

                <div v-if="addressCountryConfig.postcode">
                    <TextInput
                        label="Postcode"
                        v-model="value.postcode"
                        :disabled="disabledFields['postcode']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-postcode" />
                </div>
                <div v-if="addressCountryConfig.zipcode">
                    <TextInput
                        label="Postcode"
                        v-model="value.postcode"
                        :disabled="disabledFields['postcode']"
                        :required="true"
                        class="w-full mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <portal-target name="address-postcode" />
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
                        v-model="value.state"
                        class="mt-2 select-country"
                    ></VSelect>
                    <portal-target name="address-state" />
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
import TextInput from "../../form/components/TextInput.vue";
import AddressFormMixins from "../mixins/addressForm";
import StateMixins from "../mixins/malaysiaStates";
export default {
    name: "AddressForm",
    mixins: [AddressFormMixins, StateMixins],
    components: {
        TextInput,
    },
};
</script>
