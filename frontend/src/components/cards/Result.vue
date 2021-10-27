<template>
  <div class="">
    <v-row>
      <v-col cols="auto">
        <h2>{{ result.name }}</h2>
        <div class="credential__subtext">
          <span class="font-weight-bold">Recepient Did: &nbsp;</span>
          <span class="info--text">{{ result.did }}</span>
          <div v-for="(value, key) in result.schema" :key="value">
            <span class="font-weight-bold text-capitalize"
              >{{ key }}: &nbsp;</span
            >
            <span class="info--text text-capitalize">{{ value }}</span>
          </div>
        </div>
        <!-- <div
          class="mb-2"
          v-for="item in result.info"
          :key="`info-${result.id}-${item.title}`"
        >
          {{ item.title }}: &nbsp;
          <component :is="item.title === 'Test result' ? 'v-chip' : 'span'">
            {{ item.value }}
          </component>
        </div> -->
      </v-col>
    </v-row>
  </div>
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
        edit: true,
      });
    },
  },
  mounted() {
    console.log(this.result);
  },
};
</script>
