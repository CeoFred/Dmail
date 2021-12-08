//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is the main building block for smart contracts.
contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Dmail", "DMAIL") {
        _mint(msg.sender, initialSupply);
        _mint(address(this), initialSupply);
    }
}
