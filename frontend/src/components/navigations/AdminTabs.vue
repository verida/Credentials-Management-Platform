<template>
  <div class="dashboard-navigation">
    <v-tabs light color="success">
      <v-tab v-for="item in tabs" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "AdminTabs",
  data() {
    return {
      tabs: ["Pathology Labs", "Users", "Issuers"]
    };
  }
};
</script>
