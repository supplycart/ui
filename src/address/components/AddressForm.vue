<script setup>
import { computed, reactive, watch } from "vue"
import { startCase } from "lodash-es"
import BillingAddressForm from "./BillingAddressForm.vue"
import DeliveryAddressForm from "./DeliveryAddressForm.vue"
import GeneralAddressForm from "./GeneralAddressForm.vue"

// Define props
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({}),
    },
    country: {
        type: String,
        default: "Malaysia",
    },
    type: {
        type: String,
        required: true,
    },
    countries: {
        type: [Object, Array],
        default: () => ["Malaysia"],
    },
    disableFields: {
        type: Array,
        default: () => [],
    },
})

// Define emits
const emit = defineEmits(["update:modelValue", "changeCountry"])

// Reactive address
const address = reactive({ ...props.modelValue })

// Ensure country is set
if (!Object.prototype.hasOwnProperty.call(address, "country")) {
    address.country = props.country
}

// Watch for changes in modelValue prop
watch(
    () => props.modelValue,
    (newValue) => {
        Object.assign(address, newValue)
        if (!Object.prototype.hasOwnProperty.call(address, "country")) {
            address.country = props.country
        }
    },
    { deep: true },
)

// Watch for changes in address and emit updates
watch(
    () => address,
    (newAddress) => {
        emit("update:modelValue", newAddress)
    },
    { deep: true },
)

// Change country handler
const changeCountry = (country) => {
    address.country = country
    emit("changeCountry", country)
}

// Update address handler
const updateAddress = (value) => {
    Object.assign(address, value)
}

// Component map for dynamic rendering
const components = {
    BillingAddressForm,
    DeliveryAddressForm,
    GeneralAddressForm
}

// Computed component name
const component = computed(() => {
    const type = startCase(props.type)
    const componentName = `${type}AddressForm`.replace(/\s+/g, "")
    return components[componentName]
})

// Define options
defineOptions({
    name: "AddressForm"
})
</script>

<template>
    <keep-alive>
        <component 
            :is="component"
            :countries="props.countries"
            :disable-fields="props.disableFields"
            :model-value="address"
            @update:model-value="updateAddress"
            @change-country="changeCountry"
        />
    </keep-alive>
</template>
<style>
.select-country .vs__dropdown-toggle {
    padding: 0.4rem;
}
</style>
