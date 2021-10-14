import { LABELS } from "../constants/address";
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
    },
    data() {
        return {
            LABELS,
        };
    },
    methods: {
        showAttribute(display) {
            if (this.display.length < 1) return true;
            return this.display.indexOf(display) >= 0 ? true : false;
        },
    },
};
