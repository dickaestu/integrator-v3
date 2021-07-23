<template>
  <section class="v-application" id="header">
    <v-app-bar dark dense>
      <img :src="logo" :alt="logo" class="logo" />
      <v-spacer></v-spacer>
      <span class="musa_grey mr-4 d-none d-sm-none d-md-flex">powered by</span>
      <img
        class="power-musa mr-8 d-none d-sm-none d-md-flex"
        :src="musa"
        :alt="musa"
      />
      <v-menu offset-y left bottom>
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="btn-transparent" v-bind="attrs" dark v-on="on">
            <v-avatar class="mr-3" size="36px">
              <!-- <img :src="user" :alt="user" /> -->
              <v-icon>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            paksiyudha
            <v-icon dark right>
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title>
              My Account
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title @click="logout()">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </section>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    logo: require("~/assets/images/logo.png"),
    user: require("~/assets/images/user.jpg"),
    musa: require("~/assets/images/musa-white.png")
  }),
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.replace("/login");
      console.log("keluar sekarang", this.logout());
    }
  }
};
</script>
