// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {FlowCoin} from "../src/FlowCoin.sol";

contract FlowCoinTest is Test {
    FlowCoin public flow;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        flow = new FlowCoin();
    }

    // --------------------------------------
    // Constructor Tests
    // --------------------------------------
    function test_InitialSetup() public view {
        assertEq(flow.name(), "FlowCoin");
        assertEq(flow.symbol(), "FLOW");
        assertEq(flow.totalSupply(), 0);
    }

    // --------------------------------------
    // Mint Tests
    // --------------------------------------
    function test_MintIncreasesBalanceAndSupply() public {
        uint256 amount = 1_000_000; // 1 FLOW (6 decimals)
        bool success = flow.mint(user1, amount);
        assertTrue(success);

        assertEq(flow.balanceOf(user1), amount);
        assertEq(flow.totalSupply(), amount);
    }

    function test_MultipleMintsAccumulateCorrectly() public {
        uint256 amt1 = 500_000;
        uint256 amt2 = 200_000;

        flow.mint(user1, amt1);
        flow.mint(user2, amt2);

        assertEq(flow.balanceOf(user1), amt1);
        assertEq(flow.balanceOf(user2), amt2);
        assertEq(flow.totalSupply(), amt1 + amt2);
    }

    function test_MintReturnsTrue() public {
        bool result = flow.mint(user1, 123_456);
        assertTrue(result);
    }

    // // --------------------------------------
    // // Decimals Override Test
    // // --------------------------------------
    // function test_DecimalsIsSix() public pure {
    //     FlowCoin dummy = new FlowCoin();
    //     assertEq(dummy.decimals(), 6);
    // }

    // --------------------------------------
    // ✅ Transfer Function (from ERC20)
    // --------------------------------------
    function test_TransferBetweenUsers() public {
        flow.mint(user1, 1_000_000);
        vm.prank(user1);
        flow.transfer(user2, 250_000);

        assertEq(flow.balanceOf(user1), 750_000);
        assertEq(flow.balanceOf(user2), 250_000);
    }

    function test_TransferRevertsWhenInsufficientBalance() public {
        vm.expectRevert(); // default ERC20 revert
        vm.prank(user1);
        flow.transfer(user2, 10);
    }

    // --------------------------------------
    // ✅ Approve / TransferFrom Tests
    // --------------------------------------
    function test_ApproveAndTransferFrom() public {
        flow.mint(user1, 1_000_000);

        vm.prank(user1);
        flow.approve(user2, 500_000);

        vm.prank(user2);
        flow.transferFrom(user1, user2, 300_000);

        assertEq(flow.balanceOf(user1), 700_000);
        assertEq(flow.balanceOf(user2), 300_000);
        assertEq(flow.allowance(user1, user2), 200_000);
    }

    function test_RevertWhen_TransferFromWithoutApproval() public {
        flow.mint(user1, 1_000_000);
        vm.prank(user2);
        vm.expectRevert();
        flow.transferFrom(user1, user2, 1);
    }
}
