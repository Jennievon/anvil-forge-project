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
        uint256 itemId = marketplace.listItem(
            "Test Item",
            "Description",
            100 ether
        );
        assertEq(itemId, 1);

        Marketplace.Item memory item = marketplace.getItem(itemId);
        assertEq(item.id, 1);
        assertEq(item.seller, seller);
        assertEq(item.name, "Test Item");
        assertEq(item.price, 100 ether);
        assertTrue(item.active);
    }

    function testBuyItem() public {
        // List item
        vm.prank(seller);
        uint256 itemId = marketplace.listItem(
            "Test Item",
            "Description",
            100 ether
        );

        // Approve and buy
        vm.prank(buyer);
        token.approve(address(marketplace), 100 ether);

        vm.prank(buyer);
        marketplace.buyItem(itemId);

        assertEq(token.balanceOf(seller), 100 ether);
        assertEq(token.balanceOf(buyer), 900 ether);

        Marketplace.Item memory item = marketplace.getItem(itemId);
        assertFalse(item.active);
    }

    function testGetActiveItems() public {
        // List multiple items
        vm.prank(seller);
        marketplace.listItem("Item 1", "Description 1", 100 ether);

        vm.prank(seller);
        uint256 itemId2 = marketplace.listItem(
            "Item 2",
            "Description 2",
            200 ether
        );

        // Buy one item
        vm.prank(buyer);
        token.approve(address(marketplace), 200 ether);

        vm.prank(buyer);
        marketplace.buyItem(itemId2);

        Marketplace.Item[] memory activeItems = marketplace.getActiveItems();
        assertEq(activeItems.length, 1);
        assertEq(activeItems[0].name, "Item 1");
    }
}
