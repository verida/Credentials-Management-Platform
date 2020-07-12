<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="modal text-center" v-if="dialog">
      <small class="modal-receiver">
        {{ title }}
      </small>
      <div class="modal-contour">
        <ValidationObserver ref="validator">
          <credential-header
            :schemas="schemas"
            :processing="processing"
            ref="credential"
            @schema-update="v => init(v)"
          />
          <v-col cols="12">
            <form-field
              ref="fields"
              :fields="fields"
              :excluded="['dateOfBirth', 'dob']"
            />
            <v-col>
              <div>{{ issues.timestamp }}</div>
              <div class="mt-2">{{ issues.by }}</div>
            </v-col>
            <v-card-actions class="justify-center mt-10">
              <v-btn
                @click="closeModal"
                color="info"
                outlined
                :disabled="processing"
              >
                Close
              </v-btn>
              <v-btn
                @click="send"
                color="info"
                :disabled="processing"
                v-if="fields"
              >
                Send Credential
              </v-btn>
            </v-card-actions>
          </v-col>
        </ValidationObserver>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormField from "../inputs/FormField";
import ModalMixin from "../../mixins/ModalMixin";

import { createNamespacedHelpers } from "vuex";
import CredentialHeader from "../particles/CredentialHeader";
const { mapGetters: mapResultGetters } = createNamespacedHelpers("result");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");
const { mapActions: mapCredentialActions } = createNamespacedHelpers(
  "credential"
);
const {
  mapGetters: mapSchemaGetters,
  mapActions: mapSchemaActions
} = createNamespacedHelpers("schema");

export default {
  name: "ResultDialog",
  components: { CredentialHeader, FormField },
  mixins: [FormMixin, ModalMixin],
  data() {
    return {
      title: null,
      processing: false,
      fields: null,

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
      const validated = await Promise.all([
        this.$refs.fields.validate(),
        this.$refs.credential.validate()
      ]);

      if (validated.includes(false)) {
        this.processing = false;
        return;
      }

      const form = this.$refs.fields.form;
      const data = this.$refs.credential.main;
      const credential = {
        ...data,
        data: {
          name: form.fullName + " " + form.testType,
          schema: this.schemaPath(this.$refs.credential.schema),
          ...form
        }
      };

      await this.createCredential(credential);
      this.processing = false;
      this.closeModal();
    },
    async init(schema) {
      this.title = "New Result";

      this.fields = this.properties(schema);
      await this.$nextTick();
      this.$refs.fields && this.$refs.fields.init();
    }
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.fields = null;
        this.$refs.credential && this.$refs.credential.reset();
      }
    }
  }
};
</script>
