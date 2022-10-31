//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./AxleToken.sol";

contract AxleSwap is AccessControl {
    address private owner;
    uint256 public presaleEther;
    uint256 public postsaleEther;
    address private TokenAddress;
    uint256 private minimunEther = 1;
    uint256 private maximumEther = 3;

    constructor(address _tokenAddress) {
        TokenAddress = _tokenAddress;
        owner = _msgSender();
    }

    function preSale(address payable sender) public payable {
        require(
            msg.value >= minimunEther && msg.value <= maximumEther,
            "Sent Value of Ether is Not Valid"
        );
        payable(sender).transfer(presaleEther);
        uint256 amount = calculateForPreSale(msg.value);
        AxleToken(TokenAddress).transferToken(sender, msg.sender, amount);
    }

    function publicSale(address payable sender) public payable {
        require(
            msg.value >= minimunEther && msg.value <= maximumEther,
            "Sent Value of Ether is Not Valid"
        );
        payable(sender).transfer(presaleEther); ////kjbaskjdkans
        uint256 amount = calculateForPublicSale(msg.value);
        AxleToken(TokenAddress).transferToken(sender, msg.sender, amount);
    }

    function calculateForPublicSale(uint256 amount)
        public
        payable
        returns (uint256)
    {
        uint256 _amount = (amount * 6) / 100;
        return _amount;
    }

    function calculateForPreSale(uint256 amount)
        public
        payable
        returns (uint256)
    {
        uint256 _amount = (amount * 12) / 100;
        return _amount;
    }
}
