<template>
  <v-card class="pa-5 card-right">
    <v-row>
      <v-col>
        <p class="ph mb-0">{{ dataGrafik.title }}</p>
        <p class="unit mb-0">{{ dataGrafik.size }}</p>
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
          <v-col cols="7" md="5" offset-md="7" offset="5">
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
          <v-col cols="12">
            <apexchart
              id="vuechart-example"
              type="area"
              :options="options"
              :series="series"
            ></apexchart>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
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

export default {
  name: "Chart",
  middleware: "auth",
  data: () => ({
    dates: [],
    menu: false,
    items: [],
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
        type: "numeric",
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
    loadingLogsSummary: false
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  mounted() {
    this.getSensors();
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
          this.loadingSensors = false;
          if (res.data.units.length > 0) {
            res.data.units[0].sensors.map(result => {
              this.items.push({
                title: result.parameter,
                unit: res.data.units[0].name,
                desc: "",
                size: `${result.dataLength} ${
                  result.measurementUnit !== null ? result.measurementUnit : ""
                }`,
                color: `${
                  result.dataLength >= result.outputHigh
                    ? `red`
                    : result.dataLength >= result.thresholdHigh
                    ? "yellow"
                    : ""
                }`
              });
            });
          }
          this.getSensorMeasurements(this.items[0]);
        }
      } catch (err) {
        console.log(err);
        this.loadingSensors = false;
        // this.searchResults = [];
      }
    },
    onClickSensors(params) {
      this.getSensorMeasurements(params);
    },
    async getSensorMeasurements(params) {
      try {
        this.loadingGrafik = true;
        const res = await this.$apollo.query({
          query: SENSORS_MEASUREMENTS,
          variables: {
            startTime: 1624107898,
            endTime: 1624147199,
            parameters: [params.title]
          }
        });

        if (res) {
          this.loadingGrafik = false;
          this.dataGrafik = params;
          // console.log(res.data.sensorMeasurements[0].values)
          let value = res.data.sensorMeasurements[0].values;
          let time = res.data.sensorMeasurements[0].timestamps;
          let data = [];
          for (let i = 0; i < value.length; i++) {
            let tanggal = new Date(time[i] * 1000);
            data.push({
              x: time[i],
              y: value[i]
            });
          }
          this.series = [
            {
              name: "Values",
              data: data
            }
          ];
          this.yAxisGrafik = res.data.sensorMeasurements[0].timestamps;
        }
      } catch (err) {
        console.log(err);
        this.loadingGrafik = false;
        // this.searchResults = [];
      }
    },
    dateChange(val) {
      console.log(val);
    }
  }
};
</script>
