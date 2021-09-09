import { gql }from 'graphql-tag'

export const state = () => ({
    unitList : null,
    loading: false,
    sensors: null,
    deviceHealth: null,
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

const EDIT_SENSORS = gql`
mutation editSensor ($sensorID: ID!, $s: InputSensor!) {
  editSensor (sensorID: $sensorID, s: $s) {
      ok
  }
}
`

const DEVICE_HEALTH = gql`
query deviceHealth ($parameter: String!, $date: String!) {
  deviceHealth (parameter: $parameter, date: $date) {
      installationDate
      lastCalibrationDate
      nextCalibrationDate
      lastUpdate
      ghostPeak
      downTime
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
const DELETE_SENSORS = gql`
mutation deleteSensor ($sensorID: ID!) {
  deleteSensor (sensorID: $sensorID) {
      ok
  }
}
`

export const mutations = {
  getUnitList(state, {data}){
    state.unitList = data
  },
  addSensors(state, {data}){
    state.sensors = data
  },
  editSensors(state, {data}){
    state.sensors = data
  },
  deleteSensors(state, {data}){
    state.sensors = data
  },
  getSensorsMeasurement(state, {data}){
    state.sensorsMeasurement = data
  },
  getDeviceHealth(state, {data}){
    state.deviceHealth = data
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
        console.log(formData)
          try {
              const res = await client.mutate({
                mutation: ADD_SENSORS,
                variables: {
                    "s": {
                      "name": formData.brand,
                      "unitID": formData.unit,
                      "port": formData.port,
                      "parameter": formData.parameter,
                      "registerType": formData.register_type,
                      "dataLength": formData.data_length,
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
    async editSensorsUnit({commit}, formData) {
      let client = this.app.apolloProvider.defaultClient
        try {
            const res = await client.mutate({
              mutation: EDIT_SENSORS,
              variables: {
                  "sensorID": formData.id,
                  "s": {
                    "name": formData.brand,
                    "unitID": formData.unit,
                    "port": formData.port,
                    "parameter": formData.parameter,
                    "registerType": formData.register_type,
                    "dataLength": formData.data_length,
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
              commit('editSensors', { res })
            }
            console.log(res)
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
    async deleteSensorUnit({commit}, formData) {
      let client = this.app.apolloProvider.defaultClient
      try {
        const res = await client.mutate({
          mutation: DELETE_SENSORS,
          variables: {
              "sensorID" : formData.id
          }
        });
        commit('deleteSensors', { res })
        return res.data
      } catch (error) {
        console.log(error)
      }
    },
    async getDeviceHealth({commit}, params){
      console.log(params)
      let client = this.app.apolloProvider.defaultClient
        try {
            const res = await client.query({
              query: DEVICE_HEALTH,
              variables: {
                "parameter": params,
                "date": "2021-09-03"
              }
            });

            if (res) {
              commit('getDeviceHealth', { res })
            }
            return res.data
        } catch (err) {
            console.log(err);
        }
    }
}