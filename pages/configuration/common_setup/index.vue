<template>
  <v-app>
    <section id="config_common_setup">
      <Header />
      <Menu />
      <v-container :fluid="$vuetify.breakpoint.mdAndDown">
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <SideMenu :sideBar="sidebarMenu" />
              <!-- <v-navigation-drawer
                class="menu-left"
                dark
                v-model="sidebarMenu"
                app
                floating
                absolute
                :permanent="$vuetify.breakpoint.mdAndUp"
              >
                <v-list dense nav>
                  <v-list-item>
                    <v-list-item-content>
                      <h5>
                        General Configuration
                      </h5>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    link
                    to="/configuration/common_setup"
                    class="mb-7 active"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        Common Setup
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <h5>
                        Device Configuration
                      </h5>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item link to="/">
                    <v-list-item-content>
                      <v-list-item-title>
                        Device List
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item link to="/">
                    <v-list-item-content>
                      <v-list-item-title>
                        Unit List
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item link class="mb-7" to="/">
                    <v-list-item-content>
                      <v-list-item-title>
                        Device Calibration
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <h5>
                        User Configuration
                      </h5>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item link to="/configuration/user_management">
                    <v-list-item-content>
                      <v-list-item-title>
                        User Management
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer> -->
              <v-content class="menu-right">
                <v-container class="px-4 py-0 fill-height" fluid>
                  <v-row class="fill-height">
                    <v-col>
                      <h3>
                        <v-app-bar-nav-icon
                          class="d-inline-block d-sm-print-inline-block d-md-none"
                          @click.stop="sidebarMenu = !sidebarMenu"
                        ></v-app-bar-nav-icon>
                        Common Setup
                      </h3>
                      <v-row class="mt-4 mb-4">
                        <v-col cols="12">
                          <v-row>
                            <v-col
                              xl="3"
                              lg="3"
                              md="4"
                              sm="3"
                              cols="12"
                              class="title pb-0 pb-sm-3"
                              >Device UID</v-col
                            >
                            <v-col cols="12" sm="8">
                              <v-text-field
                                solo
                                readonly
                                hide-details="auto"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col
                              xl="3"
                              lg="3"
                              md="4"
                              sm="3"
                              cols="12"
                              class="title pb-0 pb-sm-3"
                              >Connection Setup</v-col
                            >
                            <v-col cols="12" sm="8">
                              <v-select
                                class="common_device"
                                v-model="selectedConnectionDevice"
                                :items="connectionDevice"
                                placeholder="Select Connection Setup"
                                multiple
                                hide-details="auto"
                                chips
                              >
                                <template v-slot:prepend-item>
                                  <v-list-item ripple @click="toggle">
                                    <v-list-item-action>
                                      <v-icon
                                        :color="
                                          selectedConnectionDevice.length > 0
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
                              </v-select>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col
                              xl="3"
                              lg="3"
                              md="4"
                              sm="3"
                              cols="12"
                              class="title pb-0 pb-sm-3"
                              >Data Interval</v-col
                            >
                            <v-col cols="12" sm="8">
                              <v-text-field
                                v-model="interval"
                                hide-details="auto"
                                label="120"
                                solo
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <!-- <ConfigGeneralDevice /> -->
                        <!-- <ConfigGeneralConnection /> -->
                        <!-- <ConfigGeneralInterval /> -->
                        <v-col cols="12">
                          <v-row class="mt-5">
                            <v-col cols="12">
                              <v-btn
                                class="mr-5 save"
                                @click="save"
                                :loading="loading"
                                :disabled="loading"
                                >SAVE</v-btn
                              >
                              <v-btn> CANCEL </v-btn>
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
export default {
  name: "common_setup",
  components: {
    SideMenu
  },
  data: () => ({
    sidebarMenu: false,
    connectionDevice: ["Device", "KLHK API", "MUSA Cloud"],
    selectedConnectionDevice: [],
    interval: "",
    allowMeasurement: false,
    allowEndpoint: false,
    allowCloud: false,
    loading: false,
    toastMsgAddUser: "",
    toast: false
  }),
  computed: {
    likesAllFruit() {
      return (
        this.selectedConnectionDevice.length === this.connectionDevice.length
      );
    },
    likesSomeFruit() {
      return this.selectedConnectionDevice.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },
  mounted() {
    this.getConnectionDevice();
    this.getInterval();
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedConnectionDevice = [];
        } else {
          this.selectedConnectionDevice = this.connectionDevice.slice();
        }
      });
    },
    async getConnectionDevice() {
      try {
        const res = await this.$store.dispatch(
          "configuration/common_setup/common_setup/getMeasurementDevice"
        );
        if (res.data.measurementToggle.allowMeasurement) {
          this.selectedConnectionDevice.push("Device");
        }
        if (res.data.measurementToggle.allowEndpoint) {
          this.selectedConnectionDevice.push("KLHK API");
        }
        if (res.data.measurementToggle.allowCloud) {
          this.selectedConnectionDevice.push("MUSA Cloud");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getInterval() {
      try {
        const res = await this.$store.dispatch(
          "configuration/common_setup/common_setup/getCommonSetup"
        );
        this.interval = res.data.commonSetup.interval;
      } catch (error) {
        console.log(error);
      }
    },
    async save() {
      try {
        this.loading = true;
        this.allowMeasurement = this.selectedConnectionDevice.includes(
          "Device"
        );
        this.allowEndpoint = this.selectedConnectionDevice.includes("KLHK API");
        this.allowCloud = this.selectedConnectionDevice.includes("MUSA Cloud");

        const toggle = {
          allowMeasurement: this.allowMeasurement,
          allowEndpoint: this.allowEndpoint,
          allowCloud: this.allowCloud
        };
        const res = await this.$store.dispatch(
          "configuration/common_setup/common_setup/saveCommonSetup",
          {
            interval: this.interval,
            connectionDevice: toggle
          }
        );
        if (res.data.setCommonSetup.ok) {
          this.toastMsgAddUser = "Data has been Saved";
          this.toast = true;
          this.loading = false;
        } else {
          this.toastMsgAddUser = "Something went wrong";
          this.toast = true;
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>
