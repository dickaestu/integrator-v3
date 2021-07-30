<template>
  <v-app>
    <section id="device_list">
      <Header />
      <Menu />
      <v-container :fluid="$vuetify.breakpoint.mdAndDown">
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
                <v-container fluid class="pa-7">
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col md="12" lg="6">
                          <h3>
                            <v-app-bar-nav-icon
                              class="d-inline-block d-sm-print-inline-block d-md-none"
                              @click.stop="sidebarMenu = !sidebarMenu"
                            ></v-app-bar-nav-icon>
                            Device List
                          </h3>
                          <p class="desc mt-2">
                            Scroll to explore devices. Click devices to show
                            device health.
                          </p>
                        </v-col>
                        <v-col md="12" lg="6" class="my-auto">
                          <v-row>
                            <v-col>
                              <template>
                                <v-dialog
                                  v-model="dialogAddEditDevice"
                                  max-width="500px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="btnBgColor"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon left>
                                        mdi-plus
                                      </v-icon>
                                      ADD Device
                                    </v-btn>
                                  </template>
                                </v-dialog>
                              </template>
                            </v-col>
                            <v-col>
                              <v-btn class="btnTransBgColor">
                                Generate Report
                              </v-btn>
                            </v-col>
                            <v-col>
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
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-dialog
                        content-class="edit_user_dialog"
                        v-model="dialogAddEditDevice"
                        persistent
                        max-width="80%"
                      >
                        <v-form method="POST" @submit.prevent="save">
                          <v-card>
                            <v-card-title class="justify-space-between">
                              <span class="text-h5">{{ formTitle }}</span>
                              <v-icon
                                class="close_dialog white--text"
                                @click="dialogAddEditDevice = false"
                              >
                                mdi-close-thick
                              </v-icon>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" md="6">
                                    <p class="title_head_newDevice">
                                      General Information & Protocol Parameters
                                    </p>
                                    <v-row>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Device Type</label
                                        >
                                        <v-select
                                          ref="editedItem.roles"
                                          class="form_edit_select"
                                          v-model="editedItem.roles"
                                          :items="roles"
                                          label="Select Device Type"
                                          solo
                                          hide-details="auto"
                                        ></v-select>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Device Brand and Series/Name</label
                                        >
                                        <v-text-field
                                          ref="editedItem.name"
                                          class="form_edit"
                                          v-model="editedItem.name"
                                          label="Enter device brand and series"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter device brand and series"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Select Unit</label
                                        >
                                        <v-select
                                          ref="editedItem.roles"
                                          class="form_edit_select"
                                          v-model="editedItem.roles"
                                          :items="roles"
                                          label="Select Unit"
                                          solo
                                          hide-details="auto"
                                        ></v-select>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <p class="title_head_newDevice">
                                      Device Variables
                                    </p>
                                    <v-row>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Parameter Name</label
                                        >
                                        <v-text-field
                                          ref="editedItem.name"
                                          class="form_edit"
                                          v-model="editedItem.name"
                                          label="Enter Parameter"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Parameter"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field">Port</label>
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Port"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Port"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Data Length</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter array"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter array"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Input Low</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Input Low"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Input Low"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Input High</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Input High"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Input High"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Output Low</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Output Low"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Output Low"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Output High</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Output High"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Output High"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Threshold Low</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Threshold Low"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Threshold Low"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Threshold High</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Threshold High"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Threshold High"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Measurement Unit</label
                                        >
                                        <v-text-field
                                          ref="editedItem.email"
                                          class="form_edit"
                                          v-model="editedItem.email"
                                          label="Enter Measurement Unit"
                                          solo
                                          hide-details="auto"
                                          placeholder="Enter Measurement Unit"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                        <label class="title_field"
                                          >Register Type</label
                                        >
                                        <v-select
                                          ref="editedItem.roles"
                                          class="form_edit_select"
                                          v-model="editedItem.roles"
                                          :items="roles"
                                          label="Enter Register Type"
                                          solo
                                          hide-details="auto"
                                        ></v-select>
                                      </v-col>
                                      <v-col cols="12">
                                        <label class="title_field"
                                          >Calibration Formula</label
                                        >
                                        <v-textarea
                                          solo
                                          class="form_edit"
                                          label="Insert calibration equation here"
                                          placeholder="Insert calibration equation here"
                                        ></v-textarea>
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        class="d-flex justify-end"
                                      >
                                        <v-btn
                                          text
                                          class="btnBgColor mr-5"
                                          @click="save"
                                          :loading="loadingAddUser"
                                          :disabled="loadingAddUser"
                                        >
                                          Add New Device
                                        </v-btn>
                                        <v-btn
                                          text
                                          class="btnTransBgColor"
                                          @click="close"
                                        >
                                          Cancel
                                        </v-btn>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
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
                          <v-card-title class="text-h5 justify-space-between"
                            >Delete Device?
                            <v-icon
                              class="close_dialog white--text"
                              @click="dialogDelete = false"
                            >
                              mdi-close-thick
                            </v-icon>
                          </v-card-title>
                          <v-card-text class="pb-0">
                            Deleting a device will permanently remove it from
                            the system.
                          </v-card-text>
                          <v-container fluid>
                            <v-row class="pb-3 my-auto mx-auto">
                              <v-col cols="12" sm="6">
                                <v-btn text @click="deleteItemConfirm"
                                  >YES, DELETE DEVICE</v-btn
                                >
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-btn
                                  class="cancel_delete"
                                  text
                                  @click="closeDelete"
                                  >NO, KEEP DEVICE</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-dialog>
                      <v-row>
                        <v-col cols="12" class="custom-scroll">
                          <v-row class="mb-5">
                            <v-col cols="12">
                              <p class="title_head">Controllers</p>
                              <v-row>
                                <v-col xl="2" lg="3" md="6" sm="6" cols="12">
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        Inlet SPARING
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
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
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p class="size">BOD5</p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Series</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">23 mg/L</p>
                                        <p class="mb-0">RX3i CPL410</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                                <v-col xl="2" lg="3" md="6" sm="6" cols="12">
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        Inlet SPARING
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
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
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p class="size">BOD5</p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Series</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">23 mg/L</p>
                                        <p class="mb-0">RX3i CPL410</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-row class="mb-5">
                            <v-col cols="12">
                              <p class="title_head">Sensors</p>
                              <v-row>
                                <v-col xl="2" lg="3" md="6" sm="6" cols="12">
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        Inlet SPARING
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
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
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p class="size">BOD5</p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Series</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">23 mg/L</p>
                                        <p class="mb-0">RX3i CPL410</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                                <v-col xl="2" lg="3" md="6" sm="6" cols="12">
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        Inlet SPARING
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
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
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p class="size">BOD5</p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Series</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">23 mg/L</p>
                                        <p class="mb-0">RX3i CPL410</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                                <v-col xl="2" lg="3" md="6" sm="6" cols="12">
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        Inlet SPARING
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
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
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p class="size">BOD5</p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Series</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">23 mg/L</p>
                                        <p class="mb-0">RX3i CPL410</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-row class="mb-5">
                            <v-col cols="12">
                              <p class="title_head">Actuators</p>
                              <v-row>
                                <v-col xl="2" lg="3" md="6" sm="6" cols="12">
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        Inlet SPARING
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
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
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p class="size">BOD5</p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Series</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">23 mg/L</p>
                                        <p class="mb-0">RX3i CPL410</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                                <v-col xl="2" lg="3" md="6" sm="6" cols="12">
                                  <v-card class="list_unit_detail">
                                    <div class="d-flex justify-space-between">
                                      <p class="title-card mb-0">
                                        Inlet SPARING
                                      </p>
                                      <v-menu>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-icon v-bind="attrs" v-on="on">
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
                                          <v-list-item
                                            @click="deleteItem(item)"
                                          >
                                            <v-list-item-title>
                                              <v-icon small class="mr-1">
                                                mdi-delete
                                              </v-icon>
                                              Delete
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                    <p class="size">BOD5</p>
                                    <div class="d-flex justify-space-between">
                                      <div class="left">
                                        <p class="mb-0">Value</p>
                                        <p class="mb-0">Series</p>
                                      </div>
                                      <div class="right">
                                        <p class="mb-0">23 mg/L</p>
                                        <p class="mb-0">RX3i CPL410</p>
                                      </div>
                                    </div>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
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
  name: "device_list",
  components: {
    SideMenu
  },
  data: () => ({
    sidebarMenu: false,
    // bell: false,
    dialogAddEditDevice: false,
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
      return this.editedIndex === -1 ? "Add New Device" : "Edit Device";
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
    dialogAddEditDevice(val) {
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
      this.dialogAddEditDevice = true;
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
      this.dialogAddEditDevice = false;
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
