<template>
  <v-container>
    <v-row justify="center">
      <v-btn color="primary" outlined rounded @click="open">
        New Issuer
      </v-btn>
    </v-row>
    <v-row justify="center" class="mt-5" v-if="!list || !list.length">
      There are no issuers yet
    </v-row>
    <v-row justify="center" v-else>
      <issue
        class="mx-2 my-5"
        v-for="issuer in list"
        :key="`issue-${issuer._id}`"
        :issue="issuer"
      />
    </v-row>
  </v-container>
</template>

<script>
import Issue from "../components/cards/Issue";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapIssuerState,
  mapActions: mapIssuerActions
} = createNamespacedHelpers("issuer");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
  name: "Issuers",
  components: { Issue },
  computed: {
    ...mapIssuerState(["list"])
  },
  async beforeMount() {
    await this.fetchIssuers();
  },
  methods: {
    ...mapSystemMutations(["openModal"]),
    ...mapIssuerActions(["fetchIssuers"]),
    open() {
      this.openModal({
        type: "NewCredentialIssuerDialog"
      });
    }
  }
};
</script>
