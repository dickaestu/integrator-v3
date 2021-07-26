<template>
  <section class="v-application" id="forgot">
    <div class="jumbotron">
      <img :src="bg" :alt="bg" />
      <div class="centered">
        <v-form>
          <v-card>
            <v-row>
              <v-col cols="12 text-left">
                <h1>Reset Password!</h1>
              </v-col>
              <v-col cols="12 text-left">
                <p>
                  Password successfully changed.
                </p>
              </v-col>
              <v-col
                cols="12"
                class="position-bottom d-flex align-end justify-space-between"
              >
                <a href="#" class="text-left musa_green_light_text"
                  >BACK TO LOGIN</a
                >
              </v-col>
            </v-row>
          </v-card>
        </v-form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Success",
  data: () => ({
    bg: require("~/assets/images/bg-login.jpg")
  })
};
</script>

<style>
/* body {
  overflow-x: hidden;
} */
</style>
