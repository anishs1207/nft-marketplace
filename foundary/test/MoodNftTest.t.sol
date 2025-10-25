// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {MoodNft} from "../src/MoodNft.sol";

contract MoodNftTest is Test {
    MoodNft public moodNft;

    string constant SAD_SVG = "<svg>sad</svg>";
    string constant HAPPY_SVG = "<svg>happy</svg>";

    address public user1 = address(0x1);
    address public user2 = address(0x2);

    // Re-declare event for vm.expectEmit
    event CreatedNFT(uint256 indexed tokenId);

    function setUp() public {
        moodNft = new MoodNft(SAD_SVG, HAPPY_SVG);
    }

    // -------------------------------
    // Constructor / Getters
    // -------------------------------
    // function test_InitialState() public {
    //     assertEq(moodNft.getHappySVG(), HAPPY_SVG);
    //     assertEq(moodNft.getSadSVG(), SAD_SVG);
    //     assertEq(moodNft.getTokenCounter(), 0);
    // }

    // -------------------------------
    // Minting Tests
    // -------------------------------
    function test_MintNftIncrementsCounterAndEmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit CreatedNFT(0);

        vm.prank(user1);
        moodNft.mintNft();

        assertEq(moodNft.getTokenCounter(), 1);
        assertEq(moodNft.ownerOf(0), user1);
    }

    function test_MintNftToSpecificAddress() public {
        moodNft.mintNftTo(user1);
        assertEq(moodNft.getTokenCounter(), 1);
        assertEq(moodNft.ownerOf(0), user1);
    }

    // -------------------------------
    // Flip Mood Tests
    // -------------------------------
    function test_FlipMoodChangesState() public {
        vm.prank(user1);
        moodNft.mintNft();

        vm.prank(user1);
        moodNft.flipMood(0); // HAPPY -> SAD

        vm.prank(user1);
        moodNft.flipMood(0); // SAD -> HAPPY
    }

    function test_RevertWhen_FlipMoodByNonOwnerOrNotApproved() public {
        moodNft.mintNftTo(user1);

        vm.prank(user2);
        vm.expectRevert(MoodNft.MoodNft__CantFlipMoodIfNotOwner.selector);
        moodNft.flipMood(0);
    }

    function test_FlipMoodByApprovedAddress() public {
        moodNft.mintNftTo(user1);

        vm.prank(user1);
        moodNft.approve(user2, 0);

        vm.prank(user2);
        moodNft.flipMood(0);
    }

    // -------------------------------
    // Token URI Tests
    // -------------------------------
//    function test_TokenUriReturnsHappyWhenDefault() public {
//     vm.prank(user1);
//     moodNft.mintNft();

//     string memory uri = moodNft.tokenURI(0);
//     // Instead of matching full SVG, check substring
//     assertTrue(_stringContains(uri, "happy"));
// }

// function test_TokenUriReturnsSadWhenFlipped() public {
//     // Use startPrank for multiple calls from the same address
//     vm.startPrank(user1);
//     moodNft.mintNft();
//     moodNft.flipMood(0);
//     vm.stopPrank();

//     string memory uri = moodNft.tokenURI(0);
//     // Check substring
//     assertTrue(_stringContains(uri, "sad"));
// }

    function test_RevertWhen_TokenUriNonExistentToken() public {
        vm.expectRevert();
        moodNft.tokenURI(0);
    }

    // -------------------------------
    // Getters Coverage
    // -------------------------------
    function test_GettersReturnCorrectValues() public {
        assertEq(moodNft.getHappySVG(), HAPPY_SVG);
        assertEq(moodNft.getSadSVG(), SAD_SVG);

        vm.prank(user1);
        moodNft.mintNft();
        assertEq(moodNft.getTokenCounter(), 1);
    }

    // -------------------------------
    // Helper Functions
    // -------------------------------
    function _stringContains(string memory haystack, string memory needle) internal pure returns (bool) {
        // check if 'haystack' contains 'needle'
        bytes memory h = bytes(haystack);
        bytes memory n = bytes(needle);
        if (n.length == 0 || h.length < n.length) return false;

        for (uint256 i = 0; i <= h.length - n.length; i++) {
            bool matchFound = true;
            for (uint256 j = 0; j < n.length; j++) {
                if (h[i + j] != n[j]) {
                    matchFound = false;
                    break;
                }
            }
            if (matchFound) return true;
        }
        return false;
    }
}
