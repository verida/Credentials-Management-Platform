<template>
  <v-card class="px-8 py-4">
    <v-row>
      <form-field v-for="field in fields"
        :key="field"
        :field="field">
      </form-field>
      <v-col>
        <v-btn @click="save" class="mt-10 float-right" color="info">
          Send Credential
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormField from "../inputs/FormField";

export default {
  name: "NewCredentialIssuerDialog",
  components: { FormField },
  mixins: [FormMixin],
  data() {
    return {
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
