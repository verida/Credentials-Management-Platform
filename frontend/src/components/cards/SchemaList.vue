<template>
  <v-card class="credential">
    <v-card-text>
      <v-row>
        <v-col cols="auto">
          <h2>{{ item.title }}</h2>
          <div class="credential__subtext">
            <span class="font-weight-bold d-block">schema Url&nbsp;:</span>
            <a class="info--text" :href="item.schemaUrl" target="_blanck">{{
              item.schemaUrl
            }}</a>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-sm-end mt-n10">
      <v-btn
        :disabled="processing"
        @click="onDelete(item._id)"
        outlined
        color="red mr-1"
        depressed
      >
        <v-icon left>
          {{ icons.mdiDelete }}
        </v-icon>
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mdiDelete } from "@mdi/js";
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");
const { mapActions: mapSchemasActions } = createNamespacedHelpers("schema");

export default {
  name: "SchemaList",
  props: ["item"],
  data: () => ({
    icons: {
      mdiDelete,
    },
    processing: false,
    error: null,
  }),
  methods: {
    ...mapSystemMutations(["openModal"]),
    ...mapSchemasActions(["deleteSchema", "fetchSchemasWithId"]),
    send() {
      this.openModal({
        id: this.result.id,
        type: "ResultDialog",
        edit: true,
      });
    },

    async onDelete(id) {
      this.processing = true;
      try {
        await this.deleteSchema({ id });
        await this.fetchSchemasWithId();
      } catch (error) {
        this.error = error;
      } finally {
        this.processing = false;
      }
    },
  },
};
</script>
