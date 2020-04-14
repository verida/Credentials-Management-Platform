<template>
  <v-col cols="12">
    <v-text-field
      v-if="type === 'text-field'"
      v-model="value"
      :label="label"
      :readonly="readonly"
    />
    <v-select
      v-if="type === 'select'"
      v-model="value"
      :items="options"
      :label="label"
      :readonly="readonly"
      chips
    />
  </v-col>
</template>

<script>
export default {
  name: "FormField",
  props: {
    label: {
      type: String
    },
    model: {
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: null,
      options: null,
      value: this.model
    };
  },
  beforeMount() {
    this.type = this.el();
    this.options = this.items();
  },
  methods: {
    el() {
      switch (this.label) {
        case "Test type":
        case "Test result":
          return "select";
        default:
          return "text-field";
      }
    },
    items() {
      switch (this.label) {
        case "Test type":
          return ["COVID-19 PCR"];
        case "Test result":
          return ["COVID-19 Negative"];
      }
    }
  },
  watch: {
    value() {
      this.$emit("update", this.value);
    }
  }
};
</script>
