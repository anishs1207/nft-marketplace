// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title It is used to mint & issue an ERC20 token using openzeppelin contracts to use in the NFT Marketplace
/// @author Anish Sabharwal (@anishs1207)
/// @notice Used to issue tokens to interact with the NFT Marketplace
/// @dev ERC20 tokens standard via openzeppelin contracts

contract FlowCoin is ERC20 {
    constructor() ERC20("FlowCoin", "FLOW") {}

    /// @notice Mints a specified amount of tokens to a given address
    /// @dev Calls the internal `_mint` function from ERC20. Can be used for testing or mock purposes.
    /// @param to The address that will receive the minted tokens
    /// @param amount The number of tokens to mint (in the token's smallest units)
    /// @return A boolean value indicating whether the minting was successful

    function mint(address to, uint256 amount) public returns (bool) {
        _mint(to, amount);
        return true;
    }

    /// @notice Returns the number of decimal places used by the token
    /// @dev Overrides the ERC20 `decimals` function to specify that this token has 6 decimals, similar to USDC
    /// @return The number of decimals (6)

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
