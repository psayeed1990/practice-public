// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestContract is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol){

    }
}

