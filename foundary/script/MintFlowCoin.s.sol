// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {FlowCoin} from "../src/FlowCoin.sol";

/// @title Script to mint FlowCoin tokens for testing
/// @notice This script mints FlowCoin tokens to a specified address for testing purposes
/// @dev Uses Foundry's Script and calls the `mint` function on a deployed FlowCoin contract

contract MintFlowCoin is Script {
    function run() public {
        vm.startBroadcast();
        FlowCoin flowCoin = new FlowCoin();
        vm.stopBroadcast();
        console.log("Deployed Flowcoin at:", address(flowCoin));
    }
}
