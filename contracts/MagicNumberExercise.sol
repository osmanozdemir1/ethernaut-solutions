// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Solver {

/* 
    PUSH1 2a
    PUSH1 40
    MSTORE
    PUSH1 00
    CALLDATALOAD
    PUSH4 650500c1
    EQ
    PUSH1 20
    PUSH1 40
    RETURN
        runtime: 0x602a60405260003563650500c11460206040f3
*/

/*
    PUSH1 2a
    PUSH1 40
    MSTORE
    PUSH1 20
    PUSH1 40
    RETURN
        runtime: 0x602a60405260206040f3
        constructor: 0x600a600c600039600a6000f3

*/

}