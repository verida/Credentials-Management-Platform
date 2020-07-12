<template>
  <v-app>
    <v-main>
      <app-navigation v-if="!$route.meta.guest" />
      <router-view />
    </v-main>

    <sent-dialog />
    <new-credential-issuer-dialog />
  </v-app>
</template>

<script>
import SentDialog from "./components/modals/SentDialog";
import NewCredentialIssuerDialog from "./components/modals/NewCredentialIssuerDialog";
import AppNavigation from "./components/navigations/AppNavigation";

export default {
  name: "App",
  components: {
    NewCredentialIssuerDialog,
    SentDialog,
    AppNavigation
  }
};
</script>
