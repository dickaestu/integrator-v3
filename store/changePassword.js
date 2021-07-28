import gql from 'graphql-tag'

export const state = () => ({
    loadingSetPasword: false,
    dataSetPassword: null,
})

const SET_PASSWORD = gql`
    mutation setPassword ($old: String!, $new: String!) {
        setPassword (previousPassword: $old, newPassword: $new) {
            ok
        }
    }
`;

export const mutations = {
  setPassword(state, { result }) {
    state.dataSetPassword = result
  },
}

export const actions = {
    async setPassword({commit}, payload) {
      let client = this.app.apolloProvider.defaultClient
        try {
            this.loadingSetPasword = true;
            const res = await client.mutate({
              mutation: SET_PASSWORD,
              variables: {
                "old": payload.oldPassword,
                "new": payload.newPassword 
              }
            });

            if (res.data.setPassword.ok) {
              commit('setPassword', { res })
              this.loadingSetPasword = false;
            }
            const data = {
                check : 'success',
                data : res
            }
            return data
        } catch (err) {
            console.log(err);
            const data = {
                check : 'fail',
            }
            return data
            this.loadingSetPasword = false;
            // this.searchResults = [];
        }
    },
}