// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HumanProof {
    mapping(address => bool) public verifiedHumans;

    function verifyHuman(address user) public {
        verifiedHumans[user] = true;
    }

    function isHuman(address user) public view returns (bool) {
        return verifiedHumans[user];
    }
}

