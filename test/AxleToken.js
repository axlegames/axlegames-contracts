
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("AxleToken Contract", () => {
  let Token;
  let AxleToken;
  let owner;
  let address1;
  let address2;

  let tokenCap = 20000000;
  let blockReward = 50;

  beforeEach(async () => {
    // Get the ContractFactory and Signatures here
    Token = await ethers.getContractFactory("AxleToken");
    [owner, address1, address2] = await hre.ethers.getSigners();
    AxleToken = await Token.deploy(tokenCap, blockReward);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await AxleToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await AxleToken.balanceOf(owner.address);
      expect(await AxleToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await AxleToken.cap();
      expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const _blockReward = await AxleToken.blockReward();
      console.log(
        Number(hre.ethers.utils.formatEther(_blockReward)),
        blockReward
      );
      expect(Number(hre.ethers.utils.formatEther(_blockReward))).to.equal(
        blockReward
      );
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner toaddress1
      await AxleToken.transfer(address1.address, 50);
      const address1Balance = await AxleToken.balanceOf(address1.address);
      expect(address1Balance).to.equal(50);

      // Transfer 50 tokens from address1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await AxleToken.connect(address1).transfer(address2.address, 50);
      const addr2Balance = await AxleToken.balanceOf(address2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await AxleToken.balanceOf(owner.address);
      // Try to send 1 token from address1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        AxleToken.connect(address1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await AxleToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });

  it("Should update balances after transfers", async function () {
    const initialOwnerBalance = await AxleToken.balanceOf(owner.address);

    // Transfer 100 tokens from owner to addr1.
    await AxleToken.transfer(address1.address, 100);

    // Transfer another 50 tokens from owner to addr2.
    await AxleToken.transfer(address2.address, 50);

    // Check balances.
    const finalOwnerBalance = await AxleToken.balanceOf(owner.address);
    expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

    const addr1Balance = await AxleToken.balanceOf(address1.address);
    expect(addr1Balance).to.equal(100);

    const addr2Balance = await AxleToken.balanceOf(address2.address);
    expect(addr2Balance).to.equal(50);
  });
});