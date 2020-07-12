<template>
  <ValidationObserver ref="validator">
    <ValidationProvider
      v-for="(value, key) in form"
      rules="required"
      :key="`provider-${key}`"
      :name="attributes[key].title"
      v-slot="{ errors }"
    >
      <v-autocomplete
        v-if="attributes[key].enum"
        v-model="form[key]"
        chips
        :key="key"
        :items="attributes[key].enum"
        :label="attributes[key].title"
        :disabled="processing"
        :error="Boolean(errors.length)"
        :error-messages="errors"
      />
      <v-text-field
        v-else
        v-model="form[key]"
        :key="key"
        :disabled="processing"
        :label="attributes[key].title"
        :error="Boolean(errors.length)"
        :error-messages="errors"
      />
    </ValidationProvider>
  </ValidationObserver>
</template>

<script>
export default {
  name: "FormField",
  props: {
    fields: {
      default: () => ({})
    },
    excluded: {}
  },
  data() {
    return {
      form: {},
      attributes: {},
      processing: false
    };
  },
  methods: {
    init() {
      this.form = {};
      this.attributes = {};

      const keys = _.keys(this.fields).filter(k => !this.excluded.includes(k));

      _.each(keys, key => {
        this.$set(this.form, key, null);
        this.$set(this.attributes, key, this.fields[key]);
      });
    },
    async validate() {
      return this.$refs.validator.validate();
    }
  }
};
</script>
