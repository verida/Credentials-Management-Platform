<template>
  <v-form ref="auth-form">
    <h1 class="display-2 font-weight-bold text-center">
      {{ isAdmin ? "Admin" : "SA Pathology" }}
    </h1>
    <div class="auth-form__body">
      <v-text-field v-model="data.email" label="Email" color="success" required />
      <v-text-field v-model="data.password" label="Password" color="success" required />
    </div>
    <v-btn color="success" @click="submit" class="float-right">
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      data: {
        email: null,
        password: null
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
    submit() {
      this.login(this.data);
    }
  }
};
</script>
