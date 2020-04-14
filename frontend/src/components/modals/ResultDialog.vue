<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="modal text-center">
      <small class="modal-receiver">
        {{ title }}
      </small>
      <div class="modal-contour">
        <form-field
          v-for="field in data"
          :key="field.label"
          :label="field.label"
          :model="field.model"
          :readonly="field.readonly"
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
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormField from "../inputs/FormField";
import ModalMixin from "../../mixins/ModalMixin";

export default {
  name: "ResultDialog",
  components: { FormField },
  mixins: [FormMixin, ModalMixin],
  data() {
    return {
      data() {},
      title: null,
      fields: [
        "Full name",
        "Date of birth",
        "Health number",
        "Mobile number",
        "DID",
        "Test type",
        "Test result"
      ],
      issues: {
        timestamp: "Issues timestamp: 1st May 2020",
        by: "Issued by: SA Pathology, Adelaide City"
      }
    };
  },
  methods: {
    send() {
      console.log("send");
      this.dialog = false;
    },
    init() {
      if (this.modal && this.modal.edit) {
        this.title = "Send Result";
        const editable = ["Test type", "Test result"];

        this.data = {};
        this.fields.forEach(field => {
          const key = this.fieldToKey(field);
          this.$set(this.data, key, {
            model: null,
            readonly: !editable.includes(field),
            label: field
          });
        });
      } else {
        this.title = "New Result";
      }
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
    dialog() {
      if (this.dialog) {
        this.init();
      }
    }
  }
};
</script>
