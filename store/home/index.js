import { gql }from 'graphql-tag'

export const state = () => ({
    lastMeasurementTime : null,
    loading: false,
    sensors: null
})

const GET_LAST_MEASUREMENT_TIME = gql`
	query lastMeasurementTime {
		lastMeasurementTime
	}
`

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

export const mutations = {
  getLastMeasurementTime(state, {data}){
    state.lastMeasurementTime = data
  },
  getSensorsMutate(state, payload){
    // console.log(payload)
    state.sensors = payload.sensors
  }
}

export const actions = {
    async getLastMeasurementTime({commit}) {
      let client = this.app.apolloProvider.defaultClient
        try {
            const res = await client.query({
              query: GET_LAST_MEASUREMENT_TIME,
              variables: {}
            });

            if (res) {
              commit('getLastMeasurementTime', { res })
            }
            return res.data
        } catch (err) {
            console.log(err);
        }
    },
    async getSensors({commit}) {
      let client = this.app.apolloProvider.defaultClient
      try {
          const res = await client.query({
            query: UNITS_SENSORS,
            variables: {
              id: []
            }
          });

          if (res) {
            // let sensorResult = []
            // res.data.units[0].sensors.map((result, index) => {
            //   sensorResult.push({
            //     title: result.name,
            //     parameter: result.parameter,
            //     unit: res.data.units[0].name,
            //     desc: "",
            //     size: `${loopSensors[index].toFixed(2)} ${
            //       result.measurementUnit !== null ? result.measurementUnit : ""
            //     }`,
            //     color: `${
            //       result.thresholdHigh !== null ?
            //         loopSensors[index] >= result.outputHigh
            //           ? `red`
            //           : loopSensors[index] >= result.thresholdHigh
            //           ? "yellow"
            //           : ""
            //       :
            //         loopSensors[index] >= result.outputHigh
            //           ? `red`
            //           : ""
            //     }`,
            //     minValue: dataMin[index],
            //     maxValue: dataMax[index],
            //     medianValue: dataMedian[index]
            //   });
            // });
          }
          commit('getSensorsMutate', { 
            sensors : res 
          })
          return res
      } catch (err) {
          console.log(err);
      }
    }
}