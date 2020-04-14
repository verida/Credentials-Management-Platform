<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="modal text-center" v-if="dialog">
      <small class="modal-receiver">
        {{ modal.patient }} ({{ modal.number }})
      </small>
      <div class="modal-contour">
        <v-card-title class="mt-5 headline justify-center">
          Sent!
        </v-card-title>
        <v-card-text class="modal-body">
          The test result credential was successfully sent to
          {{ modal.patient }}.
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
import ModalMixin from "../../mixins/ModalMixin";

export default {
  name: "SentDialog",
  mixins: [ModalMixin]
};
</script>
