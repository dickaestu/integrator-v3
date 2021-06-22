<template>
  <v-app>
    <section id="log">
      <Header />
      <MenuHome />
      <v-container>
        <v-row class="d-flex justify-end mb-5">
          <v-col cols="2">
            <p class="mb-0 mt-1 text-right">Select Date</p>
          </v-col>
          <v-col cols="2">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="mt-0 pt-0"
                  v-model="date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  hide-details="auto"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @change="dateChange(date)" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-card>
          <v-row class="d-flex justify-end">
            <v-col cols="2">
              <v-select
                :items="Type"
                hide-details="auto"
                label="All Type"
                dense
                solo
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                hide-details="auto"
                :items="Level"
                label="All Level"
                dense
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-data-table
                dense
                :headers="headers"
                :items="items"
                :items-per-page="10"
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </section>
  </v-app>
</template>

<script>
import gql from 'graphql-tag'

const QUERY_LOGS = gql `
  query logs ($startTime: Timestamp, $endTime: Timestamp, $type: [String!], $level: [String!]) {
    logs (startTime: $startTime, endTime: $endTime, type: $type, level: $level) {
        timestamp
        caller
        level
        message
        type
    }
    todayLogSummary {
        type
        warn
        error
    }
  }
`
export default {
  name: "Log",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    items: [],
    headers: [
      { text: "Datetime", value: "date" },
      { text: "Type", value: "type" },
      { text: "Level", value: "level" },
      { text: "Description", value: "desc" }
    ],
    Type: ["Api"],
    Level: ["Info", "Error"],
    loading: false
  }),
  mounted() {
    this.getLogs()
    console.log(this.date)
  },
  methods : {
    async getLogs() {
      try {
        this.loading = true
        const res = await this.$apollo.query({
          query: QUERY_LOGS,
          variables: {
            "startTime": null,
            "endTime": null,
            "type": [
            ],
            "level": [
            ]
          },
        });

        if (res) {
          this.loading = false
          let result = res.data.logs

          result.map(items => {
            this.items.push({
              date: new Date(items.timestamp * 1000),
              type: items.type,
              level: items.level,
              desc: items.message
            })
          })
        }
      } catch (err) {
        console.log(err)
        this.loading = false
        // this.searchResults = [];
      }
    },
    dateChange(val){
      console.log(val)
    }
  }
};
</script>
