<script>
    import { startCase, lowerCase } from "lodash";

    export default {
        name: "AddressForm",
        components: {

            MalaysiaBillingAddressForm: () => import('./billingForm/Malaysia'),
            CambodiaBillingAddressForm: () => import('./billingForm/Cambodia'),
            SingaporeBillingAddressForm: () => import('./billingForm/Singapore'),
            IndonesiaBillingAddressForm: () => import('./billingForm/Indonesia'),
            ThailandBillingAddressForm: () => import('./billingForm/Thailand'),
            HongKongBillingAddressForm: () => import('./billingForm/HongKong'),
            PhilippinesBillingAddressForm: () => import('./billingForm/Philippines'),
            VietnamBillingAddressForm: () => import('./billingForm/Vietnam'),

            MalaysiaDeliveryAddressForm: () => import('./deliveryForm/Malaysia'),
            CambodiaDeliveryAddressForm: () => import('./deliveryForm/Cambodia'),
            SingaporeDeliveryAddressForm: () => import('./deliveryForm/Singapore'),
            IndonesiaDeliveryAddressForm: () => import('./deliveryForm/Indonesia'),
            ThailandDeliveryAddressForm: () => import('./deliveryForm/Thailand'),
            HongKongDeliveryAddressForm: () => import('./deliveryForm/HongKong'),
            PhilippinesDeliveryAddressForm: () => import('./deliveryForm/Philippines'),
            VietnamDeliveryAddressForm: () => import('./deliveryForm/Vietnam'),

        },
        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            country: {
                type: String,
                default: "Malaysia"
            },
            type: {
                type: String,
                required: true
            },
            countries: {
                type: [Object, Array],
                default: () => (['Malaysia'])
            }
        },
        computed: {
            address: {
                get() {
                    let address = this.value
                    if(!address.hasOwnProperty('country')) {
                        this.$set(address, 'country', this.country)
                    }
                    return address;
                },
                set(value) {
                }
            }
        },
        
        methods: {
            changeCountry(country) {
                this.address.country = country
            }
        },
        render(createElement, context) {
            return createElement("keep-alive", [
                createElement("component", {
                    is: `${startCase(this.address.country)}${startCase(this.type)}AddressForm`.replace(/\s+/g, ''),
                    props: {
                        countries: this.$props.countries,
                        value: this.address
                    },
                    on: {
                        changeCountry: this.changeCountry
                    },
                })
            ]);
        }
    };
</script>
<style>
    .select-country .vs__dropdown-toggle{
        padding:0.4rem
    }
</style>