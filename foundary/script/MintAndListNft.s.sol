// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {CakeNft} from "../src/CakeNft.sol";
import {NftMarketplace} from "../src/NftMarkeplace.sol";

/// @title Script for minting Cake NFTs and listing them on the marketplace
/// @notice This script allows you to mint Cake NFTs and optionally list them on a deployed marketplace
/// @dev Uses Foundry's Script functions and assumes CakeNft and NftMarketplace are deployed

contract MintAndList is Script {
    address s_cakeAddress = 0x85457472Db2A41a761127E8d3db9348b35908deD ;
    address s_marketplaceAddress = 0xA02e49Fe843a19dc54d37EC4675611a04096b022;

    function mintAndListCake(address cakeAddress, address marketplaceAddress) public {
        CakeNft cake = CakeNft(cakeAddress);
        NftMarketplace marketplace = NftMarketplace(marketplaceAddress);

        vm.startBroadcast();

        uint256 tokenId = cake.bakeCake();
        console.log(tokenId);
        cake.approve(marketplaceAddress, tokenId);
        marketplace.listItem(cakeAddress, tokenId, 10e6);

        vm.stopBroadcast();
    }

    function justMintCake(address cakeAddress) public {
        CakeNft cake = CakeNft(cakeAddress);

        vm.startBroadcast();

        cake.bakeCake();

        vm.stopBroadcast();
    }

    function run() external {
        mintAndListCake(s_cakeAddress, s_marketplaceAddress);
    }
}
