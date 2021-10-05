<template>
  <v-dialog
    content-class="edit_user_dialog"
    v-model="dialogEditIssue"
    max-width="80%"
  >
    <v-form method="POST" @submit.prevent="save">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="text-h5">Edit Calibration History </span>
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
                    <label class="title_field">Calibration Date</label>
                    <v-menu
                      content-class="date_single_range"
                      ref="menu"
                      v-model="menuCalibrationDate"
                      :close-on-content-click="false"
                      :return-value.sync="calibrationDate"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="form_edit single_date"
                          v-model="calibrationDate"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details="auto"
                          outlined
                          append-icon="mdi-menu-down"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="calibrationDate"
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
                              $refs.menu.save(calibrationDate);
                              dateChange(calibrationDate);
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
                    <label class="title_field">Calibration Description</label>
                    <v-textarea
                      ref="editedItem.desc"
                      v-model="editedItem.desc"
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
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      ref="file"
                      v-model="file"
                      truncate-length="15"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <label class="title_field"
                      >Set Next Calibration Schedule</label
                    >
                    <v-menu
                      content-class="date_single_range"
                      ref="menu2"
                      v-model="menuCalibrationDate2"
                      :close-on-content-click="false"
                      :return-value.sync="calibrationDate2"
                      transition="scale-transition"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="form_edit single_date"
                          v-model="calibrationDate2"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details="auto"
                          outlined
                          append-icon="mdi-menu-down"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="calibrationDate2"
                        no-title
                        scrollable
                        color="color_current_date"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text @click="menu2 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="
                            () => {
                              $refs.menu.save(calibrationDate2);
                              dateChange2(calibrationDate2);
                            }
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn
                    text
                    class="btnBgColor mr-5"
                    @click="save"
                    :loading="loadingEditCalibration"
                    :disabled="loadingEditCalibration"
                  >
                    Edit Calibration History
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
  name: "DialogFormCalibration",
  props: {
    dialogEditIssue: Boolean,
    close: Function,
    data: Object,
    param: String,
    updateCalibration: Function
  },
  data: () => ({
    calibrationDate: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    calibrationDate2: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    menu: false,
    menu2: false,
    status: ["Open", "Closed"],
    menuCalibrationDate: false,
    menuCalibrationDate2: false,
    editedIndex: -1,
    file: null,
    editedItem: {
      calibrationDate: Math.floor(Date.now() / 1000),
      person_company: null,
      desc: null,
      status: null,
      note: null,
      parameter: null,
      fileID: null,
      nextSchedule: Math.floor(Date.now() / 1000)
    },
    loadingEditCalibration: false
  }),
  watch: {
    addingData() {
      this.calibrationDate = new Date(
        this.data.date * 1000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.calibrationDate2 = new Date(
        this.data.nextSchedule * 1000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);

      this.editedItem = {
        calibrationDate: this.data.date,
        person_company: this.data.personAndCompanyName,
        desc: this.data.description,
        status: this.data.status,
        note: this.data.note,
        id: this.data.id,
        parameter: this.param,
        fileID: this.data.fileID,
        nextSchedule: this.data.nextSchedule
      };
    }
  },
  created() {
    this.calibrationDate = new Date(
      this.data.date * 1000 - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);
    this.calibrationDate2 = new Date(
      this.data.nextSchedule * 1000 - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);

    this.editedItem = {
      calibrationDate: this.data.date,
      person_company: this.data.personAndCompanyName,
      desc: this.data.description,
      status: this.data.status,
      note: this.data.note,
      id: this.data.id,
      parameter: this.param,
      fileID: this.data.fileID,
      nextSchedule: this.data.nextSchedule
    };

    // console.log(this.data);
  },
  methods: {
    dateChange(val) {
      this.editedItem.calibrationDate = Math.floor(
        new Date(val).getTime() / 1000
      );
    },

    dateChange2(val) {
      this.editedItem.nextSchedule = Math.floor(new Date(val).getTime() / 1000);
    },

    async save({ $axios }) {
      if (this.file !== null) {
        const myData = new FormData();
        myData.append("file", this.file);

        try {
          const resFile = await this.$axios.$post(
            "/upload_calibration_file",
            myData,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token_musa")}`
              }
            }
          );
          this.editedItem.fileID = resFile.id;

          const res = await this.$store.dispatch(
            "configuration/calibration_history/editCalibration",
            this.editedItem
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await this.$store.dispatch(
            "configuration/calibration_history/editCalibration",
            this.editedItem
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
      this.close();
    }
  }
};
</script>
