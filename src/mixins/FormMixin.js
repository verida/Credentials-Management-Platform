export default {
  data() {
    return {
      form: {}
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
