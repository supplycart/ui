<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        mode: {
            type: String,
            default: "multiple",
            validator: (prop) => ["multiple", "single"].includes(prop),
        },
        maxSize: {
            type: Number,
            default: 100,
        },
        format: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        attachments: {
            get() {
                return this.value;
            },
        },
    },
    methods: {
        async setAttachment(event) {
            this.attachments = this.attachments ? this.attachments : [];

            const file = event.target.files[0];

            if (this.validateSize(file) && this.validateFormat(file)) {
                this.attachments.push(file);
                this.$emit("input", this.attachments);
                this.$emit("change", this.attachments);

                event.target.value = null;
            }
        },

        async deleteAttachment(index) {
            const data = {
                index: index,
                file: this.attachments[index],
            };
            this.$emit("deleted", data);
            this.attachments.splice(index, 1);
        },

        validateSize(file) {
            return !(this.maxSize && file.size > this.maxSize * 1024 * 1024);
        },

        validateFormat(file) {
            const fname = file.name;
            let regex = null;

            for (let index = 0; index < this.format.length; index++) {
                const element = this.format[index];
                const temp = element.toLowerCase();

                regex = new RegExp(`(\\.${temp})$`, "i");
                return regex.exec(fname);
            }

            return true;
        },
    },
    render() {
        return this.$scopedSlots.default({
            attachments: this.value,
            setAttachment: this.setAttachment,
            deleteAttachment: this.deleteAttachment,
            maxSize: this.maxSize,
        });
    },
};
</script>
