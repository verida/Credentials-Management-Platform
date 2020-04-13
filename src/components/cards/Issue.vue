<template>
  <v-card class="dashboard-card blue">
    <h4 class="font-weight-regular white--text mb-4">{{ issue.name }}</h4>
    <v-btn dark outlined>Edit</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "Issue",
  props: ["issue"]
};
</script>
