<template>
  <v-card class="px-8 py-4">
    <v-row>
      <form-field v-for="field in fields"
        :key="field"
        :field="field">
      </form-field>
      <v-col>
        <div>{{ issues.timestamp }}</div>
        <div class="mt-2">{{ issues.by }}</div>
        <v-btn @click="send" class="mt-10 float-right" color="info">
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
  name: "NewResult",
  components: { FormField },
  mixins: [FormMixin],
  data() {
    return {
      fields: [
        "Full name",
        "Date of birth",
        "Health number",
        "Mobile number",
        "DID",
        "Test type",
        "Test result"
      ],
      issues: {
        timestamp: "Issues timestamp: 1st May 2020",
        by: "Issued by: SA Pathology, Adelaide City"
      }
    };
  },
  methods: {
    send() {
      console.log("send");
    }
  }
};
</script>
