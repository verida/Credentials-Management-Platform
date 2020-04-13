<template>
  <v-card class="px-8 py-4">
    <v-row>
      <v-col cols="12" v-for="field in fields" :key="field">
        <v-text-field v-model="form[field]" :label="field" />
      </v-col>
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

export default {
  name: "NewResult",
  mixins: [FormMixin],
  data() {
    return {
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
