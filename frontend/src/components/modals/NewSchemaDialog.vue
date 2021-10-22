<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-form @submit.prevent="send" v-model="valid">
      <v-card class="modal text-center" v-if="dialog">
        <small class="modal-receiver">
          {{ title }}
        </small>
        <div class="modal-contour">
          <v-col cols="12">
            <v-text-field
              v-model="schemaUrl"
              :rules="schemaRules"
              label="Schema Url"
              required
            ></v-text-field>
            <v-col>
              <div>{{ issues.timestamp }}</div>
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
              <v-btn type="submit" color="info" :disabled="processing">
                Add Schema
              </v-btn>
            </v-card-actions>
          </v-col>
        </div>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import ModalMixin from "../../mixins/ModalMixin";

import { createNamespacedHelpers } from "vuex";
const { mapActions: mapSchemaActions } = createNamespacedHelpers("schema");
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
  name: "NewSchemaDialog",
  components: {},
  mixins: [ModalMixin],
  data() {
    return {
      title: null,
      processing: false,
      valid: false,
      schemaUrl: "",
      schemaRules: [(v) => !!v || "Schema Url is required"],

      error: null,
      issues: {
        timestamp: `Timestamp: ${moment().format("Do MMM YYYY h:mm:ss a")}`,
        by: null,
      },
    };
  },
  async beforeMount() {
    this.issues.by = `Issued by: ${this.issuer && this.issuer.name}`;
  },
  computed: {},
  methods: {
    ...mapSchemaActions(["addNewSchemas", "fetchSchemasWithId"]),
    ...mapSystemMutations(["openModal", "closeModal"]),

    async send() {
      if (this.schemaUrl === "") {
        return;
      }
      this.error = null;
      this.processing = true;
      try {
        const data = {
          schemaUrl: this.schemaUrl,
        };
        await this.addNewSchemas(data);
        await this.fetchSchemasWithId();
        this.schemaUrl = "";
        this.closeModal();
      } catch (error) {
        this.error = error;
      } finally {
        this.processing = false;
      }
    },
  },
  watch: {
    dialog() {},
  },
};
</script>
