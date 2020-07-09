<template>
  <v-app>
    <v-main>
      <app-navigation v-if="!$route.meta.guest" />
      <router-view />
    </v-main>

    <sent-dialog />
    <new-credential-issuer-dialog />
    <new-result-dialog />
  </v-app>
</template>

<script>
import SentDialog from "./components/modals/SentDialog";
import NewCredentialIssuerDialog from "./components/modals/NewCredentialIssuerDialog";
import AppNavigation from "./components/navigations/AppNavigation";
import NewResultDialog from "./components/modals/ResultDialog";

export default {
  name: "App",
  components: {
    NewResultDialog,
    NewCredentialIssuerDialog,
    SentDialog,
    AppNavigation
  }
};
</script>
