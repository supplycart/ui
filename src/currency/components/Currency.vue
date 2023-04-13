<script>
import CurrencySettings from "../constants/currencySettings";

export default {
    name: "Currency",
    props: {
        type: {
            type: String,
            default: "sign",
        },
        currency: {
            type: [String, Object],
            default: () => "MYR",
        },
    },
    render(createElement, context) {
        let currency =
            typeof this.currency === "object"
                ? this.currency
                : CurrencySettings[this.currency];

        if (!currency) {
            currency = CurrencySettings["MYR"];
        }

        return createElement("span", currency[this.type]);
    },
};
</script>

<style scoped></style>
