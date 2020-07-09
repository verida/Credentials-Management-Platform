<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="modal text-center" v-if="dialog">
      <small class="modal-receiver">
        {{ text }}
      </small>
      <div class="modal-contour">
        <v-card-title class="mt-5 headline justify-center">
          {{ text }}
        </v-card-title>
        <form-field
          v-for="field in fields"
          :key="field"
          :model="null"
          :label="field"
        >
        </form-field>
        <v-card-actions class="justify-center">
          <v-btn @click="save" class="ma-5" color="info">
            Save
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormField from "../inputs/FormField";
import ModalMixin from "../../mixins/ModalMixin";

export default {
  name: "NewCredentialIssuerDialog",
  components: { FormField },
  mixins: [FormMixin, ModalMixin],
  data() {
    return {
      text: "New Credential Issuer",
      fields: [
        "Name",
        "URL",
        "Contact Email",
        "Finance Email",
        "Street Address 1",
        "Street Address 2",
        "City",
        "State",
        "Post Code",
        "Country",
        "Status"
      ]
    };
  },
  methods: {
    save() {
      console.log("save");
    }
  }
};
</script>
