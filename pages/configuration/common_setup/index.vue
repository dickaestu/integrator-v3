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
                          <h5>General Configuration</h5>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item link class="mb-7 active">
                        <v-list-item-content>
                          <v-list-item-title> Common Setup </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <h5>Device Configuration</h5>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title> Device List </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title> Unit List </v-list-item-title>
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
                          <h5>User Configuration</h5>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
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
                          v-model="selectedFruits"
                          :items="fruits"
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
                                    selectedFruits.length > 0
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
                          hide-details="auto"
                          label="120"
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="mt-15">
                      <v-col offset="8">
                        <v-btn class="mr-5 save"> SAVE </v-btn>
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
    fruits: ["Apples", "Apricots", "Avocado"],
    selectedFruits: []
  }),
  computed: {
    likesAllFruit() {
      return this.selectedFruits.length === this.fruits.length;
    },
    likesSomeFruit() {
      return this.selectedFruits.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.fruits.slice();
        }
      });
    }
  }
};
</script>
