// contracts/AxleToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

// token design
// - init supply [done] 200 million
// - max supply [done] 500 million
// - minting strategy [done]
// - block reward [done]
// - burnable [done]

contract AxleToken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public blockReward;
    bool private enable;
    uint256 private limitSupply;
    uint256 _decimals = 18;

    using SafeMath for uint256;

    modifier isEnable() {
        require(enable == false, "This function is not active currently");
        _;
    }

    function changeBool() public onlyOwner {
        enable = !enable;
    }

    function mint(address _receipient, uint256 _amount) private {
        _mint(_receipient, _amount);
    }

    function transferToken(
        address sender,
        address _recipient,
        uint256 _amount
    ) public isEnable returns (bool) {
        _transfer(sender, _recipient, _amount);
        return true;
    }

    constructor(uint256 cap, uint256 reward)
        ERC20("AxleToken", "AXLE")
        ERC20Capped(cap * (10**decimals()))
    {
        owner = payable(msg.sender);
        reward = reward * (10**decimals());
        _mint(owner, 20000000 * (10**decimals()));
    }

    function _mint(address account, uint256 amount)
        internal
        virtual
        override(ERC20Capped, ERC20)
    {
        require(
            ERC20.totalSupply() + amount <= cap(),
            "ERC20Capped: cap exceeded"
        );
        super._mint(account, amount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * (10**decimals());
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (
            from != address(0) &&
            to != block.coinbase &&
            block.coinbase != address(0)
        ) {
            mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, amount);
    }

    function mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }
}
