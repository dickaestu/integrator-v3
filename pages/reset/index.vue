<template>
  <section class="v-application" id="reset">
    <div class="jumbotron">
      <img :src="bg" :alt="bg" />
      <div class="centered">
        <v-form>
          <v-card>
            <v-row>
              <v-col cols="12 text-left">
                <h1>Reset Password</h1>
              </v-col>
              <v-col cols="12 text-left">
                <p>
                  Enter your new password.
                </p>
              </v-col>
              <v-col cols="12 text-left">
                <label for="password">Password</label>
                <v-text-field
                  id="password"
                  solo
                  hide-details="auto"
                  value=""
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-col>
              <v-col cols="12 text-left">
                <label for="confirm-password">Confirm Password</label>
                <v-text-field
                  id="confirm-password"
                  solo
                  hide-details="auto"
                  value=""
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  @click:append="show3 = !show3"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn type="submit" class="btn" depressed raised rounded text
                  >Change Password</v-btn
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
  name: "Reset",
  data: () => ({
    show2: false,
    show3: false,
    password: "Password",
    bg: require("~/assets/images/bg-login.jpg")
  })
};
</script>

<style>
/* body {
  overflow-x: hidden;
} */
</style>
