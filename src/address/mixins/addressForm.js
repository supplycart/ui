import "vue-select/dist/vue-select.css";
import VSelect from "vue-select"

export default {
    components: {VSelect},
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        countries: {
            type: [Object, Array],
            default: () => (["Malaysia"])
        },
        disableFields: {
            type: Array,
        }
    },
    computed: {
        setCountry: {
            get() {
                return this.value.country;
            },
            set(value) {
                this.$emit('changeCountry', value)
            }
        },
        disabledFields: {
            get() {
                let tempDisabledFields = {
                    unit: false,
                    floor: false,
                    building: false,
                    street:false,
                    city: false,
                    postcode: false,
                    state: false,
                    country:false,
                    entity_name: false,
                    pic_phone:false,
                    pic_name:false,
                    einvoice_email: false,
                    registration_no: false
                }

                this.disableFields.forEach( field => {
                    if(field === 'all') {
                        let objKeys = Object.keys(tempDisabledFields)

                        objKeys.forEach(key => {
                            tempDisabledFields[key] = true
                        })
                    } else {
                        tempDisabledFields[field] = true
                    }
                })

                return tempDisabledFields;
            },
            set(value) {
            }
        }
    }
}