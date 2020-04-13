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
    },
    el(field) {
      switch (field) {
        case "Test type":
        case "Test result":
          return "select";
        default:
          return "text-field";
      }
    },
    items(field) {
      switch (field) {
        case "Test type":
          return ["COVID-19 PCR"];
        case "Test result":
          return ["COVID-19 Negative"];
      }
    }
  }
};
