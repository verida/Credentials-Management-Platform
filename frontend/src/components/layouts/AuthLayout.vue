<template>
  <v-container fluid class="auth" fill-height>
    <v-row justify="center">
      <snackbar v-model="error.shown" :msg="error.msg" />
      <v-form
        ref="auth-form"
        class="auth-form text-center"
        @submit.prevent="submit"
      >
        <div class="auth-form__title">
          <span v-if="!loading">{{ title }}</span>
          <beat-loader v-else />
        </div>
        <div class="auth-form__body">
          <ValidationObserver ref="validator">
            <ValidationProvider
              name="Email"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="user.email"
                label="Email"
                color="white"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              name="Password"
              rules="required|min:2|max:60"
              v-slot="{ errors }"
            >
              <v-text-field
                type="password"
                autocomplete="new-password"
                v-model="user.password"
                label="Password"
                color="white"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
          </ValidationObserver>
          <v-btn
            text
            class="auth-form__submit"
            type="submit"
            :loading="processing"
            :disabled="processing"
          >
            <img src="../../assets/img/medical-logo.png" width="30" />
          </v-btn>
        </div>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import Snackbar from "../notifications/Snackbar";
import BeatLoader from "vue-spinner/src/BeatLoader";

import { createNamespacedHelpers } from "vuex";
const { mapActions: mapAuthActions } = createNamespacedHelpers("auth");

export default {
  name: "Auth",
  components: {
    Snackbar,
    BeatLoader,
  },
  props: {
    title: {
      required: true,
    },
    isAdmin: {
      default: false,
    },
    loading: {
      default: false,
    },
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      processing: false,
      error: {
        shown: false,
        msg: "Sorry those account details are incorrect. Please try again",
      },
    };
  },
  methods: {
    ...mapAuthActions(["login"]),
    async submit() {
      this.error.shown = false;
      this.processing = true;
      const validated = await this.$refs.validator.validate();

      if (!validated) {
        this.processing = false;
        return;
      }

      try {
        await this.login({ ...this.user, isAdmin: this.isAdmin });
        this.processing = false;
        await this.$router.push({ name: this.$route.meta.go });
      } catch (e) {
        this.processing = false;
        this.error.msg = (() => {
          switch (e.response.status) {
            case 401:
              return "Sorry those account details are incorrect. Please try again";
            default:
              return "Something went wrong. Please, try again";
          }
        })();
        this.error.shown = true;
      }
    },
  },
};
</script>
