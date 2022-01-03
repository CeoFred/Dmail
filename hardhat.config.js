require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
// require("./tasks/faucet");
require("@nomiclabs/hardhat-waffle");

require('dotenv').config();
const privateKeys = process.env.PRIVATE_KEYS || ""


module.exports = {
  solidity: {
    compilers : [
      {
        version: "0.8.0"
      },
      {
        version: ">=0.4.22 <0.9.0"
      }
    ]
  },
  networks: {
    testnet: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/XkweKdBmSHg6wDqDeNnaGPzzprN6Qoto`,
      accounts: [`0x${privateKeys}`],
      timeout: 100000,
    },
    mainnet: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/XkweKdBmSHg6wDqDeNnaGPzzprN6Qoto`,
      accounts: [`0x${privateKeys}`]
    },
      development: {
      url: "http://localhost:7545",
      network_id: "1234"
    }
  }
};
