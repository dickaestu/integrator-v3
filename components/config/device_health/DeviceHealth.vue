<template>
		<section id="DeviceHealth">
			<v-container fluid>
				<v-row>
					<v-col>
						<v-card>
							<v-icon
								class="close_dialog"
								@click="dialogAddEditDevice = false"
							>
								mdi-close-thick
							</v-icon>
							<v-container fluid>
								<v-row>
									<v-col cols="4">
										<h1>
											Device Health <span>NH3N</span>
										</h1>
									</v-col>
									<v-col class="text-right">
										<ul>
											<li>
												<v-btn class="btnBgColor"
													>See Datasheet</v-btn
												>
											</li>
											<li>
												<v-btn class="btnBgColor"
													>See Calibration
													Guide</v-btn
												>
											</li>
											<li>
												<v-menu
													content-class="date_single_range"
													ref="menu"
													v-model="menu"
													:close-on-content-click="
														false
													"
													:return-value.sync="dates"
													transition="scale-transition"
													min-width="auto"
												>
													<template
														v-slot:activator="{
															on,
															attrs
														}"
													>
														<v-text-field
															class="mt-0 pt-0 date_range"
															v-model="dateRangeText"
															readonly
															v-bind="attrs"
															v-on="on"
															hide-details="auto"
															label="Select Date"
															solo
															append-icon="mdi-menu-down"
														></v-text-field>
													</template>
													<v-date-picker
														v-model="dates"
														@change="
															dateChange(dates)
														"
														no-title
														scrollable
														color="color_current_date"
														range
													>
														<v-spacer></v-spacer>
														<v-btn
															text
															@click="menu = false"
														>
															Cancel
														</v-btn>
														<v-btn
															text
															@click="
																$refs.menu.save(dates)
															"
														>
															<!-- <v-btn text @click="getSensorMeasurements()"> -->
															OK
														</v-btn>
													</v-date-picker>
												</v-menu>
											</li>
										</ul>
									</v-col>
								</v-row>
								<v-row class="desc">
									<v-col cols="3">
										<div
											class="d-flex justify-space-between"
										>
											<div class="left">
												<p>Device UUID</p>
												<p>Device Type</p>
												<p>Series</p>
											</div>
											<div class="right">
												<p>
													fc78835c-ad79-41ad-8a4f-20a725ae012e
												</p>
												<p>Sensor</p>
												<p>Emerson HX-200693DR</p>
											</div>
										</div>
									</v-col>
									<v-col cols="3">
										<div
											class="d-flex justify-space-between"
										>
											<div class="left">
												<p>Installation Date</p>
												<p>Last Calibration Date</p>
												<p>Next Calibration Date</p>
											</div>
											<div class="right">
												<p>
													01-03-2021
												</p>
												<p>01-05-2021</p>
												<p>14-06-2021</p>
											</div>
										</div>
									</v-col>
									<v-col cols="3">
										<div
											class="d-flex justify-space-between"
										>
											<div class="left">
												<p>Current Value</p>
												<p>Max Value</p>
												<p>Min Value</p>
											</div>
											<div class="right">
												<p>
													230
												</p>
												<p>500</p>
												<p>80</p>
											</div>
										</div>
									</v-col>
									<v-col cols="3">
										<div
											class="d-flex justify-space-between"
										>
											<div class="left">
												<p>Last Update</p>
												<p>Down Time</p>
												<p>Ghost Peak</p>
											</div>
											<div class="right">
												<p>
													15-04-2020
												</p>
												<p>10 Minutes</p>
												<p>2 Minutes</p>
											</div>
										</div>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<div
											class="d-flex justify-space-between"
										>
											<h4>Graph</h4>
											<div>
												<v-select
													class="form_edit_select"
													:items="selectGraph"
													label="Trend"
													solo
												></v-select>
											</div>
										</div>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<div id="vuechart-health">
											<apexchart
												type="area"
												height="200"
												:options="options"
												:series="series"
											></apexchart>
										</div>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<div
											class="d-flex justify-space-between"
										>
											<div class="left">
												<v-tabs v-model="tab">
													<v-tab>Issue History</v-tab>
													<v-tab
														>Calibration
														History</v-tab
													>
												</v-tabs>
											</div>
											<div class="right">
												<template>
													<v-dialog
														v-model="
															dialogAddEntryIssue
														"
														max-width="500px"
													>
														<template
															v-slot:activator="{
																on,
																attrs
															}"
														>
															<v-btn
																class="btnBgColor"
																v-bind="attrs"
																v-on="on"
															>
																<v-icon left>
																	mdi-plus
																</v-icon>
																Add Entry
															</v-btn>
														</template>
													</v-dialog>
												</template>
												<template>
													<v-dialog
														v-model="
															dialogFullTableIssue
														"
														max-width="500px"
													>
														<template
															v-slot:activator="{
																on,
																attrs
															}"
														>
															<v-btn
																class="btnTransBgColor"
																v-bind="attrs"
																v-on="on"
															>
																Show Full Table
															</v-btn>
														</template>
													</v-dialog>
												</template>
											</div>
										</div>
										<v-tabs-items v-model="tab">
											<v-tab-item>
												<v-simple-table
													height="170px"
												>
													<template v-slot:default>
														<thead>
															<tr>
																<th class="text-left">
																	Issue Date
																</th>
																<th class="text-left">
																	Person & Company
																	Name
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
																	Aulia Rizky H -
																	Emerson
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
																			<v-icon
																				v-bind="attrs"
																				v-on="on"
																			>
																				mdi-dots-horizontal
																			</v-icon>
																		</template>
																		<v-list
																			class="py-0"
																		>
																			<v-list-item
																				@click="
																					editItemIssue(
																						item
																					)
																				"
																			>
																				<v-list-item-title>
																					<v-icon
																						small
																						class="mr-1"
																					>
																						mdi-pencil
																					</v-icon>
																					Edit
																				</v-list-item-title>
																			</v-list-item>
																			<v-list-item
																				@click="
																					deleteItemIssue(
																						item
																					)
																				"
																			>
																				<v-list-item-title>
																					<v-icon
																						small
																						class="mr-1"
																					>
																						mdi-delete
																					</v-icon>
																					Delete
																				</v-list-item-title>
																			</v-list-item>
																			<v-list-item
																				@click="
																					downloadItemIssue(
																						item
																					)
																				"
																			>
																				<v-list-item-title>
																					<v-icon
																						small
																						class="mr-1"
																					>
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
											</v-tab-item>
										</v-tabs-items>
									</v-col>
								</v-row>
							</v-container>
						</v-card>
						<!-- Create Entry Issue -->
						<v-dialog
							content-class="edit_user_dialog"
							v-model="dialogAddEntryIssue"
							persistent
							max-width="90%"
						>
							<v-form method="POST" @submit.prevent="save">
								<v-card>
									<v-card-title class="justify-space-between">
										<span class="text-h5">{{ formTitleIssue }}</span>
										<v-icon
											class="close_dialog white--text"
											@click="dialogAddEntryIssue = false"
										>
											mdi-close-thick
										</v-icon>
									</v-card-title>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" md="6">
													<v-row>
														<v-col cols="12">
															<label class="title_field"
																>Issue Date</label
															>
															<v-menu
																content-class="date_single_range"
																ref="menu"
																v-model="menuIssueDate"
																:close-on-content-click="false"
																:return-value.sync="issueDate"
																transition="scale-transition"
																min-width="auto"
															>
																<template
																	v-slot:activator="{ on, attrs }"
																>
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
																	<v-btn
																		text
																		@click="
																			$refs.menu.save(issueDate)
																		"
																	>
																		OK
																	</v-btn>
																</v-date-picker>
															</v-menu>
														</v-col>
														<v-col cols="12">
															<label class="title_field"
																>Person & Company Name</label
															>
															<v-text-field
																ref="editedItem.brand"
																class="form_edit"
																v-model="editedItem.brand"
																label="Enter person & company name"
																solo
																hide-details="auto"
																placeholder="Enter person & company name"
																required
															></v-text-field>
														</v-col>
														<v-col cols="12">
															<label class="title_field"
																>Issue Description</label
															>
															<v-textarea
																ref="editedItem.calibration"
																v-model="editedItem.calibration"
																solo
																class="form_edit"
																label="Enter calibration description"
																placeholder="Enter calibration description"
																hide-details="auto"
															></v-textarea>
														</v-col>
														<v-col cols="12">
															<label class="title_field"
																>Status</label
															>
															<v-select
																ref="editedItem.unit"
																class="form_edit_select"
																v-model="editedItem.unit"
																:items="unit"
																label="Select Status"
																solo
																hide-details="auto"
																@change="handleChangeUnit()"
															></v-select>
														</v-col>
														<v-col cols="12">
															<label class="title_field"
																>Solved Note</label
															>
															<v-textarea
																ref="editedItem.calibration"
																v-model="editedItem.calibration"
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
															:loading="loadingAddSensors"
															:disabled="loadingAddSensors"
														>
															Add Issue History
														</v-btn>
														<v-btn
															text
															class="btnTransBgColor"
															@click="close"
														>
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
						<!-- End -->
						<!-- Full Table Issue -->
						<v-dialog
							content-class="edit_user_dialog"
							v-model="dialogFullTableIssue"
							persistent
							max-width="90%"
						>
							<v-container fluid>
								<v-row>
									<v-col cols="6">
										<h1>
											<v-icon> mdi-chevron-left </v-icon>Issue History
										</h1>
									</v-col>
									<v-col cols="6">
										<div class="d-flex justify-space-between">
											<div class="left">
												<v-select
													ref="editedItem.unit"
													class="form_edit_select"
													v-model="editedItem.unit"
													:items="unit"
													label="Select Status"
													solo
													hide-details="auto"
													@change="handleChangeUnit()"
												></v-select>
											</div>
											<div class="right">
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
														<v-btn
															text
															@click="$refs.menu.save(issueDate)"
														>
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
																	<v-list-item
																		@click="editItemIssue(item)"
																	>
																		<v-list-item-title>
																			<v-icon small class="mr-1">
																				mdi-pencil
																			</v-icon>
																			Edit
																		</v-list-item-title>
																	</v-list-item>
																	<v-list-item
																		@click="deleteItemIssue(item)"
																	>
																		<v-list-item-title>
																			<v-icon small class="mr-1">
																				mdi-delete
																			</v-icon>
																			Delete
																		</v-list-item-title>
																	</v-list-item>
																	<v-list-item
																		@click="downloadItemIssue(item)"
																	>
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
						</v-dialog>
						<!-- End -->
					</v-col>
				</v-row>
			</v-container>
		</section>
