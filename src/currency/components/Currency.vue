<script>
import Currencies from "../constants/currencies";
import { DefaultCurrency } from "../constants/currencies";

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
                : Currencies.find(
                      (item) =>
                          item.country ===
                              this.currency
                                  .toUpperCase()
                                  .replaceAll(" ", "_") ||
                          item.code === this.currency.toUpperCase()
                  );

        if (!currency) {
            currency = DefaultCurrency;
        }

        return createElement("span", currency[this.type]);
    },
};
</script>

<style scoped></style>
