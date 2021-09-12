import { gql } from "graphql-tag";

export const state = () => ({
  issueHistory: null,
  loading: false
});

const GET_ISSUE_LIST = gql`
  query issues(
    $startTime: Timestamp
    $endTime: Timestamp
    $statuses: [Status!]
    $parameter: String!
  ) {
    issues(
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
    }
  }
`;

const ADD_ISSUE = gql`
  mutation addIssue($issue: InputIssue!) {
    addIssue(issue: $issue) {
      ok
    }
  }
`;

const EDIT_ISSUE = gql`
  mutation editIssue($issueID: ID!, $issue: InputIssue!) {
    editIssue(issueID: $issueID, issue: $issue) {
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
const DELETE_ISSUE = gql`
  mutation deleteIssue($issueID: ID!) {
    deleteIssue(issueID: $issueID) {
      ok
    }
  }
`;

export const mutations = {
  getIssueList(state, { data }) {
    state.issueHistory = data;
  },
  addSensors(state, { data }) {
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
  async getIssueList({ commit }, params) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.query({
        query: GET_ISSUE_LIST,
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
  async addIssue({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: ADD_ISSUE,
        variables: {
          issue: {
            date: formData.issueDate,
            personAndCompanyName: formData.person_company,
            parameter: formData.parameter,
            description: formData.issue_desc,
            status: formData.status,
            note: formData.note
          }
        }
      });

      // if (res) {
      //   commit("addSensors", { res });
      // }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async editIssue({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: EDIT_ISSUE,
        variables: {
          issueID: formData.id,
          issue: {
            date: formData.issueDate,
            personAndCompanyName: formData.person_company,
            description: formData.issue_desc,
            status: formData.status,
            note: formData.note,
            parameter: formData.parameter
          }
        }
      });

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
  async deleteIssue({ commit }, formData) {
    let client = this.app.apolloProvider.defaultClient;
    try {
      const res = await client.mutate({
        mutation: DELETE_ISSUE,
        variables: {
          issueID: formData
        }
      });
      // commit("deleteSensors", { res });
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
