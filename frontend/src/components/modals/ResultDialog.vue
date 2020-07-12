<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="modal text-center" v-if="dialog">
      <small class="modal-receiver">
        {{ title }}
      </small>
      <div class="modal-contour">
        <v-col cols="12">
          <v-autocomplete
            label="Document Type"
            v-model="schema"
            :items="schemas"
            :disabled="processing"
          />
          <v-text-field label="Mobile phone" v-model="main.mobile" :disabled="processing" />
          <v-dialog
            ref="dialog"
            v-model="datepicker"
            :return-value.sync="main.dob"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="main.dob"
                label="Date of Birth"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="processing" />
            </template>
            <v-date-picker v-model="main.dob" scrollable>
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
        <v-col cols="12">
          <template >
            <form-field
              v-for="(field, key) in form"
              :key="key"
              :disabled="processing"
              :attr="attributes[key]"
              :model="form[key]"
              @update="value => (form[key] = value)"
            />
          </template>
          <v-col>
            <div>{{ issues.timestamp }}</div>
            <div class="mt-2">{{ issues.by }}</div>
          </v-col>
          <v-card-actions class="justify-center mt-10">
            <v-btn @click="closeModal" color="info" outlined :disabled="processing">
              Close
            </v-btn>
            <v-btn @click="send" color="info" :disabled="processing" v-if="schema">
              Send Credential
            </v-btn>
          </v-card-actions>
        </v-col>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormField from "../inputs/FormField";
import ModalMixin from "../../mixins/ModalMixin";

import { createNamespacedHelpers } from "vuex";
const { mapGetters: mapResultGetters } = createNamespacedHelpers("result");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");
const { mapActions: mapCredentialActions } = createNamespacedHelpers("credential");
const {
  mapGetters: mapSchemaGetters,
  mapActions: mapSchemaActions
} = createNamespacedHelpers("schema");

const EXCLUDED = ["dateOfBirth", "dob"];

export default {
  name: "ResultDialog",
  components: { FormField },
  mixins: [FormMixin, ModalMixin],
  data() {
    return {
      title: null,
      schema: null,
      datepicker: false,
      processing: false,
      fields: [],

      main: {
        dob: null,
        mobile: null
      },
      form: {},
      attributes: {},

      issues: {
        timestamp: "Issues timestamp: 1st May 2020",
        by: "Issued by: SA Pathology, Adelaide City"
      }
    };
  },
  async beforeMount() {
    await this.fetchSchemas();
  },
  computed: {
    ...mapResultGetters(["find"]),
    ...mapSchemaGetters(["schemas", "properties", "schemaPath"])
  },
  methods: {
    ...mapSchemaActions(["fetchSchemas"]),
    ...mapSystemMutations(["openModal", "closeModal"]),
    ...mapCredentialActions(["createCredential"]),
    async send() {
      this.processing = true;
      const credential = {
        ...this.data,
        data: {
          name: this.form.fullName + " " + this.form.testType,
          schema: this.schemaPath(this.schema),
          ...this.form
        }
      };
      await this.createCredential(credential);
      this.processing = false;
      this.closeModal();
    },
    init() {
      this.title = "New Result";

      this.form = {};
      this.attributes = {};

      this.fields = this.properties(this.schema);
      const keys = _.keys(this.fields).filter(k => !EXCLUDED.includes(k));

      _.each(keys, key => {
        this.$set(this.form, key, null);
        this.$set(this.attributes, key, this.fields[key]);
      });
    },
    reset() {
      this.schema = null;
      const dataKeys = _.keys(this.main);
      _.each(dataKeys, dk => {
        this.$set(this.main, dk, null);
      });
    }
  },
  watch: {
    schema() {
      this.init();
    },
    dialog() {
      !this.dialog && this.reset();
    }
  }
};
</script>
