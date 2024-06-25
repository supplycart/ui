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
            default: 30,
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

            const files =
                this.mode === "single"
                    ? [event.target.files[0]]
                    : Array.from(event.target.files);

            files.forEach((file) => {
                if (
                    this.validateAttachmentSize(file, this.maxSize) &&
                    this.validateAttachmentFormat(file, this.format)
                ) {
                    this.attachments.push(file);
                } else {
                    const message = [];
                    if (!this.validateAttachmentSize(file, this.maxSize)) {
                        message.push(
                            `File ${file.name} has exceeded limit of ${this.maxSize}MB`
                        );
                    }
                    if (!this.validateAttachmentFormat(file, this.format)) {
                        message.push(
                            `File format for ${file.name} not supported`
                        );
                    }
                    this.$emit("onError", message);
                }
            });
            event.target.value = null;
            this.$emit("input", this.attachments);
            this.$emit("change", this.attachments);
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
