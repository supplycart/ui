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
            component() {
                let type = startCase(this.type);
                let country = startCase(this.value.country);
                
                if (this.value.country.match(/\s/g)) {
                    let split = this.value.country.split(' ');
                    return `${split[0]}${split[1]}${type}AddressForm`;
                }
                
                return `${country}${type}AddressForm`;
            }
        },
        created() {
            if(!this.value.hasOwnProperty('country')) {
            
            this.value.country = this.country
        }
        },
        methods: {
            changeCountry(country) {
                this.value.country = country
            }
        },
        render(createElement, context) {
            return createElement("keep-alive", [
                createElement("component", {
                    is: this.component,
                    props: this.$props,
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