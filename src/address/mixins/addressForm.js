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
                return this.country;
            },
            set(value) {
                this.$emit('changeCountry', value)
                this.value.country = value
            }
        },
    },
    
    created() {
        if(!this.value.hasOwnProperty('country')) {
            
            this.value.country = this.country
        }
    }
}