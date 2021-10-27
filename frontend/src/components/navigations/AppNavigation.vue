<template>
  <v-app-bar app color="success" dense dark>
    <h3 class="v-app-bar font-weight-regular text-capitalize">
      {{ label() }}
    </h3>
    <v-spacer />
    <search v-if="false" />
    <v-spacer />
    <v-btn @click="logout" outlined>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import Search from "../inputs/Search";

import { createNamespacedHelpers } from "vuex";
const { mapGetters: mapAuthGetters } = createNamespacedHelpers("auth");

export default {
  name: "AppNavigation",
  components: {
    Search,
  },
  methods: {
    logout() {
      localStorage.removeItem(process.env.VUE_APP_TOKEN);
      const params = this.issuer ? { type: this.issuer.urlName } : {};
      this.$router.push({ name: this.$route.meta.home, params });
    },
    label() {
      switch (true) {
        case this.mode.user:
          return this.issuer.name;
        case this.mode.admin:
          return "Admin";
      }
    },
  },
  computed: {
    ...mapAuthGetters(["issuer"]),
    mode() {
      return this.$route.meta;
    },
  },
};
</script>
