<template>
  <v-app>
    <div id="DeviceHealth">
      <v-card>
        <v-card-title class="justify-end pb-0">
          <v-icon class="close_dialog" @click="dialogAddEditDevice = false">
            mdi-close-thick
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="5" class="my-auto">
                <h1>
                  Device Health <span>{{ sensorParams.brand }}</span>
                </h1>
              </v-col>
              <v-col cols="12" md="7" class="text-right my-auto">
                <v-row class="justify-end">
                  <v-col cols="12" sm="6" md="6" lg="auto">
                    <v-btn class="btnBgColor datasheet w-100"
                      >See Datasheet</v-btn
                    >
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="auto">
                    <v-btn class="btnBgColor datasheet w-100"
                      >See Calibration Guide</v-btn
                    >
                  </v-col>
                  <v-col cols="12" lg="3" xl="4">
                    <v-menu
                      content-class="date_single_range"
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="dates"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template
                        v-slot:activator="{
                          on,
                          attrs
                        }"
                      >
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
                </v-row>
              </v-col>
            </v-row>
            <v-row class="desc">
              <v-col cols="12" sm="6" md="6" lg="3" class="pt-0">
                <div class="d-flex justify-space-between">
                  <div class="left">
                    <p>Device UUID</p>
                    <p>Device Type</p>
                    <p>Series</p>
                  </div>
                  <div class="right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <p v-bind="attrs" v-on="on">
                          {{ sensorParams.id.substring(0, 15) }}...
                        </p>
                      </template>
                      <span>{{ sensorParams.id }}</span>
                    </v-tooltip>
                    <p>{{ sensorParams.device_type }}</p>
                    <p>...</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="3" class="pt-0">
                <div class="d-flex justify-space-between">
                  <div class="left">
                    <p>Installation Date</p>
                    <p>Last Calibration Date</p>
                    <p>Next Calibration Date</p>
                  </div>
                  <div class="right">
                    <p>
                      {{
                        deviceHealthValue !== null
                          ? deviceHealthValue.installationDate
                          : ""
                      }}
                    </p>
                    <p>
                      {{
                        deviceHealthValue !== null
                          ? deviceHealthValue.lastCalibrationDate
                          : ""
                      }}
                    </p>
                    <p>
                      {{
                        deviceHealthValue !== null
                          ? deviceHealthValue.nextCalibrationDate
                          : ""
                      }}
                    </p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="3" class="pt-0">
                <div class="d-flex justify-space-between">
                  <div class="left">
                    <p>Current Value</p>
                    <p>Max Value</p>
                    <p>Min Value</p>
                  </div>
                  <div class="right">
                    <p>
                      {{
                        deviceHealthValue !== null
                          ? deviceHealthValue.current
                          : ""
                      }}
                    </p>
                    <p>
                      {{
                        deviceHealthValue !== null ? deviceHealthValue.max : ""
                      }}
                    </p>
                    <p>
                      {{
                        deviceHealthValue !== null ? deviceHealthValue.min : ""
                      }}
                    </p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="3" class="pt-0">
                <div class="d-flex justify-space-between">
                  <div class="left">
                    <p>Last Update</p>
                    <p>Down Time</p>
                    <p>Ghost Peak</p>
                  </div>
                  <div class="right">
                    <p>
                      {{
                        deviceHealthValue !== null
                          ? deviceHealthValue.lastUpdate
                          : ""
                      }}
                    </p>
                    <p>
                      {{
                        deviceHealthValue !== null
                          ? deviceHealthValue.downTime
                          : ""
                      }}
                    </p>
                    <p>
                      {{
                        deviceHealthValue !== null
                          ? deviceHealthValue.ghostPeak
                          : ""
                      }}
                    </p>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6" class="my-auto">
                    <h4>Graph</h4>
                  </v-col>
                  <v-col cols="6" md="3" offset-lg="3">
                    <v-select
                      ref="selectedGraph"
                      class="form_edit_select"
                      :items="selectGraph"
                      label="Trend"
                      solo
                      hide-details="auto"
                      v-model="selectedGraph"
                      @change="changeTrendDistribution()"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div id="vuechart-health" v-if="selectedGraph === `Trend`">
                  <apexchart
                    id="vuechart-example"
                    type="area"
                    :options="options"
                    :series="series"
                    height="200"
                  ></apexchart>
                </div>
                <div
                  id="vuechart-health"
                  v-else-if="selectedGraph === `Distribution`"
                >
                  <apexchart
                    id="vuechart-example2"
                    type="area"
                    :options="options2"
                    :series="series2"
                    height="200"
                  ></apexchart>
                </div>
              </v-col>
            </v-row>
            <!-- Issue And Calibration -->
            <v-row>
              <v-col cols="12" id="btnFloating">
                <div class="d-flex justify-space-between">
                  <div class="left">
                    <v-tabs v-model="tab">
                      <v-tab
                        href="#issue-history"
                        @click="changeBtnAddType(`issue`)"
                        >Issue History</v-tab
                      >
                      <v-tab
                        href="#calibration-history"
                        @click="changeBtnAddType(`calibration`)"
                        >Calibration History</v-tab
                      >
                    </v-tabs>
                  </div>
                  <div class="right add-entry d-none d-sm-none d-md-block">
                    <template>
                      <v-dialog v-model="dialogAddEntryIssue" max-width="500px">
                        <template
                          v-slot:activator="{
                            on,
                            attrs
                          }"
                        >
                          <v-btn class="btnBgColor" v-bind="attrs" v-on="on">
                            <v-icon left>
                              mdi-plus
                            </v-icon>
                            Add Entry
                          </v-btn>
                        </template>
                      </v-dialog>
                    </template>
                    <template>
                      <v-dialog
                        v-model="dialogFullTableIssue"
                        max-width="500px"
                      >
                        <template
                          v-slot:activator="{
                            on,
                            attrs
                          }"
                        >
                          <v-btn
                            class="btnTransBgColor"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Show Full Table
                          </v-btn>
                        </template>
                      </v-dialog>
                    </template>
                  </div>
                </div>

                <!-- Button Add and Show Full Table when mobile view -->
                <v-speed-dial
                  class="d-block d-sm-block d-md-none"
                  v-model="fab"
                  direction="top"
                  right
                  bottom
                  transition="slide-y-reverse-transition"
                >
                  <template v-slot:activator>
                    <v-btn v-model="fab" dark fab>
                      <v-icon v-if="fab">
                        mdi-close
                      </v-icon>
                      <v-icon v-else>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </template>
                  <template>
                    <v-dialog v-model="dialogAddEntryIssue" max-width="500px">
                      <template
                        v-slot:activator="{
                          on,
                          attrs
                        }"
                      >
                        <v-btn fab dark small v-bind="attrs" v-on="on">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                    </v-dialog>
                  </template>
                  <template>
                    <v-dialog v-model="dialogFullTableIssue" max-width="500px">
                      <template
                        v-slot:activator="{
                          on,
                          attrs
                        }"
                      >
                        <v-btn fab dark small v-bind="attrs" v-on="on">
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                      </template>
                    </v-dialog>
                  </template>
                </v-speed-dial>

                <!-- Table Issue History -->
                <v-tabs-items v-model="tab">
                  <TabItemIssue
                    :issueHistoryList="issueHistoryList"
                    :deleteItem="deleteItem"
                    :editItem="editItem"
                  />
                </v-tabs-items>

                <!-- Table Calibration History -->
                <v-tabs-items v-model="tab">
                  <TabItemCalibration
                    :calibrationHistoryList="calibrationHistoryList"
                    :deleteItem="deleteItem"
                    :editItem="editItem"
                  />
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <!-- Create Entry Issue -->
      <DialogFormIssue
        v-if="btnAddType == `issue`"
        :dialogAddEntryIssue="dialogAddEntryIssue"
        :close="close"
        :param="sensorParameter.parameter"
        :saveIssue="saveIssue"
      />
      <!-- End -->

      <!-- Create Entry Calibration -->
      <DialogFormCalibration
        v-else
        :dialogAddEntryIssue="dialogAddEntryIssue"
        :close="close"
        :param="sensorParameter.parameter"
        :saveCalibration="saveCalibration"
      />
      <!-- End -->

      <!-- Edit Issue -->
      <DialogFormEditIssue
        v-if="btnEditType == `issue`"
        :dialogEditIssue="dialogEditIssue"
        :close="close"
        :data="editedItem"
        :param="sensorParameter.parameter"
        :updateIssue="updateIssue"
      />
      <!-- End -->

      <!-- Edit Issue -->
      <DialogFormEditCalibration
        v-else-if="btnEditType == `calibration`"
        :dialogEditIssue="dialogEditIssue"
        :close="close"
        :data="editedItemCalibration"
        :param="sensorParameter.parameter"
        :updateCalibration="updateCalibration"
      />
      <!-- End -->

      <!-- Delete Dialog -->
      <v-dialog
        content-class="delete_user_dialog"
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 justify-space-between"
            >Delete {{ dialogDeleteName }}?
            <v-icon
              class="close_dialog white--text"
              @click="dialogDelete = false"
            >
              mdi-close-thick
            </v-icon>
          </v-card-title>
          <v-card-text class="pb-0">
            Deleting a {{ dialogDeleteName }} will permanently remove it from
            the system.
          </v-card-text>
          <v-container fluid>
            <v-row class="pb-3 my-auto mx-auto">
              <v-col cols="12" sm="6">
                <v-btn text @click="deleteItemConfirm">YES, DELETE </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn class="cancel_delete" text @click="closeDelete"
                  >NO, KEEP
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- End -->

      <!-- Full Table Issue -->
      <FullTabItemIssue
        v-if="btnAddType == `issue`"
        :dialogFullTableIssue="dialogFullTableIssue"
        :close="close"
        :issueHistoryList="issueHistoryList"
        :deleteItem="deleteItem"
        :editItem="editItem"
      />
      <!-- End -->

      <!-- Full Table Calibration History -->
      <FullTabItemCalibrationHistory
        v-else
        :dialogFullTableIssue="dialogFullTableIssue"
        :close="close"
        :calibrationHistoryList="calibrationHistoryList"
        :deleteItem="deleteItem"
        :editItem="editItem"
      />
      <!-- End -->

      <v-snackbar
        :timeout="-1"
        :value="toast"
        color="blue-grey"
        fixed
        rounded="pill"
      >
        {{ toastMsg }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="toast = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>
<script>
import TabItemIssue from "./TabItemIssue.vue";
import TabItemCalibration from "./TabItemCalibration.vue";
import DialogFormIssue from "./DialogFormIssue.vue";
import DialogFormEditIssue from "./DialogFormEditIssue.vue";
import DialogFormCalibration from "./DialogFormCalibration.vue";
import DialogFormEditCalibration from "./DialogFormEditCalibration.vue";
import FullTabItemIssue from "./FullTabItemIssue.vue";
import FullTabItemCalibrationHistory from "./FullTabItemCalibrationHistory.vue";
import gql from "graphql-tag";

const SENSORS_MEASUREMENTS_DISTRIBUTION = gql`
  query sensorMeasurementDistributions(
    $startTime: Timestamp
    $endTime: Timestamp
    $parameters: [String!]
  ) {
    sensorMeasurementDistributions(
      startTime: $startTime
      endTime: $endTime
      parameters: $parameters
    ) {
      parameter
      values
      fractions
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
  name: "DeviceHealth",
  components: {
    TabItemIssue,
    TabItemCalibration,
    DialogFormIssue,
    DialogFormCalibration,
    FullTabItemIssue,
    FullTabItemCalibrationHistory,
    DialogFormEditIssue,
    DialogFormEditCalibration
  },
  props: {
    sensorParams: Object
  },
  data: () => ({
    toastMsg: "",
    toast: false,

    fab: false,
    issueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    tab: null,
    dates: ["2021-06-16", "2021-06-16"],
    datesArray: [
      new Date().toISOString().split("T")[0],
      new Date().toISOString().split("T")[0]
      // "2021-06-16",
      // "2021-06-16"
    ],
    menu: false,
    issueHistoryList: [],
    calibrationHistoryList: [],
    status: [],
    menuIssueDate: false,
    selectGraph: ["Trend", "Distribution"],
    selectedGraph: "Trend",
    dialogAddEntryIssue: false,
    dialogEditIssue: false,
    dialogFullTableIssue: false,
    dialogDelete: false,
    editedIndex: null,
    deletedIndex: null,
    deleteType: null,
    dialogDeleteName: "",
    editedItem: {
      issueDate: null,
      person_company: null,
      issue_desc: null,
      status: null,
      note: null
    },
    editedItemCalibration: {
      date: null,
      personAndCompanyName: null,
      description: null,
      status: null,
      note: null,
      parameter: null,
      fileID: null,
      nextSchedule: null
    },
    defaultItem: {
      issueDate: null,
      person_company: null,
      issue_desc: null,
      status: null,
      note: null
    },
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
        height: 150,
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
    options2: {
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
        height: 150,
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
        type: "String",
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
          show: true,
          formatter: value => {
            const formatDate = date => {
              let formatted_date =
                date.getDate() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getFullYear();
              return formatted_date;
            };
            return formatDate(
              new Date(value * 1000 - new Date().getTimezoneOffset() * 60000)
            );
          }
        }
      },
      fill: {
        opacityFrom: 0.7,
        opacityTo: 0.9
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
          type: "String"
        },
        y: {
          show: true
        }
      }
    },
    loadingAddSensors: false,
    loadingAddIssue: false,
    loadingGetDeviceHealthItem: false,
    loadingGetDetailUnit: false,
    deviceHealthValue: null,
    sensorParameter: null,

    btnAddType: "issue",
    btnEditType: null,

    timestamps1: new Date().getTime(),
    timestamps2: new Date().getTime(),
    dataInterval: null,

    series: [],
    series2: [],
    yAxisGrafik: [],
    dataGrafik: {},
    loading: false,
    parameter: null
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  watch: {
    dialogAddEntryIssue(val) {
      val || this.close();
    },
    dialogEditEntryIssue(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogFullTableIssue(val) {
      val || this.close();
    },
    sensorParams() {
      this.sensorParameter = this.sensorParams;
      this.getSensors();
      this.getIssueList();
      this.getCalibrationHistoryList();
      // this.getGraphicSensorsMeasurementsDistribution();

      // console.log(this.sensorParameter);
      var arr1 = this.datesArray[0];
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

      var arr2 = this.datesArray[1];
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

      this.getGraphicSensors(this.sensorParameter.parameter);
    }
  },
  created() {
    this.sensorParameter = this.sensorParams;
    this.getSensors();
    this.getIssueList();
    this.getCalibrationHistoryList();
    // this.getGraphicSensorsMeasurementsDistribution();
    var arr1 = this.datesArray[0];
    arr1 = arr1.split("-");
    var newDate = new Date(arr1[0], arr1[1] - 1, arr1[2], 0, 0, 1, 0).getTime();
    this.timestamps1 = newDate;

    var arr2 = this.datesArray[1];
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

    this.getGraphicSensors(this.sensorParameter.parameter);
  },
  methods: {
    changeBtnAddType(item) {
      this.btnAddType = item;
    },

    editItem(item, index, type) {
      if (type === "calibration") {
        this.editedItemCalibration = Object.assign({}, item);
      } else {
        this.editedItem = Object.assign({}, item);
      }
      this.btnEditType = type;
      this.editedIndex = index;
      this.dialogEditIssue = true;
    },
    deleteItem(item, index, type, title) {
      this.deletedIndex = index;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.deleteType = type;
      this.dialogDeleteName = title;
    },
    close() {
      this.dialogAddEntryIssue = false;
      this.dialogEditIssue = false;
      this.dialogFullTableIssue = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.btnEditType = null;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.deletedIndex = false;
      this.deleteType = null;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = null;
      });
    },

    async getSensorMeasurementsDistribution(params) {
      try {
        const res = await this.$apollo.query({
          query: SENSORS_MEASUREMENTS_DISTRIBUTION,
          variables: {
            startTime: null,
            endTime: null,
            parameters: [params]
          }
        });
        if (res) {
          return res;
        }
      } catch (err) {
        console.log(err);
        // this.searchResults = [];
      }
    },

    async getGraphicSensorsMeasurementsDistribution() {
      try {
        let res = await this.getSensorMeasurementsDistribution(
          this.sensorParameter.parameter
        );
        // console.log(res.data.sensorMeasurements[0].values)
        let value = res.data.sensorMeasurementDistributions[0].values;
        // let time = res.data.sensorMeasurements[0].timestamps;
        let data = [];
        // let day = [];
        // var options = {
        //   year: "numeric",
        //   month: "long",
        //   day: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
        //   second: "numeric",
        //   timeZone: "Asia/Jakarta",
        //   hour12: false
        // };
        for (let i = 0; i < value.length; i++) {
          // day[i] = new Intl.DateTimeFormat('ban-ID', options).format(new Date(time[i] * 1000));
          // day[i] = new Date(time[i] * 1000);
          data.push({
            x: [i],
            y: value[i].toFixed(2)
          });
        }
        this.series = [
          {
            name: "Values",
            data: data
          }
        ];
        // this.yAxisGrafik = res.data.sensorMeasurements[0].timestamps;
      } catch (error) {
        console.log(error);
      }
    },
    async getSensorMeasurements(params) {
      try {
        this.loading = true;
        const res = await this.$apollo.query({
          query: SENSORS_MEASUREMENTS,
          variables: {
            startTime: this.timestamps1 / 1000,
            endTime: this.timestamps2 / 1000,
            parameters: [params]
          }
        });
        if (res) {
          this.loading = false;
          return res;
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
        // this.searchResults = [];
      }
    },
    async getGraphicSensors(params) {
      this.options = {
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
          height: 150,
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
      };
      // if (params === undefined) {
      //   params = this.dataGrafik;
      // }
      try {
        this.loading = true;
        let res = await this.getSensorMeasurements(params);
        this.dataGrafik = params;
        // console.log(res.data.sensorMeasurements[0].values)
        let value = res.data.sensorMeasurements[0].values;
        let time = res.data.sensorMeasurements[0].timestamps;
        let data = [];
        let day = [];
        var options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZone: "Asia/Jakarta",
          hour12: false
        };

        for (let i = 0; i < time.length; i++) {
          // day[i] = new Intl.DateTimeFormat('ban-ID', options).format(new Date(time[i] * 1000));
          day[i] = new Date(time[i] * 1000);
          data.push({
            x:
              new Intl.DateTimeFormat("ban-ID", options).format(day[i]) +
              " WIB",
            y: value[i].toFixed(2)
            // y: formatDate(
            //   new Date(time[i] * 1000 - new Date().getTimezoneOffset() * 60000)
            // )
            // y: time[i]
          });
        }
        this.series = [
          {
            name: "Values",
            data: data
          }
        ];
        this.yAxisGrafik = res.data.sensorMeasurements[0].timestamps;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async getGraphicSensorsByDistribution(params) {
      this.options2 = {
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
          height: 150,
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
          type: "String",
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
            show: true,
            formatter: value => {
              const formatDate = date => {
                let formatted_date =
                  date.getDate() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getFullYear();
                return formatted_date;
              };
              return formatDate(
                new Date(value * 1000 - new Date().getTimezoneOffset() * 60000)
              );
            }
          }
        },
        fill: {
          opacityFrom: 0.7,
          opacityTo: 0.9
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            type: "String"
          },
          y: {
            formatter: function(value) {
              var options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZone: "Asia/Jakarta",
                hour12: false
              };
              return new Intl.DateTimeFormat("ban-ID", options).format(
                new Date(value * 1000)
              );
            }
          }
        }
      };
      // if (params === undefined) {
      //   params = this.dataGrafik;
      // }
      try {
        this.loading = true;
        let res = await this.getSensorMeasurements(params);
        this.dataGrafik = params;
        // console.log(res.data.sensorMeasurements[0].values)
        let value = res.data.sensorMeasurements[0].values;
        let time = res.data.sensorMeasurements[0].timestamps;
        let data = [];
        let day = [];
        var options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZone: "Asia/Jakarta",
          hour12: false
        };

        for (let i = 0; i < value.length; i++) {
          // day[i] = new Intl.DateTimeFormat('ban-ID', options).format(new Date(time[i] * 1000));
          day[i] = new Date(time[i] * 1000);
          data.push({
            x: parseInt(value[i]),
            // y: value[i].toFixed(2)
            // y: formatDate(
            //   new Date(time[i] * 1000 - new Date().getTimezoneOffset() * 60000)
            // )
            y: time[i]
          });
        }
        this.series2 = [
          {
            name: "Values",
            data: data
          }
        ];
        this.yAxisGrafik = res.data.sensorMeasurements[0].timestamps;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async getSensors() {
      try {
        this.loadingGetDeviceHealthItem = true;
        const res = await this.$store.dispatch(
          "configuration/device_list/getSensorMeasurements",
          this.sensorParameter.parameter
        );
        const current = res.data.sensorMeasurements.map(sensors => {
          const val = sensors.values;
          const lastVal = val[val.length - 1];
          return lastVal;
        });
        const dataMin = res.data.sensorMeasurements.map(sensors => {
          const val = sensors.values;
          const lastVal = Math.min(...val).toFixed(2);
          return lastVal;
        });
        const dataMax = res.data.sensorMeasurements.map(sensors => {
          const val = sensors.values;
          const lastVal = Math.max(...val).toFixed(2);
          return lastVal;
        });

        const resDeviceHealth = await this.$store.dispatch(
          "configuration/device_list/getDeviceHealth",
          this.sensorParameter.parameter
        );

        this.deviceHealthValue = {
          current: current[0].toFixed(2),
          min: dataMin[0],
          max: dataMax[0],
          downTime: resDeviceHealth.deviceHealth.downTime,
          ghostPeak: resDeviceHealth.deviceHealth.ghostPeak,
          installationDate: new Date(
            resDeviceHealth.deviceHealth.installationDate * 1000 -
              new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          lastCalibrationDate: new Date(
            resDeviceHealth.deviceHealth.lastCalibrationDate * 1000 -
              new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),

          lastUpdate: new Date(
            resDeviceHealth.deviceHealth.lastUpdate * 1000 -
              new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          nextCalibrationDate: new Date(
            resDeviceHealth.deviceHealth.nextCalibrationDate * 1000 -
              new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10)
        };

        // if (res) {
        //   if (res.data.units.length > 0) {
        //     const promises = res.data.units[0].sensors.map(async result => {
        //       const sensors = await this.getSensorMeasurements(
        //         result.parameter
        //       );
        //       return sensors;
        //     });

        //     const dataSensors = await Promise.all(promises);

        //     const loopSensors = dataSensors.map(sensors => {
        //       const val = sensors.data.sensorMeasurements[0].values;
        //       const lastVal = val[val.length - 1];
        //       return lastVal;
        //     });

        //     res.data.units[0].sensors.map((result, index) => {
        //       this.items.push({
        //         title: result.parameter,
        //         unit: res.data.units[0].name,
        //         desc: "",
        //         size: `${loopSensors[index].toFixed(2)} ${
        //           result.measurementUnit !== null ? result.measurementUnit : ""
        //         }`,
        //         color: `${
        //           loopSensors[index] >= result.outputHigh
        //             ? `red`
        //             : loopSensors[index] >= result.thresholdHigh
        //             ? "yellow"
        //             : ""
        //         }`
        //       });
        //     });
        //     this.loadingGetDeviceHealthItem = false;
        //   }
        //   this.getGraphicSensors(this.items[0]);
        // }
        this.loadingGetDeviceHealthItem = false;
      } catch (err) {
        console.log(err);
        this.loadingGetDeviceHealthItem = false;
        // this.searchResults = [];
      }
    },
    async getIssueList() {
      try {
        const res = await this.$store.dispatch(
          "configuration/issue_history/getIssueList",
          { parameter: this.sensorParameter.parameter }
        );

        this.issueHistoryList = res.issues;
      } catch (err) {
        console.log(err);
        // this.searchResults = [];
      }
    },
    async getCalibrationHistoryList() {
      try {
        const res = await this.$store.dispatch(
          "configuration/calibration_history/getCalibrationHistoryList",
          { parameter: this.sensorParameter.parameter }
        );

        this.calibrationHistoryList = res.calibrationActivities;
      } catch (err) {
        console.log(err);
        this.loadingGetDeviceHealthItem = false;
        // this.searchResults = [];
      }
    },
    async handleChangeUnit() {
      try {
        this.loadingGetDetailUnit = true;
        const res = await this.$store.dispatch(
          "configuration/device_list/getDetailUnit",
          this.editedItem.unit
        );

        this.loadingGetDetailUnit = false;
      } catch (err) {
        console.log(err);
        this.loadingGetDetailUnit = false;
        // this.searchResults = [];
      }
    },
    async deleteItemConfirm() {
      if (this.deleteType === "delete-issue") {
        try {
          const res = await this.$store.dispatch(
            "configuration/issue_history/deleteIssue",
            this.editedItem.id
          );

          if (res.deleteIssue.ok) {
            this.issueHistoryList.splice(this.deletedIndex, 1);
            this.toastMsg = "Data has been Deleted";
            this.toast = true;
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await this.$store.dispatch(
            "configuration/calibration_history/deleteCalibrationHistory",
            this.editedItem.id
          );
          if (res.deleteCalibrationActivity.ok) {
            this.calibrationHistoryList.splice(this.deletedIndex, 1);
            this.toastMsg = "Data has been Deleted";
            this.toast = true;
          }
        } catch (err) {
          console.log(err);
        }
      }

      this.closeDelete();
    },

    async saveIssue(item) {
      this.issueHistoryList.push({
        id: item.id,
        date: item.issueDate,
        personAndCompanyName: item.person_company,
        description: item.issue_desc,
        status: item.status,
        note: item.note
      });

      this.toastMsg = "Data has been Created";
      this.toast = true;
    },

    async updateIssue(item) {
      const newData = this.issueHistoryList.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            id: item.id,
            date: item.issueDate,
            personAndCompanyName: item.person_company,
            description: item.issue_desc,
            status: item.status,
            note: item.note
          };
        }
        return i;
      });

      this.issueHistoryList = newData;

      this.toastMsg = "Data has been Updated";
      this.toast = true;
    },

    async saveCalibration(item) {
      this.calibrationHistoryList.push({
        id: item.id,
        date: item.calibrationDate,
        personAndCompanyName: item.person_company,
        description: item.desc,
        status: item.status,
        note: item.note,
        nextSchedule: item.nextSchedule,
        fileID: item.fileID
      });

      this.toastMsg = "Data has been Created";
      this.toast = true;
    },

    async updateCalibration(item) {
      const newData = this.calibrationHistoryList.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            id: item.id,
            date: item.calibrationDate,
            personAndCompanyName: item.person_company,
            description: item.desc,
            status: item.status,
            note: item.note,
            nextSchedule: item.nextSchedule,
            fileID: item.fileID
          };
        }
        return i;
      });

      this.calibrationHistoryList = newData;

      this.toastMsg = "Data has been Updated";
      this.toast = true;
    },

    async changeTrendDistribution(val) {
      if (this.selectedGraph === "Trend") {
        this.getGraphicSensors(this.sensorParameter.parameter);
      } else {
        this.getGraphicSensorsByDistribution(this.sensorParameter.parameter);
      }
    }
  }
};
</script>
