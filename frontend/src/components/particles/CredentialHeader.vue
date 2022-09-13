<template>
  <ValidationObserver ref="validator">
    <v-col cols="12">
      <ValidationProvider rules="required" name="Did" v-slot="{ errors }">
        <v-text-field
          class="mb-5"
          label="Recipient's Did"
          v-model="main.did"
          :disabled="processing"
        />
        <v-messages :value="errors" class="error--text mt-2" />
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        name="Document Type"
        v-slot="{ errors }"
      >
        <v-autocomplete
          label="Document Type"
          v-model="schema"
          :items="schemas"
          :disabled="processing"
          :error="Boolean(errors.length)"
          :error-messages="errors"
          @input="() => $emit('schema-update', schema)"
        />
      </ValidationProvider>
      <v-dialog
        ref="dialog"
        v-model="datepicker"
        :return-value.sync="main.dob"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <ValidationProvider
            rules="required"
            name="Date of Birth"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="main.dob"
              label="Date of Birth"
              readonly
              v-bind="attrs"
              v-on="on"
              :disabled="processing"
              :error="Boolean(errors.length)"
              :error-messages="errors"
            />
          </ValidationProvider>
        </template>
        <v-date-picker v-model="main.dob" scrollable :max="maxDate">
          <v-spacer />
          <v-btn text color="primary" @click="datepicker = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(main.dob)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </ValidationObserver>
</template>

<script>
export default {
  name: "CredentialHeader",
  props: ["processing", "schemas"],
  data() {
    return {
      maxDate: "",
      schema: null,
      datetime: "",
      datepicker: false,
      mobile: null,
      main: {
        dob: null,
        did: null,
        name: "",
      },
    };
  },
  mounted() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    this.maxDate = `${year}-${month}-${day}`;
    this.$refs.validator.reset();
  },
  methods: {
    reset() {
      this.schema = null;
      const dataKeys = _.keys(this.main);
      _.each(dataKeys, (dk) => {
        this.$set(this.main, dk, null);
      });
    },
    async validate() {
      return this.$refs.validator.validate();
    },
  },
};
</script>
