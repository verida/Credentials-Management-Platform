<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="modal text-center" v-if="dialog">
      <small class="modal-receiver">
        {{ title }}
      </small>
      <div class="modal-contour">
        <form-field
          type="autocomplete"
          label="Document Type"
          :model="schema"
          :items="schemas"
          @update="value => (schema = value)"
        />
        <template v-if="false">
          <form-field
            v-for="field in form"
            :key="field.label"
            :label="field.label"
            :model="field.model"
            :readonly="field.readonly"
            @update="value => (field.model = value)"
          />
          <v-col>
            <div>{{ issues.timestamp }}</div>
            <div class="mt-2">{{ issues.by }}</div>
            <v-card-actions class="justify-center">
              <v-btn @click="send" class="mt-10 float-right" color="info">
                Send Credential
              </v-btn>
            </v-card-actions>
          </v-col>
        </template>
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
const {
  mapGetters: mapSchemaGetters,
  mapActions: mapSchemaActions
} = createNamespacedHelpers("schema");

export default {
  name: "ResultDialog",
  components: { FormField },
  mixins: [FormMixin, ModalMixin],
  data() {
    return {
      form: {},
      title: null,
      schema: null,
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
    ...mapSchemaGetters(["schemas", "properties"]),
    fields() {
      return this.schema && this.properties(this.schema);
    }
  },
  methods: {
    ...mapSchemaActions(["fetchSchemas"]),
    ...mapSystemMutations(["openModal", "closeModal"]),
    send() {
      const { fullName, healthNumber } = this.form;
      this.openModal({
        type: "SentDialog",
        patient: fullName.model,
        number: healthNumber.model
      });
    },
    init() {
      console.log(this.fields, "fields");
      /* let result = this.find(this.modal && this.modal.id);
      let editable = [];

      this.form = {};

      if (result) {
        this.title = "Send Result";
        editable = ["Test type", "Test result"];
      } else {
        this.title = "New Result";
      }

      this.fields.forEach(field => {
        const key = this.fieldToKey(field);
        const readonly = editable.length && !editable.includes(field);

        this.$set(this.form, key, {
          model: (result && result[key]) || null,
          readonly: Boolean(readonly),
          label: field
        });
      }); */
    },
    fieldToKey(field) {
      return field
        .toLowerCase()
        .split(/ /)
        .map((item, index) =>
          index !== 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item
        )
        .join("");
    }
  },
  watch: {
    fields() {
      this.init();
    }
  }
};
</script>
