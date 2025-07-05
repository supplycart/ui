<script>
import { startCase } from "lodash-es";
import { defineComponent, h, reactive, watch } from "vue";
import BillingAddressForm from "./BillingAddressForm.vue";
import DeliveryAddressForm from "./DeliveryAddressForm.vue";
import GeneralAddressForm from "./GeneralAddressForm.vue";

export default defineComponent({
    name: "AddressForm",
    components: {
        BillingAddressForm,
        DeliveryAddressForm,
        GeneralAddressForm,
    },
    props: {
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
    },
    emits: ["update:modelValue", "changeCountry"],
    setup(props, { emit }) {
        const address = reactive({ ...props.modelValue });

        // Ensure country is set
        if (!Object.prototype.hasOwnProperty.call(address, "country")) {
            address.country = props.country;
        }

        // Watch for changes in modelValue prop
        watch(
            () => props.modelValue,
            (newValue) => {
                Object.assign(address, newValue);
                if (!Object.prototype.hasOwnProperty.call(address, "country")) {
                    address.country = props.country;
                }
            },
            { deep: true },
        );

        // Watch for changes in address and emit updates
        watch(
            () => address,
            (newAddress) => {
                emit("update:modelValue", newAddress);
            },
            { deep: true },
        );

        const changeCountry = (country) => {
            address.country = country;
            emit("changeCountry", country);
        };

        return {
            address,
            changeCountry,
        };
    },
    render() {
        return h("keep-alive", [
            h("component", {
                is: `${startCase(this.type)}AddressForm`.replace(/\s+/g, ""),
                countries: this.countries,
                disableFields: this.disableFields,
                modelValue: this.address,
                "onUpdate:modelValue": (value) => {
                    Object.assign(this.address, value);
                },
                onChangeCountry: this.changeCountry,
            }),
        ]);
    },
});
</script>
<style>
.select-country .vs__dropdown-toggle {
    padding: 0.4rem;
}
</style>
