// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

/// @title Contract used to Mint Dynamic MoodNFT tokne which flips its state (happy, sad)
/// @author Anish Sabharwal (@anishs1207)
/// @notice It is used to create a Dynamic MoodNFT token (which flips state btw Happy and Sad)
/// @dev Uses NFT (ERC721) token from openzeppelin

contract MoodNft is ERC721, Ownable {
    error ERC721Metadata__URI_QueryFor_NonExistentToken();
    error MoodNft__CantFlipMoodIfNotOwner();

    enum NFTState {
        HAPPY,
        SAD
    }

    uint256 private s_tokenCounter;
    string private s_sadSvgUri;
    string private s_happySvgUri;

    mapping(uint256 => NFTState) private s_tokenIdToState;

    event CreatedNFT(uint256 indexed tokenId);

    constructor(string memory sadSvgUri, string memory happySvgUri) ERC721("Mood NFT", "MN") Ownable(msg.sender) {
        s_tokenCounter = 0;
        s_sadSvgUri = sadSvgUri;
        s_happySvgUri = happySvgUri;
    }

    /// @notice Mints a new Cake NFT to the caller's address    
    /// @dev Uses `_safeMint` from ERC721 to safely mint the NFT and increments the token counter. Emits a `CreatedNFT` event with the new token ID.
    
    function mintNft() public {
        uint256 tokenCounter = s_tokenCounter;
        _safeMint(msg.sender, tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        emit CreatedNFT(tokenCounter);
    }

    /// @notice Mints a new Mood NFT to a specified address
    /// @dev Uses `_safeMint` from ERC721 to safely mint the NFT to the `to` address and increments the token counter. Emits a `CreatedNFT` event with the new token ID.
    /// @param to The address that will receive the newly minted NFT

    function mintNftTo(address to) public {
        uint256 tokenCounter = s_tokenCounter;
        _safeMint(to, tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        emit CreatedNFT(tokenCounter);
    }

    /// @notice Flips the mood of a specific Mood NFT between HAPPY and SAD
    /// @dev Only the owner or an approved address of the NFT can flip its mood. Updates the internal `s_tokenIdToState` mapping accordingly.
    /// @param tokenId The ID of the NFT whose mood will be flipped

    function flipMood(uint256 tokenId) public {
        if (getApproved(tokenId) != msg.sender && ownerOf(tokenId) != msg.sender) {
            revert MoodNft__CantFlipMoodIfNotOwner();
        }

        if (s_tokenIdToState[tokenId] == NFTState.HAPPY) {
            s_tokenIdToState[tokenId] = NFTState.SAD;
        } else {
            s_tokenIdToState[tokenId] = NFTState.HAPPY;
        }
    }

    /// @notice Returns the base URI for the token metadata
    /// @dev Overrides the ERC721 `_baseURI` function to return a data URI prefix for on-chain JSON metadata encoded in Base64
    /// @return A string representing the base URI

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    /// @notice Returns the metadata URI for a given token ID
    /// @dev Overrides ERC721 `tokenURI` to return fully on-chain metadata encoded in Base64. Chooses the image URI based on the NFT's current mood (HAPPY or SAD). Reverts if the token does not exist.
    /// @param tokenId The ID of the NFT to retrieve metadata for
    /// @return A string representing the Base64-encoded JSON metadata, including name, description, attributes, and image URI

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (ownerOf(tokenId) == address(0)) {
            revert ERC721Metadata__URI_QueryFor_NonExistentToken();
        }
        string memory imageURI = s_happySvgUri;

        if (s_tokenIdToState[tokenId] == NFTState.SAD) {
            imageURI = s_sadSvgUri;
        }
        return string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes( // bytes casting actually unnecessary as 'abi.encodePacked()' returns a bytes
                        abi.encodePacked(
                            '{"name":"',
                            name(), // You can add whatever name here
                            '", "description":"An NFT that reflects the mood of the owner, 100% on Chain!", ',
                            '"attributes": [{"trait_type": "moodiness", "value": 100}], "image":"',
                            imageURI,
                            '"}'
                        )
                    )
                )
            )
        );
    }

    // getters:

    function getHappySVG() public view returns (string memory) {
        return s_happySvgUri;
    }

    function getSadSVG() public view returns (string memory) {
        return s_sadSvgUri;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
