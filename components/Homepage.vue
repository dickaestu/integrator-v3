<template>
  <v-app>
    <section id="content-one">
      <v-container>
        <v-row class="mb-5 hover_card">
          <div class="pa-3 w-25">
            <HomeLog />
          </div>
          <div class="pa-3 w-75">
            <v-card class="pa-5 card-right">
              <v-row>
                <v-col>
                  <p class="ph mb-0">{{ dataGrafik.title }}</p>
                  <p class="unit">{{ dataGrafik.size }}</p>
                  <div class="d-flex justify-space-between">
                    <p class="subtitle mb-0">{{ dataGrafik.unit }}</p>
                    <p class="text mb-0">01</p>
                  </div>
                  <div class="d-flex justify-space-between">
                    <p class="subtitle">Device ID</p>
                    <p class="text">SW-02</p>
                  </div>
                  <div class="d-flex justify-space-between">
                    <p class="subtitle mb-0">Min</p>
                    <p class="text mb-0">4</p>
                  </div>
                  <div class="d-flex justify-space-between">
                    <p class="subtitle mb-0">Max</p>
                    <p class="text mb-0">9</p>
                  </div>
                  <div class="d-flex justify-space-between">
                    <p class="subtitle mb-0">Median</p>
                    <p class="text mb-0">6.8</p>
                  </div>
                </v-col>
                <v-col cols="12" md="9">
                  <v-row>
                    <v-col cols="9" md="5" offset-md="7" offset="3">
                      <v-menu
                        content-class="date_single_range"
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="dates"
                        transition="scale-transition"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            class="mt-0 pt-0 date_range"
                            v-model="dateRangeText"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            hide-details="auto"
                            label="Select Date"
                            solo
                            append-icon="mdi-menu-down"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dates"
                          @change="dateChange(dates)"
                          no-title
                          scrollable
                          color="color_current_date"
                          range
                        >
                          <v-spacer></v-spacer>
                          <v-btn text @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn text @click="$refs.menu.save(dates)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" v-if="!this.loadingGrafik">
                      <apexchart
                        id="vuechart-example"
                        type="area"
                        :options="options"
                        :series="series"
                      ></apexchart>
                    </v-col>
                    <v-col cols="12" v-else>
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="auto"
                        type="card"
                      ></v-skeleton-loader>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-col cols="6" sm="4" md="3" lg="2">
            <v-select
              :items="Unit"
              label="Unit"
              dense
              solo
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="6" sm="4" md="3" lg="2">
            <v-select
              :items="Device"
              label="Device Type"
              dense
              solo
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-if="!this.loadingSensors">
          <v-col
            cols="12"
            sm="6"
            md="2"
            lg="2"
            v-for="(i, index) in items"
            :key="index"
          >
            <v-card
              class="pa-3 card-bottom"
              :class="i.color"
              @click="onClickSensors(i)"
            >
              <div class="d-flex justify-space-between">
                <p class="title">{{ i.title }}</p>
                <p class="unit mb-0">
                  {{ i.unit }}
                  <br />
                  <span class="desc">{{ i.desc }}</span>
                </p>
              </div>
              <p class="size mb-0">{{ i.size }}</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="2">
            <!-- <template> -->
            <!-- <v-sheet
                :color="`grey lighten-4`"
                class="pa-3 card-bottom"
              > -->
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
            <!-- </v-sheet> -->
            <!-- </template> -->
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-app>
</template>

<script>
import gql from "graphql-tag";
const UNITS_SENSORS = gql`
  query units($id: [ID!]) {
    units(id: $id) {
      id
      name
      location
      latitude
      longitude
      certificationExpirationDate
      description
      sensors {
        id
        name
        parameter
        unitID
        registerType
        port
        dataLength
        measurementUnit
        inputLow
        inputHigh
        outputLow
        outputHigh
        thresholdLow
        thresholdHigh
        customCalibration
      }
    }
  }
`;

const SENSORS_MEASUREMENTS = gql`
  query sensorMeasurements(
    $startTime: Timestamp
    $endTime: Timestamp
    $parameters: [String!]
  ) {
    sensorMeasurements(
      startTime: $startTime
      endTime: $endTime
      parameters: $parameters
    ) {
      parameter
      timestamps
      values
    }
  }
`;

