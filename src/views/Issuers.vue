<template>
  <v-container>
    <v-row justify="center">
      <v-btn color="secondary" @click="open">New Issuer</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapMutations: mapSystemMutations
} = createNamespacedHelpers("system");

export default {
  name: "Issuers",
  methods: {
    ...mapSystemMutations(["openModal"]),
    open() {
      this.openModal({
        type: ""
      });
    }
  }
};
</script>
