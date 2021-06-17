<template>
  <section>
    <Header />
    <MenuHome />
    <ContentOne />
  </section>
</template>

<script>
export default {
  name: "Home",
  middleware: 'auth',
  data: () => ({})
};
</script>

<style lang="scss" src="~/assets/css/style.scss"></style>
