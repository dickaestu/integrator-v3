import { gql }from 'graphql-tag'

export const state = () => ({
    lastMeasurementTime : null,
    loading: false,
})

const GET_LAST_MEASUREMENT_TIME = gql`
	query lastMeasurementTime {
		lastMeasurementTime
	}
`

export const mutations = {
  getLastMeasurementTime(state, {data}){
    state.lastMeasurementTime = data
  },
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
    }
}