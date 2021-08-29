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

const ADD_OR_EDIT_UNIT = gql`
mutation editUnit ($unitID: ID!, $unit: InputUnit!) {
  editUnit (unitID: $unitID, unit: $unit) {
      ok
  }
}
`

const EDIT_MODBUS_RTU = gql`
mutation editConfigModbusRTU ($unitID: ID!, $config: InputModbusRTU!) {
  editConfigModbusRTU (unitID: $unitID, config: $config) {
      ok
  }
}
`

const EDIT_MODBUS_TCP = gql`
mutation editConfigModbusTCP ($unitID: ID!, $config: InputModbusTCP!) {
  editConfigModbusTCP (unitID: $unitID, config: $config) {
      ok
  }
}
`

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

          console.log(res)
          // if (res) {
          //   commit('getUnitList', { res })
          // }
          return res.data
      } catch (err) {
          console.log(err);
      }
  },
  async addUnit({commit}, formData) {
    let client = this.app.apolloProvider.defaultClient
      try {
          const res = await client.query({
            query: ADD_OR_EDIT_SENSOR,
            variables: {
              "unitID": formData.uuid,
              "unit": {
                "name": formData.name,
                "location": formData.location,
                "latitude": formData.latitude,
                "longitude": formData.longitude,
                "certificationExpirationDate": formData.expired,
                "description": formData.description
              }
            }
          });

          console.log(res)
          // if (res) {
          //   commit('getUnitList', { res })
          // }
          return res.data
      } catch (err) {
          console.log(err);
      }
  },
}