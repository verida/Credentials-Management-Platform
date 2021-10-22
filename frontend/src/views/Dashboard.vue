<template>
  <div>
    <v-container>
      <!-- <button color="success" @click="addNewSchemasTest()">Test aadding</button> -->
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
          <v-tab-item class="py-5">
            <template v-if="cards && cards.length">
              <message-list
                class="mb-4"
                v-for="card in cards"
                :key="card.id"
                :result="card"
              />
            </template>
            <template v-else> Credential List is empty </template>
          </v-tab-item>
          <v-tab-item class="py-5">
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
  </div>
</template>

<script>
import MessageList from "../components/cards/Result";
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
    MessageList,
    NewResultDialog,
    AddNewSchemaDialog,
  },
  data() {
    return {
      tabs: ["Sent", "Schemas"],
      activeTab: "Sent",
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
    setTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>
