<template>
  <v-card class="credential">
    <v-card-text>
      <v-row>
        <v-col cols="auto">
          <h2>{{ result.patient }}</h2>
          <div class="credential__subtext">
            <span class="font-weight-bold">Mobile number:&nbsp;</span>
            <span class="info--text">{{ result.mobile }}</span>
          </div>
          <div
            class="mb-2"
            v-for="item in result.info"
            :key="`info-${result.id}-${item.title}`"
          >
            {{ item.title }}: &nbsp;
            <component :is="item.title === 'Test result' ? 'v-chip' : 'span'">
              {{ item.value }}
            </component>
          </div>
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
