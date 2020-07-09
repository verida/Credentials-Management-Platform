<template>
  <v-container fluid fill-height>
    <v-row justify="center" align-items="center">
      <v-form ref="auth-form" class="auth-form">
        <h1 class="text-center auth-form__title success--text text--darken-1">
          {{ title }}
        </h1>
        <div class="auth-form__body">
          <ValidationObserver ref="validator" slo>
            <ValidationProvider
              name="Email"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="user.email"
                label="Email"
                color="success"
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
                v-model="user.password"
                label="Password"
                color="success"
                :error="Boolean(errors.length)"
                :error-messages="errors"
              />
            </ValidationProvider>
          </ValidationObserver>
        </div>
        <v-btn
          color="success"
          @click="submit"
          class="float-right"
          :loading="processing"
          :disabled="processing"
        >
          Login
        </v-btn>
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
        password: null,
        isAdmin: true
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

      await this.login(this.user);
      this.processing = false;
      await this.$router.push({ name: DASHBOARD });
    }
  }
};
</script>
