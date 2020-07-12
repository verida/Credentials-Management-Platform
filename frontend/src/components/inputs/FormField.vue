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
      :items="items"
      :label="label"
      :readonly="readonly"
      chips
    />
    <v-autocomplete
      v-if="type === 'autocomplete'"
      v-model="value"
      :items="items"
      :label="label"
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
    },
    items: {
      default: []
    },
    type: {
      default: "text-field"
    }
  },
  data() {
    return {
      value: this.model
    };
  },
  watch: {
    value() {
      this.$emit("update", this.value);
    }
  }
};
</script>
