<template>
  <v-container fluid class="auth" fill-height>
    <v-row justify="center">
      <v-form ref="auth-form" class="auth-form text-center">
        <div class="auth-form__title">
          {{ title }}
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
            @click="submit"
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
import { createNamespacedHelpers } from "vuex";
const { mapActions: mapAuthActions } = createNamespacedHelpers("auth");

import { DASHBOARD } from "../../constants/route";

export default {
  name: "Auth",
  props: {
    title: {
      required: true
    },
    isAdmin: {
      default: false
    }
  },
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      processing: false
    };
  },
  methods: {
    ...mapAuthActions(["login"]),
    async submit() {
      this.processing = true;
      const validated = this.$refs.validator.validate();

      if (!validated) {
        this.processing = false;
        return;
      }

      await this.login({ ...this.user, isAdmin: this.isAdmin });
      this.processing = false;
      await this.$router.push({ name: DASHBOARD });
    }
  }
};
</script>
