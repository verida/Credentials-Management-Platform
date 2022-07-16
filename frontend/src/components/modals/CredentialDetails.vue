<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="modal">
      <small class="modal-receiver">
        {{ text }}
      </small>
      <div class="modal-contour pl-4">
        <schema-details :result="result" />
        <v-card-actions class="justify-center my-5">
          <v-btn @click="closeModal" color="info" outlined> Close </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import SchemaDetails from "../cards/Result.vue";
import ModalMixin from "../../mixins/ModalMixin";

export default {
  name: "CredentialDetails",
  props: ["result"],
  mixins: [ModalMixin],
  components: { SchemaDetails },
  mounted() {
    console.log(this.result);
  },
  data() {
    return {
      text: "Credential Details",
    };
  },
  methods: {},
  watch: {
    dialog() {},
  },
};
</script>
