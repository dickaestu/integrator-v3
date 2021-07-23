<template>
  <v-app>
    <section id="user_management">
      <Header />
      <Menu />
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <!-- <v-navigation-drawer
                class="menu-left"
                dark
                v-model="sidebarMenu"
                app
                floating
                absolute
                :permanent="$vuetify.breakpoint.mdAndUp"
              >
                <v-list dense nav>
                  <v-list-item>
                    <v-list-item-content>
                      <h5>
                        General Configuration
                      </h5>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    link
                    to="/configuration/common_setup"
                    class="mb-7"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        Common Setup
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <h5>
                        Device Configuration
                      </h5>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item link to="/">
                    <v-list-item-content>
                      <v-list-item-title>
                        Device List
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item link to="/">
                    <v-list-item-content>
                      <v-list-item-title>
                        Unit List
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item link class="mb-7" to="/">
                    <v-list-item-content>
                      <v-list-item-title>
                        Device Calibration
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <h5>
                        User Configuration
                      </h5>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    link
                    class="active"
                    to="/configuration/user_management"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        User Management
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer> -->
              <SideMenu :sideBar="sidebarMenu" />
              <v-content class="menu-right">
                <v-container class="px-4 py-0 fill-height" fluid>
                  <v-row class="fill-height">
                    <v-col>
                      <h3>
                        <v-app-bar-nav-icon
                          class="d-inline-block d-sm-print-inline-block d-md-none"
                          @click.stop="sidebarMenu = !sidebarMenu"
                        ></v-app-bar-nav-icon>
                        User Management
                      </h3>
                      <v-row class="mt-4 mb-4">
                        <v-col md="4" lg="4" sm="6">
                          <v-text-field
                            solo
                            v-model="search"
                            prepend-inner-icon="mdi-magnify"
                            label="Search"
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col md="3" lg="2" sm="6">
                          <v-select
                            class="radius"
                            hide-details
                            v-model="selectedFilters"
                            :items="filters"
                            prepend-inner-icon="mdi-filter"
                            multiple
                            label="Filter"
                            solo
                          >
                            <template v-slot:prepend-item>
                              <v-list-item ripple @click="toggle">
                                <v-list-item-action>
                                  <v-icon
                                    :color="
                                      selectedFilters.length > 0
                                        ? 'indigo darken-4'
                                        : ''
                                    "
                                  >
                                    {{ icon }}
                                  </v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Select All
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-divider class="mt-2"></v-divider>
                            </template>
                            <template v-slot:selection="{ index }">
                              <span v-if="index === 0">Filter</span>
                            </template>
                          </v-select>
                        </v-col>
                        <v-col cols="12" lg="2" offset-lg="4">
                          <template>
                            <v-dialog v-model="dialog" max-width="500px">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on">
                                  <v-icon left dark>
                                    mdi-plus
                                  </v-icon>
                                  ADD USER
                                </v-btn>
                              </template>
                            </v-dialog>
                          </template>
                        </v-col>
                      </v-row>
                      <v-data-table
                        mobile-breakpoint="0"
                        :headers="headers"
                        :items="users"
                        :search="search"
                        hide-default-footer
                        item-key="name"
                      >
                        <template v-slot:top>
                          <v-dialog
                            content-class="edit_user_dialog"
                            v-model="dialog"
                            persistent
                            max-width="500px"
                          >
                            <v-form method="POST" @submit.prevent="save">
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12">
                                        <label class="title_field">Name</label>
                                        <v-text-field
                                          ref="editedItem.name"
                                          class="form_edit"
                                          v-model="editedItem.name"
                                          label="Name"
                                          solo
                                          hide-details="auto"
                                          placeholder="Name"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field">Email</label>
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Email"
                                          solo
                                          hide-details="auto"
                                          placeholder="Email"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Password</label
                                        >
                                        <v-text-field
                                          v-model="editedItem.password"
                                          class="form_edit"
                                          label="Password"
                                          solo
                                          hide-details="auto"
                                          placeholder="Password"
                                          required
                                          append-icon="mdi-autorenew"
                                          @click:append="onGenerate"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Select Roles</label
                                        >
                                        <v-select
                                          ref="editedItem.roles"
                                          class="form_edit_select"
                                          v-model="editedItem.roles"
                                          :items="roles"
                                          label="Select Roles"
                                          solo
                                          hide-details="auto"
                                        ></v-select>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Position</label
                                        >
                                        <v-text-field
                                          ref="editedItem.positions"
                                          class="form_edit"
                                          v-model="editedItem.position"
                                          label="Position"
                                          solo
                                          hide-details="auto"
                                          placeholder="Position"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn text @click="close">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    @click="save"
                                    :loading="loadingAddUser"
                                    :disabled="loadingAddUser"
                                  >
                                    Save
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-form>
                          </v-dialog>
                          <v-dialog
                            content-class="delete_user_dialog"
                            persistent
                            v-model="dialogDelete"
                            max-width="500px"
                          >
                            <v-card>
                              <v-card-title class="text-h5"
                                >Delete User?</v-card-title
                              >
                              <v-card-text>
                                Deleting a user will permanently remove them
                                from the system.
                              </v-card-text>
                              <v-container fluid>
                                <v-row class="pb-5 my-auto mx-auto">
                                  <v-col cols="12" sm="6">
                                    <v-btn text @click="deleteItemConfirm"
                                      >Yes, DELETE USER</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-btn
                                      class="cancel_delete"
                                      text
                                      @click="closeDelete"
                                      >NO, KEEP USER</v-btn
                                    >
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card>
                          </v-dialog>
                        </template>
                        <template v-slot:[`item.notify`]="{ item }">
                          <span class="notify" @click="toggleBell">
                            <v-icon
                              class="mr-2 musa_green_light_text"
                              small
                              v-if="item.notify"
                              >mdi-bell</v-icon
                            >
                            <v-icon class="mr-2" small v-else
                              >mdi-bell-off</v-icon
                            >
                          </span>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-menu>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                small
                                class="mr-2"
                                v-bind="attrs"
                                v-on="on"
                              >
                                mdi-dots-horizontal
                              </v-icon>
                            </template>
                            <v-list class="py-0">
                              <v-list-item @click="editItem(item)">
                                <v-list-item-title>
                                  <v-icon small class="mr-1">
                                    mdi-pencil
                                  </v-icon>
                                  Edit
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="deleteItem(item)">
                                <v-list-item-title>
                                  <v-icon small class="mr-1">
                                    mdi-delete
                                  </v-icon>
                                  Delete
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </template>
                        <template v-slot:no-data>
                          <v-btn color="primary" @click="users">
                            Reset
                          </v-btn>
                        </template>
                        <template v-slot:[`item.roles`]="{ item }">
                          <v-chip :color="getColor(item.roles)" dark>
                            {{ item.roles }}
                          </v-chip>
                        </template>
                      </v-data-table>
                      <ConfigUserRole />
                    </v-col>
                  </v-row>
                </v-container>
              </v-content>
            </v-card>
          </v-col>
        </v-row>
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
      </v-container>
    </section>
  </v-app>
