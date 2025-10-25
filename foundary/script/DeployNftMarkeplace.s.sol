// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {NftMarketplace} from "../src/NftMarkeplace.sol";

/// @title Deployment script for the NFT Marketplace contract
/// @notice This script deploys the NftMarketplace contract with a specified payment token
/// @dev Uses Foundry's Script functions `startBroadcast` and `stopBroadcast` to deploy the contract

contract DeployMarketplace is Script {
    function deployMarketplace(address paymentToken) public returns (NftMarketplace) {
        vm.startBroadcast();
        NftMarketplace marketplace = new NftMarketplace(paymentToken);
        vm.stopBroadcast();
        return marketplace;
    }

    function run() external {
        // Replace this with the actual payment token address you want to use
        address paymentToken = 0x29f32E5c09Edbb16BabA9e4a43CD9651E8Fd1785;
        deployMarketplace(paymentToken);
    }

}
