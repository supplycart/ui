import { ref, computed } from "vue";
import { LABELS } from "../constants/address";
import addressConfig from "../constants/addressConfig";

export function useAddressForm(props) {
    const CONFIG = addressConfig;
    const labels = LABELS;

    const setCountry = computed({
        get() {
            return props.modelValue?.country || props.country || "Malaysia";
        },
        set(value) {
            // This will be handled by the parent component
        },
    });

    const addressCountryConfig = computed(() => {
        const country = setCountry.value;
        return CONFIG[country?.toUpperCase()] || CONFIG.MALAYSIA;
    });

    const disabledFields = computed(() => {
        const tempDisabledFields = {
            unit: false,
            floor: false,
            building: false,
            street: false,
            city: false,
            postcode: false,
            state: false,
            country: false,
            entity_name: false,
            pic_phone: false,
            pic_name: false,
            einvoice_email: false,
            registration_no: false,
            branch_name: false,
            lift_access: false,
            requires_permit: false,
        };

        const disableFieldsArray = props.disableFields || [];

        disableFieldsArray.forEach((field) => {
            if (field === "all") {
                const objKeys = Object.keys(tempDisabledFields);
                objKeys.forEach((key) => {
                    tempDisabledFields[key] = true;
                });
            } else {
                tempDisabledFields[field] = true;
            }
        });

        return tempDisabledFields;
    });

    return {
        CONFIG,
        labels,
        setCountry,
        addressCountryConfig,
        disabledFields,
    };
}
