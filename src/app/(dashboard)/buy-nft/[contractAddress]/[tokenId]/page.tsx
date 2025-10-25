"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    useAccount,
    useChainId,
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { chainsToContracts, erc20Abi, marketplaceAbi } from "@/constants/constants"
import NFTBox from "@/components/(dashboard)/NftBox"

export default function BuyNftPage() {
    const router = useRouter()
    const { contractAddress, tokenId } = useParams() as {
        contractAddress: string
        tokenId: string
    }
    const { address } = useAccount()
    const chainId = useChainId()

    const marketplaceAddress =
        (chainsToContracts[chainId]?.nftMarketplace as `0x${string}`) || "0x"
    const usdcAddress = (chainsToContracts[chainId]?.flowCoin as `0x${string}`) || "0x"

    const [step, setStep] = useState(1)

    interface Listing {
        price: bigint
        seller: string
    }

    const { data: listingData, isLoading: isListingLoading } = useReadContract({
        abi: marketplaceAbi,
        address: marketplaceAddress,
        functionName: "getListing",
        args: [contractAddress as `0x${string}`, BigInt(tokenId)],
    })

    const listing = listingData as Listing | undefined
    const price = listing ? listing.price.toString() : "0"
    const seller = listing ? listing.seller : undefined

    const {
        data: approvalHash,
        isPending: isApprovalPending,
        writeContract: approveToken,
        error: approvalError,
    } = useWriteContract()

    const {
        data: purchaseHash,
        isPending: isPurchasePending,
        writeContract: buyNft,
        error: purchaseError,
    } = useWriteContract()

    const { isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({
        hash: approvalHash,
    })

    const { isSuccess: isPurchaseSuccess } = useWaitForTransactionReceipt({
        hash: purchaseHash,
    })

    const isListed = price && BigInt(price) > BigInt(0)

    const handleApprove = async () => {
        if (!price) return
        try {
            await approveToken({
                abi: erc20Abi,
                address: usdcAddress,
                functionName: "approve",
                args: [marketplaceAddress, BigInt(price)],
            })
            setStep(2)
        } catch (error) {
            console.error("Error approving token:", error)
        }
    }

    const handleBuy = async () => {
        try {
            await buyNft({
                abi: marketplaceAbi,
                address: marketplaceAddress,
                functionName: "buyItem",
                args: [contractAddress as `0x${string}`, BigInt(tokenId)],
            })
            setStep(3)
        } catch (error) {
            console.error("Error buying NFT:", error)
        }
    }

    useEffect(() => {
        if (step === 3 && isPurchaseSuccess) {
            const timer = setTimeout(() => {
                router.push("/")
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [step, isPurchaseSuccess, router])

    const isSeller = seller === address
    const chainSupported =
        chainId in chainsToContracts && chainsToContracts[chainId]?.nftMarketplace !== undefined

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-purple-400 text-center">
                        Buy NFT
                    </h1>

                    {!address ? (
                        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-lg">
                            <p className="text-lg text-zinc-300 mb-4">
                                Connect your wallet to purchase this NFT
                            </p>
                        </div>
                    ) : !chainSupported ? (
                        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-lg">
                            <p className="text-lg text-red-500 mb-4">
                                The current network is not supported. Please switch to a supported
                                network.
                            </p>
                        </div>
                    ) : isListingLoading ? (
                        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-lg">
                            <p className="text-lg text-zinc-400">Loading NFT details...</p>
                        </div>
                    ) : !isListed ? (
                        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-lg">
                            <p className="text-lg text-red-500 mb-4">
                                This NFT is not currently listed for sale.
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-200"
                            >
                                Back to Home
                            </button>
                        </div>
                    ) : isSeller ? (
                        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-lg">
                            <p className="text-lg text-orange-400 mb-4">
                                You are the seller of this NFT.
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-200"
                            >
                                Back to Home
                            </button>
                        </div>
                    ) : (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg p-6">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-purple-400">
                                        NFT Details
                                    </h2>

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/3">
                                            <NFTBox
                                                tokenId={tokenId}
                                                contractAddress={contractAddress}
                                                price={price}
                                            />
                                        </div>

                                        <div className="md:w-2/3 space-y-4">
                                            <div>
                                                <h3 className="text-sm text-zinc-400">Contract Address</h3>
                                                <p className="mt-1 text-sm break-all text-zinc-200">{contractAddress}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-zinc-400">Token ID</h3>
                                                <p className="mt-1 text-sm text-zinc-200">{tokenId}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-zinc-400">Seller</h3>
                                                <p className="mt-1 text-sm break-all text-zinc-200">{seller}</p>
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    onClick={handleApprove}
                                                    className={`w-full cursor-pointer py-3 rounded-lg text-white font-medium transition-all duration-200 ${isApprovalPending
                                                        ? "bg-zinc-700 cursor-not-allowed"
                                                        : "bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-purple-500/20"
                                                        }`}
                                                >
                                                    {isApprovalPending
                                                        ? "Approving..."
                                                        : "Approve Payment Token"}
                                                </button>

                                                {approvalError && (
                                                    <div className="mt-3 p-3 bg-red-500/10 text-red-400 rounded-md text-sm">
                                                        {approvalError.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-purple-400">Complete Purchase</h2>

                                    {isApprovalSuccess ? (
                                        <>
                                            <div className="p-4 bg-green-500/10 text-green-400 rounded-lg">
                                                Payment token approved! You can now complete your purchase.
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-8">
                                                <div className="md:w-1/3">
                                                    <NFTBox
                                                        tokenId={tokenId}
                                                        contractAddress={contractAddress}
                                                        price={price}
                                                    />
                                                </div>

                                                <div className="md:w-2/3 space-y-4">
                                                    <button
                                                        onClick={handleBuy}
                                                        className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-200 ${isPurchasePending
                                                            ? "bg-zinc-700 cursor-not-allowed"
                                                            : "bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-purple-500/20"
                                                            }`}
                                                    >
                                                        {isPurchasePending ? "Processing..." : "Buy Now"}
                                                    </button>

                                                    {purchaseError && (
                                                        <div className="mt-3 p-3 bg-red-500/10 text-red-400 rounded-md text-sm">
                                                            {purchaseError.message}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4 bg-blue-500/10 text-blue-400 rounded-lg">
                                            Waiting for approval transaction confirmation...
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 text-center">
                                    <h2 className="text-xl font-semibold text-purple-400">
                                        Purchase Complete
                                    </h2>

                                    {isPurchaseSuccess ? (
                                        <>
                                            <div className="p-4 bg-green-500/10 text-green-400 rounded-lg">
                                                🎉 Congratulations! You successfully purchased this NFT.
                                                Redirecting to home...
                                            </div>

                                            <div className="mx-auto w-64 mt-6">
                                                <NFTBox
                                                    tokenId={tokenId}
                                                    contractAddress={contractAddress}
                                                    price={price}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4 bg-blue-500/10 text-blue-400 rounded-lg">
                                            Waiting for purchase confirmation...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
