<template>
  <div>
    <v-card class="credential">
      <v-card-text>
        <v-row>
          <v-col cols="auto">
            <h2>{{ item.title }}</h2>
            <div class="credential__subtext">
              <span class="font-weight-bold d-block">Schema Url&nbsp;:</span>
              <a class="info--text" :href="item.schemaUrl" target="_blanck">{{
                item.schemaUrl
              }}</a>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-sm-end mt-n10">
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Delete
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Confirm Delete
              </v-card-title>
              <v-card-text>
                Are you sure you want to delete this schema ?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancel
                </v-btn>
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
          </v-dialog>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mdiDelete } from "@mdi/js";
const { mapActions: mapSchemasActions } = createNamespacedHelpers("schema");

export default {
  name: "SchemaList",
  props: ["item"],
  data: () => ({
    icons: {
      mdiDelete,
    },
    dialog: false,
    processing: false,
    error: null,
  }),
  methods: {
    ...mapSchemasActions(["deleteSchema", "fetchSchemasWithId"]),

    async onDelete(id) {
      this.processing = true;
      try {
        await this.deleteSchema({ id });
        await this.fetchSchemasWithId();
        this.dialog = false;
      } catch (error) {
        this.error = error;
      } finally {
        this.processing = false;
      }
    },
  },
};
</script>
