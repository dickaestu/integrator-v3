export default () => {
    return {
      httpEndpoint: "http://34.101.78.75.nip.io/api/graphql",
  
      /*
       * For permanent authentication provide `getAuth` function.
       * The string returned will be used in all requests as authorization header
       */
      getAuth: () => `Bearer ${localStorage.getItem('token_musa')}`,
    }
}