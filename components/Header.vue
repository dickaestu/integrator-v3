<template>
  <section class="v-application" id="header">
    <v-app-bar dark dense>
      <img :src="logo" :alt="logo" class="logo" />

      <v-spacer></v-spacer>

      <span class="musa_grey mr-4">powered by</span>
      <img class="power-musa" :src="musa" :alt="musa" />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
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
    musa: require("~/assets/images/musa.png")
  })
};
</script>
