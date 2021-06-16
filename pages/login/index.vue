<template>
  <section id="login">
    <div class="jumbotron">
      <img :src="bg" :alt="bg" />
      <div class="centered">
        <Notification :message="error" v-if="error"/>
        <v-form method="POST" @submit.prevent="login">
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
                  placeholder="Email"
                  solo
                  hide-details="auto"
                  name="email"
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
                  name="password"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  @click:append="show3 = !show3"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-btn class="btn" type="submit" depressed raised rounded text>Login</v-btn>
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
import Notification from '~/components/Notification'

export default {
  name: "Login",
  components: {
    Notification,
  },
  data: () => ({
    show2: true,
    show3: false,
    email: "",
    password: "",
    bg: require("~/assets/images/bg-login.jpg"),
    logo: require("~/assets/images/logo.png"),
    musa: require("~/assets/images/musa.png")
  }),
  watch: {},
  mounted() {},
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        window.console.log('test login with', this.$auth.loginWith)
        // window.console.log('test login user', this.$auth.user)
        // this.$router.push('/')
        this.$router.push(this.localePath('/'))
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
};
</script>

<style>
body {
  overflow-x: hidden;
}
</style>
