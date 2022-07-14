<template>
  <div class="">
    <v-row>
      <v-col cols="auto">
        <h2>{{ result.name }}</h2>
        <div class="credential__subtext">
          <span class="font-weight-bold">Recepient Did: &nbsp;</span>
          <span class="info--text">{{ result.did }}</span>
          <div v-for="(value, key) in schemaProps" :key="key">
            <span class="font-weight-bold text-capitalize"
              >{{ key }}: &nbsp;</span
            >
            <a
              v-if="key === 'schema'"
              class="info--text"
              :href="value"
              target="_blanck"
              >{{ value }}</a
            >
            <span v-else class="info--text text-capitalize">{{ value }}</span>
          </div>
        </div>
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
  data() {
    return {
      schemaProps: {},
    };
  },
  mounted() {
    if (this.result && this.result.schema) {
      this.schemaProps = _.omit(this.result.schema, "didJwtVc");
    }
  },
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
};
</script>
