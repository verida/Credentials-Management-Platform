<template>
  <v-container>
    <v-row justify="center">
      <v-tabs color="info" class="dashboard-navigation" :show-arrows="false">
        <v-tab v-for="item in tabs" :key="item">
          {{ item }}
        </v-tab>
        <v-tab-item v-for="n in 4" :key="n" class="py-5">
          <NewResult v-if="n === 4" />
          <Result
            v-else
            class="mb-4"
            v-for="result in results"
            :key="result.id"
            :result="result"
          />
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import Result from "../components/cards/Result";
import NewResult from "../components/forms/NewResult";

export default {
  name: "Dashboard",
  components: {
    Result,
    NewResult
  },
  data() {
    return {
      tabs: ["All", "Pending", "Abstract", "New Result"],
      results: [
        {
          id: 1,
          patient: "John Smith",
          info: [
            {
              field: "DOB",
              value: "22 November 1976"
            },
            {
              field: "Health Number",
              value: "189-679-112 3"
            },
            {
              field: "DID",
              value: "did:ethr:0x33b92b41b775Ce6ebc0C8bcBdEf19B1e1d8bFd82"
            }
          ]
        },
        {
          id: 2,
          patient: "Jane Doe",
          info: [
            {
              field: "DOB",
              value: "22 November 1976"
            },
            {
              field: "Health Number",
              value: "189-679-112 3"
            },
            {
              field: "DID",
              value: "did:ethr:0x33b92b41b775Ce6ebc0C8bcBdEf19B1e1d8bFd82"
            }
          ]
        }
      ]
    };
  }
};
</script>
