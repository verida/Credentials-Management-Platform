<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-tabs color="info" class="dashboard-navigation" :show-arrows="false">
          <v-row justify="space-between">
            <v-col class="d-flex">
              <v-tab @click="setTab(item)" v-for="item in tabs" :key="item">
                {{ item }}
              </v-tab>
            </v-col>
            <v-col v-if="activeTab === 'Sent'" cols="auto">
              <v-btn
                outlined
                @click="openResultDialog"
                color="success"
                class="align-self-center"
              >
                New Result
              </v-btn>
            </v-col>
            <v-col cols="auto" v-else>
              <v-btn
                @click="openAddSchemaDialog"
                outlined
                color="success"
                class="align-self-center"
              >
                Add Schema
              </v-btn>
            </v-col>
          </v-row>
          <v-tab-item class="py-5  my-3">
            <template v-if="cards && cards.length">
              <v-data-table
                :headers="headers"
                :items="cards"
                @click:row="openCredentialDialog"
                :items-per-page="10"
                class="elevation-1"
                :custom-sort="customSort"
              >
                <template v-slot:item.date="{ item }">
                  <span>{{ formatDate(item.date) }}</span>
                </template>
              </v-data-table>
            </template>
            <template v-else> Credential List is empty </template>
          </v-tab-item>
          <v-tab-item class="py-5 my-3">
            <template v-if="allSchemas && allSchemas.length">
              <schema-list
                class="mb-4"
                v-for="item in allSchemas"
                :key="item.$id"
                :item="item"
              />
            </template>
            <template v-else> Custom Schema List is empty </template>
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-container>
    <new-result-dialog />
    <add-new-schema-dialog />
    <credential-details :result="credential" />
  </div>
</template>

<script>
import CredentialDetails from "../components/modals/CredentialDetails.vue";
import NewResultDialog from "../components/modals/ResultDialog";
import AddNewSchemaDialog from "../components/modals/NewSchemaDialog";
import SchemaList from "../components/cards/SchemaList.vue";

import { createNamespacedHelpers } from "vuex";
const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");
const { mapActions: mapAuthActions } = createNamespacedHelpers("auth");
const {
  mapGetters: mapCredentialGetters,
  mapActions: mapCredentialActions,
} = createNamespacedHelpers("credential");

const {
  mapGetters: mapSchemasGetters,
  mapActions: mapSchemasActions,
} = createNamespacedHelpers("schema");

export default {
  name: "Dashboard",
  components: {
    SchemaList,
    NewResultDialog,
    AddNewSchemaDialog,
    CredentialDetails,
  },
  data() {
    return {
      tabs: ["Sent", "Schemas"],
      activeTab: "Sent",
      credential: {},
      headers: [
        {
          text: "Credential Type",
          align: "start",
          sortable: false,
          value: "schema.title",
        },
        { text: "Date", value: "date" },
        { text: "Name", value: "schema.name" },
        { text: "DID", value: "didAbrv" },
      ],
    };
  },
  async beforeMount() {
    await this.fetchUser();
    await this.fetchCredentials();
    await this.fetchSchemasWithId();
  },
  computed: {
    ...mapCredentialGetters(["cards"]),
    ...mapSchemasGetters(["allSchemas"]),
  },
  methods: {
    ...mapSchemasActions(["fetchSchemasWithId"]),
    ...mapCredentialActions(["fetchCredentials"]),
    ...mapAuthActions(["fetchUser"]),
    ...mapSystemMutations(["openModal"]),
    openResultDialog() {
      this.openModal({
        type: "ResultDialog",
      });
    },
    openAddSchemaDialog() {
      this.openModal({
        type: "NewSchemaDialog",
      });
    },
    openCredentialDialog(item, data) {
      this.credential = item;
      this.openModal({
        type: "CredentialDetails",
      });
    },
    setTab(tab) {
      this.activeTab = tab;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] === "date") {
          return isDesc[0]
            ? moment(a[index]) - moment(b[index])
            : moment(b[index]) - moment(a[index]);
        } else {
          if (typeof a[index] !== "undefined") {
            if (!isDesc[0]) {
              return a[index]
                .toLowerCase()
                .localeCompare(b[index].toLowerCase());
            } else {
              return b[index]
                .toLowerCase()
                .localeCompare(a[index].toLowerCase());
            }
          }
        }
      });
      return items;
    },
  },
};
</script>
