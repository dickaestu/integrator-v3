import { gql }from 'graphql-tag'
// import { ModbusTCPCore, ModbusRTUCore } from './fragments'

export const state = () => ({
    unitList : null,
    loading: false,
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

export const mutations = {
  getUnitList(state, {data}){
    state.unitList = data
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
}