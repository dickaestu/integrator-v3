<template>
  <section class="v-application" id="menu">
    <v-container>
      <v-row class="my-5">
        <v-col class="text-right">
          <router-link to="/" class="mr-5">
            <v-btn class="btn" dark>
              <v-icon dark left>
                mdi-home
              </v-icon>
              HOME
            </v-btn>
          </router-link>
          <router-link to="/" class="mr-5">
            <v-btn class="btn" dark>
              <v-icon dark left>
                mdi-format-list-bulleted
              </v-icon>
              LOGS
            </v-btn>
          </router-link>
          <router-link to="/" class="mr-5">
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
  </section>
</template>

<script>
export default {
  name: "MenuConf",
  data: () => ({})
};
</script>
