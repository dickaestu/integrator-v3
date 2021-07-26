<template>
  <section>
    <Header />
    <Menu />
    <!-- <ContentOne /> -->
    <Homepage />
  </section>
</template>

<script>
export default {
  name: "Home",
  middleware: "auth",
  data: () => ({})
};
</script>

<style lang="scss" src="~/assets/css/style.scss"></style>
