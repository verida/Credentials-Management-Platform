<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-tabs color="info" class="dashboard-navigation" :show-arrows="false">
          <v-row justify="space-between">
            <v-col class="d-flex">
              <v-tab v-for="item in tabs" :key="item">
                {{ item }}
              </v-tab>
            </v-col>
            <v-col cols="auto">
              <v-btn
                outlined
                @click="openResultDialog"
                color="success"
                class="align-self-center"
              >
                New Result
              </v-btn>
            </v-col>
          </v-row>
          <v-tab-item v-for="n in 3" :key="n" class="py-5">
            <template v-if="cards && cards.length">
              <Result
                class="mb-4"
                v-for="card in cards"
                :key="card.id"
                :result="card"
              />
            </template>
            <template v-else> Credential List is empty </template>
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-container>
    <new-result-dialog />
  </div>
</template>

<script>
import Result from "../components/cards/Result";
import NewResultDialog from "../components/modals/ResultDialog";

import { createNamespacedHelpers } from "vuex";
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");
const { mapActions: mapAuthActions } = createNamespacedHelpers("auth");
const { mapGetters: mapCredentialGetters, mapActions: mapCredentialActions } =
  createNamespacedHelpers("credential");

export default {
  name: "Dashboard",
  components: {
    NewResultDialog,
    Result,
  },
  data() {
    return {
      tabs: ["Sent"],
    };
  },
  async beforeMount() {
    await this.fetchUser();
    await this.fetchCredentials();
  },
  computed: {
    ...mapCredentialGetters(["cards"]),
  },
  methods: {
    ...mapCredentialActions(["fetchCredentials"]),
    ...mapAuthActions(["fetchUser"]),
    ...mapSystemMutations(["openModal"]),
    openResultDialog() {
      this.openModal({
        type: "ResultDialog",
      });
    },
  },
};
</script>
