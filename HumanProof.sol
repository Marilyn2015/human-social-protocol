// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract HumanProof {
    address public owner;
    mapping(address => bool) public isVerified;

    event HumanVerified(address user);
    event HumanRevoked(address user);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function verifyHuman(address user) public onlyOwner {
        isVerified[user] = true;
        emit HumanVerified(user);
    }

    function revokeHuman(address user) public onlyOwner {
        isVerified[user] = false;
        emit HumanRevoked(user);
    }

    function isHuman(address user) public view returns (bool) {
        return isVerified[user];
    }
}
