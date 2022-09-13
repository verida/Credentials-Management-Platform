<template>
  <v-container>
    <v-row justify="center my-5">
      <v-btn color="primary" outlined @click="open"> New Issuer </v-btn>
    </v-row>
    <v-row justify="center" class="mt-5" v-if="!list || !list.length">
      There are no issuers yet
    </v-row>
    <v-row class="my-5" else justify="center">
      <v-col
        :key="`issue-${issuer._id}`"
        v-for="issuer in list"
        class="pa-0 mx-2"
        cols="3"
      >
        <issuer :issue="issuer" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Issuer from "../components/cards/Issuer";

import { createNamespacedHelpers } from "vuex";
const { mapState: mapIssuerState, mapActions: mapIssuerActions } =
  createNamespacedHelpers("issuer");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
  name: "Issuers",
  components: { Issuer },
  computed: {
    ...mapIssuerState(["list"]),
  },
  async beforeMount() {
    await this.fetchIssuers();
  },
  methods: {
    ...mapSystemMutations(["openModal"]),
    ...mapIssuerActions(["fetchIssuers"]),
    open() {
      this.openModal({
        type: "NewCredentialIssuerDialog",
      });
    },
  },
};
</script>
