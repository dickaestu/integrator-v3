import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";

// import introspectionQueryResultData from "./possibleTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "Modbus",
          possibleTypes: [{ name: "ModbusTCP" }, { name: "ModbusRTU" }]
        }
      ]
    }
  }
});

export default () => {
  return {
    httpEndpoint: "https://integrator.staging.musagreen.com/api/graphql",

    cache: new InMemoryCache({
      fragmentMatcher
    }),

    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => `Bearer ${localStorage.getItem("token_musa")}`
  };
};
