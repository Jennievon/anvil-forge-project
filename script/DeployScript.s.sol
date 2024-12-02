// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../contracts/Token.sol";
import "../contracts/Marketplace.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        // Begin broadcasting transactions
        vm.startBroadcast();

        // Deploy Token contract
        Token token = new Token("Marketplace Token", "MKT");

        // Mint some initial tokens to the deployer
        token.mint(msg.sender, 1000000 * 10 ** 18); // 1 million tokens

        // Deploy Marketplace contract with the token address
        Marketplace marketplace = new Marketplace(address(token));

        // Approve the marketplace to spend tokens
        token.approve(address(marketplace), type(uint256).max);

        // Stop broadcasting transactions
        vm.stopBroadcast();

        // Log the deployed addresses
        console2.log("Token deployed to:", address(token));
        console2.log("Marketplace deployed to:", address(marketplace));
    }
}
