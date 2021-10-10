export default () => {
  return {
    httpEndpoint: "https://integrator.staging.musagreen.com/api/graphql",

    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => `Bearer ${localStorage.getItem("token_musa")}`
  };
};
