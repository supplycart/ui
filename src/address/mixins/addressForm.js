import "vue-select/dist/vue-select.css";
import VSelect from "vue-select";
import { LABELS } from "../constants/address";

export default {
    components: { VSelect },
    props: {
        value: {
            type: Object,
            default: () => ({}),
        },
        countries: {
            type: [Object, Array],
            default: () => ["Malaysia"],
        },
        disableFields: {
            type: Array,
        },
    },
    computed: {
        setCountry: {
            get() {
                return this.value.country;
            },
            set(value) {
                this.$emit("changeCountry", value);
            },
        },
        disabledFields: {
            get() {
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

                this.disableFields.forEach((field) => {
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
            },
            set(value) {},
        },
    },
    data() {
        return {
            LABELS,
        };
    },
};
