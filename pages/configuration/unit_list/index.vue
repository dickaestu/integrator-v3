<template>
  <v-app>
    <section id="unit_list">
      <Header />
      <Menu title="Unit List" />
      <v-container :fluid="$vuetify.breakpoint.mdAndDown">
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <SideMenu :sideBar="sidebarMenu" />
              <v-content class="menu-right">
                <v-container fluid class="pa-7">
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col md="12" lg="6">
                          <h3>
                            <v-app-bar-nav-icon
                              class="d-inline-block d-sm-print-inline-block d-md-none"
                              @click.stop="sidebarMenu = !sidebarMenu"
                            ></v-app-bar-nav-icon>
                            Unit List
                          </h3>
                          <p class="desc mt-2">
                            Scroll to explore unit.
                          </p>
                        </v-col>
                        <v-col md="12" lg="6" class="my-auto text-right">
                          <v-row>
                            <v-col>
                              <template>
                                <!-- <v-dialog
                                  v-model="dialogAddEditUnit"
                                  max-width="500px"
                                > -->
                                <!-- <template v-slot:activator="{ on, attrs }"> -->
                                <v-btn class="btnBgColor" @click="addUnitItem">
                                  <v-icon left>
                                    mdi-plus
                                  </v-icon>
                                  ADD Unit
                                </v-btn>
                                <!-- </template> -->
                                <!-- </v-dialog> -->
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <!-- Create or Updaate Unit List -->
                      <v-dialog
                        content-class="edit_user_dialog"
                        v-model="dialogAddEditUnit"
                        persistent
                        max-width="80%"
                      >
                        <v-form method="POST" @submit.prevent="save">
                          <v-card>
                            <v-card-title class="justify-space-between">
                              <span class="text-h5">{{ formTitle }}</span>
                              <v-icon
                                class="close_dialog white--text"
                                @click="dialogAddEditUnit = false"
                              >
                                mdi-close-thick
                              </v-icon>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" md="6">
                                    <p class="title_head_newDevice">
                                      Unit Information
                                    </p>
                                    <v-row>
                                      <v-col cols="12">
                                        <label class="title_field">Name</label>
                                        <v-text-field
                                          ref="editedItem.name"
                                          class="form_edit"
                                          v-model="editedItem.name"
                                          label="Enter unit name"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter unit name"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Location</label
                                        >
                                        <v-text-field
                                          ref="editedItem.location"
                                          class="form_edit"
                                          v-model="editedItem.location"
                                          label="Enter unit location"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter unit location"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Latitude</label
                                        >
                                        <v-text-field
                                          ref="editedItem.latitude"
                                          class="form_edit"
                                          v-model="editedItem.latitude"
                                          label="Enter unit latitude"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter unit latitude"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Longitude</label
                                        >
                                        <v-text-field
                                          ref="editedItem.longitude"
                                          class="form_edit"
                                          v-model="editedItem.longitude"
                                          label="Enter unit longitude"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter unit longitude"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Unit Certification Expiration
                                          Date</label
                                        >
                                        <v-menu
                                          content-class="date_single_range"
                                          ref="menu"
                                          v-model="menu"
                                          :close-on-content-click="false"
                                          :return-value.sync="expired"
                                          transition="scale-transition"
                                          min-width="auto"
                                        >
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-text-field
                                              class="form_edit single_date"
                                              v-model="expired"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                              hide-details="auto"
                                              outlined
                                              append-icon="mdi-menu-down"
                                            ></v-text-field>
                                          </template>
                                          <v-date-picker
                                            v-model="expired"
                                            @change="dateChange(expired)"
                                            no-title
                                            scrollable
                                            color="color_current_date"
                                          >
                                            <v-spacer></v-spacer>
                                            <v-btn text @click="menu = false">
                                              Cancel
                                            </v-btn>
                                            <v-btn
                                              text
                                              @click="$refs.menu.save(expired)"
                                            >
                                              OK
                                            </v-btn>
                                          </v-date-picker>
                                        </v-menu>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Description</label
                                        >
                                        <v-textarea
                                          ref="editedItem.description"
                                          v-model="editedItem.description"
                                          solo
                                          class="form_edit"
                                          label="Enter unit description"
                                          placeholder="Enter unit description"
                                        ></v-textarea>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <p class="title_head_newDevice">
                                      Protocol Variables
                                    </p>
                                    <v-row>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Select Protocol</label
                                        >
                                        <v-select
                                          ref="editedItem.protocol"
                                          class="form_edit_select"
                                          v-model="editedItem.protocol"
                                          :items="protocol"
                                          label="Select Protocol"
                                          solo
                                          hide-details="auto"
                                          v-on:change="ShowHideProtocol()"
                                        ></v-select>
                                      </v-col>
                                      <!-- ModBus RTU -->
                                      <v-col cols="12" v-if="modbusRTU">
                                        <v-row>
                                          <v-col cols="12">
                                            <label class="title_field"
                                              >Port</label
                                            >
                                            <v-text-field
                                              ref="editedItem.port_rtu"
                                              class="form_edit"
                                              v-model="editedItem.port_rtu"
                                              label="0"
                                              solo
                                              hide-details="auto"
                                              placeholder="0"
                                              required
                                            ></v-text-field>
                                          </v-col>
                                          <v-col cols="6">
                                            <label class="title_field"
                                              >Baud Rate</label
                                            >
                                            <v-text-field
                                              ref="editedItem.baud_rate"
                                              class="form_edit"
                                              v-model="editedItem.baud_rate"
                                              label="0"
                                              solo
                                              hide-details="auto"
                                              placeholder="0"
                                              required
                                            ></v-text-field>
                                          </v-col>
                                          <v-col cols="6">
                                            <label class="title_field"
                                              >Data Bits</label
                                            >
                                            <v-text-field
                                              ref="editedItem.data_bits"
                                              class="form_edit"
                                              v-model="editedItem.data_bits"
                                              label="1"
                                              solo
                                              hide-details="auto"
                                              placeholder="1"
                                              required
                                            ></v-text-field>
                                          </v-col>
                                          <v-col cols="6">
                                            <label class="title_field"
                                              >Parity</label
                                            >
                                            <v-select
                                              ref="editedItem.parity"
                                              class="form_edit_select"
                                              v-model="editedItem.parity"
                                              :items="parity"
                                              label="None"
                                              solo
                                              hide-details="auto"
                                            ></v-select>
                                          </v-col>
                                          <v-col cols="6">
                                            <label class="title_field"
                                              >Stop Bits</label
                                            >
                                            <v-text-field
                                              ref="editedItem.stop_bits"
                                              class="form_edit"
                                              v-model="editedItem.stop_bits"
                                              label="2"
                                              solo
                                              hide-details="auto"
                                              placeholder="2"
                                              required
                                            ></v-text-field>
                                          </v-col>
                                        </v-row>
                                      </v-col>
                                      <!-- End ModBus RTU -->

                                      <!-- ModBusTCP -->
                                      <v-col cols="12" v-else-if="modbusTCP">
                                        <v-row>
                                          <v-col cols="12">
                                            <label class="title_field"
                                              >Host</label
                                            >
                                            <v-text-field
                                              ref="editedItem.host"
                                              class="form_edit"
                                              v-model="editedItem.host"
                                              label="192.168.0.1"
                                              solo
                                              hide-details="auto"
                                              placeholder="192.168.0.1"
                                              required
                                            ></v-text-field>
                                          </v-col>
                                          <v-col cols="12">
                                            <label class="title_field"
                                              >Port</label
                                            >
                                            <v-text-field
                                              ref="editedItem.port_tcp"
                                              class="form_edit"
                                              v-model="editedItem.port_tcp"
                                              label="1"
                                              solo
                                              hide-details="auto"
                                              placeholder="1"
                                              required
                                            ></v-text-field>
                                          </v-col>
                                        </v-row>
                                      </v-col>
                                      <!-- End ModBus TCP -->
                                      <v-col cols="12">
                                        <p class="uuid">
                                          Setting up
                                          <span
                                            >Unit
                                            <br />
                                            {{ this.editedItem.uuid }}
                                          </span>
                                        </p>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" class="d-flex justify-end">
                                    <v-btn
                                      text
                                      class="btnBgColor mr-5"
                                      @click="save"
                                      :loading="loadingAddUser"
                                      :disabled="loadingAddUser"
                                    >
                                      {{ formTitle }}
                                    </v-btn>
                                    <v-btn
                                      text
                                      class="btnTransBgColor"
                                      @click="dialogAddEditUnit = false"
                                    >
                                      Cancel
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                          </v-card>
                        </v-form>
                      </v-dialog>
                      <!-- End -->
                      <!-- Delete Unit List -->
                      <v-dialog
                        content-class="delete_user_dialog"
                        persistent
                        v-model="dialogDelete"
                        max-width="500px"
                      >
                        <v-card>
                          <v-card-title class="text-h5 justify-space-between"
                            >Delete Unit?
                            <v-icon
                              class="close_dialog white--text"
                              @click="dialogDelete = false"
                            >
                              mdi-close-thick
                            </v-icon>
                          </v-card-title>
                          <v-card-text class="pb-0">
                            Deleting a unit will permanently remove it from the
                            system.
                          </v-card-text>
                          <v-container fluid>
                            <v-row class="pb-3 my-auto mx-auto">
                              <v-col cols="12" sm="6">
                                <v-btn text @click="deleteItemConfirm"
                                  >YES, DELETE UNIT</v-btn
                                >
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-btn
                                  class="cancel_delete"
                                  text
                                  @click="closeDelete"
                                  >NO, KEEP UNIT</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-dialog>
                      <!-- End -->
                      <!-- Detail Unit List Dialog -->
                      <v-dialog
                        content-class="see_more_unit_list"
                        v-model="dialogSeeMore"
                        persistent
                        max-width="50%"
                      >
                        <v-card>
                          <span class="d-flex justify-end pt-2 pr-2">
                            <v-icon
                              class="close_dialog"
                              @click="dialogSeeMore = false"
                            >
                              mdi-close-thick
                            </v-icon>
                          </span>
                          <v-card-title class="justify-space-between">
                            <h4 class="title_attach mb-0">
                              Attached Devices
                              <span class="text_active">{{
                                dataDialogSeeMore !== null
                                  ? dataDialogSeeMore.name
                                  : ""
                              }}</span>
                            </h4>
                            <!-- <span> -->
                            <NuxtLink to="/configuration/device_list">
                              <v-btn class="btnTransBgColor">See Details</v-btn>
                            </NuxtLink>
                            <!-- </span> -->
                          </v-card-title>
                          <v-card-text>
                            <v-container fluid>
                              <v-row v-if="dataDialogSeeMore !== null">
                                <v-col cols="12">
                                  <p class="mb-0">Sensors</p>
                                </v-col>
                                <v-col
                                  lg="4"
                                  md="4"
                                  sm="6"
                                  xs="12"
                                  class="pt-0"
                                  v-for="(i,
                                  index) in dataDialogSeeMore.sensors"
                                  :key="index"
                                >
                                  <div class="btnBgColor">
                                    {{ i.parameter }}
                                  </div>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                      <!-- End -->
                      <v-row>
                        <v-col cols="12" class="custom-scroll">
                          <v-row class="mb-5">
                            <v-col cols="12">
                              <v-row>
                                <v-col
                                  lg="4"
                                  md="4"
                                  sm="6"
                                  v-for="(i, index) in unit_list"
                                  :key="index"
                                >
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-end">
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
                                    <p class="title-card">
                                      {{ i.name }}
                                    </p>
                                    <p class="desc_unit">
                                      {{ i.description }}
                                    </p>
                                    <p class="attach mb-2">Attached Devices</p>
                                    <div class="attach_device">
                                      <v-row class="pt-3">
                                        <v-col
                                          lg="4"
                                          md="4"
                                          sm="6"
                                          class="pt-0"
                                          v-for="(device, index2) in i.sensors"
                                          :key="index2"
                                        >
                                          <div class="btnBgColor">
                                            {{ device.parameter }}
                                          </div>
                                        </v-col>
                                      </v-row>
                                    </div>
                                    <p
                                      class="text-right more mt-3"
                                      @click="handleDialogSeeMore(i)"
                                    >
                                      see more
                                    </p>
                                    <p class="loc mb-0">Location</p>
                                    <p class="site">{{ i.location }}</p>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-content>
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
          {{ toastMsg }}
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
import SideMenu from "../../../components/config/SideMenu.vue";
import Menu from "../../../components/Menu.vue";
import { v4 as uuidv4 } from "uuid";
import gql from "graphql-tag";

