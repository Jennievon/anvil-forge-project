// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/Token.sol";
import "../contracts/Marketplace.sol";

contract MarketplaceTest is Test {
    Token public token;
    Marketplace public marketplace;
    address public seller;
    address public buyer;

    function setUp() public {
        token = new Token("Test Token", "TEST");
        marketplace = new Marketplace(address(token));
        seller = address(0x1);
        buyer = address(0x2);

        // Setup initial balances
        token.mint(buyer, 1000 ether);
    }

    function testListItem() public {
        vm.prank(seller);
        uint256 itemId = marketplace.listItem("Test Item", "Description", 100 ether);
        assertEq(itemId, 1);
        
        (uint256 id, address itemSeller, string memory name, , uint256 price, bool active) = marketplace.getItem(itemId);
        assertEq(id, 1);
        assertEq(itemSeller, seller);
        assertEq(name, "Test Item");
        assertEq(price, 100 ether);
        assertTrue(active);
    }

    function testBuyItem() public {
        // List item
        vm.prank(seller);
        uint256 itemId = marketplace.listItem("Test Item", "Description", 100 ether);

        // Approve and buy
        vm.prank(buyer);
        token.approve(address(marketplace), 100 ether);
        
        vm.prank(buyer);
        marketplace.buyItem(itemId);

        assertEq(token.balanceOf(seller), 100 ether);
        assertEq(token.balanceOf(buyer), 900 ether);
        
        (, , , , , bool active) = marketplace.getItem(itemId);
        assertFalse(active);
    }
}