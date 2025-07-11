// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HumanProof {
    // contract logic
}

    function verifyHuman(address user) public {
        verified[user] = true;
    }

    function isHuman(address user) public view returns (bool) {
        return verified[user];
    }
}
