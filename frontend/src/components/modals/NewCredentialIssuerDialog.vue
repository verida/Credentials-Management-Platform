<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="modal text-center">
      <small class="modal-receiver">
        {{ text }}
      </small>
      <div class="modal-contour">
        <v-form class="pa-6">
          <v-card-title class="headline justify-center">
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
                :disabled="processing || Boolean(admin.issuerId)"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider name="Avatar">
              <v-file-input
                show-size
                label="Select Image"
                accept="image/*"
                placeholder="Please, enter the issuer image"
                @change="createBase64Image"
              ></v-file-input>
            </ValidationProvider>
            <ValidationProvider
              name="URL"
              rules="required|min:2|max:60"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="issuer.urlName"
                label="Issuer URL"
                :disabled="processing || Boolean(admin.issuerId)"
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
                :disabled="processing"
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
                :disabled="processing"
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
                :disabled="processing"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <v-img
              max-height="150"
              max-width="250"
              :src="issuer.avatarUri"
            ></v-img>
            <v-messages
              v-if="error"
              :value="[error]"
              class="error--text mt-2"
            />
            <v-card-actions class="justify-center my-5">
              <v-btn
                @click="closeModal"
                color="info"
                outlined
                :disabled="processing"
              >
                Close
              </v-btn>
              <v-btn
                @click="save"
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
      image: "",
      remoteUrl: "",
      text: "New Credential Issuer",
      processing: false,
      issuer: {
        name: null,
        urlName: null,
        avatarUri: "",
        chain: "ethr",
      },
      admin: {
        email: null,
        password: null,
        passwordConfirmation: null,
        role: "admin",
        issuerId: null,
      },
      error: "",
    };
  },
  methods: {
    ...mapIssuerActions(["createIssuer"]),
    ...mapUserActions(["createUser"]),

    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.issuer.avatarUri = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async init() {
      Object.keys(this.issuer).forEach((k) => (this.issuer[k] = null));
      Object.keys(this.admin).forEach((k) => (this.admin[k] = null));

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
        if (!this.admin.issuerId) {
          const issuer = await this.createIssuer(this.issuer);
          this.admin.issuerId = issuer._id;
        }
        await this.createUser(this.admin);
        this.processing = false;
        this.closeModal();
      } catch (e) {
        const error = { e };
        this.error = error?.e?.response?.data?.message[0];
        this.processing = false;
      }
    },
  },
  watch: {
    dialog() {
      this.dialog && this.init();
      this.error = "";
    },
  },
};
</script>
