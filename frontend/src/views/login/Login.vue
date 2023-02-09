<template>
  <auth-layout :title="title" :loading="processing" />
</template>

<script>
import AuthLayout from "../../components/layouts/AuthLayout";
import { ADMIN_LOGIN } from "../../constants/route";

import { createNamespacedHelpers } from "vuex";
import { config } from '../../config';
const { mapActions: mapIssuerActions } =
  createNamespacedHelpers("issuer");

export default {
  name: "Login",
  components: {
    AuthLayout,
  },
  data() {
    return {
      title: config.veridaContextName,
      processing: true,
    };
  },
  async beforeMount() {
    await this.init();
  },
  methods: {
    ...mapIssuerActions(["fetchIssuerByUrl"]),
    async init() {
      this.processing = true;
      const { type } = this.$route.params;

      if (!type || this.$route.name === ADMIN_LOGIN) {
        this.processing = false;
        return;
      }

      try {
        const { name } = await this.fetchIssuerByUrl(type);
        this.title = name;
        this.processing = false;
      } catch (e) {
        this.processing = false;
        console.log(e);
      }
    },
  },
};
</script>
