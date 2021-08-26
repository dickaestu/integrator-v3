<template>
  <v-app>
    <div id="DeviceHealth">
      <v-card>
        <v-card-title class="justify-end pb-0">
          <v-icon class="close_dialog" @click="dialogAddEditDevice = false">
            mdi-close-thick
          </v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <h1>Device Health <span>NH3N</span></h1>
            </v-col>
            <v-col cols="12" md="8" class="text-right my-auto">
              <v-row>
                <v-col cols="auto" sm="4" class="py-md-0">
                  <v-btn class="btnBgColor datasheet">See Datasheet</v-btn>
                </v-col>
                <v-col cols="auto" sm="4" class="py-md-0">
                  <v-btn class="btnBgColor datasheet"
                    >See Calibration Guide</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="4" class="py-md-0">
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
                  <p>
                    fc78835c-ad79-41ad-8a4f-20a725ae012e
                  </p>
                  <p>Sensor</p>
                  <p>Emerson HX-200693DR</p>
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
                    01-03-2021
                  </p>
                  <p>01-05-2021</p>
                  <p>14-06-2021</p>
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
                    230
                  </p>
                  <p>500</p>
                  <p>80</p>
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
                    15-04-2020
                  </p>
                  <p>10 Minutes</p>
                  <p>2 Minutes</p>
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
                    class="form_edit_select"
                    :items="selectGraph"
                    label="Trend"
                    solo
                    hide-details="auto"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div id="vuechart-health">
                <apexchart
                  type="area"
                  height="200"
                  :options="options"
                  :series="series"
                ></apexchart>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" id="btnFloating">
              <div class="d-flex justify-space-between">
                <div class="left">
                  <v-tabs v-model="tab">
                    <v-tab>Issue History</v-tab>
                    <v-tab>Calibration History</v-tab>
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
                    <v-dialog v-model="dialogFullTableIssue" max-width="500px">
                      <template
                        v-slot:activator="{
                          on,
                          attrs
                        }"
                      >
                        <v-btn class="btnTransBgColor" v-bind="attrs" v-on="on">
                          Show Full Table
                        </v-btn>
                      </template>
                    </v-dialog>
                  </template>
                </div>
              </div>
              <v-speed-dial
                class="d-block d-sm-block d-md-none"
                v-model="fab"
                direction="top"
                right="true"
                bottom="true"
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
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-simple-table height="170px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Issue Date
                          </th>
                          <th class="text-left">
                            Person & Company Name
                          </th>
                          <th class="text-left">
                            Issue Description
                          </th>
                          <th class="text-left">
                            Status
                          </th>
                          <th class="text-left">
                            Solved Note
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(i, index) in item" :key="index">
                          <td>{{ i.date }}</td>
                          <td>
                            {{ i.name }}
                          </td>
                          <td>
                            {{ i.description }}
                          </td>
                          <td>{{ i.status }}</td>
                          <td>
                            {{ i.note }}
                          </td>
                          <td>
                            <v-menu>
                              <template
                                v-slot:activator="{
                                  on,
                                  attrs
                                }"
                              >
                                <v-icon v-bind="attrs" v-on="on">
                                  mdi-dots-horizontal
                                </v-icon>
                              </template>
                              <v-list class="py-0">
                                <v-list-item @click="editItemIssue(i)">
                                  <v-list-item-title>
                                    <v-icon small class="mr-1">
                                      mdi-pencil
                                    </v-icon>
                                    Edit
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="deleteItemIssue(i)">
                                  <v-list-item-title>
                                    <v-icon small class="mr-1">
                                      mdi-delete
                                    </v-icon>
                                    Delete
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="downloadItemIssue(i)">
                                  <v-list-item-title>
                                    <v-icon small class="mr-1">
                                      mdi-download
                                    </v-icon>
                                    Download
                                  </v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <!-- Create Entry Issue -->
      <v-dialog
        content-class="edit_user_dialog"
        v-model="dialogAddEntryIssue"
        max-width="80%"
      >
        <v-form method="POST" @submit.prevent="save">
          <v-card>
            <v-card-title class="justify-space-between">
              <span class="text-h5">{{ formTitleIssue }}</span>
              <v-icon
                class="close_dialog white--text"
                @click="dialogAddEntryIssue = false"
              >
                mdi-close-thick
              </v-icon>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12">
                        <label class="title_field">Issue Date</label>
                        <v-menu
                          content-class="date_single_range"
                          ref="menu"
                          v-model="menuIssueDate"
                          :close-on-content-click="false"
                          :return-value.sync="issueDate"
                          transition="scale-transition"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              class="form_edit single_date"
                              v-model="issueDate"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              hide-details="auto"
                              outlined
                              append-icon="mdi-menu-down"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="issueDate"
                            @change="dateChange(issueDate)"
                            no-title
                            scrollable
                            color="color_current_date"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn text @click="$refs.menu.save(issueDate)">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12">
                        <label class="title_field">Person & Company Name</label>
                        <v-text-field
                          ref="editedItem.person_company"
                          class="form_edit"
                          v-model="editedItem.person_company"
                          label="Enter person & company name"
                          solo
                          hide-details="auto"
                          placeholder="Enter person & company name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <label class="title_field">Issue Description</label>
                        <v-textarea
                          ref="editedItem.issue_desc"
                          v-model="editedItem.issue_desc"
                          solo
                          class="form_edit"
                          label="Enter calibration description"
                          placeholder="Enter calibration description"
                          hide-details="auto"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <label class="title_field">Status</label>
                        <v-select
                          ref="editedItem.status"
                          class="form_edit_select"
                          v-model="editedItem.status"
                          :items="status"
                          label="Select Status"
                          solo
                          hide-details="auto"
                          @change="handleChangeUnit()"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <label class="title_field">Solved Note</label>
                        <v-textarea
                          ref="editedItem.note"
                          v-model="editedItem.note"
                          solo
                          class="form_edit"
                          label="Enter Note"
                          placeholder="Enter Note"
                          hide-details="auto"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-col cols="12" class="d-flex justify-end">
                      <v-btn
                        text
                        class="btnBgColor mr-5"
                        @click="save"
                        :loading="loadingAddSensors"
                        :disabled="loadingAddSensors"
                      >
                        Add Issue History
                      </v-btn>
                      <v-btn text class="btnTransBgColor" @click="close">
                        Cancel
                      </v-btn>
                    </v-col>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-form>
      </v-dialog>
      <!-- End -->

      <!-- Delete Dialog -->
      <v-dialog
        content-class="delete_user_dialog"
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 justify-space-between"
            >Delete Device?
            <v-icon
              class="close_dialog white--text"
              @click="dialogDelete = false"
            >
              mdi-close-thick
            </v-icon>
          </v-card-title>
          <v-card-text class="pb-0">
            Deleting a device will permanently remove it from the system.
          </v-card-text>
          <v-container fluid>
            <v-row class="pb-3 my-auto mx-auto">
              <v-col cols="12" sm="6">
                <v-btn text @click="deleteItemConfirm"
                  >YES, DELETE DEVICE</v-btn
                >
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn class="cancel_delete" text @click="closeDelete"
                  >NO, KEEP DEVICE</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- End -->

      <!-- Full Table Issue -->
      <v-dialog
        content-class="edit_user_dialog"
        v-model="dialogFullTableIssue"
        max-width="80%"
      >
        <v-card min-height="90vh">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <h1>
                  <v-icon @click="dialogFullTableIssue = false">
                    mdi-chevron-left </v-icon
                  >Issue History
                </h1>
              </v-col>
              <v-col cols="12" md="6">
                <div class="d-flex justify-space-between">
                  <div class="left px-3 px-sm-0">
                    <v-select
                      ref="editedItem.unit"
                      class="form_edit_select"
                      v-model="editedItem.unit"
                      :items="unit"
                      label="Select Status"
                      solo
                      hide-details="auto"
                      @change="handleChangeUnit()"
                    ></v-select>
                  </div>
                  <div class="right px-3 px-sm-0">
                    <v-menu
                      content-class="date_single_range"
                      ref="menu"
                      v-model="menuIssueDate"
                      :close-on-content-click="false"
                      :return-value.sync="issueDate"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="form_edit single_date"
                          v-model="issueDate"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details="auto"
                          outlined
                          append-icon="mdi-menu-down"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="issueDate"
                        @change="dateChange(issueDate)"
                        no-title
                        scrollable
                        color="color_current_date"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn text @click="$refs.menu.save(issueDate)">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <v-simple-table height="170px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Issue Date
                        </th>
                        <th class="text-left">
                          Person & Company Name
                        </th>
                        <th class="text-left">
                          Issue Description
                        </th>
                        <th class="text-left">
                          Status
                        </th>
                        <th class="text-left">
                          Solved Note
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>15-04-21</td>
                        <td>
                          Aulia Rizky H - Emerson
                        </td>
                        <td>
                          Signal interference
                        </td>
                        <td>Open</td>
                        <td>
                          Is being monitored
                        </td>
                        <td>
                          <v-menu>
                            <template
                              v-slot:activator="{
                                on,
                                attrs
                              }"
                            >
                              <v-icon v-bind="attrs" v-on="on">
                                mdi-dots-horizontal
                              </v-icon>
                            </template>
                            <v-list class="py-0">
                              <v-list-item @click="editItemIssue(item)">
                                <v-list-item-title>
                                  <v-icon small class="mr-1">
                                    mdi-pencil
                                  </v-icon>
                                  Edit
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="deleteItemIssue(item)">
                                <v-list-item-title>
                                  <v-icon small class="mr-1">
                                    mdi-delete
                                  </v-icon>
                                  Delete
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="downloadItemIssue(item)">
                                <v-list-item-title>
                                  <v-icon small class="mr-1">
                                    mdi-download
                                  </v-icon>
                                  Download
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- End -->
    </div>
  </v-app>
