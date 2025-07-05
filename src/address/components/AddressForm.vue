<script>
import { startCase } from "lodash-es";

export default {
    name: "AddressForm",
    components: {
        BillingAddressForm: () => import("./BillingAddressForm.vue"),
        DeliveryAddressForm: () => import("./DeliveryAddressForm.vue"),
        GeneralAddressForm: () => import("./GeneralAddressForm.vue"),
    },
    props: {
        value: {
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
    computed: {
        address: {
            get() {
                const address = this.value;
                if (!Object.prototype.hasOwnProperty.call(address, "country")) {
                    this.$set(address, "country", this.country);
                }
                return address;
            },
            set(value) {},
        },
    },

    methods: {
        changeCountry(country) {
            this.address.country = country;
        },
    },
    render(createElement, context) {
        return createElement("keep-alive", [
            createElement("component", {
                is: `${startCase(this.type)}AddressForm`.replace(/\s+/g, ""),
                props: {
                    countries: this.$props.countries,
                    disableFields: this.$props.disableFields,
                    value: this.address,
                },
                on: {
                    changeCountry: this.changeCountry,
                },
            }),
        ]);
    },
};
</script>
<style>
.select-country .vs__dropdown-toggle {
    padding: 0.4rem;
}
</style>
