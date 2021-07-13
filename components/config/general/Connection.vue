<template>
  <v-col cols="12">
    <v-row>
      <v-col sm="3" cols="4" class="title">Connection Setup</v-col>
      <v-col cols="8">
        <v-select
          class="common_device"
          v-model="selectedFruits"
          :items="fruits"
          placeholder="Select Connection Setup"
          multiple
          hide-details="auto"
          chips
        >
          <template v-slot:prepend-item>
            <v-list-item ripple @click="toggle">
              <v-list-item-action>
                <v-icon
                  :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''"
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
        </v-select>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Connection",
  data: () => ({
    fruits: [
      "Device Connection",
      "KLHK API Connection",
      "MUSA Cloud Connection"
    ],
    selectedFruits: []
  }),
  computed: {
    likesAllFruit() {
      return this.selectedFruits.length === this.fruits.length;
    },
    likesSomeFruit() {
      return this.selectedFruits.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.fruits.slice();
        }
      });
    }
  }
};
</script>
