import { gql } from "graphql-tag";

export const state = () => ({
  calibrationHistory: null,
  loading: false
});

const GET_CALIBRATION_HISTORY_LIST = gql`
  query calibrationActivities(
    $startTime: Timestamp
    $endTime: Timestamp
    $statuses: [Status!]
    $parameter: String!
  ) {
    calibrationActivities(
      startTime: $startTime
      endTime: $endTime
      statuses: $statuses
      parameter: $parameter
    ) {
      id
      date
      personAndCompanyName
      description
      status
      note
      fileID
      nextSchedule
    }
  }
`;

const ADD_CALIBRATION = gql`
  mutation addCalibrationActivity($activity: InputCalibrationActivity!) {
    addCalibrationActivity(activity: $activity) {
      ok
    }
  }
`;

const EDIT_CALIBRATION = gql`
  mutation editCalibrationActivity(
    $activityID: ID!
    $activity: InputCalibrationActivity!
  ) {
    editCalibrationActivity(activityID: $activityID, activity: $activity) {
      ok
    }
  }
`;

const DEVICE_HEALTH = gql`
  query deviceHealth($parameter: String!, $date: String!) {
    deviceHealth(parameter: $parameter, date: $date) {
      installationDate
      lastCalibrationDate
      nextCalibrationDate
      lastUpdate
      ghostPeak
      downTime
    }
  }
`;

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
const DELETE_CALIBRATION_HISTORY = gql`
  mutation deleteCalibrationActivity($activityID: ID!) {
    deleteCalibrationActivity(activityID: $activityID) {
      ok
    }
  }
`;

export const mutations = {
  getCalibrationHistoryList(state, { data }) {
    state.calibrationHistory = data;
  },
  addCalibration(state, { data }) {
    state.sensors = data;
  },
  editSensors(state, { data }) {
    state.sensors = data;
  },
  deleteSensors(state, { data }) {
    state.sensors = data;
  },
  getSensorsMeasurement(state, { data }) {
    state.sensorsMeasurement = data;
  },
  getDeviceHealth(state, { data }) {
    state.deviceHealth = data;
  }
};

export const actions = {
  async getCalibrationHistoryList({ commit }, params) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.query({
        query: GET_CALIBRATION_HISTORY_LIST,
        variables: {
          startTime: 1,
          endTime: null,
          statuses: [],
          parameter: params.parameter
        }
      });

      // if (res) {
      //   commit("getUnitList", { res });
      // }

      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async getDetailUnit({ commit }, id) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.query({
        query: GET_UNIT_LIST,
        variables: {
          id: [id]
        }
      });

      if (res) {
        commit("getUnitList", { res });
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async addCalibration({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: ADD_CALIBRATION,
        variables: {
          activity: {
            date: formData.calibrationDate,
            personAndCompanyName: formData.person_company,
            parameter: formData.parameter,
            description: formData.desc,
            status: formData.status,
            note: formData.note,
            nextSchedule: formData.nextSchedule,
            fileID: formData.fileID
          }
        }
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async editCalibration({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: EDIT_CALIBRATION,
        variables: {
          activityID: formData.id,
          activity: {
            date: formData.calibrationDate,
            personAndCompanyName: formData.person_company,
            description: formData.desc,
            status: formData.status,
            note: formData.note,
            parameter: formData.parameter,
            fileID: formData.fileID,
            nextSchedule: formData.nextSchedule
          }
        }
      });

      if (res) {
        commit("editSensors", { res });
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async getSensorMeasurements({ commit }, params) {
    let client = this.app.apolloProvider.defaultClient;
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
        commit("getSensorsMeasurement", { res });
      }
      return res;
    } catch (err) {
      console.log(err);
      // this.searchResults = [];
    }
  },
  async deleteCalibrationHistory({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: DELETE_CALIBRATION_HISTORY,
        variables: {
          activityID: formData
        }
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  async getDeviceHealth({ commit }, params) {
    console.log(params);
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.query({
        query: DEVICE_HEALTH,
        variables: {
          parameter: params,
          date: "2021-09-03"
        }
      });

      if (res) {
        commit("getDeviceHealth", { res });
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
};
