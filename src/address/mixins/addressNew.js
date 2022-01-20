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
        addressCountryConfig() {
            const supportedCountries = Object.keys(this.CONFIG);
            const countryConfig = supportedCountries.includes(
                this.country.toUpperCase()
            )
                ? this.CONFIG[this.country]
                : this.CONFIG["MALAYSIA"];

            return countryConfig;
        },
    },
    methods: {
        showAttribute(display) {
            if (this.display.length < 1) return true;
            return this.display.indexOf(display) >= 0 ? true : false;
        },
    },
};
