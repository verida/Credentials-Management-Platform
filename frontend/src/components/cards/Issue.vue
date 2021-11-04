<template>
  <v-card class="dashboard-card blue">
    <h4 class="font-weight-regular white--text mb-4 text-capitalize">
      {{ issue.name }}
    </h4>
  </v-card>
</template>

<script>
export default {
  name: "Issue",
  props: ["issue"],
};
</script>
