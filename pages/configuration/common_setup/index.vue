<template>
  <v-app>
    <section id="config_common_setup">
      <Header />
      <Menu />
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <v-navigation-drawer
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
              </v-navigation-drawer>
              <v-content class="menu-right">
                <v-container class="px-4 py-0 fill-height" fluid>
                  <v-row class="fill-height">
                    <v-col>
                      <h3>
                        <v-app-bar-nav-icon
                          @click.stop="sidebarMenu = !sidebarMenu"
                        ></v-app-bar-nav-icon>
                        Common Setup
                      </h3>
                      <v-row class="mt-4 mb-4">
                        <ConfigGeneralDevice />
                        <ConfigGeneralConnection />
                        <ConfigGeneralInterval />
                        <v-col cols="12">
                          <v-row class="mt-15">
                            <v-col cols="12">
                              <v-btn class="mr-5 save"> SAVE </v-btn>
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
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "common_setup",
  data: () => ({
    sidebarMenu: false
  })
};
</script>