</template>
<script>
export default {
	name : "DeviceHealth",
	data: () => ({
		issueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    tab: null,
    dates: ["2021-06-16", "2021-06-16"],
    menu: false,
    menuIssueDate: false,
    selectGraph: ["Trend", "Distribution"],
		dialogAddEntryIssue: false,
    dialogFullTableIssue: false,
		editedItem: {
      device_type: null,
      brand: null,
      unit: null,
      parameter: null,
      port: null,
      data_length: null,
      input_low: null,
      input_high: null,
      output_low: null,
      output_high: null,
      threshold_low: null,
      threshold_high: null,
      measurement: null,
      register_type: null,
      calibration: null
    },
    defaultItem: {
      device_type: null,
      brand: null,
      unit: null,
      parameter: null,
      port: null,
      data_length: null,
      input_low: null,
      input_high: null,
      output_low: null,
      output_high: null,
      threshold_low: null,
      threshold_high: null,
      measurement: null,
      register_type: null,
      calibration: null
    },
		options: {
      annotations: {
        position: "front",
        yaxis: [
          {
            y: null,
            y2: null,
            strokeDashArray: 7,
            borderColor: "#FFD4A2",
            opacity: 1,
            offsetX: 0,
            offsetY: 0,
            width: "100%",
            yAxisIndex: 0,
            label: {
              borderWidth: 0,
              borderRadius: 6,
              text: "lower threshold: 6",
              textAnchor: "center",
              position: "left",
              offsetX: 0,
              offsetY: -15,
              style: {
                opacity: 0.5,
                background: "#F0F2F4",
                color: "#69747E;",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-yaxis-annotation-label",
                padding: {
                  left: 7,
                  right: 7,
                  top: 7,
                  bottom: 7
                }
              }
            }
          },
          {
            y: 100,
            y2: null,
            strokeDashArray: 7,
            borderColor: "#FFD4A2",
            opacity: 1,
            offsetX: 0,
            offsetY: 0,
            width: "100%",
            yAxisIndex: 0,
            label: {
              borderWidth: 0,
              borderRadius: 6,
              text: "upper threshold: 100",
              textAnchor: "center",
              position: "left",
              offsetX: 0,
              offsetY: -15,
              style: {
                opacity: 0.5,
                background: "#F0F2F4",
                color: "#69747E;",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-yaxis-annotation-label",
                padding: {
                  left: 7,
                  right: 7,
                  top: 7,
                  bottom: 7
                }
              }
            }
          }
        ]
      },
      grid: {
        show: false
      },
      chart: {
        toolbar: {
          show: false
        },
        id: "vuechart-example",
        type: "area",
        height: 150,
        foreColor: "#51A1B4"
      },
      colors: ["#44BDD8", "#B9EFFF"],
      stroke: {
        curve: "smooth",
        width: 2
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: "numeric",
        categories: [""],
        labels: {
          show: true
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        }
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      fill: {
        opacityFrom: 0.7,
        opacityTo: 0.9
      },
      tooltip: {
        enabled: true
      }
    },
    series: []
	}),
	computed: {
		formTitleIssue() {
      return this.editedIndex === -1
        ? "Add Issue History"
        : "Edit Issue History";
    },
	},
	mounted() {
		// var arr1 = this.dates[0];
    // arr1 = arr1.split("-");
    // var newDate = new Date(arr1[0], arr1[1] - 1, arr1[2], 0, 0, 1, 0).getTime();
    // this.timestamps1 = newDate;

    // var arr2 = this.dates[1];
    // arr2 = arr2.split("-");
    // var newDate2 = new Date(
    //   arr2[0],
    //   arr2[1] - 1,
    //   arr2[2],
    //   23,
    //   59,
    //   59
    // ).getTime();
    // this.timestamps2 = newDate2;
	},
	watch: {
		dialogAddEntryIssue(val) {
      val || this.close();
    },
    dialogFullTableIssue(val) {
      val || this.close();
    },
	},
	methods: {
		editItemIssue(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddEditDevice = true;
    },
		deleteItemIssue(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
		close() {
      this.dialogAddEntryIssue = false;
      this.dialogFullTableIssue = false;
    },
	}
};
</script>