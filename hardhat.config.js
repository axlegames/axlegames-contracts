require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  gas: 2100000,
  gasPrice: 8000000000,
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
    ],
  },
  networks: {
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 40000000000,
      accounts: { mnemonic: process.env.PRIVATE_PHRASE || "" },
    },
  },
};
