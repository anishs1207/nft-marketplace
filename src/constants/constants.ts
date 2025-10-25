interface ContractsConfig {
    [chainId: number]: {
        flowCoin: string
        nftMarketplace: string
        cakeNft: string
        moodNft: string
    }
}

// chainId for sepolia testnet
export const chainsToContracts: ContractsConfig = {
    11155111: {
        flowCoin: "0x29f32E5c09Edbb16BabA9e4a43CD9651E8Fd1785",
        nftMarketplace: "0xA02e49Fe843a19dc54d37EC4675611a04096b022",
        cakeNft: "0x85457472Db2A41a761127E8d3db9348b35908deD",
        moodNft: "0x95E14f758641eeFFfb906082342E35b0021f3F4b",
    },
}

export const erc20Abi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "allowance", type: "uint256" },
            { internalType: "uint256", name: "needed", type: "uint256" },
        ],
        name: "ERC20InsufficientAllowance",
        type: "error",
    },
    {
        inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "balance", type: "uint256" },
            { internalType: "uint256", name: "needed", type: "uint256" },
        ],
        name: "ERC20InsufficientBalance",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "approver", type: "address" }],
        name: "ERC20InvalidApprover",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "receiver", type: "address" }],
        name: "ERC20InvalidReceiver",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "sender", type: "address" }],
        name: "ERC20InvalidSender",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "spender", type: "address" }],
        name: "ERC20InvalidSpender",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "spender", type: "address" },
            { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
]

export const marketplaceAbi = [
    {
        inputs: [{ internalType: "address", name: "paymentToken", type: "address" }],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "AlreadyListed",
        type: "error",
    },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "ItemNotForSale",
        type: "error",
    },
    { inputs: [], name: "NoProceeds", type: "error" },
    { inputs: [], name: "NotApprovedForMarketplace", type: "error" },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "NotListed",
        type: "error",
    },
    { inputs: [], name: "NotOwner", type: "error" },
    { inputs: [], name: "PriceMustBeAboveZero", type: "error" },
    { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
    {
        inputs: [{ internalType: "address", name: "token", type: "address" }],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "buyer", type: "address" },
            { indexed: true, internalType: "address", name: "nftAddress", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
        ],
        name: "ItemBought",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "seller", type: "address" },
            { indexed: true, internalType: "address", name: "nftAddress", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "ItemCanceled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "seller", type: "address" },
            { indexed: true, internalType: "address", name: "nftAddress", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
        ],
        name: "ItemListed",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "buyItem",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "cancelListing",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "getListing",
        outputs: [
            {
                components: [
                    { internalType: "uint256", name: "price", type: "uint256" },
                    { internalType: "address", name: "seller", type: "address" },
                ],
                internalType: "struct NftMarketplace.Listing",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getPaymentToken",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "seller", type: "address" }],
        name: "getProceeds",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "price", type: "uint256" },
        ],
        name: "listItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "nftAddress", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "newPrice", type: "uint256" },
        ],
        name: "updateListing",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdrawProceeds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

export const cakeAbi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "address", name: "owner", type: "address" },
        ],
        name: "ERC721IncorrectOwner",
        type: "error",
    },
    {
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "ERC721InsufficientApproval",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "approver", type: "address" }],
        name: "ERC721InvalidApprover",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "operator", type: "address" }],
        name: "ERC721InvalidOperator",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "ERC721InvalidOwner",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "receiver", type: "address" }],
        name: "ERC721InvalidReceiver",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "sender", type: "address" }],
        name: "ERC721InvalidSender",
        type: "error",
    },
    { inputs: [], name: "ERC721Metadata__URI_QueryFor_NonExistentToken", type: "error" },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ERC721NonexistentToken",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "approved", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "operator", type: "address" },
            { indexed: false, internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "CreatedNFT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
            { indexed: true, internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "bakeCake",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "cakeSeed", type: "uint256" }],
        name: "createSvgCakeFromSeed",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "seed", type: "uint256" }],
        name: "generateColorFromSeed",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTokenCounter",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "svg", type: "string" }],
        name: "svgToImageURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

export const nftAbi = [
    {
        inputs: [
            { internalType: "string", name: "sadSvgUri", type: "string" },
            { internalType: "string", name: "happySvgUri", type: "string" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "address", name: "owner", type: "address" },
        ],
        name: "ERC721IncorrectOwner",
        type: "error",
    },
    {
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "ERC721InsufficientApproval",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "approver", type: "address" }],
        name: "ERC721InvalidApprover",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "operator", type: "address" }],
        name: "ERC721InvalidOperator",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "ERC721InvalidOwner",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "receiver", type: "address" }],
        name: "ERC721InvalidReceiver",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "sender", type: "address" }],
        name: "ERC721InvalidSender",
        type: "error",
    },
    { inputs: [], name: "ERC721Metadata__URI_QueryFor_NonExistentToken", type: "error" },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ERC721NonexistentToken",
        type: "error",
    },
    { inputs: [], name: "MoodNft__CantFlipMoodIfNotOwner", type: "error" },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "approved", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "operator", type: "address" },
            { indexed: false, internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "CreatedNFT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
            { indexed: true, internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "flipMood",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getHappySVG",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getSadSVG",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTokenCounter",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    { inputs: [], name: "mintNft", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "mintNftTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]
