import { gql } from "graphql-tag";

export const ModbusRTU = gql`
  fragment modbusRtu on ModbusRTU {
    __typename
    id
    baudRate
    dataBits
    parity
    serialPort: port
    stopBits
  }
`;

export const ModbusTCP = gql`
  fragment modbusTcp on ModbusTCP {
    __typename
    id
    host
    tcpPort: port
  }
`;
