<template>
  <v-app-bar app color="success" dense dark>
    <h3 class="v-app-bar font-weight-regular">
      SA Pathology
    </h3>
    <v-spacer />
    <v-text-field
      class="mx-4 search"
      dense
      flat
      hide-details
      label="Search"
      prepend-inner-icon="mdi-magnify"
      solo-inverted>
    </v-text-field>
    <v-spacer />
    <v-btn @click="logout" outlined>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppNavigation",
  methods: {
    logout() {
      console.log("logout");
    }
  }
};
</script>
