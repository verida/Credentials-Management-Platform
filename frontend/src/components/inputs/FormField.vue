<template>
  <div>
    <v-autocomplete
      v-if="attr.enum"
      v-model="value"
      chips
      :items="attr.enum"
      :label="attr.title"
      :disabled="disabled"
    />
    <v-text-field
      v-else
      v-model="value"
      :disabled="disabled"
      :label="attr.title"
    />
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: {
    model: {
      required: true
    },
    attr: {
      default: () => ({})
    },
    disabled: {
      default: false
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
