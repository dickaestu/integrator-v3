import { gql } from 'graphql-tag';

export const ModbusTCPCore = gql`
  fragment ModbusTCPCore on ModbusTCP {
    __typename
    id
    host
    tcpPort: port
  }
`;

export const ModbusRTUCore = gql`
  fragment ModbusRTUCore on ModbusRTU {
    __typename
    id
    baudRate
    dataBits
    parity
    serialPort: port
    stopBits
  }
`;