<template>
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
              class="align-self-center">
              New Result
            </v-btn>
          </v-col>
        </v-row>
        <v-tab-item v-for="n in 3" :key="n" class="py-5">
          <Result
            class="mb-4"
            v-for="card in cards"
            :key="card.id"
            :result="card"
          />
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import Result from "../components/cards/Result";
import { createNamespacedHelpers } from "vuex";

const { mapGetters: mapResultGetters } = createNamespacedHelpers("result");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
  name: "Dashboard",
  components: {
    Result
  },
  data() {
    return {
      tabs: ["All", "Pending", "Send"]
    };
  },
  computed: {
    ...mapResultGetters(["cards"])
  },
  methods: {
    ...mapSystemMutations(["openModal"]),
    openResultDialog() {
      this.openModal({
        type: "ResultDialog"
      });
    }
  }
};
</script>
