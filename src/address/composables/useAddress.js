import { computed } from "vue";
import { LABELS } from "../constants/address";
import addressConfig from "../constants/addressConfig";

export function useAddress(props) {
    const CONFIG = addressConfig;
    const labels = LABELS;

    const addressCountry = computed(() => {
        const supportedCountries = Object.keys(CONFIG);
        const country = supportedCountries.includes(
            props.country?.toUpperCase(),
        )
            ? props.country.toUpperCase()
            : "MALAYSIA";

        return country;
    });

    const addressCountryConfig = computed(() => {
        return CONFIG[addressCountry.value];
    });

    const showAttribute = (display) => {
        if (!props.display || props.display.length < 1) return true;
        return props.display.indexOf(display) >= 0 ? true : false;
    };

    return {
        CONFIG,
        LABELS: labels,
        addressCountry,
        addressCountryConfig,
        showAttribute,
    };
}
