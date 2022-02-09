import { LABELS } from "../constants/address";
import addressConfig from "../constants/addressConfig";
export default {
    props: {
        value: {
            type: Object,
            default: () => ({}),
        },
        display: {
            type: Array,
            default: () => [],
        },
        country: {
            type: String,
            default: "Malaysia",
        },
    },
    data() {
        return {
            LABELS,
            CONFIG: addressConfig,
        };
    },
    computed: {
        addressCountry() {
            const supportedCountries = Object.keys(this.CONFIG);
            const country = supportedCountries.includes(
                this.country.toUpperCase()
            )
                ? this.country.toUpperCase()
                : "MALAYSIA";

            return country;
        },
        addressCountryConfig() {
            return this.CONFIG[this.addressCountry];
        },
    },
    methods: {
        showAttribute(display) {
            if (this.display.length < 1) return true;
            return this.display.indexOf(display) >= 0 ? true : false;
        },
    },
};
