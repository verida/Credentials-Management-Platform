<template>
  <v-form ref="auth-form">
    <h1 class="display-2 font-weight-bold text-center">
      {{ title() }}
    </h1>
    <div class="auth-form__body">
      <v-text-field v-model="email" label="Email" color="success" required />
      <v-text-field v-model="password" label="Password" color="success" required />
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
      email: null,
      password: null
    };
  },
  methods: {
    title() {
      const { type } = this.$route.params;
      switch (type) {
        case "admin":
          return "Admin";
        case "sa-pathology":
          return "SA Pathology";
      }
    },
    submit() {
      console.log("submit");
    }
  }
};
</script>
