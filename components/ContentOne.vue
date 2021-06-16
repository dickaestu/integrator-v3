<template>
  <v-app>
    <section id="content-one">
      <v-container>
        <v-row class="mb-5">
          <v-col cols="3">
            <v-card class="pa-5 card-left">
              <p class="subtitle mb-0">Last Update</p>
              <p class="title mb-0">14-05-2020 08:00 AM</p>
              <v-divider></v-divider>
              <p class="subtitle mb-0 mt-2">Log Summary</p>
              <p class="title mb-3">Last 24 Hours</p>
              <div
                v-for="(i, index) in data"
                :key="index"
                class="data-transfer"
              >
                <p class="title mb-0">{{ i.title }}</p>
                <div class="d-flex justify-space-between">
                  <div class="left">
                    <p class="subtitle mb-0">{{ i.subtitle_error }}</p>
                    <p class="text error mb-3">{{ i.content_error }}</p>
                  </div>
                  <div class="right">
                    <p class="subtitle mb-0">{{ i.subtitle_warning }}</p>
                    <p class="text mb-3">{{ i.content_warning }}</p>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-card class="pa-5 card-right">
              <v-row>
                <v-col>
                  <p class="ph mb-0">pH</p>
                  <p class="unit mb-0">7</p>
                  <div class="d-flex justify-space-between">
                    <p class="subtitle mb-0">Unit ID</p>
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
                <v-col cols="9">
                  <apexchart
                    id="vuechart-example"
                    type="area"
                    :options="options"
                    :series="series"
                  ></apexchart>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-col cols="2">
            <v-select
              :items="Unit"
              label="All Unit"
              dense
              solo
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-select
              :items="Device"
              label="All Device Type"
              dense
              solo
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" v-for="(i, index) in items" :key="index">
            <v-card class="pa-3 card-bottom" :class="i.color">
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
          <!-- <v-col>
            <v-card class="pa-3 card-bottom yellow">
              <div class="d-flex justify-space-between">
                <p class="title">NO3N</p>
                <p class="unit mb-0">
                  Unit 01
                  <br />
                  <span class="desc">b82bdeba</span>
                </p>
              </div>
              <div class="d-flex justify-space-between">
                <p class="size mb-0">86 mg/L</p>
                <v-icon>
                  mdi-alert
                </v-icon>
              </div>
            </v-card>
          </v-col> -->
        </v-row>
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "ContentOne",
  data: () => ({
    data: [
      {
        title: "Data Transfer",
        subtitle_error: "Error",
        content_error: "2",
        subtitle_warning: "Warning",
        content_warning: "0"
      },
      {
        title: "Measurement",
        subtitle_error: "Error",
        content_error: "0",
        subtitle_warning: "Warning",
        content_warning: "5"
      },
      {
        title: "Device Health",
        subtitle_error: "Error",
        content_error: "1",
        subtitle_warning: "Warning",
        content_warning: "0"
      }
    ],
    items: [
      {
        title: "Debit",
        unit: "Unit 01",
        desc: "",
        size: "30 m3/s"
      },
      {
        title: "TSS",
        unit: "Unit 01",
        desc: "",
        size: "100 mg/L",
        color: "red"
      },
      {
        title: "pH",
        unit: "Unit 01",
        desc: "",
        size: "7"
      },
      {
        title: "NO3N",
        unit: "Unit 01",
        desc: "",
        size: "86 mg/L",
        color: "yellow"
      },
      {
        title: "PO4",
        unit: "Unit 01",
        desc: "",
        size: "63 mg/L"
      },
      {
        title: "NH3N",
        unit: "Unit 01",
        desc: "",
        size: "56 mg/L"
      },
      {
        title: "TDS",
        unit: "Unit 01",
        desc: "",
        size: "10 mg/L"
      },
      {
        title: "BOD 5",
        unit: "Unit 01",
        desc: "",
        size: "23 mg/L"
      },
      {
        title: "COD",
        unit: "Unit 01",
        desc: "",
        size: "60 mg/L"
      },
      {
        title: "Fe",
        unit: "Unit 01",
        desc: "",
        size: "20 mg/L"
      },
      {
        title: "Cu",
        unit: "Unit 01",
        desc: "",
        size: "9 mg/L"
      },
      {
        title: "Cr",
        unit: "Unit 01",
        desc: "",
        size: "17 mg/L"
      }
    ],
    Unit: ["Unit 01", "Unit 02", "Unit 03"],
    Device: ["Sensors", "Controllers", "Actuators"],
    options: {
      annotations: {
        position: "front",
        yaxis: [
          {
            y: 20,
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
            y: 40,
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
              text: "upper threshold: 8",
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
        type: "category",
        categories: [""],
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      fill: {
        opacityFrom: 0.7,
        opacityTo: 0.9
      },
      tooltip: {
        enabled: false
      }
    },
    series: [{ name: "Upper Threshold", data: ["1", "45", "25", "75"] }]
  })
};
</script>
