<template>
  <section class="v-application" id="forgot">
    <div class="jumbotron">
      <img :src="bg" :alt="bg" />
      <div class="centered">
        <v-form>
          <v-card>
            <v-row>
              <v-col cols="12 text-left">
                <h1>Forgot Password</h1>
              </v-col>
              <v-col cols="12 text-left">
                <p>
                  Send a link to your email to reset your password.
                </p>
              </v-col>
              <v-col cols="12 text-left">
                <label for="email">Email</label>
                <v-text-field
                  id="email"
                  solo
                  hide-details="auto"
                  value=""
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                class="position-bottom d-flex align-end justify-space-between"
              >
                <a href="#" class="text-left musa_green_light_text"
                  >BACK TO LOGIN</a
                >
                <v-btn
                  type="submit"
                  class="btn text-right"
                  depressed
                  raised
                  rounded
                  text
                  >Send Link</v-btn
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
  name: "Forgot",
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
