<template>
  <v-card :key="result.id">
    <v-card-text>
      <v-row>
        <v-col>
          <h2 class="mb-5">{{ result.patient }}</h2>
          <div v-for="(item, index) in result.info" :key="`info-${result.id}-${index}`">
            {{ item.field }}:&nbsp;{{ item.value }}
          </div>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="send" color="info">
            Send Result
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Result",
  props: ["result"],
  methods: {
    send(id) {
      console.log(id);
    }
  }
};
</script>
