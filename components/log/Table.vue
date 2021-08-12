<template>
  <v-container>
    <v-row class="d-flex justify-lg-end mb-5 mt-4 mt-lg-0">
      <v-col cols="12" sm="3" md="2" lg="2">
        <p class="mb-0 mt-1 text-lg-right musa_green_dark_text">Select Date</p>
      </v-col>
      <v-col cols="12" sm="3" md="3" lg="2">
        <v-menu
          content-class="date_single_range"
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="mt-0 pt-0 date_range"
              v-model="date"
              readonly
              v-bind="attrs"
              v-on="on"
              hide-details="auto"
              solo
              append-icon="mdi-menu-down"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="dateChange(date)"
            no-title
            scrollable
            color="color_current_date"
          >
            <v-spacer></v-spacer>
            <v-btn text @click="menu = false">
              Cancel
            </v-btn>
            <v-btn text @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-card>
      <v-row class="d-flex justify-end">
        <v-col cols="6" sm="4" md="3" lg="2">
          <v-select
            :items="Type"
            hide-details="auto"
            label="All Type"
            dense
            solo
          ></v-select>
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <v-select
            hide-details="auto"
            :items="level"
            label="All Level"
            dense
            solo
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            mobile-breakpoint="0"
            calculate-widths
            dense
            :headers="headers"
            :items="items"
            :items-per-page="10"
          >
            <template v-slot:[`item.level`]="{ item }">
              <v-chip :color="getColor(item.level)" dark>
                {{ item.level }}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

const QUERY_LOGS = gql`
  query logs(
    $startTime: Timestamp
    $endTime: Timestamp
    $type: [String!]
    $level: [String!]
  ) {
    logs(startTime: $startTime, endTime: $endTime, type: $type, level: $level) {
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
`;
export default {
  name: "Log",
  data: () => ({
    date: new Date().toISOString().split('T')[0],
    menu: false,
    items: [],
    headers: [
      { text: "Datetime", value: "date" },
      { text: "Type", value: "type" },
      { text: "Level", value: "level" },
      { text: "Description", value: "desc" }
    ],
    Type: ["Api"],
    level: ["Info", "Error"],
    loading: false,
    timestamps1: null,
    timestamps2: null,
  }),
  mounted() {
    this.getLogs();
  },
  methods: {
    async getLogs() {
      try {
        this.loading = true;
        const res = await this.$apollo.query({
          query: QUERY_LOGS,
          variables: {
            startTime: this.timestamps1 !== null ? this.timestamps1 / 1000 : null,
            endTime: this.timestamps2 !== null ? this.timestamps2 / 1000 : null,
            type: [
              "measurement",
              "data_transfer",
              "iot",
              "operation"
            ],
            level: []
          }
        });

        if (res) {
          this.loading = false;
          let result = res.data.logs;
          var options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric', 
                second: 'numeric', 
                timeZone: 'Asia/Jakarta',
          };
          result.map(items => {
            this.items.push({
              // date: new Date(items.timestamp * 1000),
              date: new Intl.DateTimeFormat('ban-ID', options).format(new Date(items.timestamp * 1000)),
              type: items.type.toUpperCase(),
              level: items.level.toUpperCase(),
              desc: items.message
            });
          });
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
        // this.searchResults = [];
      }
    },
    getColor(level) {
      if (level == "Info") return "#D45757";
      else return "#399F4F";
    },
    dateChange(val) {
      console.log(val);
      // this.menu = false
      var arr1 = val;
      arr1 = arr1.split("-");
      var newDate = new Date(
        arr1[0],
        arr1[1] - 1,
        arr1[2],
        0,
        0,
        1,
        0
      ).getTime();
      this.timestamps1 = newDate;

      var arr2 = val;
      arr2 = arr2.split("-");
      var newDate2 = new Date(
        arr2[0],
        arr2[1] - 1,
        arr2[2],
        23,
        59,
        59
      ).getTime();
      this.timestamps2 = newDate2
      this.getLogs()
    }
  }
};
</script>
