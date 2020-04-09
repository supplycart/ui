<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: "multiple",
      validator: prop => ["multiple", "single"].includes(prop)
    },
    maxSize: {
      type: Number,
      default: 20000000
    },
    format: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    attachments: {
      set(val) {},
      get() {
        return this.value;
      }
    }
  },
  methods: {
    async setAttachment(event) {
      this.attachments = this.attachments ? this.attachments : [];

      let file = event.target.files[0];

      if (this.validateSize(file) && this.validateFormat(file)) {
        this.attachments.push(file);
        this.$emit("input", this.attachments);
        this.$emit('change', this.attachments);
      }
    },

    async deleteAttachment(index) {
      this.attachments.splice(index, 1);
    },

    validateSize(file) {
      if (this.maxSize && file.size > this.maxSize) {
        console.log("Maximum size allowed is 20mb");
        return false;
      }

      return true;
    },

    validateFormat(file) {
      let allowed = this.format.join(", ");
      let fname = file.name;
      let regex = null;

      for (let index = 0; index < this.format.length; index++) {
        let element = this.format[index];
        let temp = element.toLowerCase();

        regex = new RegExp(`(\\.${temp})$`, "i");
        return !regex.exec(fname) ? false : true;
      }

      return true;
    }
  },
  render() {
    return this.$scopedSlots.default({
      attachments: this.value,
      setAttachment: this.setAttachment,
      deleteAttachment: this.deleteAttachment
    });
  }
};
</script>