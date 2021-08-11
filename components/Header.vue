<template>
  <section class="v-application" id="header">
    <v-app-bar dark dense>
      <img :src="logo" :alt="logo" class="logo" />
      <v-spacer></v-spacer>
      <span class="musa_grey mr-4 d-none d-sm-none d-md-flex">powered by</span>
      <img
        class="power-musa mr-8 d-none d-sm-none d-md-flex"
        :src="musa"
        :alt="musa"
      />
      <v-menu offset-y left bottom>
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="btn-transparent" v-bind="attrs" dark v-on="on">
            <v-avatar class="mr-3" size="36px">
              <!-- <img :src="user" :alt="user" /> -->
              <v-icon>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            {{ dataUser !== null ? dataUser.name : 'loading' }}
            <v-icon dark right>
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title @click="dialogAccount = true">
              My Account
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title @click="logout()">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-dialog
      content-class="my-account"
      v-model="dialogAccount"
      max-width="800"
    >
      <v-card>
        <v-navigation-drawer
          class="menu-left"
          dark
          app
          floating
          absolute
          permanent
        >
          <v-list dense nav>
            <v-list-item>
              <v-list-item-content>
                <h5>
                  Settings
                </h5>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <NuxtLink class="mb-7 link-route" to="">
              <v-list-item-content>
                <v-list-item-title>
                  My Account
                </v-list-item-title>
              </v-list-item-content>
            </NuxtLink>
          </v-list>
        </v-navigation-drawer>
        <v-content class="menu-right">
          <v-container class="px-4 py-0 fill-height" fluid>
            <v-row class="fill-height">
              <v-col>
                <h3>
                  My Account
                </h3>
              </v-col>
              <v-col cols="12">
                <h4>Account Details</h4>
                <v-divider class="mt-2"></v-divider>
              </v-col>
              <v-col>
                <div class="d-flex justify-space-between">
                  <div class="left">
                    <p>Name</p>
                    <p>Email</p>
                    <p>Roles</p>
                    <p></p>
                  </div>
                  <div class="right">
                    <p>{{ dataUser !== null ? dataUser.name : 'loading' }}</p>
                    <p>{{ dataUser !== null ? dataUser.email : 'loading' }}</p>
                    <v-chip color="#386d7a" dark>
                      {{ dataUser !== null ? dataUser.roles : 'loading' }}
                    </v-chip>
                    <br />
                    <v-btn class="btnBgColor mt-10" @click="openChangePass()"
                      >Change Password</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </v-card>
    </v-dialog>
    <v-dialog
      content-class="my-account"
      v-model="dialogAccount2"
      max-width="800px"
    >
      <v-card>
        <v-navigation-drawer
          class="menu-left"
          dark
          app
          floating
          absolute
          permanent
        >
          <v-list dense nav>
            <v-list-item>
              <v-list-item-content>
                <h5>
                  Settings
                </h5>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <NuxtLink class="mb-7 link-route" to="">
              <v-list-item-content>
                <v-list-item-title>
                  My Account
                </v-list-item-title>
              </v-list-item-content>
            </NuxtLink>
          </v-list>
        </v-navigation-drawer>
        <v-content class="menu-right">
          <v-container class="px-4 py-0 fill-height" fluid>
            <v-row class="fill-height">
              <v-col>
                <h3>
                  My Account
                </h3>
              </v-col>
              <v-col cols="12">
                <h4>Change Password</h4>
                <v-divider class="mt-2"></v-divider>
              </v-col>
              <v-col cols="12">
                <p class="desc">
                  Your new password must be different from previous password
                </p>
              </v-col>
              <v-col cols="10">
                <label class="title-texfield">Enter Previous Password</label>
                <v-text-field
                  class="textfield_musa_outline"
                  v-model="oldPassword"
                  :type="show2 ? 'text' : 'password'"
                  value=""
                  required
                  outlined
                  hide-details="true"
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <label class="title-texfield">Enter New Password</label>
                <v-text-field
                  class="textfield_musa_outline"
                  v-model="newPassword"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <label class="title-texfield">Confirm New Password</label>
                <v-text-field
                  class="textfield_musa_outline"
                  v-model="confirmPassword"
                  :rules="[rules.required, rules.passMatch]"
                  :type="show2 ? 'text' : 'password'"
                  hint="Both passwords must match."
                  error
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="d-flex justify-end">
                <v-btn
                  class="btnBgColor mr-5"
                  :loading="loading"
                  :disabled="loading"
                  @click="doChangePassword()"
                >
                  Change Password
                </v-btn>
                <v-btn class="btnTransBgColor" @click="cancelPass()"
                  >Cancel</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </v-card>
    </v-dialog>
    <v-dialog
      content-class="my-account"
      v-model="dialogAccount3"
      max-width="800px"
    >
      <v-card>
        <v-navigation-drawer
          class="menu-left"
          dark
          app
          floating
          absolute
          permanent
        >
          <v-list dense nav>
            <v-list-item>
              <v-list-item-content>
                <h5>
                  Settings
                </h5>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <NuxtLink class="mb-7 link-route" to="">
              <v-list-item-content>
                <v-list-item-title>
                  My Account
                </v-list-item-title>
              </v-list-item-content>
            </NuxtLink>
          </v-list>
        </v-navigation-drawer>
        <v-content class="menu-right">
          <v-container class="px-4 py-0 fill-height" fluid>
            <v-row class="fill-height">
              <v-col>
                <h3>
                  My Account
                </h3>
              </v-col>
              <v-col cols="12">
                <h4>Change Password</h4>
                <v-divider class="mt-2"></v-divider>
              </v-col>
              <v-col>
                <p class="desc">
                  Your password has been changed successfully.
                </p>
              </v-col>
              <v-col cols="12">
                <!-- <NuxtLink to="/"> -->
                <v-btn class="btnBgColor" @click="returnAccount()"
                  >RETURN TO MY ACCOUNT</v-btn
                >
                <!-- </NuxtLink> -->
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="-1"
      :value="toast"
      color="blue-grey"
      fixed
      rounded="pill"
    >
      {{ toastMsgAddUser }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="toast = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    logo: require("~/assets/images/logo-white.svg"),
    user: require("~/assets/images/user.jpg"),
    musa: require("~/assets/images/musa-white.svg"),
    dataUser: null,
    dialogAccount: false,
    dialogAccount2: false,
    dialogAccount3: false,
    show2: false,
    password: "Password",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Must be at least 8 characters.",
      passMatch: () => `Your new password and it’s confirmation didn’t match.`
    },
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    toastMsgAddUser: "",
    toast: false
  }),
  mounted(){
    this.dataUser = {
      name: this.$auth.user.name,
      email: this.$auth.user.email,
      roles: this.$auth.user.roles
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.replace("/login");
    },
    openChangePass() {
      (this.dialogAccount2 = true), (this.dialogAccount = false);
    },
    cancelPass() {
      (this.dialogAccount = true), (this.dialogAccount2 = false);
    },
    returnAccount() {
      (this.dialogAccount = true), (this.dialogAccount2 = false);
      this.dialogAccount3 = false;
    },
    async doChangePassword() {
      try {
        this.loading = true;
        const res = await this.$store.dispatch("changePassword/setPassword", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        // console.log(res)
        if (res.check === "fail") {
          this.toastMsgAddUser = "Something went wrong";
          this.toast = true;
          this.loading = false;
        } else {
          this.toastMsgAddUser = "Data has been Saved";
          this.toast = true;
          this.loading = false;
          this.dialogAccount3 = true;
        }
      } catch (error) {}
    }
  }
};
</script>
