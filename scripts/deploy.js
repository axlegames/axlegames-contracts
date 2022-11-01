// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  // const AxleToken = await ethers.getContractFactory("AxleToken");
  // console.log(AxleToken)
  // const axleToken = await AxleToken.deploy();
  // await axleToken.deployed();
  // console.log(`AxleToken deployed :`, axleToken.address);

  const AxlePresale = await ethers.getContractFactory("TokenPresale");
  const axlePresale = await AxlePresale.deploy("0x9FE1eb84F87d83Ad87A532aD3ce034037039913B");
  await axlePresale.deployed();
  console.log(`AxlePresale deployed :`, axlePresale.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
