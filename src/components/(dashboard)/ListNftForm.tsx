"use client"

import { useState } from "react"
import {
    useAccount,
    useChainId,
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from "wagmi"
import { chainsToContracts, nftAbi, marketplaceAbi } from "@/constants/constants"
import NFTBox from "@/components/(dashboard)/NftBox"
import { addDecimalsToPrice } from "@/utils/formatPrice"

export default function ListNftForm() {
    const { address } = useAccount()
    const chainId = useChainId()
    const marketplaceAddress =
        (chainsToContracts[chainId]?.nftMarketplace as `0x${string}`) || "0x"

    const [nftAddress, setNftAddress] = useState("")
    const [tokenId, setTokenId] = useState("")
    const [price, setPrice] = useState("")
    const [step, setStep] = useState(1)

    const { data: ownerData } = useReadContract({
        abi: nftAbi,
        address: nftAddress as `0x${string}`,
        functionName: "ownerOf",
        args: tokenId ? [BigInt(tokenId)] : undefined,
    })

    const {
        data: approvalHash,
        isPending: isApprovalPending,
        writeContract: approveNft,
        error: approvalError,
    } = useWriteContract()

    const {
        data: listingHash,
        isPending: isListingPending,
        writeContract: listNft,
        error: listingError,
    } = useWriteContract()

    const { isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({
        hash: approvalHash,
    })

    const { isSuccess: isListingSuccess } = useWaitForTransactionReceipt({
        hash: listingHash,
    })

    const isOwner = ownerData === address

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault()
        if (nftAddress && tokenId && price) setStep(2)
    }

    const handleApprove = async () => {
        if (!nftAddress || !tokenId) return
        try {
            await approveNft({
                abi: nftAbi,
                address: nftAddress as `0x${string}`,
                functionName: "approve",
                args: [marketplaceAddress, BigInt(tokenId)],
            })
            setStep(3)
        } catch (error) {
            console.error("Error approving NFT:", error)
        }
    }

    const handleList = async () => {
        if (!nftAddress || !tokenId || !price) return
        try {
            const formattedPrice = addDecimalsToPrice(price)
            await listNft({
                abi: marketplaceAbi,
                address: marketplaceAddress,
                functionName: "listItem",
                args: [nftAddress as `0x${string}`, BigInt(tokenId), formattedPrice],
            })
            setStep(4)
        } catch (error) {
            console.error("Error listing NFT:", error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 rounded-xl border border-purple-700/40 bg-gradient-to-b from-black via-[#0a0015] to-[#150028] text-purple-100 shadow-[0_0_30px_rgba(128,0,255,0.25)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(150,0,255,0.4)]">
            {/* Step 1: Form */}
            {step === 1 && (
                <form onSubmit={handlePreview} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">
                        List Your NFT
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-purple-300 mb-1">
                            NFT Contract Address
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 rounded-md bg-black/70 border border-purple-600/30 text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="0x..."
                            value={nftAddress}
                            onChange={e => setNftAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-purple-300 mb-1">
                            Token ID
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 rounded-md bg-black/70 border border-purple-600/30 text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="1"
                            value={tokenId}
                            onChange={e => setTokenId(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-purple-300 mb-1">
                            Price (FLOW)
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 rounded-md bg-black/70 border border-purple-600/30 text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="0.1"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-2 px-4 rounded-md font-semibold text-white bg-purple-700 hover:bg-purple-800 shadow-lg shadow-purple-800/30 transition-colors"
                    >
                        Preview Listing
                    </button>
                    <p>
                        Contract Address (Cake NFT):
                        <p>
                            <a
                                href="https://sepolia.etherscan.io/address/0x85457472db2a41a761127e8d3db9348b35908ded#code"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:underline"
                            >
                                0x85457472Db2A41a761127E8d3db9348b35908deD
                            </a>
                        </p>
                    </p>
                </form>
            )}

            {/* Step 2: Preview */}
            {step === 2 && (
                <div className="space-y-6 text-center">
                    <h2 className="text-xl font-semibold text-purple-400">
                        Preview Your Listing
                    </h2>

                    {!isOwner ? (
                        <div className="p-4 bg-red-900/30 border border-red-700/40 text-red-400 rounded-md">
                            You don’t own this NFT. Please check the contract address and token ID.
                        </div>
                    ) : (
                        <>
                            <div className="w-64 mx-auto">
                                <NFTBox
                                    tokenId={tokenId}
                                    contractAddress={nftAddress}
                                    price={addDecimalsToPrice(price)}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="cursor-pointer flex-1 py-2 px-4 rounded-md bg-purple-900/40 text-purple-300 hover:bg-purple-800/60 transition"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleApprove}
                                    disabled={isApprovalPending}
                                    className="cursor-pointer flex-1 py-2 px-4 rounded-md bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-lg shadow-purple-800/30 transition"
                                >
                                    {isApprovalPending ? "Approving..." : "Approve NFT"}
                                </button>
                            </div>

                            {approvalError && (
                                <div className="p-4 bg-red-900/30 text-red-400 rounded-md border border-red-700/40">
                                    {approvalError.message}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Step 3: Approval */}
            {step === 3 && (
                <div className="space-y-6 text-center">
                    <h2 className="text-xl font-semibold text-purple-400">List Your NFT</h2>

                    {isApprovalSuccess ? (
                        <>
                            <div className="p-4 bg-green-900/30 border border-green-700/40 text-green-400 rounded-md">
                                ✅ Approval successful! You can now list your NFT.
                            </div>

                            <div className="w-64 mx-auto">
                                <NFTBox
                                    tokenId={tokenId}
                                    contractAddress={nftAddress}
                                    price={addDecimalsToPrice(price)}
                                />
                            </div>

                            <button
                                onClick={handleList}
                                disabled={isListingPending}
                                className="cursor-pointer w-full py-2 px-4 rounded-md bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-lg shadow-purple-800/30 transition"
                            >
                                {isListingPending ? "Listing..." : "List NFT for Sale"}
                            </button>

                            {listingError && (
                                <div className="p-4 bg-red-900/30 text-red-400 rounded-md border border-red-700/40">
                                    {listingError.message}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="p-4 bg-purple-900/40 text-purple-300 rounded-md">
                            Waiting for approval transaction confirmation...
                        </div>
                    )}
                </div>
            )}

            {/* Step 4: Listed */}
            {step === 4 && (
                <div className="space-y-6 text-center">
                    <h2 className="text-xl font-semibold text-purple-400">NFT Listed 🎉</h2>

                    {isListingSuccess ? (
                        <>
                            <div className="p-4 bg-green-900/30 text-green-400 border border-green-700/40 rounded-md">
                                Your NFT has been successfully listed on the marketplace!
                            </div>

                            <div className="w-64 mx-auto">
                                <NFTBox
                                    tokenId={tokenId}
                                    contractAddress={nftAddress}
                                    price={addDecimalsToPrice(price)}
                                />
                            </div>

                            <button
                                onClick={() => {
                                    setNftAddress("")
                                    setTokenId("")
                                    setPrice("")
                                    setStep(1)
                                }}
                                className="cursor-pointer w-full py-2 px-4 rounded-md bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-lg shadow-purple-800/30 transition"
                            >
                                List Another NFT
                            </button>
                        </>
                    ) : (
                        <div className="p-4 bg-purple-900/40 text-purple-300 rounded-md">
                            Waiting for listing transaction confirmation...
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
