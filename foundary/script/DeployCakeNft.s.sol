// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {CakeNft} from "../src/CakeNft.sol";

/// @title Deployment script for the Cake NFT contract
/// @notice This script deploys the CakeNft contract to the blockchain
/// @dev Uses Foundry's Script functions `startBroadcast` and `stopBroadcast` to deploy the contract

contract DeployCakeNft is Script {
    function deployCake() public returns (CakeNft) {
        vm.startBroadcast();
        CakeNft cake = new CakeNft();
        vm.stopBroadcast();
        return cake;
    }

    function run() external returns (address) {
        CakeNft cake = deployCake();
        return address(cake);
    }
}
