<template>
  <v-container>
    <v-row justify="center">
      <v-btn color="primary" outlined rounded @click="open">
        New Issuer
      </v-btn>
    </v-row>
    <v-row justify="center">
      <issue
        class="mx-2 my-5"
        v-for="issue in issues"
        :key="`issue-${issue.id}`"
        :issue="issue"
      />
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import Issue from "../components/cards/Issue";
const {
  mapMutations: mapSystemMutations
} = createNamespacedHelpers("system");

export default {
  name: "Issuers",
  components: { Issue },
  data() {
    return {
      issues: [
        { id: 1, name: "SA Pathology" },
        { id: 2, name: "QLD Health" }
      ]
    };
  },
  methods: {
    ...mapSystemMutations(["openModal"]),
    open() {
      this.openModal({
        type: "NewCredentialIssuerDialog"
      });
    }
  }
};
</script>
