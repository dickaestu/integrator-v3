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
          <!-- Filter Status And Date -->
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between">
              <div class="left px-3 px-sm-0">
                <v-select
                  ref="editedItem.unit"
                  class="form_edit_select"
                  :items="status"
                  label="Select Status"
                  solo
                  hide-details="auto"
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
            <v-simple-table height="100%">
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
                  <tr v-for="(i, index) in issueHistoryList" :key="index">
                    <td>
                      {{
                        new Intl.DateTimeFormat("ban-ID").format(
                          new Date(i.date * 1000)
                        )
                      }}
                    </td>
                    <td>
                      {{ i.personAndCompanyName }}
                    </td>
                    <td>
                      {{ i.description }}
                    </td>
                    <td>{{ i.status }}</td>
                    <td>
                      {{ i.note }}
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
                          <v-list-item @click="editItem(i, index, `issue`)">
                            <v-list-item-title>
                              <v-icon small class="mr-1">
                                mdi-pencil
                              </v-icon>
                              Edit
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="deleteItem(i, index, `delete-issue`)"
                          >
                            <v-list-item-title>
                              <v-icon small class="mr-1">
                                mdi-delete
                              </v-icon>
                              Delete
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="downloadItem(i)">
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
  name: "FullTabItemIssue",
  props: {
    dialogFullTableIssue: Boolean,
    close: Function,
    issueHistoryList: Array,
    deleteItem: Function,
    editItem: Function
  },
  data: () => ({
    fab: false,
    issueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    tab: null,
    dates: ["2021-06-16", "2021-06-16"],
    menu: false,
    status: [],
    menuIssueDate: false,
    dialogDelete: false
  })
};
</script>
