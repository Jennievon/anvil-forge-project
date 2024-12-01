// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/Token.sol";

contract TokenTest is Test {
    Token public token;
    address public user1;
    address public user2;

    function setUp() public {
        token = new Token("Test Token", "TEST");
        user1 = address(0x1);
        user2 = address(0x2);
    }

    function testMint() public {
        token.mint(user1, 100);
        assertEq(token.balanceOf(user1), 100);
        assertEq(token.totalSupply(), 100);
    }

    function testTransfer() public {
        token.mint(user1, 100);
        vm.prank(user1);
        token.transfer(user2, 50);
        assertEq(token.balanceOf(user1), 50);
        assertEq(token.balanceOf(user2), 50);
    }

    function testApproveAndTransferFrom() public {
        token.mint(user1, 100);
        
        vm.prank(user1);
        token.approve(address(this), 50);
        
        token.transferFrom(user1, user2, 50);
        assertEq(token.balanceOf(user1), 50);
        assertEq(token.balanceOf(user2), 50);
    }
}