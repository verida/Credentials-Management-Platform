<template>
  <v-app-bar app color="success" dense dark>
    <h3 class="v-app-bar font-weight-regular">
      {{ label() }}
    </h3>
    <v-spacer />
    <search v-if="mode.saPathology" />
    <v-spacer />
    <v-btn @click="logout" outlined>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import Search from "../inputs/Search";
import { LOGIN } from "../../constants/route";

export default {
  name: "AppNavigation",
  components: {
    Search
  },
  methods: {
    logout() {
      localStorage.removeItem(process.env.VUE_APP_TOKEN);
      this.$router.push("/admin/login");
    },
    label() {
      switch (true) {
        case this.mode.saPathology:
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
