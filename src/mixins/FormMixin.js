export default {
  data() {
    return {
      form: {},
      fields: [
        "Full name",
        "Date of birth",
        "Health number",
        "Mobile number",
        "DID",
        "Test type",
        "Test result"
      ]
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.fields.forEach(field => {
        this.$set(this.form, field, null);
      });
    }
  }
};
