<template>
  <v-row class="pt-10 mb-5">
    <v-col cols="12" lg="2" offset-lg="9">
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
              <v-col v-for="(i, index) in data" :key="index" cols="12" md="4">
                <img :src="i.image" :alt="i.image" class="my-8 card-img" />
                <!-- <v-card class="card-img my-8">
                </v-card> -->
                <v-btn :class="i.color" class="mb-5">{{ i.title }}</v-btn>
                <v-card-text v-html="i.desc"> </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Role",
  data: () => ({
    data: [
      {
        image: require("~/assets/images/img_viewer.svg"),
        title: "Viewer",
        desc: "View only<br />Change personal info",
        color: "btn__viewer"
      },
      {
        image: require("~/assets/images/img_editor.svg"),
        title: "Editor",
        desc:
          "Limited edit access<br /> Change personal info<br /> Add and edit user<br /> Add and edit device<br /> Add issue history<br /> Add calibration history",
        color: "btn__editor"
      },
      {
        image: require("~/assets/images/img_admin.svg"),
        title: "Admin",
        desc:
          "Full edit access<br /> Change personal info<br /> Add and edit user<br /> Add and edit device<br /> Edit user roles<br /> Add issue history<br /> Add calibration History",
        color: "btn__admin"
      }
    ],
    dialog: false,
    dialogRoles: false,
    links: ["Home", "Contacts", "Settings"]
  })
};
</script>
