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
                v-model="issuerProfile.name"
                label="Issuer name"
                placeholder="Please, enter the issuer name"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider rules="dimensions:500,500" name="Avatar">
              <v-file-input
                show-size
                label="Select Image"
                accept="image/*"
                placeholder="Please, enter the issuer image"
                @change="createBase64Image"
              ></v-file-input>
            </ValidationProvider>
            <v-messages
              v-if="error"
              :value="[error]"
              class="error--text mt-2"
            />
            <v-img
              max-height="150"
              max-width="250"
              :src="issuerProfile.avatarUri"
            ></v-img>
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
const { mapActions: mapIssuerActions, mapState: mapIssuerState } =
  createNamespacedHelpers("issuer");
const { mapActions: mapUserActions } = createNamespacedHelpers("user");

export default {
  name: "UpdateIssuerProfile",
  mixins: [ModalMixin],
  data() {
    return {
      text: "Update Issuer Profile",
      processing: false,
      issuerProfile: {
        name: "",
        avatarUri: "",
      },
      error: "",
    };
  },
  computed: {
    ...mapIssuerState(["issuer"]),
  },
  methods: {
    ...mapIssuerActions([
      "createIssuer",
      "updateIssuerProfile",
      "fetchIssuers",
    ]),
    ...mapUserActions(["createUser"]),

    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.issuerProfile.avatarUri = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async sgitave() {
      this.error = "";
      this.processing = true;

      const data = {
        name: this.issuerProfile.name || this.issuer.name,
        avatarUri: this.issuerProfile.avatarUri || this.issuer.avatarUri,
      };

      try {
        await this.updateIssuerProfile({
          data,
          id: this.issuer._id,
        });
        await this.fetchIssuers();
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
      this.error = "";
    },
  },
};
</script>
