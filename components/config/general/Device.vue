<template>
  <v-col cols="12">
    <v-row>
      <v-col sm="3" cols="4" class="title">Device UID</v-col>
      <v-col cols="8">
        <v-text-field solo readonly hide-details="auto"></v-text-field>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Device",
  data: () => ({})
};
</script>
