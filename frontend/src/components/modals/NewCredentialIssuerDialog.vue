<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="modal text-center">
      <small class="modal-receiver">
        {{ text }}
      </small>
      <div class="modal-contour">
        <v-form class="pa-6">
          <v-card-title class="mt-5 headline justify-center">
            {{ text }}
          </v-card-title>
          <ValidationObserver ref="validator">
            <ValidationProvider
              name="Issuer name"
              rules="required|min:2|max:60"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="issuer.name"
                label="Issuer name"
                placeholder="Please, enter the issuer name"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              name="URL"
              rules="required|min:2|max:60"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="issuer.urlName"
                label="Issuer URL"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              name="Email"
              rules="required|min:2|max:60|email"
              v-slot="{ errors }"
            >
              <v-text-field
                class="mt-7"
                v-model="admin.email"
                label="Issuer admin email"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              name="Password"
              vid="pass"
              rules="required|min:10|max:60"
              v-slot="{ errors }"
            >
              <v-text-field
                type="password"
                autocomplete="new-password"
                v-model="admin.password"
                label="Specify admin password"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              name="Password"
              rules="required|min:10|max:60|confirmed:pass"
              v-slot="{ errors }"
            >
              <v-text-field
                type="password"
                autocomplete="new-password"
                v-model="admin.passwordConfirmation"
                label="Re-enter the password"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <v-messages v-if="error" :value="[error]" class="error--text mt-2" />
            <v-card-actions class="justify-center">
              <v-btn
                @click="save"
                class="ma-5"
                color="info"
                :disabled="processing"
                :loading="processing"
              >
                Save
              </v-btn>
            </v-card-actions>
          </ValidationObserver>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalMixin from "../../mixins/ModalMixin";

import { createNamespacedHelpers } from "vuex";
const { mapActions: mapIssuerActions } = createNamespacedHelpers("issuer");
const { mapActions: mapUserActions } = createNamespacedHelpers("user");

export default {
  name: "NewCredentialIssuerDialog",
  mixins: [ModalMixin],
  data() {
    return {
      text: "New Credential Issuer",
      processing: false,
      issuer: {
        name: null,
        urlName: null,
        chain: "ethr"
      },
      admin: {
        email: null,
        password: null,
        passwordConfirmation: null,
        role: "admin",
        issuerId: null
      },
      error: ""
    };
  },
  methods: {
    ...mapIssuerActions(["createIssuer"]),
    ...mapUserActions(["createUser"]),
    async init() {
      Object.keys(this.issuer).forEach(k => (this.issuer[k] = null));
      Object.keys(this.admin).forEach(k => (this.admin[k] = null));

      this.issuer.chain = "ethr";
      this.admin.role = "admin";

      await this.$nextTick();
      this.$refs.validator && this.$refs.validator.reset();
    },
    async save() {
      this.error = "";
      this.processing = true;

      const validated = await this.$refs.validator.validate();
      if (!validated) {
        this.processing = false;
        return;
      }

      try {
        const issuer = await this.createIssuer(this.issuer);
        this.admin.issuerId = issuer._id;
        await this.createUser(this.admin);
        this.processing = false;
        this.closeModal();
      } catch (e) {
        this.error = e.response && e.response.statusText;
        this.processing = false;
      }
    }
  },
  watch: {
    dialog() {
      this.dialog && this.init();
      this.error = "";
    }
  }
};
</script>
