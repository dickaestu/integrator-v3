export default () => {
  return {
    httpEndpoint: "http://34.101.181.84:1337/api/graphql",

    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => `Bearer ${localStorage.getItem("token_musa")}`
  };
};
