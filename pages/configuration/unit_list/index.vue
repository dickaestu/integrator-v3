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
                                <v-dialog
                                  v-model="dialogAddEditUnit"
                                  max-width="500px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="btnBgColor"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon left>
                                        mdi-plus
                                      </v-icon>
                                      ADD Unit
                                    </v-btn>
                                  </template>
                                </v-dialog>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
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
                                          ref="editedItem.desc"
                                          v-model="editedItem.desc"
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
                                            fc78835c-ad79-41ad-8a4f-20a725ae012e
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
                                      Add New Unit
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
                                          <v-list-item @click="editItem(item)">
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-pencil
                                              </v-icon>
                                              Edit
                                            </v-list-item-title>
                                          </v-list-item>
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
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
          {{ toastMsgAddUser }}
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

export default {
  name: "unit_list",
  components: {
    SideMenu,
    Menu
  },
  data: () => ({
    // bell: false,
    expired: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    // expired: new Date().toISOString().substr(0, 10),
    dialogAddEditUnit: false,
    dialogSeeMore: false,
    dialogDelete: false,
    dialogRoles: false,
    dataDialogSeeMore: null,
    toastMsgAddUser: "",
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
      { text: "Modbus RTU", value: "rtu" },
      { text: "Modbus TCP", value: "tcp" }
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
      desc: null,
      protocol: null,
      port_rtu: null,
      port_tcp: null,
      baud_rate: null,
      data_bits: null,
      parity: null,
      stop_bits: null,
      host: null
    },
    defaultItem: {
      name: null,
      location: null,
      latitude: null,
      longitude: null,
      expired: null,
      desc: null,
      protocol: null,
      port_rtu: null,
      port_tcp: null,
      baud_rate: null,
      data_bits: null,
      parity: null,
      stop_bits: null,
      host: null
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
  },

  methods: {
    async getUnitList() {
      try {
        this.loadingGetUser = true;
        const res = await this.$store.dispatch(
          "configuration/unit_list/getUnitList"
        );

        this.loadingGetUser = false;
        if (res.units.length > 0) {
          res.units.map(unit => {
            this.unit_list.push({
              id: unit.id,
              name: unit.name,
              description: unit.description,
              location: unit.location,
              longitude: unit.longitude,
              latitude: unit.latitude,
              sensors: unit.sensors
            });
          });
        }
      } catch (err) {
        console.log(err);
        this.loadingGetUser = false;
        // this.searchResults = [];
      }
    },
    handleDialogSeeMore(params) {
      this.dialogSeeMore = true;
      this.dataDialogSeeMore = params;
    },
    editItem(item) {
      this.editedIndex = this.unit_list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddEditUnit = true;
    },
    deleteItem(item) {
      this.editedIndex = this.unit_list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        const res = await this.$apollo.mutate({
          mutation: DELETE_unit_list,
          variables: {
            userID: this.editedItem.id
          }
        });

        if (res) {
          if (res.data.deleteUser.ok) {
            this.unit_list.splice(this.editedIndex, 1);
            this.toastMsgAddUser = "Data has been Deleted";
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
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    dateChange(val) {
      console.log(val);
    },
    ShowHideProtocol() {
      if (this.editedItem.protocol === "rtu") {
        this.modbusTCP = false;
        this.modbusRTU = true;
      } else {
        this.modbusTCP = true;
        this.modbusRTU = false;
      }
    }
  }
};
</script>
