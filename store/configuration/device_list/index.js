import { gql }from 'graphql-tag'

export const state = () => ({
    unitList : null,
    loading: false,
    sensors: null,
    sensorsMeasurement: null
})

const GET_UNIT_LIST = gql`
    query units ($id: [ID!]) {
        units (id: $id) {
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

const ADD_SENSORS = gql`
mutation addSensor ($s: InputSensor!) {
    addSensor (s: $s) {
        ok
    }
}
`

const SENSORS_MEASUREMENTS = gql`
  query sensorMeasurements(
    $startTime: Timestamp
    $endTime: Timestamp
    $parameters: [String!]
  ) {
    sensorMeasurements(
      startTime: $startTime
      endTime: $endTime
      parameters: $parameters
    ) {
      parameter
      timestamps
      values
    }
  }
`;

export const mutations = {
  getUnitList(state, {data}){
    state.unitList = data
  },
  addSensors(state, {data}){
    state.sensors = data
  },
  getSensorsMeasurement(state, {data}){
    state.sensorsMeasurement = data
  }
}

export const actions = {
    async getUnitList({commit}) {
      let client = this.app.apolloProvider.defaultClient
        try {
            const res = await client.query({
              query: GET_UNIT_LIST,
              variables: {
                  'id': []
              }
            });

            if (res) {
              commit('getUnitList', { res })
            }
            return res.data
        } catch (err) {
            console.log(err);
        }
    },
    async getDetailUnit({commit}, id) {
        let client = this.app.apolloProvider.defaultClient
          try {
              const res = await client.query({
                query: GET_UNIT_LIST,
                variables: {
                    'id': [id]
                }
              });
  
              if (res) {
                commit('getUnitList', { res })
              }
              return res.data
          } catch (err) {
              console.log(err);
          }
    },
    async addSensorsUnit({commit}, formData) {
        let client = this.app.apolloProvider.defaultClient
          try {
              const res = await client.query({
                query: ADD_SENSORS,
                variables: {
                    "s": {
                      "name": formData.brand,
                      "unitID": formData.unit,
                      "port": formData.port,
                      "parameter": formData.parameter,
                      "registerType": formData.register_type,
                      "dataLength": formData.dataLength,
                      "measurementUnit": formData.measurement,
                      "inputLow": formData.input_low,
                      "inputHigh": formData.input_high,
                      "outputLow": formData.output_low,
                      "outputHigh": formData.output_high,
                      "thresholdLow": formData.threshold_low,
                      "thresholdHigh": formData.threshold_high,
                      "customCalibration": formData.calibration
                    }
                  }
              });
  
              if (res) {
                commit('addSensors', { res })
              }
              return res.data
          } catch (err) {
              console.log(err);
          }
    },
    async getSensorMeasurements({commit}, params) {
        let client = this.app.apolloProvider.defaultClient
        try {
          const res = await client.query({
            query: SENSORS_MEASUREMENTS,
            variables: {
              startTime: null,
              endTime: null,
              parameters: [params]
            }
          });
            if (res) {
                commit('getSensorsMeasurement', { res })
            }
            return res;
        } catch (err) {
          console.log(err);
          // this.searchResults = [];
        }
      },
}