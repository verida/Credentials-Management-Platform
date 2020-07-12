<template>
  <v-snackbar :timeout="-1" v-model="value" absolute center top color="error">
    {{ msg }}
    <template v-slot:action="{ attrs }">
      <v-btn icon dark text v-bind="attrs" @click="() => $emit('input', false)">
        <v-icon>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: ["msg", "value"]
};
</script>