const DELETE_UNIT = gql`
  mutation deleteUnit($unitID: ID!) {
    deleteUnit(unitID: $unitID) {
      ok
    }
  }
`;

export default {
  name: "unit_list",
  components: {
    SideMenu,
    Menu
  },
  data: () => ({
    // bell: false,
    update: false,
    sidebarMenu: false,
    menu: false,
    expired: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dialogAddEditUnit: false,
    dialogSeeMore: false,
    dialogDelete: false,
    dialogRoles: false,
    dataDialogSeeMore: null,
    toastMsg: "",
    toast: false,
    errorMessages: "",
    modbusRTU: false,
    modbusTCP: false,
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" }
    ],
    // expired: ["Test1", "Test2", "Test3"],
    protocol: [
      { text: "Modbus RTU", value: "ModbusRTU" },
      { text: "Modbus TCP", value: "ModbusTCP" }
    ],
    parity: ["Even", "Odd"],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Location", value: "location" },
      { text: "Latitude", value: "latitude" },
      { text: "Longitude", value: "longitude" },
      { text: "Expired", value: "expired" },
      { text: "Desc", value: "desc" },
      { text: "Protocol", value: "protocol" },
      { text: "", value: "actions", sortable: false }
    ],
    unit_list: [],
    editedIndex: -1,
    editedItem: {
      name: null,
      location: null,
      latitude: null,
      longitude: null,
      expired: null,
      description: null,
      protocol: null,
      port_rtu: null,
      port_tcp: null,
      baud_rate: null,
      data_bits: null,
      parity: null,
      stop_bits: null,
      host: null,
      uuid: null,
      serial_port: null
    },
    defaultItem: {
      name: null,
      location: null,
      latitude: null,
      longitude: null,
      expired: null,
      description: null,
      protocol: null,
      port_rtu: null,
      port_tcp: null,
      baud_rate: null,
      data_bits: null,
      parity: null,
      stop_bits: null,
      host: null,
      uuid: null,
      serial_port: null
    },
    loadingAddUser: false,
    loadingGetUser: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Unit" : "Edit Unit";
    }
  },

  watch: {
    dialogAddEditUnit(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    name() {
      this.errorMessages = "";
    }
  },

  // mounted() {
  //   // ShowHideDiv(i) {
  //   var modbusRTU = document.getElementById("modbusRTU");
  //   var modbusTCP = document.getElementById("modbusTCP");
  //   modbusTCP.hide();
  //   modbusRTU.hide();
  //   // }
  // },

  created() {
    this.getUnitList();
    // console.log(this.unit_list);
  },

  methods: {
    async getUnitList() {
      try {
        this.loadingGetUser = true;
        const res = await this.$store.dispatch(
          "configuration/unit_list/getUnitList"
        );

        this.loadingGetUser = false;
        // console.log(res);

        if (res.units.length > 0) {
          res.units.map(unit => {
            if (unit.config.__typename === "ModbusTCP") {
              this.unit_list.push({
                id: unit.id,
                name: unit.name,
                description: unit.description,
                location: unit.location,
                longitude: unit.longitude,
                latitude: unit.latitude,
                sensors: unit.sensors,
                protocol: unit.config.__typename,
                host: unit.config.host,
                port_tcp: unit.config.tcpPort,
                expired: unit.certificationExpirationDate
              });
            } else {
              this.unit_list.push({
                id: unit.id,
                name: unit.name,
                description: unit.description,
                location: unit.location,
                longitude: unit.longitude,
                latitude: unit.latitude,
                sensors: unit.sensors,
                protocol: unit.config.__typename,
                baud_rate: unit.config.baudRate,
                data_bits: unit.config.dataBits,
                parity: unit.config.parity,
                port_rtu: unit.config.serialPort,
                stop_bits: unit.config.stopBits,
                expired: unit.certificationExpirationDate
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
        this.loadingGetUser = false;
        // this.searchResults = [];
      }
    },
    async save() {
      let dataModbus = null;
      if (this.editedItem.protocol === "ModbusTCP") {
        dataModbus = {
          unitID: this.editedItem.id,
          config: {
            host: this.editedItem.host,
            port: this.editedItem.port_tcp
          }
        };
      } else if (this.editedItem.protocol === "ModbusRTU") {
        dataModbus = {
          unitID: this.editedItem.id,
          config: {
            baudRate: this.editedItem.baud_rate,
            dataBits: this.editedItem.data_bits,
            parity: this.editedItem.parity,
            port: this.editedItem.port_rtu,
            stopBits: this.editedItem.stop_bits
          }
        };
      }
      try {
        const res = await this.$store.dispatch(
          "configuration/unit_list/addUnit",
          this.editedItem
        );

        if (dataModbus !== null) {
          let resModbus;
          if (this.editedItem.protocol === "ModbusTCP") {
            resModbus = await this.$store.dispatch(
              "configuration/unit_list/addTcp",
              dataModbus
            );
          } else {
            resModbus = await this.$store.dispatch(
              "configuration/unit_list/addRtu",
              dataModbus
            );
          }

          if (this.update) {
            if (resModbus === "Something went wrong") {
              this.toastMsg = resModbus;
              this.toast = true;
            } else {
              this.updateData(this.editedItem);
              this.toastMsg = "Data has been Updated";
              this.toast = true;
            }
          } else {
            if (resModbus === "Something went wrong") {
              this.toastMsg = resModbus;
              this.toast = true;
            } else {
              this.saveData(this.editedItem);
              this.toastMsg = "Data has been Created";
              this.toast = true;
            }
          }
        }
      } catch (err) {
        console.log(err);
        this.toastMsg = "Something went wrong";
        this.toast = true;
      }
      this.close();
    },
    handleDialogSeeMore(params) {
      this.dialogSeeMore = true;
      this.dataDialogSeeMore = params;
    },
    addUnitItem() {
      this.editedItem.id = uuidv4();
      this.dialogAddEditUnit = true;
    },
    editItem(item) {
      // console.log(item);
      this.editedIndex = this.unit_list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddEditUnit = true;
      if (this.editedItem.protocol === "ModbusRTU") {
        this.modbusTCP = false;
        this.modbusRTU = true;
      } else {
        this.modbusTCP = true;
        this.modbusRTU = false;
      }
      this.update = true;
      this.expired = new Date(
        item.expired * 1000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    },
    deleteItem(item) {
      this.editedIndex = this.unit_list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        const res = await this.$apollo.mutate({
          mutation: DELETE_UNIT,
          variables: {
            unitID: this.editedItem.id
          }
        });

        if (res) {
          if (res.data.deleteUnit.ok) {
            this.unit_list.splice(this.editedIndex, 1);
            this.toastMsg = "Data has been Deleted";
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
      this.dialogAddEditUnit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.modbusTCP = false;
      this.modbusRTU = false;
      this.update = false;
      this.expired = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    dateChange(val) {
      this.editedItem.expired = Math.floor(new Date(val).getTime() / 1000);
    },
    ShowHideProtocol() {
      if (this.editedItem.protocol === "ModbusRTU") {
        this.modbusTCP = false;
        this.modbusRTU = true;
      } else {
        this.modbusTCP = true;
        this.modbusRTU = false;
      }
    },
    async updateData(item) {
      const newData = this.unit_list.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            name: item.name,
            location: item.location,
            latitude: item.latitude,
            longitude: item.longitude,
            expired: item.expired,
            description: item.description,
            protocol: item.protocol,
            port_rtu: item.port_rtu,
            port_tcp: item.port_tcp,
            baud_rate: item.baud_rate,
            data_bits: item.data_bits,
            parity: item.parity,
            stop_bits: item.stop_bits,
            host: item.host,
            id: item.id,
            serial_port: item.serial_port
          };
        }
        return i;
      });

      this.unit_list = newData;
    },

    async saveData(item) {
      this.unit_list.push({
        name: item.name,
        location: item.location,
        latitude: item.latitude,
        longitude: item.longitude,
        expired: item.expired,
        description: item.description,
        protocol: item.protocol,
        port_rtu: item.port_rtu,
        port_tcp: item.port_tcp,
        baud_rate: item.baud_rate,
        data_bits: item.data_bits,
        parity: item.parity,
        stop_bits: item.stop_bits,
        host: item.host,
        id: item.id,
        serial_port: item.serial_port
      });
    }
  }
};
</script>
