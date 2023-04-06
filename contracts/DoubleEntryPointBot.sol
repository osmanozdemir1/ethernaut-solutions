// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface DelegateERC20 {
  function delegateTransfer(address to, uint256 value, address origSender) external returns (bool);
}

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

interface IForta {
    function setDetectionBot(address detectionBotAddress) external;
    function notify(address user, bytes calldata msgData) external;
    function raiseAlert(address user) external;
}

interface ICryptoVault {
    function setUnderlying(address latestToken) external;
    function sweepToken(IERC20 token) external;
}

interface IDoubleEntryPoint {
    function delegateTransfer(address to, uint256 value, address origSender) external returns (bool);
    function forta() external returns(IForta);
    function cryptoVault() external returns(ICryptoVault);
}

contract DoubleEntryPointBot is IDetectionBot{
    IDoubleEntryPoint public ethernautInstance;
    IDetectionBot public bot;
    IForta public forta;
    ICryptoVault public vault;

    constructor(address instanceAddress) {
        ethernautInstance = IDoubleEntryPoint(instanceAddress);
        bot = IDetectionBot(address(this));
        vault = ICryptoVault(address(ethernautInstance.cryptoVault()));
        forta = IForta(address(ethernautInstance.forta()));
    }

    function handleTransaction(address user, bytes calldata msgData) external override {
        /* Calldata will be 100 bytes long.
           function delegateTransfer(address,value,address)
           4 bytes for the function selector.
           32 bytes each for the arguments.
        */
        /* Extract the last 20 bytes to get the original sender and convert it to address
           If the orgSender is the vault, raise alert.
        */
        address orgSender = address(bytes20(msgData[80:]));
        if (orgSender == address(vault)){
            forta.raiseAlert(user);
        }
    }
}