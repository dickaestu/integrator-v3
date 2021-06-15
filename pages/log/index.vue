<template>
  <v-app>
    <section id="log">
      <Header />
      <MenuLog />
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
              <v-date-picker v-model="date" no-title scrollable>
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
                hide-default-footer
              ></v-data-table>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "Log",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    items: [
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Info",
        desc: "Path: ‘/Api/Login’, Status: 200, Query: “, Body: ‘Redacted’"
      },
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Error",
        desc:
          "Cannot Load CSV File,‘/Users/MarsDataScience/Desktop/Project/MUSA/Integrator-Fullstack/Release/Csv/2021-01-26.Csv’ File not Exists"
      },
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Info",
        desc:
          "Path: ‘/Api/Protected/Common_setup’, Status: 200, Query: “, Body: “"
      },
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Error",
        desc: "File Not Found"
      },
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Info",
        desc:
          "Path: ‘/Api/Protected/’Measurement_toggle, Status: 200, Query: “, Body: “"
      },
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Info",
        desc:
          "Path: ‘/Api/Protected/Last_measurement’, Status: 200, Query: “, Body: “"
      },
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Info",
        desc:
          "Path: ‘/Api/Protected/Log’, Status: 200, Query: “, Body: ‘(‘Filter’: {‘Start_date’: ‘2021-01-26’, ‘End_date’: ‘2021-01-26’),’Logs_type’: [‘Data_transfer’:’Measurement’]}’"
      },
      {
        date: "20:40:18 00:10:00",
        type: "Api",
        level: "Info",
        desc:
          "Path: ‘/Api/Protected/Last_measurement’, Status: 200, Query: “, Body: “"
      }
    ],
    headers: [
      { text: "Datetime", value: "date" },
      { text: "Type", value: "type" },
      { text: "Level", value: "level" },
      { text: "Description", value: "desc" }
    ],
    Type: ["Api"],
    Level: ["Info", "Error"]
  })
};
</script>
