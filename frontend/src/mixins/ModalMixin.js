import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutations
} = createNamespacedHelpers("system");

export default {
  computed: {
    ...mapSystemState(["modal"]),
    dialog: {
      get() {
        return this.modal && this.modal.type === this.$options.name;
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapSystemMutations(["closeModal"])
  }
};
