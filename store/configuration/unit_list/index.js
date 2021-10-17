import { gql } from "graphql-tag";
import { ModbusRTU, ModbusTCP } from "./fragments";

export const state = () => ({
  unitList: null,
  loading: false
});

const GET_UNIT_LIST = gql`
  ${ModbusRTU}
  ${ModbusTCP}
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
      config {
        ...modbusRtu
        ...modbusTcp
      }
    }
  }
`;

const ADD_OR_EDIT_UNIT = gql`
  mutation editUnit($unitID: ID!, $unit: InputUnit!) {
    editUnit(unitID: $unitID, unit: $unit) {
      ok
    }
  }
`;

const EDIT_MODBUS_RTU = gql`
  mutation editConfigModbusRTU($unitID: ID!, $config: InputModbusRTU!) {
    editConfigModbusRTU(unitID: $unitID, config: $config) {
      ok
    }
  }
`;

const EDIT_MODBUS_TCP = gql`
  mutation editConfigModbusTCP($unitID: ID!, $config: InputModbusTCP!) {
    editConfigModbusTCP(unitID: $unitID, config: $config) {
      ok
    }
  }
`;

export const mutations = {
  getUnitList(state, { data }) {
    state.unitList = data;
  }
};

export const actions = {
  async getUnitList({ commit }) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.query({
        query: GET_UNIT_LIST,
        variables: {
          id: []
        }
      });

      // console.log(res);
      // if (res) {
      //   commit('getUnitList', { res })
      // }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async addUnit({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: ADD_OR_EDIT_UNIT,
        variables: {
          unitID: formData.id,
          unit: {
            name: formData.name,
            location: formData.location,
            latitude: formData.latitude,
            longitude: formData.longitude,
            certificationExpirationDate: formData.expired,
            description: formData.description
          }
        }
      });

      // console.log(res);
      // if (res) {
      //   commit('getUnitList', { res })
      // }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async addTcp({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: EDIT_MODBUS_TCP,
        variables: {
          unitID: formData.unitID,
          config: {
            host: formData.config.host,
            port: formData.config.port
          }
        }
      });

      // console.log(res);
      // if (res) {
      //   commit('getUnitList', { res })
      // }
      // console.log(res);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return "Something went wrong";
    }
  },
  async addRtu({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: EDIT_MODBUS_RTU,
        variables: {
          unitID: formData.unitID,
          config: {
            baudRate: formData.config.baudRate,
            dataBits: formData.config.dataBits,
            parity: formData.config.parity,
            port: formData.config.port,
            stopBits: formData.config.stopBits
          }
        }
      });

      // console.log(res);
      // if (res) {
      //   commit('getUnitList', { res })
      // }
      return res.data;
    } catch (err) {
      console.log(err.message);
      return "Something went wrong";
    }
  }
};
