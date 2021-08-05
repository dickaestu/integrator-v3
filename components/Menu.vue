<template>
  <section class="v-application" id="menu">
    <v-container class="d-none d-sm-none d-md-flex">
      <v-row class="my-5">
        <v-col cols="3">
          <h1>{{ title }}</h1>
        </v-col>
        <v-col class="text-right">
          <span v-for="(i, index) in menuNav" :key="index" class="ml-5">
            <NuxtLink :to="i.link">
              <v-btn class="btn">
                <v-icon left>
                  {{ i.icon }}
                </v-icon>
                {{ i.title }}
              </v-btn>
            </NuxtLink>
          </span>
        </v-col>
      </v-row>
    </v-container>
    <v-bottom-navigation class="d-flex d-sm-flex d-md-none" grow fixed>
      <span v-for="(i, index) in menuNav" :key="index">
        <NuxtLink :to="i.link">
          <v-btn>
            <span>{{ i.title }}</span>
            <v-icon>{{ i.icon }}</v-icon>
          </v-btn>
        </NuxtLink>
      </span>
    </v-bottom-navigation>
  </section>
</template>

<script>
export default {
  name: "Menu",
  props: {
    title: String
  },
  data: () => ({
    menuNav: [
      {
        link: "/",
        title: "Home",
        icon: "mdi-home"
      },
      {
        link: "/log",
        title: "Logs",
        icon: "mdi-format-list-bulleted"
      },
      {
        link: "/configuration/user_management",
        title: "Configuration",
        icon: "mdi-cog"
      },
      {
        link: "#error",
        title: "Save Files",
        icon: "mdi-folder"
      }
    ]
  })
};
</script>
