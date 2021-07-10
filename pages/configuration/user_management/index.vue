<template>
  <v-app>
    <section id="user_management">
      <Header />
      <MenuHome />
      <v-container>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <v-navigation-drawer permanent width="100%">
                <v-row class="fill-height" no-gutters>
                  <v-navigation-drawer permanent dark class="menu-left">
                    <v-list dense nav>
                      <v-list-item>
                        <v-list-item-content>
                          <h5>
                            General Configuration
                          </h5>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item link class="mb-7">
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
                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title>
                            Device List
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title>
                            Unit List
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item link class="mb-7">
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
                      <v-list-item link class="active">
                        <v-list-item-content>
                          <v-list-item-title>
                            User Management
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-navigation-drawer>
                  <v-list class="grow">
                    <h3>User Management</h3>
                    <v-row class="mt-4 mb-4">
                      <v-col cols="4">
                        <v-text-field
                          solo
                          v-model="search"
                          prepend-inner-icon="mdi-magnify"
                          label="Search"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
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
                      <v-col offset="3">
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
                                      <label>Name</label>
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
                                      <label>Email</label>
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
                                      <label>Password</label>
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
                                      <label>Select Roles</label>
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
                                      <label>Position</label>
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
                                <v-btn text @click="save">
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
                              Deleting a user will permanently remove them from
                              the system.
                            </v-card-text>
                            <v-container fluid>
                              <v-row class="pb-5 my-auto mx-auto">
                                <v-col cols="6">
                                  <v-btn text @click="deleteItemConfirm"
                                    >Yes, DELETE USER</v-btn
                                  >
                                </v-col>
                                <v-col cols="6">
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
                      <template v-slot:[`item.notifications`]>
                        <v-icon small class="mr-2">
                          mdi-bell
                        </v-icon>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon small class="mr-2" v-bind="attrs" v-on="on">
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
                    <v-row class="pt-10 mb-5">
                      <v-col offset="8">
                        <v-dialog
                          content-class="roles_description"
                          v-model="dialogRoles"
                          max-width="800px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on">
                              SEE ROLES DESCRIPTION
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="text-h5">
                              Roles Description
                            </v-card-title>
                            <v-container>
                              <v-row>
                                <v-col cols="4">
                                  <v-card class="card-img my-8">
                                    <img :src="img_viewer" :alt="img_viewer" />
                                  </v-card>
                                  <v-btn class="btn__viewer mb-5">Viewer</v-btn>
                                  <v-card-text>
                                    View only
                                    <br />
                                    Change personal info
                                  </v-card-text>
                                </v-col>
                                <v-col cols="4">
                                  <v-card class="card-img my-8">
                                    <img :src="img_viewer" :alt="img_viewer" />
                                  </v-card>
                                  <v-btn class="btn__editor mb-5">Editor</v-btn>
                                  <v-card-text>
                                    Limited edit access<br />
                                    Change personal info<br />
                                    Add and edit user<br />
                                    Add and edit device<br />
                                    Add issue history<br />
                                    Add calibration history
                                  </v-card-text>
                                </v-col>
                                <v-col cols="4">
                                  <v-card class="card-img my-8">
                                    <img :src="img_viewer" :alt="img_viewer" />
                                  </v-card>
                                  <v-btn class="btn__admin mb-5">Admin</v-btn>
                                  <v-card-text>
                                    Full edit access<br />
                                    Change personal info<br />
                                    Add and edit user<br />
                                    Add and edit device<br />
                                    Edit user roles<br />
                                    Add issue history<br />
                                    Add aclibration History
                                  </v-card-text>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-row>
              </v-navigation-drawer>
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
  data: () => ({
    img_viewer: require("~/assets/images/img_viewer.png"),
    // img_editor: require("~/assets/images/img_editor.png"),
    // img_admin: require("~/assets/images/img_admin.png"),
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
      { text: "", value: "notifications", sortable: false },
      { text: "", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: null,
      email: null,
      roles: null,
      position: null,
      password: null,
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
    onMouseEnterGenerateBtn() {
      this.generateText = "";
    },
    onGenerate() {
      var randomstring = Math.random().toString(36).slice(-8);
      this.editedItem.password = randomstring
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
        try {
          this.loadingAddUser = true;
          const res = await this.$apollo.mutate({
            mutation: EDIT_USERS,
            variables: {
              userID: this.editedItem.id,
              user: {
                name: this.editedItem.name,
                email: this.editedItem.email,
                roles: this.editedItem.roles,
                notify: true,
                position: this.editedItem.position,
                password: false
              }
            }
          });

          if (res) {
            this.loadingAddUser = false;
            if (res.data.editUser.ok) {
              Object.assign(this.users[this.editedIndex], this.editedItem);
              this.toastMsgAddUser = "Data has been Edited";
              this.toast = true;
            }
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

          if (res) {
            this.loadingAddUser = false;
            if (res.data.addUser.ok) {
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
