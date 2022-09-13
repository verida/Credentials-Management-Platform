<template>
  <v-app>
    <notifications group="notify" position="bottom left" />
    <v-main>
      <app-navigation v-if="!$route.meta.guest" />
      <router-view />
    </v-main>

    <sent-dialog />
    <update-issuer-profile />
    <new-credential-issuer-dialog />
  </v-app>
</template>

<script>
import SentDialog from "./components/modals/SentDialog";
import UpdateIssuerProfile from "./components/modals/UpdateIssuerProfile";
import NewCredentialIssuerDialog from "./components/modals/NewCredentialIssuerDialog";
import AppNavigation from "./components/navigations/AppNavigation";

export default {
  name: "App",
  components: {
    NewCredentialIssuerDialog,
    UpdateIssuerProfile,
    SentDialog,
    AppNavigation,
  },
};
</script>