const LOGS_SUMMARY = gql`
  {
    todayLogSummary {
      type
      warn
      error
    }
  }
`;
export default {
  name: "Homepage",
  middleware: "auth",
  data: () => ({
    dates: [
      // new Date().toISOString().split('T')[0], 
      // new Date().toISOString().split('T')[0]
      "2021-06-16",
      "2021-06-16"
    ],
    dateRangeText: null,
    menu: false,
    log: [],
    items: [],
    parameter: null,
    Unit: ["Unit 01"],
    Device: ["Sensors"],
    options: {
      annotations: {
        position: "front",
        yaxis: [
          {
            y: null,
            y2: null,
            strokeDashArray: 7,
            borderColor: "#FFD4A2",
            opacity: 1,
            offsetX: 0,
            offsetY: 0,
            width: "100%",
            yAxisIndex: 0,
            label: {
              borderWidth: 0,
              borderRadius: 6,
              text: "lower threshold: 6",
              textAnchor: "center",
              position: "left",
              offsetX: 0,
              offsetY: -15,
              style: {
                opacity: 0.5,
                background: "#F0F2F4",
                color: "#69747E;",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-yaxis-annotation-label",
                padding: {
                  left: 7,
                  right: 7,
                  top: 7,
                  bottom: 7
                }
              }
            }
          },
          {
            y: 100,
            y2: null,
            strokeDashArray: 7,
            borderColor: "#FFD4A2",
            opacity: 1,
            offsetX: 0,
            offsetY: 0,
            width: "100%",
            yAxisIndex: 0,
            label: {
              borderWidth: 0,
              borderRadius: 6,
              text: "upper threshold: 100",
              textAnchor: "center",
              position: "left",
              offsetX: 0,
              offsetY: -15,
              style: {
                opacity: 0.5,
                background: "#F0F2F4",
                color: "#69747E;",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-yaxis-annotation-label",
                padding: {
                  left: 7,
                  right: 7,
                  top: 7,
                  bottom: 7
                }
              }
            }
          }
        ]
      },
      grid: {
        show: false
      },
      chart: {
        toolbar: {
          show: false
        },
        id: "vuechart-example",
        type: "area",
        // height: 250,
        foreColor: "#51A1B4"
      },
      colors: ["#44BDD8", "#B9EFFF"],
      stroke: {
        curve: "smooth",
        width: 2
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: "string",
        categories: [""],
        labels: {
          show: true
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        }
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      fill: {
        opacityFrom: 0.7,
        opacityTo: 0.9
      },
      tooltip: {
        enabled: true
      }
    },
    series: [],
    yAxisGrafik: [],
    dataGrafik: {},
    loadingSensors: false,
    loadingGrafik: false,
    loadingLogsSummary: false,
    timestamps1: new Date().getTime(),
    timestamps2: new Date().getTime()
  }),
  mounted() {
    this.dateRangeText = this.dates.join(' ~ ')
    this.getSensors();
    this.getLogSummary();
    var arr1 = this.dates[0];
    arr1 = arr1.split("-");
    var newDate = new Date(arr1[0], arr1[1] - 1, arr1[2], 0, 0, 1, 0).getTime();
    this.timestamps1 = newDate;

    var arr2 = this.dates[1];
    arr2 = arr2.split("-");
    var newDate2 = new Date(
      arr2[0],
      arr2[1] - 1,
      arr2[2],
      23,
      59,
      59
    ).getTime();
    this.timestamps2 = newDate2;
  },
  methods: {
    async getSensors() {
      try {
        this.loadingSensors = true;
        const res = await this.$apollo.query({
          query: UNITS_SENSORS,
          variables: {
            id: []
          }
        });

        if (res) {
          if (res.data.units.length > 0) {
            const promises = res.data.units[0].sensors.map(async result => {
              const sensors = await this.getSensorMeasurements(
                result.parameter
              );
              return sensors;
            });

            const dataSensors = await Promise.all(promises);

            const loopSensors = dataSensors.map(sensors => {
              const val = sensors.data.sensorMeasurements[0].values;
              const lastVal = val[val.length - 1];
              return lastVal;
            });

            if (this.items.length > 0) {
              this.items = []
              res.data.units[0].sensors.map((result, index) => {
                this.items.push({
                  title: result.parameter,
                  unit: res.data.units[0].name,
                  desc: "",
                  size: `${loopSensors[index].toFixed(0)} ${
                    result.measurementUnit !== null ? result.measurementUnit : ""
                  }`,
                  color: `${
                    loopSensors[index] >= result.outputHigh
                      ? `red`
                      : loopSensors[index] >= result.thresholdHigh
                      ? "yellow"
                      : ""
                  }`
                });
              });
            } else {
              res.data.units[0].sensors.map((result, index) => {
                this.items.push({
                  title: result.parameter,
                  unit: res.data.units[0].name,
                  desc: "",
                  size: `${loopSensors[index].toFixed(0)} ${
                    result.measurementUnit !== null ? result.measurementUnit : ""
                  }`,
                  color: `${
                    loopSensors[index] >= result.outputHigh
                      ? `red`
                      : loopSensors[index] >= result.thresholdHigh
                      ? "yellow"
                      : ""
                  }`
                });
              });
            }
            this.loadingSensors = false;
          }
          if (this.parameter !== null) {
            this.items.filter(e => e.title === this.parameter.title).map(result => {
              this.parameter = result
            })
          }else{
            this.parameter = this.items[0]
          }
          this.getGraphicSensors(this.parameter);
        }
      } catch (err) {
        console.log(err);
        this.loadingSensors = false;
        // this.searchResults = [];
      }
    },
    onClickSensors(params) {
      this.parameter = params
      this.getGraphicSensors(params);
    },
    async getSensorMeasurements(params) {
      try {
        this.loadingGrafik = true;
        const res = await this.$apollo.query({
          query: SENSORS_MEASUREMENTS,
          variables: {
            startTime: this.timestamps1 / 1000,
            endTime: this.timestamps2 / 1000,
            parameters: [params]
          }
        });
        if (res) {
          this.loadingGrafik = false;
          return res;
        }
      } catch (err) {
        console.log(err);
        this.loadingGrafik = false;
        // this.searchResults = [];
      }
    },
    async getLogSummary() {
      try {
        this.loadingLogsSummary = true;
        const res = await this.$apollo.query({
          query: LOGS_SUMMARY,
          variables: {}
        });

        if (res) {
          this.loadingLogsSummary = false;
          let result = res.data.todayLogSummary;
          result.map(items => {
            this.log.push({
              title:
                items.type === "operation"
                  ? "Device Health"
                  : items.type.split("_").join(" "),
              subtitle_error: "Error",
              content_error: items.error,
              subtitle_warning: "Warning",
              content_warning: items.warn
            });
          });
        }
      } catch (err) {
        console.log(err);
        this.loadingLogsSummary = false;
        // this.searchResults = [];
      }
    },
    dateChange(val) {
      // this.menu = false
      var arr1 = val[0];
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

      var arr2 = val[1];
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
      this.dates = [
        `${arr1[0]}-${arr1[1]}-${arr1[2]}`,
        `${arr2[0]}-${arr2[1]}-${arr2[2]}`
      ]
      this.dateRangeText = this.dates.join(' ~ ')
      this.getGraphicSensors(this.parameter)
      this.dataGrafik = this.parameter
      this.getSensors()
    },
    async getGraphicSensors(params) {
      if (params === undefined) {
        params = this.dataGrafik;
      }
      try {
        this.loadingGrafik = true
        let res = await this.getSensorMeasurements(params.title);
        this.dataGrafik = params;
        // console.log(res.data.sensorMeasurements[0].values)
        let value = res.data.sensorMeasurements[0].values;
        let time = res.data.sensorMeasurements[0].timestamps;
        let data = [];
        let day = [];
        for (let i = 0; i < value.length; i++) {
          day[i] = new Date(time[i] * 1000);
          data.push({
            x: new Intl.DateTimeFormat(['ban', 'id']).format(day[i]),
            y: value[i].toFixed(2)
          });
        }
        this.series = [
          {
            name: "Values",
            data: data
          }
        ];
        this.yAxisGrafik = res.data.sensorMeasurements[0].timestamps;
        this.loadingGrafik = false
      } catch (error) {
        console.log(error)
        this.loadingGrafik = false;
      }
    }
  }
};
</script>
