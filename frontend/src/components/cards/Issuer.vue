<template>
  <v-card class="mx-auto my-2" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">Issuer Profile</div>
        <v-list-item-title class="text-h5 mb-1"
          >{{ issue.name }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="issue.avatarUri"></v-img>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-btn outlined text @click="openEditProfileModal"> Edit Profile </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations: mapIssuerMutation } = createNamespacedHelpers("issuer");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");
export default {
  name: "Issuer",
  props: ["issue"],
  methods: {
    ...mapSystemMutations(["openModal"]),
    ...mapIssuerMutation(["setIssuerById"]),

    openEditProfileModal() {
      this.setIssuerById(this.issue);
      this.openModal({
        type: "UpdateIssuerProfile",
      });
    },
  },
};
</script>
