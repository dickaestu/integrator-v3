<template>
  <v-app>
    <section id="log">
      <Header />
      <Menu title="Logs" />
      <LogTable />
    </section>
  </v-app>
</template>

<script>
import Menu from '../../components/Menu.vue'

export default {
  name: "Log",
  components: {
    Menu
  },
  data: () => ({})
};
</script>
