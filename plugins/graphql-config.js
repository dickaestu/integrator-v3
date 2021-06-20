export default () => {
    return {
      httpEndpoint: 'https://musa-integrator-v3-sandbox-production.up.railway.app/api/graphql',
  
      /*
       * For permanent authentication provide `getAuth` function.
       * The string returned will be used in all requests as authorization header
       */
      getAuth: () => `Bearer ${localStorage.getItem('token_musa')}`,
    }
}