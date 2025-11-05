"use client"

import { useState, useMemo, useEffect } from "react"
import {
    useChainId,
    useWriteContract,
    useAccount,
    useWaitForTransactionReceipt,
    useReadContract,
} from "wagmi"
import { cakeAbi, chainsToContracts } from "@/constants/constants"

interface NFTContractFormProps {
    contractAddress?: `0x${string}`
}

export default function NFTContractForm({ contractAddress }: NFTContractFormProps) {
    // const account = useAccount()
    const chainId = useChainId()

    const cakeContractAddress = useMemo(() => {
        if (contractAddress) return contractAddress
        return (chainsToContracts[chainId]?.cakeNft as `0x${string}`) || null
    }, [chainId, contractAddress])

    const [tokenId, setTokenId] = useState("")
    const [nftImageUrl, setNftImageUrl] = useState<string | null>(null)
    const [checkId, setCheckId] = useState("")

    const {
        data: bakeCakeHash,
        // isPending: isBakePending,
        // error: bakeCakeError,
        writeContractAsync: writeBakeCakeAsync,
    } = useWriteContract()

    const {
        isLoading: isBakeConfirming,
        isSuccess: isBakeConfirmed,
        isError: isBakeError,
    } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash: bakeCakeHash,
    })

    const {
        data: tokenURIData,
        isLoading: isTokenURILoading,
        error: tokenURIError,
        refetch: refetchTokenURI,
    } = useReadContract({
        abi: cakeAbi,
        address: cakeContractAddress as `0x${string}`,
        functionName: "tokenURI",
        args: [checkId ? BigInt(checkId) : undefined],
        query: { enabled: !!checkId },
    })

    async function handleBakeCake() {
        try {
            await writeBakeCakeAsync({
                abi: cakeAbi,
                address: cakeContractAddress as `0x${string}`,
                functionName: "bakeCake",
                args: [],
            })
        } catch (error) {
            console.error("Error baking cake:", error)
        }
    }

    const handleCheckNFT = async () => {
        if (!tokenId) return
        setCheckId(tokenId)
    }

    useEffect(() => {
        if (tokenURIData && !isTokenURILoading) {
            const fetchMetadata = async () => {
                try {
                    const response = await fetch(tokenURIData as string)
                    const metadata = await response.json()
                    setNftImageUrl(metadata.image)
                } catch (error) {
                    console.error("Error fetching metadata:", error)
                    setNftImageUrl(null)
                }
            }
            fetchMetadata()
        }
    }, [tokenURIData, isTokenURILoading])

    return (
        <div className="max-w-2xl w-full mx-auto p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg text-white mt-10 ">
            <h2 className="text-2xl font-semibold text-white text-center mb-6">
                View Cake NFTs
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Enter Token ID"
                    value={tokenId}
                    onChange={e => setTokenId(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md bg-black/70 border border-purple-600/30 text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                    onClick={handleCheckNFT}
                    className="cursor-pointer px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-md shadow-purple-800/30 transition-colors"
                >
                    Check NFT
                </button>
            </div>
            <p>
                Contract Address (Cake NFT):
                <p>
                    <a
                        href="https://sepolia.etherscan.io/address/0x85457472db2a41a761127e8d3db9348b35908ded#code"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-purple-600 hover:underline"
                    >
                        0x85457472Db2A41a761127E8d3db9348b35908deD
                    </a>
                </p>
            </p>


            {isTokenURILoading && (
                <p className="text-center text-yellow-400 animate-pulse">
                    Loading NFT...
                </p>
            )}

            {tokenURIError && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-600/40 rounded-lg">
                    <p className="text-sm text-red-400">
                        ⚠️ Could not find NFT with this token ID.
                    </p>
                </div>
            )}

            {nftImageUrl && (
                <div className="mt-6">
                    <div className="overflow-hidden rounded-lg border border-purple-800 shadow-lg shadow-purple-800/30">
                        <img
                            src={nftImageUrl}
                            alt={`NFT #${checkId}`}
                            className="w-full h-auto max-h-96 object-contain bg-black/30"
                        />
                    </div>
                    <p className="text-sm text-purple-300 mt-3 text-center">
                        NFT #{checkId}
                    </p>
                </div>
            )}


        </div>
    )
}
