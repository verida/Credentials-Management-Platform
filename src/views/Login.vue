<template>
  <v-container fluid fill-height>
    <v-row justify="center" align-items="center">
      <auth />
    </v-row>
  </v-container>
</template>

<script>
import Auth from "../components/forms/Auth";
export default {
  name: "Login",
  components: {
    Auth
  }
};
</script>
