<template>
  <ValidationObserver ref="validator">
    <ValidationProvider
      v-for="(value, key) in form"
      :key="`provider-${key}`"
      rules="required"
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
      <v-datetime-picker
        v-else-if="attributes[key].format === 'date'"
        v-model="form[key]"
        :label="attributes[key].title"
        :disabled="processing"
        :error="Boolean(errors.length)"
        :error-messages="errors"
      />
      <v-datetime-picker
        v-else-if="attributes[key].format === 'date-time'"
        v-model="form[key]"
        :label="attributes[key].title"
        :disabled="processing"
        :error="Boolean(errors.length)"
        :error-messages="errors"
      />
      <v-text-field
        v-else-if="attributes[key].type === 'integer'"
        v-model.number="form[key]"
        type="number"
        :key="key"
        :disabled="processing"
        :label="attributes[key].title"
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
      default: () => ({}),
    },
    excluded: {},
    processing: {
      default: false,
    },
  },
  data() {
    return {
      form: {},
      attributes: {},
    };
  },
  methods: {
    init() {
      this.form = {};

      this.attributes = {};

      const keys = _.keys(this.fields).filter(
        (k) => !["dob", "dateOfBirth"].includes(k)
      );

      _.each(keys, (key) => {
        this.$set(this.form, key, null);
        this.$set(this.attributes, key, this.fields[key]);
      });
    },

    async validate() {
      return this.$refs.validator.validate();
    },
  },
};
</script>
