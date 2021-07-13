<template>
  <v-app>
    <section id="content-one">
      <v-container>
        <v-row class="mb-5 hover_card">
          <div class="pa-3 w-25">
            <HomeLog />
          </div>
          <div class="pa-3 w-75">
            <HomeChart />
          </div>
        </v-row>
        <HomeUnit />
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "Homepage",
  middleware: "auth",
  data: () => ({})
};
</script>
