<template>
  <div>
    <v-row class="d-flex justify-end">
      <v-col cols="6" sm="4" md="3" lg="2">
        <v-select
          :items="Unit"
          label="All Unit"
          dense
          solo
          hide-details="auto"
        ></v-select>
      </v-col>
      <v-col cols="6" sm="4" md="3" lg="2">
        <v-select
          :items="Device"
          label="All Device Type"
          dense
          solo
          hide-details="auto"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        v-for="(i, index) in items"
        :key="index"
      >
        <v-card
          class="pa-3 card-bottom"
          :class="i.color"
          @click="onClickSensors(i)"
        >
          <div class="d-flex justify-space-between">
            <p class="title">{{ i.title }}</p>
            <p class="unit mb-0">
              {{ i.unit }}
              <br />
              <span class="desc">{{ i.desc }}</span>
            </p>
          </div>
          <p class="size mb-0">{{ i.size }}</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from "graphql-tag";

const UNITS_SENSORS = gql`
  query units($id: [ID!]) {
    units(id: $id) {
      id
      name
      location
      latitude
      longitude
      certificationExpirationDate
      description
      sensors {
        id
        name
        parameter
        unitID
        registerType
        port
        dataLength
        measurementUnit
        inputLow
        inputHigh
        outputLow
        outputHigh
        thresholdLow
        thresholdHigh
        customCalibration
      }
    }
  }
`;

export default {
  name: "Unit",
  middleware: "auth",
  data: () => ({
    items: [],
    Unit: ["Unit 01", "Unit 02", "Unit 03"],
    Device: ["Sensors", "Controllers", "Actuators"]
  }),
  mounted() {
    this.getSensors();
  },
  methods: {
    async getSensors() {
      try {
        this.loadingSensors = true;
        const res = await this.$apollo.query({
          query: UNITS_SENSORS,
          variables: {
            id: []
          }
        });

        if (res) {
          this.loadingSensors = false;
          if (res.data.units.length > 0) {
            res.data.units[0].sensors.map(result => {
              this.items.push({
                title: result.parameter,
                unit: res.data.units[0].name,
                desc: "",
                size: `${result.dataLength} ${
                  result.measurementUnit !== null ? result.measurementUnit : ""
                }`,
                color: `${
                  result.dataLength >= result.outputHigh
                    ? `red`
                    : result.dataLength >= result.thresholdHigh
                    ? "yellow"
                    : ""
                }`
              });
            });
          }
          this.getSensorMeasurements(this.items[0]);
        }
      } catch (err) {
        console.log(err);
        this.loadingSensors = false;
        // this.searchResults = [];
      }
    },
    onClickSensors(params) {
      this.getSensorMeasurements(params);
    }
  }
};
</script>
