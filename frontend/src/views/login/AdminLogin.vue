<template>
  <auth-layout title="admin" :is-admin="true" />
</template>

<script>
import AuthLayout from "../../components/layouts/AuthLayout";

export default {
  name: "AdminLogin",
  components: {
    AuthLayout
  }
};
</script>
