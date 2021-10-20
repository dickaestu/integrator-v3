<template>
  <v-app>
    <section id="device_list">
      <Header />
      <Menu title="Device List" />
      <v-container :fluid="$vuetify.breakpoint.mdAndDown">
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <SideMenu :sideBar="sidebarMenu" />
              <v-main class="menu-right">
                <v-container fluid class="pa-7">
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col md="12" lg="5">
                          <h3>
                            <v-app-bar-nav-icon
                              class="d-inline-block d-sm-print-inline-block d-md-none"
                              @click.stop="sidebarMenu = !sidebarMenu"
                            ></v-app-bar-nav-icon>
                            Device List
                          </h3>
                          <p class="desc mt-2">
                            Scroll to explore devices. Click devices to show
                            device health.
                          </p>
                        </v-col>
                        <v-col md="12" lg="7" class="my-auto">
                          <v-row>
                            <v-col
                              xs="12"
                              sm="6"
                              md="4"
                              lg="auto"
                              class="my-auto"
                            >
                              <template>
                                <v-dialog
                                  v-model="dialogAddEditDevice"
                                  max-width="500px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="btnBgColor fs-12 w-100"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon left>
                                        mdi-plus
                                      </v-icon>
                                      ADD Device
                                    </v-btn>
                                  </template>
                                </v-dialog>
                              </template>
                            </v-col>
                            <v-col
                              xs="12"
                              sm="6"
                              md="4"
                              lg="auto"
                              class="my-auto"
                            >
                              <v-btn class="btnTransBgColor fs-12 w-100">
                                Generate Report
                              </v-btn>
                            </v-col>
                            <v-col
                              xs="12"
                              sm="12"
                              md="4"
                              lg="3"
                              class="my-auto"
                            >
                              <v-select
                                class="radius "
                                hide-details
                                v-model="selectedFilters"
                                :items="filters"
                                prepend-inner-icon="mdi-filter"
                                multiple
                                label="Filter"
                                solo
                              >
                                <template v-slot:prepend-item>
                                  <v-list-item ripple @click="toggle">
                                    <v-list-item-action>
                                      <v-icon
                                        :color="
                                          selectedFilters.length > 0
                                            ? 'indigo darken-4'
                                            : ''
                                        "
                                      >
                                        {{ icon }}
                                      </v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <v-list-item-title>
                                        Select All
                                      </v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-divider class="mt-2"></v-divider>
                                </template>
                                <template v-slot:selection="{ index }">
                                  <span v-if="index === 0">Filter</span>
                                </template>
                              </v-select>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <!-- Create or Edit Dialog -->
                      <v-dialog
                        content-class="edit_user_dialog"
                        v-model="dialogAddEditDevice"
                        persistent
                        max-width="80%"
                      >
                        <v-form method="POST" @submit.prevent="save">
                          <v-card>
                            <v-card-title class="justify-space-between">
                              <span class="text-h5">{{ formTitle }}</span>
                              <v-icon
                                class="close_dialog white--text"
                                @click="dialogAddEditDevice = false"
                              >
                                mdi-close-thick
                              </v-icon>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" md="6">
                                    <p class="title_head_newDevice">
                                      General Information & Protocol Parameters
                                    </p>
                                    <v-row>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Device Type</label
                                        >
                                        <v-select
                                          ref="editedItem.device_type"
                                          class="form_edit_select"
                                          v-model="editedItem.device_type"
                                          :items="device_type"
                                          label="Select Device Type"
                                          solo
                                          hide-details="auto"
                                        ></v-select>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Device Brand and Series/Name</label
                                        >
                                        <v-text-field
                                          ref="editedItem.brand"
                                          class="form_edit"
                                          v-model="editedItem.brand"
                                          label="Enter device brand and series"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter device brand and series"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Select Unit</label
                                        >
                                        <v-select
                                          ref="editedItem.unit"
                                          class="form_edit_select"
                                          v-model="editedItem.unit"
                                          :items="unit"
                                          label="Select Unit"
                                          solo
                                          hide-details="auto"
                                          @change="handleChangeUnit()"
                                        ></v-select>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <p class="title_head_newDevice">
                                      Device Variables
                                    </p>
                                    <v-row>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Parameter Name</label
                                        >
                                        <v-text-field
                                          ref="editedItem.parameter"
                                          class="form_edit"
                                          v-model="editedItem.parameter"
                                          label="Enter Parameter"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Parameter"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field">Port</label>
                                        <v-text-field
                                          ref="editedItem.port"
                                          class="form_edit"
                                          v-model="editedItem.port"
                                          label="Enter Port"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Port"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Data Length</label
                                        >
                                        <v-text-field
                                          ref="editedItem.data_length"
                                          class="form_edit"
                                          v-model="editedItem.data_length"
                                          label="Enter array"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter array"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Input Low</label
                                        >
                                        <v-text-field
                                          ref="editedItem.input_low"
                                          class="form_edit"
                                          v-model="editedItem.input_low"
                                          label="Enter Input Low"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Input Low"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Input High</label
                                        >
                                        <v-text-field
                                          ref="editedItem.input_high"
                                          class="form_edit"
                                          v-model="editedItem.input_high"
                                          label="Enter Input High"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Input High"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Output Low</label
                                        >
                                        <v-text-field
                                          ref="editedItem.output_low"
                                          class="form_edit"
                                          v-model="editedItem.output_low"
                                          label="Enter Output Low"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Output Low"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Output High</label
                                        >
                                        <v-text-field
                                          ref="editedItem.output_high"
                                          class="form_edit"
                                          v-model="editedItem.output_high"
                                          label="Enter Output High"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Output High"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Threshold Low</label
                                        >
                                        <v-text-field
                                          ref="editedItem.threshold_low"
                                          class="form_edit"
                                          v-model="editedItem.threshold_low"
                                          label="Enter Threshold Low"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Threshold Low"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Threshold High</label
                                        >
                                        <v-text-field
                                          ref="editedItem.threshold_high"
                                          class="form_edit"
                                          v-model="editedItem.threshold_high"
                                          label="Enter Threshold High"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Threshold High"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Measurement Unit</label
                                        >
                                        <v-text-field
                                          ref="editedItem.measurement"
                                          class="form_edit"
                                          v-model="editedItem.measurement"
                                          label="Enter Measurement Unit"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Measurement Unit"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Register Type</label
                                        >
                                        <v-select
                                          ref="editedItem.register_type"
                                          class="form_edit_select"
                                          v-model="editedItem.register_type"
                                          :items="register_type"
                                          label="Enter Register Type"
                                          solo
                                          hide-details="auto"
                                        ></v-select>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Calibration Formula</label
                                        >
                                        <v-textarea
                                          ref="editedItem.calibration"
                                          v-model="editedItem.calibration"
                                          solo
                                          class="form_edit"
                                          label="Insert calibration equation here"
                                          placeholder="Insert calibration equation here"
                                          hide-details="auto"
                                        ></v-textarea>
                                      </v-col>
                                      <v-col cols="12">
                                        <p class="uuid">
                                          Setting up Device UUID
                                          <br />
                                          <span>
                                            fc78835c-ad79-41ad-8a4f-20a725ae012e
                                          </span>
                                        </p>
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        class="d-flex justify-end"
                                      >
                                        <v-btn
                                          text
                                          class="btnBgColor mr-5"
                                          @click="save"
                                          :loading="loadingAddSensors"
                                          :disabled="loadingAddSensors"
                                        >
                                          Add New Device
                                        </v-btn>
                                        <v-btn
                                          text
                                          class="btnTransBgColor"
                                          @click="close"
                                        >
                                          Cancel
                                        </v-btn>
                                      </v-col>
                                    </v-row>
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
                        persistent
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
                            Deleting a device will permanently remove it from
                            the system.
                          </v-card-text>
                          <v-container fluid>
                            <v-row class="pb-3 my-auto mx-auto">
                              <v-col cols="12" sm="6">
                                <v-btn text @click="deleteItemConfirm"
                                  >YES, DELETE DEVICE</v-btn
                                >
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-btn
                                  class="cancel_delete"
                                  text
                                  @click="closeDelete"
                                  >NO, KEEP DEVICE</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-dialog>
                      <!-- End -->

                      <v-row>
                        <v-col cols="12" class="custom-scroll">
                          <v-row
                            class="mb-5"
                            v-for="(sensor, indexSensor) in unit"
                            :key="indexSensor"
                          >
                            <v-col cols="12">
                              <p class="title_head">Sensors</p>
                              <v-row>
                                <v-col
                                  xl="2"
                                  lg="3"
                                  md="6"
                                  sm="6"
                                  cols="12"
                                  v-for="(i,
                                  index) in sensor.sensors_device_list"
                                  :key="index"
                                >
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        {{ sensor.text }}
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
                                            mdi-dots-horizontal
                                          </v-icon>
                                        </template>
                                        <v-list class="py-0">
                                          <v-list-item @click="editItem(i)">
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-pencil
                                              </v-icon>
                                              Edit
                                            </v-list-item-title>
                                          </v-list-item>
                                          <v-list-item @click="deleteItem(i)">
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p
                                      class="size"
                                      @click="dialogDeviceHealthOpen(i)"
                                    >
                                      {{ i.brand }}
                                    </p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Parameter</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">
                                          {{ i.value }} {{ i.measurementUnit }}
                                        </p>
                                        <p class="mb-0">{{ i.parameter }}</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <!-- Device Health -->
                      <v-dialog
                        v-model="dialogDeviceHealth"
                        width="80%"
                        content-class="device_health_dialog"
                      >
                        <DeviceHealth
                          :sensorParams="sensorsParamsDeviceHealth"
                        />
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-main>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar
          :timeout="-1"
          :value="toast"
          color="blue-grey"
          fixed
          rounded="pill"
        >
          {{ toastMsgSensors }}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="toast = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </section>
  </v-app>