</template>
<script>
export default {
  name: "DeviceHealth",
  data: () => ({
    fab: false,
    issueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    tab: null,
    dates: ["2021-06-16", "2021-06-16"],
    menu: false,
    item: [
      {
        date: "15-07-2020",
        name: "Oji",
        description: "deskripsi",
        status: "Open",
        note: "is being monitored"
      }
    ],
    status: [],
    menuIssueDate: false,
    selectGraph: ["Trend", "Distribution"],
    dialogAddEntryIssue: false,
    dialogFullTableIssue: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      issueDate: null,
      person_company: null,
      issue_desc: null,
      status: null,
      note: null
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
    series: [],
    loadingAddSensors: false,
    loadingGetUnitList: false,
    loadingGetDetailUnit: false
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    formTitleIssue() {
      return this.editedIndex === -1
        ? "Add Issue History"
        : "Edit Issue History";
    }
  },
  mounted() {
    // var arr1 = this.dates[0];
    // arr1 = arr1.split("-");
    // var newDate = new Date(arr1[0], arr1[1] - 1, arr1[2], 0, 0, 1, 0).getTime();
    // this.timestamps1 = newDate;
    // var arr2 = this.dates[1];
    // arr2 = arr2.split("-");
    // var newDate2 = new Date(
    //   arr2[0],
    //   arr2[1] - 1,
    //   arr2[2],
    //   23,
    //   59,
    //   59
    // ).getTime();
    // this.timestamps2 = newDate2;
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
    }
  },
  created() {
    this.getUnitList();
  },
  methods: {
    editItemIssue(item) {
      this.editedIndex = this.item.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddEntryIssue = true;
    },
    deleteItemIssue(item) {
      this.editedIndex = this.item.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    close() {
      this.dialogAddEntryIssue = false;
      this.dialogFullTableIssue = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async getUnitList() {
      try {
        this.loadingGetUnitList = true;
        const res = await this.$store.dispatch(
          "configuration/device_list/getUnitList"
        );

        this.loadingGetUnitList = false;
        res.units.map(async unit => {
          this.unit.push({
            text: unit.name,
            value: unit.id
          });
          if (unit.sensors !== null) {
            console.log(unit.sensors);
            const promises = unit.sensors.map(async result => {
              const sensors = await this.$store.dispatch(
                "configuration/device_list/getSensorMeasurements",
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

            if (this.sensors_device_list.length > 0) {
              this.sensors_device_list = [];
              unit.sensors.map((result, index) => {
                this.sensors_device_list.push({
                  unit_name: unit.name,
                  sensors_name: result.name,
                  value: `${loopSensors[index].toFixed(0)} ${
                    result.measurementUnit !== null
                      ? result.measurementUnit
                      : ""
                  }`,
                  parameter: result.parameter
                });
              });
            } else {
              unit.sensors.map((result, index) => {
                this.sensors_device_list.push({
                  unit_name: unit.name,
                  sensors_name: result.name,
                  value: `${loopSensors[index].toFixed(0)} ${
                    result.measurementUnit !== null
                      ? result.measurementUnit
                      : ""
                  }`,
                  parameter: result.parameter
                });
              });
            }
          }
          this.loadingSensors = false;
        });
      } catch (err) {
        console.log(err);
        this.loadingGetUnitList = false;
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
      try {
        const res = await this.$apollo.mutate({
          mutation: DELETE_USERS,
          variables: {
            userID: this.editedItem.id
          }
        });

        if (res) {
          if (res.data.deleteUser.ok) {
            this.users.splice(this.editedIndex, 1);
            this.toastMsgSensors = "Data has been Deleted";
            this.toast = true;
          }
        }
      } catch (err) {
        console.log(err);
        // this.searchResults = [];
      }
      this.closeDelete();
    },
    async save() {
      if (this.editedIndex > -1) {
        let param = null;
        console.log(this.editedItem);
        // if (this.editedItem.password !== null) {
        //   param = {
        //     userID: this.editedItem.id,
        //     user: {
        //       name: this.editedItem.name,
        //       email: this.editedItem.email,
        //       roles: this.editedItem.roles,
        //       notify: true,
        //       position: this.editedItem.position,
        //       password: this.editedItem.password
        //     }
        //   };
        // } else {
        //   param = {
        //     userID: this.editedItem.id,
        //     user: {
        //       name: this.editedItem.name,
        //       email: this.editedItem.email,
        //       roles: this.editedItem.roles,
        //       notify: true,
        //       position: this.editedItem.position
        //     }
        //   };
        // }

        // try {
        //   this.loadingAddSensors = true;
        //   const res = await this.$apollo.mutate({
        //     mutation: EDIT_USERS,
        //     variables: param
        //   });

        //   if (res.data.editUser.ok) {
        //     this.loadingAddSensors = false;
        //     Object.assign(this.users[this.editedIndex], this.editedItem);
        //     this.toastMsgSensors = "Data has been Edited";
        //     this.toast = true;
        //   }
        // } catch (err) {
        //   console.log(err);
        //   this.loadingAddSensors = false;
        //   // this.searchResults = [];
        // }
      } else {
        try {
          this.loadingAddSensors = true;
          const res = await this.$store.dispatch(
            "/pages/configuration/device_list/addSensorsUnit",
            this.editedItem
          );

          if (res.data.addUser.ok) {
            this.loadingAddSensors = false;
            this.device_list.push({
              person_company: this.editedItem.person_company,
              issue_desc: this.editedItem.issue_desc,
              status: this.editedItem.status,
              note: this.editedItem.note
            });
            this.toastMsgSensors = "Success To Save";
            this.toast = true;
          }
        } catch (err) {
          console.log(err);
          this.loadingAddSensors = false;
          // this.searchResults = [];
        }
      }
      this.close();
    }
  }
};
</script>
