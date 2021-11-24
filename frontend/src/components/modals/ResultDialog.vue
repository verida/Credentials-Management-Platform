<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="modal text-center" v-if="dialog">
      <small class="modal-receiver">
        {{ title }}
      </small>
      <div class="modal-contour">
        <ValidationObserver ref="validator">
          <credential-header
            :schemas="defaultSchemas"
            :processing="processing"
            ref="credential"
            @schema-update="(v) => init(v)"
          />
          <v-col cols="12">
            <form-field
              ref="fields"
              :fields="fields"
              :excluded="excluded"
              :processing="processing"
            />
            <v-col>
              <div>{{ issues.timestamp }}</div>
              <div class="mt-2">{{ issues.by }}</div>
            </v-col>
            <v-col>
              <v-messages
                v-if="error"
                :value="[error]"
                class="error--text mt-2"
              />
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
const { mapGetters: mapAuthGetters } = createNamespacedHelpers("auth");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");
const { mapActions: mapCredentialActions } = createNamespacedHelpers(
  "credential"
);
const {
  mapGetters: mapSchemaGetters,
  mapActions: mapSchemaActions,
} = createNamespacedHelpers("schema");

export default {
  name: "ResultDialog",
  components: { CredentialHeader, FormField },
  mixins: [FormMixin, ModalMixin],
  data() {
    return {
      title: "",
      processing: false,
      fields: null,

      excluded: ["dateOfBirth", "dob"],
      error: null,
      issues: {
        timestamp: `Timestamp: ${moment().format("Do MMM YYYY h:mm:ss a")}`,
        by: null,
      },
    };
  },
  async beforeMount() {
    this.issues.by = `Issued by: ${this.issuer && this.issuer.name}`;
    await this.fetchSchemas();
  },
  computed: {
    ...mapResultGetters(["find"]),
    ...mapAuthGetters(["issuer"]),
    ...mapSchemaGetters([
      "defaultSchemas",
      "customSchemas",
      "properties",
      "schemaPath",
      "schemasTitle",
    ]),
  },
  methods: {
    ...mapSchemaActions(["fetchSchemas"]),
    ...mapSystemMutations(["openModal", "closeModal"]),
    ...mapCredentialActions(["createCredential"]),
    setDateOfBirth(form, data) {
      const dob = _.chain(this.fields)
        .pick(this.excluded)
        .keys()
        .value();

      _.each(dob, (item) => {
        form[item] = data.dob;
      });
    },
    async send() {
      this.error = null;
      this.processing = true;
      const validated = await Promise.all([
        this.$refs.fields.validate(),
        this.$refs.credential.validate(),
      ]);

      if (validated.includes(false)) {
        this.processing = false;
        return;
      }

      const data = this.$refs.credential.main;
      const form = this.$refs.fields.form;

      this.setDateOfBirth(form, data);

      const credential = {
        ...data,
        data: {
          title: this.$refs.credential.schema,
          name: data.name,
          schema: this.schemaPath(this.$refs.credential.schema),
          ...form,
        },
      };

      try {
        await this.createCredential(credential);
        this.processing = false;
        this.closeModal();
      } catch (e) {
        this.processing = false;
        this.error = e.response.statusText;
      }
    },
    async init(schema) {
      this.title = "New Result";

      this.fields = this.properties(schema);

      await this.$nextTick();
      this.$refs.fields && this.$refs.fields.init();
    },
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.fields = null;
        this.$refs.credential && this.$refs.credential.reset();
      }
    },
  },
};
</script>
