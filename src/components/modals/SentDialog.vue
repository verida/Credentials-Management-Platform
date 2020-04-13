<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="modal text-center" v-if="modal">
      <small class="modal-receiver">
        {{ modal.data.patient }} ({{ modal.data.number }})
      </small>
      <div class="modal-contour">
        <v-card-title class="mt-5 headline justify-center">
          Sent!
        </v-card-title>

        <v-card-text class="modal-body">
          The test result credential was successfully sent to
          {{ modal.data.patient }}.
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="green" text @click="closeModal">
            Close
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutations
} = createNamespacedHelpers("system");

export default {
  name: "SentDialog",
  computed: {
    ...mapSystemState(["modal"]),
    dialog: {
      get() {
        return this.modal && this.modal.type === "SentDialog";
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
</script>