</template>

<script>
import gql from "graphql-tag";
import SideMenu from "../../../components/config/SideMenu.vue";

const GET_USERS = gql`
  query users($emails: [String!]) {
    users(emails: $emails) {
      id
      name
      email
      roles
      position
      notify
    }
  }
`;
const ADD_USERS = gql`
  mutation addUser($user: InputUser!, $password: String!) {
    addUser(user: $user, password: $password) {
      ok
    }
  }
`;

const EDIT_USERS = gql`
  mutation editUser($userID: ID!, $user: InputUser!) {
    editUser(userID: $userID, user: $user) {
      ok
    }
  }
`;

const DELETE_USERS = gql`
  mutation deleteUser($userID: ID!) {
    deleteUser(userID: $userID) {
      ok
    }
  }
`;

export default {
  name: "user_management",
  components: {
    SideMenu
  },
  data: () => ({
    sidebarMenu: false,
    img_viewer: require("~/assets/images/img_viewer.png"),
    // img_editor: require("~/assets/images/img_editor.png"),
    // img_admin: require("~/assets/images/img_admin.png"),
    // bell: false,
    dialog: false,
    dialogDelete: false,
    dialogRoles: false,
    toastMsgAddUser: "",
    toast: false,
    errorMessages: "",
    search: "",
    characters: {
      value: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      checked: true
    },
    password: "",
    generateText: "",
    gLength: 6,
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" }
    ],
    roles: ["Admin", "Editor", "Viewer"],
    links: ["Home", "Contacts", "Settings"],
    filters: ["Admin", "Editor", "Viewer"],
    selectedFilters: [],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Email", value: "email" },
      { text: "Roles", value: "roles" },
      { text: "Position", value: "position" },
      { text: "", value: "notify", sortable: false },
      { text: "", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: null,
      email: null,
      roles: null,
      position: null,
      password: null
    },
    defaultItem: {
      name: null,
      email: null,
      roles: null,
      position: null
    },
    loadingAddUser: false,
    loadingGetUser: false
  }),

  computed: {
    // mini() {
    //   return this.$vuetify.breakpoint.smAndDown;
    // },
    formTitle() {
      return this.editedIndex === -1 ? "Add New User" : "Edit User";
    },
    likesAllFilter() {
      return this.selectedFilters.length === this.filters.length;
    },
    likesSomeFilter() {
      return this.selectedFilters.length > 0 && !this.likesAllFilter;
    },
    icon() {
      if (this.likesAllFilter) return "mdi-close-box";
      if (this.likesSomeFilter) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    name() {
      this.errorMessages = "";
    }
  },

  created() {
    this.getUsers();
  },

  methods: {
    toggleBell() {
      this.bell = !this.bell;
    },
    onMouseEnterGenerateBtn() {
      this.generateText = "";
    },
    onGenerate() {
      var randomstring = Math.random()
        .toString(36)
        .slice(-8);
      this.editedItem.password = randomstring;
      console.log("test password 1", randomstring);
    },
    async getUsers() {
      try {
        this.loadingGetUser = true;
        const res = await this.$apollo.query({
          query: GET_USERS,
          variables: {
            emails: []
          }
        });

        if (res) {
          console.log(res.data.users);
          this.loadingGetUser = false;
          if (res.data.users.length > 0) {
            res.data.users.map(user => {
              this.users.push({
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
                position: user.position,
                password: user.password,
                notify: user.notify
              });
            });
          }
        }
      } catch (err) {
        console.log(err);
        this.loadingGetUser = false;
        // this.searchResults = [];
      }
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFilter) {
          this.selectedFilters = [];
        } else {
          this.selectedFilters = this.filters.slice();
        }
      });
    },
    getColor(roles) {
      if (roles == "Admin") return "#386D7A";
      else if (roles == "Editor") return "#4593BF";
      else return "#71C7DC";
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        const res = await this.$apollo.mutate({
          mutation: DELETE_USERS,
          variables: {
            userID: this.editedItem.id
          }
        });

        if (res) {
          if (res.data.deleteUser.ok) {
            this.users.splice(this.editedIndex, 1);
            this.toastMsgAddUser = "Data has been Deleted";
            this.toast = true;
          }
        }
      } catch (err) {
        console.log(err);
        // this.searchResults = [];
      }
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      if (this.editedIndex > -1) {
        let param = null;

        if (this.editedItem.password !== null) {
          param = {
            userID: this.editedItem.id,
            user: {
              name: this.editedItem.name,
              email: this.editedItem.email,
              roles: this.editedItem.roles,
              notify: true,
              position: this.editedItem.position,
              password: this.editedItem.password
            }
          };
        } else {
          param = {
            userID: this.editedItem.id,
            user: {
              name: this.editedItem.name,
              email: this.editedItem.email,
              roles: this.editedItem.roles,
              notify: true,
              position: this.editedItem.position
            }
          };
        }

        try {
          this.loadingAddUser = true;
          const res = await this.$apollo.mutate({
            mutation: EDIT_USERS,
            variables: param
          });

          if (res.data.editUser.ok) {
            this.loadingAddUser = false;
            Object.assign(this.users[this.editedIndex], this.editedItem);
            this.toastMsgAddUser = "Data has been Edited";
            this.toast = true;
          }
        } catch (err) {
          console.log(err);
          this.loadingAddUser = false;
          // this.searchResults = [];
        }
      } else {
        try {
          this.loadingAddUser = true;
          const res = await this.$apollo.mutate({
            mutation: ADD_USERS,
            variables: {
              user: {
                name: this.editedItem.name,
                email: this.editedItem.email,
                roles: this.editedItem.roles,
                notify: true,
                position: this.editedItem.position
              },
              password: this.editedItem.password
            }
          });

          if (res.data.addUser.ok) {
            this.loadingAddUser = false;
            this.users.push({
              name: this.editedItem.name,
              email: this.editedItem.email,
              roles: this.editedItem.roles,
              position: this.editedItem.position,
              password: this.editedItem.password
            });
            this.toastMsgAddUser = "Success To Save";
            this.toast = true;
          }
        } catch (err) {
          console.log(err);
          this.loadingAddUser = false;
          // this.searchResults = [];
        }
      }
      this.close();
    }
  }
};
</script>
