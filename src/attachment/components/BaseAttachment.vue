<script>
import { validateAttachmentFormat, validateAttachmentSize } from "../index";
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
            default: 10,
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
        validateAttachmentFormat,
        validateAttachmentSize,
        async setAttachment(event) {
            this.attachments = this.attachments ? this.attachments : [];

            const file = event.target.files[0];

            if (
                this.validateAttachmentSize(file, this.maxSize) &&
                this.validateAttachmentFormat(file, this.format)
            ) {
                this.attachments.push(file);
                this.$emit("input", this.attachments);
                this.$emit("change", this.attachments);

                event.target.value = null;
            } else {
                const message = [];
                if (!this.validateAttachmentSize(file, this.maxSize)) {
                    message.push(
                        `File has exceeded limit of ${this.maxSize}MB`
                    );
                }
                if (!this.validateAttachmentFormat(file, this.format)) {
                    message.push(`File format not supported`);
                }
                this.$emit("onError", message);
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
