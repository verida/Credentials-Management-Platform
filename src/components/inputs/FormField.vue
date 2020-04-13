<template>
  <v-col cols="12">
    <v-text-field
      v-if="type === 'text-field'"
      v-model="model"
      :label="field"
    />
    <v-select
      v-if="type === 'select'"
      v-model="model"
      :items="options"
      :label="field"
      chips
    />
  </v-col>
</template>

<script>
export default {
  name: "FormField",
  props: ["field"],
  data() {
    return {
      type: null,
      options: null,
      model: null
    };
  },
  beforeMount() {
    this.type = this.el();
    this.options = this.items();
  },
  methods: {
    el() {
      switch (this.field) {
        case "Test type":
        case "Test result":
          return "select";
        default:
          return "text-field";
      }
    },
    items() {
      switch (this.field) {
        case "Test type":
          return ["COVID-19 PCR"];
        case "Test result":
          return ["COVID-19 Negative"];
      }
    }
  }
};
</script>
