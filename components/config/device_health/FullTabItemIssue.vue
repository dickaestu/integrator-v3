<template>
  <v-dialog
    content-class="edit_user_dialog"
    v-model="dialogFullTableIssue"
    max-width="80%"
  >
    <v-card min-height="90vh">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <h1>
              <v-icon @click="close"> mdi-chevron-left </v-icon>Issue History
            </h1>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between">
              <div class="left px-3 px-sm-0">
                <v-select
                  ref="editedItem.unit"
                  class="form_edit_select"
                  v-model="editedItem.unit"
                  :items="status"
                  label="Select Status"
                  solo
                  hide-details="auto"
                  @change="handleChangeUnit()"
                ></v-select>
              </div>
              <div class="right px-3 px-sm-0">
                <v-menu
                  content-class="date_single_range"
                  ref="menu"
                  v-model="menuIssueDate"
                  :close-on-content-click="false"
                  :return-value.sync="issueDate"
                  transition="scale-transition"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="form_edit single_date"
                      v-model="issueDate"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details="auto"
                      outlined
                      append-icon="mdi-menu-down"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="issueDate"
                    @change="dateChange(issueDate)"
                    no-title
                    scrollable
                    color="color_current_date"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text @click="$refs.menu.save(issueDate)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <v-simple-table height="170px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Issue Date
                    </th>
                    <th class="text-left">
                      Person & Company Name
                    </th>
                    <th class="text-left">
                      Issue Description
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Solved Note
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>15-04-21</td>
                    <td>
                      Aulia Rizky H - Emerson
                    </td>
                    <td>
                      Signal interference
                    </td>
                    <td>Open</td>
                    <td>
                      Is being monitored
                    </td>
                    <td>
                      <v-menu>
                        <template
                          v-slot:activator="{
                            on,
                            attrs
                          }"
                        >
                          <v-icon v-bind="attrs" v-on="on">
                            mdi-dots-horizontal
                          </v-icon>
                        </template>
                        <v-list class="py-0">
                          <v-list-item @click="editItemIssue(item)">
                            <v-list-item-title>
                              <v-icon small class="mr-1">
                                mdi-pencil
                              </v-icon>
                              Edit
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="deleteItemIssue(item)">
                            <v-list-item-title>
                              <v-icon small class="mr-1">
                                mdi-delete
                              </v-icon>
                              Delete
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="downloadItemIssue(item)">
                            <v-list-item-title>
                              <v-icon small class="mr-1">
                                mdi-download
                              </v-icon>
                              Download
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "TabItemIssue",
  props: {
    dialogFullTableIssue: Boolean,
    close: Function
  },
  data: () => ({
    fab: false,
    issueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    tab: null,
    dates: ["2021-06-16", "2021-06-16"],
    menu: false,
    issueHistoryList: [],
    status: [],
    menuIssueDate: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      issueDate: null,
      person_company: null,
      issue_desc: null,
      status: null,
      note: null
    },
    series: [],
    loadingAddSensors: false,
    loadingAddIssue: false,
    loadingGetDeviceHealthItem: false,
    loadingGetDetailUnit: false,
    deviceHealthValue: null,
    sensorParameter: null
  }),

  watch: {
    dialogAddEntryIssue(val) {
      val || this.close();
    },
    dialogEditEntryIssue(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    sensorParams() {
      // this.sensorParameter = this.sensorParams;
      this.getIssueList();
    }
  },
  created() {
    this.sensorParameter = this.sensorParams;
    this.getIssueList();
  },
  methods: {
    editItemIssue(item) {
      this.editedIndex = this.item.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddEntryIssue = true;
    },
    deleteItemIssue(item) {
      this.editedIndex = this.item.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async getIssueList() {
      try {
        const res = await this.$store.dispatch(
          "configuration/issue_history/getIssueList",
          { parameter: this.sensorParameter.parameter }
        );

        this.issueHistoryList = res.issues;
      } catch (err) {
        console.log(err);
        this.loadingGetDeviceHealthItem = false;
        // this.searchResults = [];
      }
    },
    async handleChangeUnit() {
      try {
        this.loadingGetDetailUnit = true;
        const res = await this.$store.dispatch(
          "configuration/device_list/getDetailUnit",
          this.editedItem.unit
        );

        this.loadingGetDetailUnit = false;
      } catch (err) {
        console.log(err);
        this.loadingGetDetailUnit = false;
        // this.searchResults = [];
      }
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
            this.toastMsgSensors = "Data has been Deleted";
            this.toast = true;
          }
        }
      } catch (err) {
        console.log(err);
        // this.searchResults = [];
      }
      this.closeDelete();
    },
    async saveIssue(e) {
      if (this.editedIndex > -1) {
        let param = null;
        console.log(this.editedItem);
        // if (this.editedItem.password !== null) {
        //   param = {
        //     userID: this.editedItem.id,
        //     user: {
        //       name: this.editedItem.name,
        //       email: this.editedItem.email,
        //       roles: this.editedItem.roles,
        //       notify: true,
        //       position: this.editedItem.position,
        //       password: this.editedItem.password
        //     }
        //   };
        // } else {
        //   param = {
        //     userID: this.editedItem.id,
        //     user: {
        //       name: this.editedItem.name,
        //       email: this.editedItem.email,
        //       roles: this.editedItem.roles,
        //       notify: true,
        //       position: this.editedItem.position
        //     }
        //   };
        // }

        // try {
        //   this.loadingAddSensors = true;
        //   const res = await this.$apollo.mutate({
        //     mutation: EDIT_USERS,
        //     variables: param
        //   });

        //   if (res.data.editUser.ok) {
        //     this.loadingAddSensors = false;
        //     Object.assign(this.users[this.editedIndex], this.editedItem);
        //     this.toastMsgSensors = "Data has been Edited";
        //     this.toast = true;
        //   }
        // } catch (err) {
        //   console.log(err);
        //   this.loadingAddSensors = false;
        //   // this.searchResults = [];
        // }
      } else {
        console.log(this.editedItem);
        // try {
        //   this.loadingAddSensors = true;
        //   const res = await this.$store.dispatch(
        //     "/pages/configuration/device_list/addSensorsUnit",
        //     this.editedItem
        //   );

        //   if (res.data.addUser.ok) {
        //     this.loadingAddSensors = false;
        //     this.device_list.push({
        //       person_company: this.editedItem.person_company,
        //       issue_desc: this.editedItem.issue_desc,
        //       status: this.editedItem.status,
        //       note: this.editedItem.note
        //     });
        //     this.toastMsgSensors = "Success To Save";
        //     this.toast = true;
        //   }
        // } catch (err) {
        //   console.log(err);
        //   this.loadingAddSensors = false;
        //   // this.searchResults = [];
        // }
      }
      this.close();
    }
  }
};
</script>
