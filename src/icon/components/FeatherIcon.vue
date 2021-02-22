<script>
import feather from "feather-icons";

export default {
    name: "FeatherIcon",
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: [Number, String],
            default: 24,
        },
        attributes: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    render(createElement, context) {
        const attributes = Object.assign(
            { class: "align-middle", width: this.size },
            this.attributes
        );

        return createElement("span", {
            class: {
                "feather-icon": true,
            },
            domProps: {
                innerHTML: feather.icons[this.name].toSvg(attributes),
            },
        });
    },
};
</script>
