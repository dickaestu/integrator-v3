<template>
  <v-card class="pa-5 card-left">
    <p class="subtitle mb-0">Last Update</p>
    <p class="title mb-0">{{ dateFormatSummary }}</p>
    <v-divider></v-divider>
    <p class="subtitle mb-0 mt-2">Log Summary</p>
    <p class="title mb-3">Last 24 Hours</p>
    <div v-for="(i, index) in log" :key="index" class="data-transfer">
      <p class="title mb-0 d-hover">{{ i.title }}</p>
      <div class="d-flex justify-space-between">
        <p class="title mb-0 d-not-hover">{{ i.title }}</p>
        <div class="left">
          <p class="subtitle mb-0">{{ i.subtitle_error }}</p>
          <p class="text error mb-3">{{ i.content_error }}</p>
        </div>
        <div class="right">
          <p class="subtitle mb-0">{{ i.subtitle_warning }}</p>
          <p class="text mb-3">{{ i.content_warning }}</p>
        </div>
      </div>
    </div>
    <v-btn class="d-not-hover see_full">
      <router-link to="/log">
        SEE FULL LOGS
      </router-link>
    </v-btn>
  </v-card>
</template>

<script>
import gql from "graphql-tag";

const LOGS_SUMMARY = gql`
  {
    todayLogSummary {
      type
      warn
      error
    }
  }
`;
export default {
  name: "Log",
  props: {
    summaryLogTime : Number
  },
  middleware: "auth",
  data: () => ({
    log: [],
    items: [],
    loadingLogsSummary: false,
    dateFormatSummary: null
  }),
  mounted() {
    this.getLogSummary();
    const date = new Date(this.summaryLogTime*1000)
    var options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      timeZone: 'Asia/Jakarta',
    };
    this.dateFormatSummary = new Intl.DateTimeFormat('ban-ID', options).format(date)
  },
  methods: {
    async getLogSummary() {
      try {
        this.loadingLogsSummary = true;
        const res = await this.$apollo.query({
          query: LOGS_SUMMARY,
          variables: {}
        });

        if (res) {
          this.loadingLogsSummary = false;
          let result = res.data.todayLogSummary;
          result.map(items => {
            this.log.push({
              title:
                items.type === "operation"
                  ? "Device Health"
                  : items.type.split("_").join(" "),
              subtitle_error: "Error",
              content_error: items.error,
              subtitle_warning: "Warning",
              content_warning: items.warn
            });
          });
        }
      } catch (err) {
        console.log(err);
        this.loadingLogsSummary = false;
        // this.searchResults = [];
      }
    }
  }
};
</script>
