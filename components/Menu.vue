<template>
  <section class="v-application" id="menu">
    <v-container class="d-none d-sm-none d-md-flex">
      <v-row class="my-5">
        <v-col cols="2">
          <h1>Home</h1>
        </v-col>
        <v-col class="text-right">
          <router-link to="/" class="mr-5">
            <v-btn class="btn" dark>
              <v-icon dark left>
                mdi-home
              </v-icon>
              HOME
            </v-btn>
          </router-link>
          <router-link to="/log" class="mr-5">
            <v-btn class="btn" dark>
              <v-icon dark left>
                mdi-format-list-bulleted
              </v-icon>
              LOGS
            </v-btn>
          </router-link>
          <router-link to="/configuration/user_management" class="mr-5">
            <v-btn class="btn" dark>
              <v-icon dark left>
                mdi-cog
              </v-icon>
              CONFIGURATION
            </v-btn>
          </router-link>
          <router-link to="/">
            <v-btn class="btn" dark>
              <v-icon dark left>
                mdi-folder
              </v-icon>
              SAVE FILES
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <v-bottom-navigation
      class="d-flex d-sm-flex d-md-none"
      :value="value"
      grow
      fixed
      color="#51a1b4"
    >
      <router-link to="/">
        <v-btn>
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/log">
        <v-btn>
          <span>Logs</span>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/configuration/user_management">
        <v-btn>
          <span>Configuration</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/">
        <v-btn>
          <span>Save Files</span>
          <v-icon>mdi-folder</v-icon>
        </v-btn>
      </router-link>
    </v-bottom-navigation>
  </section>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    value: 0
  })
};
</script>
