<template>
  <v-navigation-drawer
    class="menu-left"
    dark
    v-model="sideBar"
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
      <NuxtLink to="/configuration/common_setup" class="mb-7 link-route">
        <!-- <v-list-item link to="/configuration/common_setup" class="mb-7"> -->
        <v-list-item-content>
          <v-list-item-title>
            Common Setup
          </v-list-item-title>
        </v-list-item-content>
        <!-- </v-list-item> -->
      </NuxtLink>
      <v-list-item>
        <v-list-item-content>
          <h5>
            Device Configuration
          </h5>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <NuxtLink to="#error" class="link-route">
        <!-- <v-list-item link to="/"> -->
        <v-list-item-content>
          <v-list-item-title>
            Device List
          </v-list-item-title>
        </v-list-item-content>
        <!-- </v-list-item> -->
      </NuxtLink>
      <NuxtLink to="#error" class="link-route">
        <!-- <v-list-item link to="/" class="active"> -->
        <v-list-item-content>
          <v-list-item-title>
            Unit List
          </v-list-item-title>
        </v-list-item-content>
        <!-- </v-list-item> -->
      </NuxtLink>
      <NuxtLink to="#error" class="mb-7 link-route">
        <!-- <v-list-item link class="mb-7" to="/"> -->
        <v-list-item-content>
          <v-list-item-title>
            Device Calibration
          </v-list-item-title>
        </v-list-item-content>
        <!-- </v-list-item> -->
      </NuxtLink>
      <v-list-item>
        <v-list-item-content>
          <h5>
            User Configuration
          </h5>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <NuxtLink to="/configuration/user_management" class="link-route">
        <!-- <v-list-item link class="active" to="/configuration/user_management"> -->
        <v-list-item-content>
          <v-list-item-title>
            User Management
          </v-list-item-title>
        </v-list-item-content>
        <!-- </v-list-item> -->
      </NuxtLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideMenu",
  props: ["sideBar"],
  data: () => ({})
};
</script>
