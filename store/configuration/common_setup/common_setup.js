import gql from 'graphql-tag'

export const state = () => ({
    commonSetup : null,
    loadingSaveCommonSetup: false,
    dataCommonSetup: null,
    measurementDevice: null
})

const COMMON_SETUP = gql`
    mutation setCommonSetup ($commonSetup: SetCommonSetup!) {
        setCommonSetup (commonSetup: $commonSetup) {
            ok
        }
    }
`;

const MEASUREMENT_TOGGLE = gql`
  mutation setMeasurementToggle ($toggle: SetMeasurementToggle!) {
    setMeasurementToggle (toggle: $toggle) {
        ok
    }
  }
`
const GET_COMMON_SETUP = gql`
  query commonSetup {
    commonSetup {
        interval
        defaultCalibrationIntervalDays
    }
  }
`

const GET_MEASUREMENT_DEVICE = gql`
  query measurementToggle {
    measurementToggle {
        allowMeasurement
        allowEndpoint
        allowCloud
    }
  }
`

export const mutations = {
  saveCommonSetup(state, { result }) {
    state.dataCommonSetup = result
  },
  getCommonSetup(state, {data}){
    state.commonSetup = data
  },
  getMeasurementDevice(state, {data}) {
    state.measurementDevice = data
  }
}

export const actions = {
    async getCommonSetup({commit}) {
      let client = this.app.apolloProvider.defaultClient
        try {
            const res = await client.query({
              query: GET_COMMON_SETUP,
              variables: {}
            });

            if (res) {
              commit('getCommonSetup', { res })
            }
            return res
        } catch (err) {
            console.log(err);
        }
    },
    async getMeasurementDevice({commit}) {
      let client = this.app.apolloProvider.defaultClient
        try {
            const res = await client.query({
              query: GET_MEASUREMENT_DEVICE,
              variables: {}
            });

            if (res) {
              commit('getMeasurementDevice', { res })
            }
            return res
        } catch (err) {
            console.log(err);
        }
    },
    async saveCommonSetup({commit}, payload) {
      let client = this.app.apolloProvider.defaultClient
        try {
            this.loadingSaveCommonSetup = true;
            const res = await client.mutate({
              mutation: COMMON_SETUP,
              variables: {
                "commonSetup": {
                    "interval": payload.interval,
                    "defaultCalibrationIntervalDays": 200
                }
              }
            });

            const resultMeasurement = await client.mutate({
              mutation: MEASUREMENT_TOGGLE,
              variables: {
                "toggle": payload.connectionDevice
              }
            });
            if (res.data.setCommonSetup.ok && resultMeasurement.data.setMeasurementToggle.ok) {
              commit('saveCommonSetup', { res })
              this.loadingSaveCommonSetup = false;
            }
            return res
        } catch (err) {
            console.log(err);
            this.loadingSaveCommonSetup = false;
            // this.searchResults = [];
        }
    },
}