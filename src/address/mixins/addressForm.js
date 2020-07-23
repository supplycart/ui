import "vue-select/dist/vue-select.css";
import VSelect from "vue-select"

export default {
    components: {VSelect},
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        country: {
            type: String,
            default: "Malaysia"
        },
        countries: {
            type: [Object, Array],
            default: () => (["Malaysia"])
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
    }
}