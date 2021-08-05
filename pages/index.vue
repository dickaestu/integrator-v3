<template>
  <section>
    <Header />
    <Menu title="Home" />
    <!-- <ContentOne /> -->
    <Homepage />
  </section>
</template>

<script>
import Menu from '../components/Menu.vue'

export default {
  name: "Home",
  components: {
    Menu
  },
  middleware: "auth",
  data: () => ({})
};
</script>

<style lang="scss" src="~/assets/css/style.scss"></style>
