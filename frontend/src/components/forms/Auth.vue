<template>
  <v-form ref="auth-form">
    <h1 class="display-2 font-weight-bold text-center">
      {{ isAdmin ? "Admin" : "SA Pathology" }}
    </h1>
    <div class="auth-form__body">
      <v-text-field v-model="data.email" label="Email" color="success" required />
      <v-text-field v-model="data.password" label="Password" color="success" required />
    </div>
    <v-btn color="success" class="float-right"
      @click="submit"
      :disabled="processing">
      Login
    </v-btn>
  </v-form>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions: mapAuthActions } = createNamespacedHelpers("auth");

export default {
  name: "Auth",
  data() {
    return {
      processing: false,
      data: {
        email: "admin@verida.com",
        password: "admin"
      }
    };
  },
  computed: {
    isAdmin() {
      const { name } = this.$route;
      return name === "AdminLogin";
    }
  },
  methods: {
    ...mapAuthActions(["login"]),
    async submit() {
      this.processing = true;
      await this.login(this.data);
      this.processing = false;
    }
  }
};
</script>
