// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  const AxleToken = await ethers.getContractFactory("AxleToken");
  const axleToken = await AxleToken.deploy();
  await axleToken.deployed();
  console.log(`AxleToken deployed :`, axleToken.address);
}

const token = "0x8eFe412d87dA0D4893762ddC4d958452b109d7D8";

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
