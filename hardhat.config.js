require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
// require("./tasks/faucet");
require("@nomiclabs/hardhat-waffle");

require('dotenv').config();
const privateKeys = process.env.PRIVATE_KEYS || ""


module.exports = {
  solidity: "0.8.0",
  networks: {
    testnet: {
      url: `https://api.s0.b.hmny.io`,
      accounts: [`0x${privateKeys}`],
      timeout: 100000,
    },
    mainnet: {
      url: `https://api.harmony.one`,
      accounts: [`0x${privateKeys}`]
    }
  }
};
