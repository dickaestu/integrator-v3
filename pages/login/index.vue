<template>
  <section id="login">
    <div class="jumbotron">
      <img :src="bg" :alt="bg" />
      <div class="centered">
        <v-form>
          <v-card>
            <v-row>
              <v-col cols="12">
                <v-img
                  max-height="150"
                  max-width="250"
                  :src="logo"
                  :alt="logo"
                  class="logo"
                ></v-img>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  placeholder="Username"
                  solo
                  hide-details="auto"
                  value=""
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  placeholder="Password"
                  solo
                  hide-details="auto"
                  value=""
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  @click:append="show3 = !show3"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-btn class="btn" depressed raised rounded text>Login</v-btn>
              </v-col>
              <v-col cols="12">
                <a href="#" class="musa_green_light_text">Forgot Password?</a>
              </v-col>
              <v-col cols="12" class="musa_green_light_text">
                <span>Question & Documentations:</span>
                <br />
                <a href="#" class="musa_green_dark_text">www.musagreen.com</a>
              </v-col>
              <v-col cols="12">
                <span class="musa_grey">powered by</span>
                <img class="power-musa" :src="musa" :alt="musa" />
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
  name: "Login",
  data: () => ({
    show2: true,
    show3: false,
    password: "Password",
    bg: require("~/assets/images/bg-login.jpg"),
    logo: require("~/assets/images/logo.png"),
    musa: require("~/assets/images/musa.png")
  })
};
</script>

<style>
body {
  overflow-x: hidden;
}
</style>
