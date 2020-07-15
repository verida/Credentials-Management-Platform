import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutations
} = createNamespacedHelpers("system");

export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapSystemState(["modal"])
  },
  methods: {
    ...mapSystemMutations(["closeModal"])
  },
  watch: {
    modal() {
      this.dialog = this.modal && this.modal.type === this.$options.name;
    }
  }
};
