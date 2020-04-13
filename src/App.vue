<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>

    <sent-dialog />
  </v-app>
</template>

<script>
import SentDialog from "./components/modals/SentDialog";

export default {
  name: "App",
  components: {SentDialog},
  data() {
    return {};
  }
};
</script>