</template>

<script>
// import gql from "graphql-tag";
import SideMenu from "../../../components/config/SideMenu.vue";
import Menu from "../../../components/Menu.vue";
import DeviceHealth from "../../../components/config/device_health/DeviceHealth.vue";

export default {
  name: "device_list",
  components: {
    SideMenu,
    Menu,
    DeviceHealth
  },
  data: () => ({
    sidebarMenu: false,
    dialogAddEditDevice: false,
    dialogDeviceHealth: false,
    dialogDelete: false,
    dialogRoles: false,
    toastMsgSensors: "",
    toast: false,
    errorMessages: "",
    search: "",
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" }
    ],
    device_type: ["Sensor", "Controller", "Actuator", "Others"],
    sensors_device_list: [],
    unit: [],
    register_type: [
      {
        text: "Holding Register",
        value: "holding_register"
      },
      {
        text: "Input Register",
        value: "input_register"
      }
    ],
    filters: ["Admin", "Editor", "Viewer"],
    selectedFilters: [],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Device Type", value: "device_type" },
      { text: "Brand", value: "brand" },
      { text: "Unit", value: "unit" },
      { text: "Parameter", value: "parameter" },
      { text: "Port", value: "port" },
      { text: "Data Length", value: "data_length" },
      { text: "Input Low", value: "input_low" },
      { text: "Input High", value: "input_high" },
      { text: "Output Low", value: "output_low" },
      { text: "Output High", value: "output_high" },
      { text: "Threshold Low", value: "threshold_low" },
      { text: "Threshold High", value: "threshold_high" },
      { text: "Measurement", value: "measurement" },
      { text: "Register Type", value: "register_type" },
      { text: "Calibration Formula", value: "calibration" },
      { text: "", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      device_type: null,
      brand: null,
      unit: null,
      parameter: null,
      port: null,
      data_length: null,
      input_low: null,
      input_high: null,
      output_low: null,
      output_high: null,
      threshold_low: null,
      threshold_high: null,
      measurement: null,
      register_type: null,
      calibration: null
    },
    defaultItem: {
      device_type: null,
      brand: null,
      unit: null,
      parameter: null,
      port: null,
      data_length: null,
      input_low: null,
      input_high: null,
      output_low: null,
      output_high: null,
      threshold_low: null,
      threshold_high: null,
      measurement: null,
      register_type: null,
      calibration: null
    },
    loadingAddSensors: false,
    loadingGetUnitList: false,
    loadingGetDetailUnit: false,
    sensorsParamsDeviceHealth: null
  }),

  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    formTitle() {
      return this.editedIndex === -1 ? "Add New Device" : "Edit Device";
    },

    likesAllFilter() {
      return this.selectedFilters.length === this.filters.length;
    },
    likesSomeFilter() {
      return this.selectedFilters.length > 0 && !this.likesAllFilter;
    },
    icon() {
      if (this.likesAllFilter) return "mdi-close-box";
      if (this.likesSomeFilter) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },

  mounted() {
    //
  },

  watch: {
    dialogAddEditDevice(val) {
      val || this.close();
    },

    dialogDelete(val) {
      val || this.closeDelete();
    },
    name() {
      this.errorMessages = "";
    }
  },

  created() {
    this.getUnitList();
  },

  methods: {
    async getUnitList() {
      try {
        this.loadingGetUnitList = true;
        const res = await this.$store.dispatch(
          "configuration/device_list/getUnitList"
        );

        this.loadingGetUnitList = false;
        res.units.map(async unit => {
          if (unit.sensors !== null) {
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

            let sensor_device = [];
            unit.sensors.map((result, index) => {
              sensor_device.push({
                id: result.id,
                device_type: "Sensor",
                unit_name: unit.name,
                brand: result.name,
                value: `${loopSensors[index].toFixed(0)} ${
                  result.measurementUnit !== null ? result.measurementUnit : ""
                }`,
                parameter: result.parameter,
                unit: unit.id,
                register_type: result.registerType,
                port: result.port,
                data_length: result.dataLength,
                measurement: result.measurementUnit,
                input_low: result.inputLow,
                input_high: result.inputHigh,
                output_low: result.outputLow,
                output_high: result.outputHigh,
                threshold_low: result.thresholdLow,
                threshold_high: result.thresholdHigh,
                calibration: result.customCalibration
              });
            });
            this.unit.push({
              text: unit.name,
              value: unit.id,
              sensors_device_list: sensor_device
            });
          }
          this.loadingSensors = false;
        });
      } catch (err) {
        console.log(err);
        this.loadingGetUnitList = false;
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
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFilter) {
          this.selectedFilters = [];
        } else {
          this.selectedFilters = this.filters.slice();
        }
      });
    },
    async editItem(item) {
      console.log(item);
      // this.editedIndex = this.sensors_device_list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddEditDevice = true;
    },

    deleteItem(item) {
      // this.editedIndex = this.unit.sensors_device_list.indexOf(item);
      this.unit.map((sensor, index) => {
        this.editedIndex = sensor.sensors_device_list.indexOf(item);
      });
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        const res = await this.$store.dispatch(
          "configuration/device_list/deleteSensorUnit",
          this.editedItem
        );

        if (res) {
          if (res.deleteSensor.ok) {
            // this.sensors_device_list.splice(this.editedIndex, 1);
            this.unit.map(sensor => {
              sensor.sensors_device_list.splice(this.editedIndex, 1);
            });
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
    close() {
      this.dialogAddEditDevice = false;
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
    async save() {
      if (this.editedIndex > -1) {
        try {
          this.loadingAddSensors = true;
          const res = await this.$store.dispatch(
            "configuration/device_list/editSensorsUnit",
            this.editedItem
          );

          if (res.editSensor.ok) {
            this.loadingAddSensors = false;
            this.toastMsgSensors = "Success To Edit";
            this.toast = true;
          }
          this.getUnitList();
        } catch (error) {
          console.log(error);
          this.loadingAddSensors = false;
        }
      } else {
        try {
          this.loadingAddSensors = true;
          const res = await this.$store.dispatch(
            "configuration/device_list/addSensorsUnit",
            this.editedItem
          );

          if (res.addSensor.ok) {
            this.loadingAddSensors = false;
            this.toastMsgSensors = "Success To Save";
            this.toast = true;
          }
          this.getUnitList();
        } catch (err) {
          console.log(err);
          this.loadingAddSensors = false;
        }
      }
      this.close();
    },
    dialogDeviceHealthOpen(params) {
      this.sensorsParamsDeviceHealth = params;
      this.dialogDeviceHealth = open;
    }
  }
};
</script>
