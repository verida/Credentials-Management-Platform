<template>
  <auth-layout :title="title" :loading="processing" />
</template>

<script>
import AuthLayout from "../../components/layouts/AuthLayout";
import { ADMIN_LOGIN } from "../../constants/route";

import { createNamespacedHelpers } from "vuex";
const { mapState: mapIssueState, mapActions: mapIssuerActions } =
  createNamespacedHelpers("issuer");
const { VUE_APP_NAME } = process.env;
export default {
  name: "Login",
  components: {
    AuthLayout,
  },
  data() {
    return {
      title: VUE_APP_NAME,
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
