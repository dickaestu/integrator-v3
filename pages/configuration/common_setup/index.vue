<template>
  <v-app>
    <section id="config_common_setup">
      <Header />
      <MenuHome />
      <v-container>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <v-navigation-drawer permanent width="100%">
                <v-row class="fill-height" no-gutters>
                  <v-navigation-drawer permanent dark class="menu-left">
                    <v-list dense nav>
                      <v-list-item>
                        <v-list-item-content>
                          <h5>
                            General Configuration
                          </h5>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item link class="mb-7 active" to="/configuration/common_setup">
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
                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title>
                            Device List
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title>
                            Unit List
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item link class="mb-7">
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
                  </v-navigation-drawer>
                  <v-list class="grow">
                    <v-row class="mb-4">
                      <v-col cols="12">
                        <h3>Common Setup</h3>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3" class="title">Device UID</v-col>
                      <v-col cols="8">
                        <v-text-field
                          solo
                          readonly
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3" class="title">Connection Setup</v-col>
                      <v-col cols="8">
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
                    <v-row>
                      <v-col cols="3" class="title">Data Interval</v-col>
                      <v-col cols="8">
                        <v-text-field
                          v-model="interval"
                          hide-details="auto"
                          label="120"
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="mt-15">
                      <v-col offset="8">
                        <v-btn class="mr-5 save" @click="save"> SAVE </v-btn>
                        <v-btn> CANCEL </v-btn>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-row>
              </v-navigation-drawer>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "common_setup",
  data: () => ({
    connectionDevice: ["Device", "KLHK API", "MUSA Cloud"],
    selectedConnectionDevice: [],
    interval: "",
    allowMeasurement: false,
    allowEndpoint: false,
    allowCloud: false
  }),
  computed: {
    likesAllFruit() {
      return this.selectedConnectionDevice.length === this.connectionDevice.length;
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
    async getConnectionDevice(){
      try {
        const res = await this.$store.dispatch('configuration/common_setup/common_setup/getMeasurementDevice')
        if (res.data.measurementToggle.allowMeasurement) {
          this.selectedConnectionDevice.push('Device')
        }
        if (res.data.measurementToggle.allowEndpoint) {
          this.selectedConnectionDevice.push('KLHK API')
        }
        if (res.data.measurementToggle.allowCloud) {
          this.selectedConnectionDevice.push('MUSA Cloud')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getInterval(){
      try {
        const res = await this.$store.dispatch('configuration/common_setup/common_setup/getCommonSetup')
        this.interval = res.data.commonSetup.interval
      } catch (error) {
        console.log(error)
      }
    },
    async save(){
      try {

        this.allowMeasurement = this.selectedConnectionDevice.includes('Device')
        this.allowEndpoint = this.selectedConnectionDevice.includes('KLHK API')
        this.allowCloud = this.selectedConnectionDevice.includes('MUSA Cloud')

        const toggle = {
          'allowMeasurement' : this.allowMeasurement,
          'allowEndpoint' : this.allowEndpoint,
          'allowCloud' : this.allowCloud
        }
        const res = await this.$store.dispatch(
          'configuration/common_setup/common_setup/saveCommonSetup',
          {
            interval : this.interval,
            connectionDevice : toggle
          }
        )
        console.log(res)
      } catch (error) {
        
      }
    }
  }
};
</script>
