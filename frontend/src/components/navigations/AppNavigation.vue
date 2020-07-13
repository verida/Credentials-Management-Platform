<template>
  <v-app-bar app color="success" dense dark>
    <h3 class="v-app-bar font-weight-regular">
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

export default {
  name: "AppNavigation",
  components: {
    Search
  },
  methods: {
    logout() {
      localStorage.removeItem(process.env.VUE_APP_TOKEN);
      const params = !this.mode.admin && { type: "sa-pathology" };
      this.$router.push({ name: this.$route.meta.home, params: params || {} });
    },
    label() {
      switch (true) {
        case this.mode.user:
          return "SA Pathology";
        case this.mode.admin:
          return "Admin";
      }
    }
  },
  computed: {
    mode() {
      return this.$route.meta;
    }
  }
};
</script>
