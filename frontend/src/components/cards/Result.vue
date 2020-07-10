<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <h2 class="mb-5">{{ result.patient }}</h2>
          <div
            v-for="(value, key) in result.info"
            :key="`info-${result.id}-${key}`"
          >
            {{ key }}:&nbsp;{{ value }}
          </div>
        </v-col>
        <v-col cols="auto">
          <!--<v-btn @click="send" color="info">
            Send Result
          </v-btn>-->
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
  name: "Result",
  props: ["result"],
  methods: {
    ...mapSystemMutations(["openModal"]),
    send() {
      this.openModal({
        id: this.result.id,
        type: "ResultDialog",
        edit: true
      });
    }
  }
};
</script>
