<template>
  <v-dialog
    content-class="edit_user_dialog"
    v-model="dialogEditIssue"
    max-width="80%"
  >
    <v-form method="POST" @submit.prevent="save">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="text-h5">Edit Issue History </span>
          <v-icon class="close_dialog white--text" @click="close">
            mdi-close-thick
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <label class="title_field">Issue Date</label>
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
                        no-title
                        scrollable
                        color="color_current_date"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="
                            () => {
                              $refs.menu.save(issueDate);
                              dateChange(issueDate);
                            }
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                    <label class="title_field">Person & Company Name</label>
                    <v-text-field
                      ref="editedItem.person_company"
                      class="form_edit"
                      v-model="editedItem.person_company"
                      label="Enter person & company name"
                      solo
                      hide-details="auto"
                      placeholder="Enter person & company name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <label class="title_field">Issue Description</label>
                    <v-textarea
                      ref="editedItem.issue_desc"
                      v-model="editedItem.issue_desc"
                      solo
                      class="form_edit"
                      label="Enter calibration description"
                      placeholder="Enter calibration description"
                      hide-details="auto"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <label class="title_field">Status</label>
                    <v-select
                      ref="editedItem.status"
                      class="form_edit_select"
                      v-model="editedItem.status"
                      :items="status"
                      label="Select Status"
                      solo
                      hide-details="auto"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <label class="title_field">Solved Note</label>
                    <v-textarea
                      ref="editedItem.note"
                      v-model="editedItem.note"
                      solo
                      class="form_edit"
                      label="Enter Note"
                      placeholder="Enter Note"
                      hide-details="auto"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn
                    text
                    class="btnBgColor mr-5"
                    @click="save"
                    :loading="loadingEditIssue"
                    :disabled="loadingEditIssue"
                  >
                    Edit Issue History
                  </v-btn>
                  <v-btn text class="btnTransBgColor" @click="close">
                    Cancel
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
export default {
  name: "DialogFormEditIssue",
  props: {
    dialogEditIssue: Boolean,
    close: Function,
    data: Object,
    param: String
  },
  data: () => ({
    issueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    status: ["Open", "Closed"],
    menuIssueDate: false,
    editedItem: {
      issueDate: Math.floor(Date.now() / 1000),
      person_company: null,
      issue_desc: null,
      status: null,
      note: null
    },
    loadingEditIssue: false
  }),
  watch: {
    addingData() {
      this.issueDate = this.data.date;
      this.editedItem = {
        issueDate: this.data.date,
        person_company: this.data.personAndCompanyName,
        issue_desc: this.data.description,
        status: this.data.status,
        note: this.data.note,
        id: this.data.id,
        parameter: this.param
      };
    }
  },
  created() {
    this.issueDate = this.data.date;
    this.editedItem = {
      issueDate: this.data.date,
      person_company: this.data.personAndCompanyName,
      issue_desc: this.data.description,
      status: this.data.status,
      note: this.data.note,
      id: this.data.id,
      parameter: this.param
    };
  },
  methods: {
    dateChange(val) {
      this.editedItem.issueDate = Math.floor(new Date(val).getTime() / 1000);
    },

    async save() {
      try {
        const res = await this.$store.dispatch(
          "configuration/issue_history/editIssue",
          this.editedItem
        );
      } catch (err) {
        console.log(err);
      }
      this.close();
    }
  }
};
</script>
