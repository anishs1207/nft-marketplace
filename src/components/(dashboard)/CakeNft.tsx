"use client"

import { useState, useMemo, useEffect } from "react"
import {
    useChainId,
    useWriteContract,
    useAccount,
    useWaitForTransactionReceipt,
} from "wagmi"
import { cakeAbi, chainsToContracts } from "@/constants/constants"
import { Loader2, Cake, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

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

    const [lastMintedTokenId, setLastMintedTokenId] = useState<string | null>(null)

    const {
        data: bakeCakeHash,
        isPending: isBakePending,
        error: bakeCakeError,
        writeContractAsync: writeBakeCakeAsync,
    } = useWriteContract()

    const {
        isLoading: isBakeConfirming,
        isSuccess: isBakeConfirmed,
        isError: isBakeError,
        data: dataFromBakeReceipt,
    } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash: bakeCakeHash,
    })

    async function handleBakeCake() {
        try {
            const txHash = await writeBakeCakeAsync({
                abi: cakeAbi,
                address: cakeContractAddress as `0x${string}`,
                functionName: "bakeCake",
                args: [],
            })
            console.log("Bake cake transaction submitted:", txHash)
        } catch (error) {
            console.error("Error baking cake:", error)
        }
    }

    useEffect(() => {
        if (isBakeConfirmed && bakeCakeHash) {
            const hexTokenIdFromReceipt = dataFromBakeReceipt?.logs?.[1]?.topics?.[1]
            const intTokenIdFromReceipt = parseInt(hexTokenIdFromReceipt!, 16)
            setLastMintedTokenId(`Token ID: ${intTokenIdFromReceipt}`)
        }
    }, [isBakeConfirmed, bakeCakeHash])

    function getBakeCakeButtonContent() {
        if (isBakePending)
            return (
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Confirm in Wallet...</span>
                </div>
            )
        if (isBakeConfirming)
            return (
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Minting NFT...</span>
                </div>
            )
        if (bakeCakeError || isBakeError)
            return (
                <div className="flex items-center gap-2 text-white-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Error – See Console</span>
                </div>
            )
        if (isBakeConfirmed)
            return (
                <div className="flex items-center gap-2 text-white-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cake NFT Minted!</span>
                </div>
            )
        return (
            <div className="flex items-center gap-2">
                <Cake className="w-4 h-4" />
                <span>Bake a Cake NFT</span>
            </div>
        )
    }

    return (
        <div className="max-w-2xl w-full mx-auto p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg text-white mt-10">

            <div className="rounded-2xl space-y-5">

                <h2 className="text-2xl font-semibold text-white text-center mb-4">
                    Mint a new Cake NFT
                </h2>

                <Button
                    onClick={handleBakeCake}
                    disabled={isBakePending || isBakeConfirming}
                    className="w-full py-3 cursor-pointer bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold shadow-md hover:shadow-purple-500/20"
                >
                    {getBakeCakeButtonContent()}
                </Button>

                {lastMintedTokenId && (
                    <div className="mt-4 p-3 rounded-2xl bg-green-900/20 border border-green-600/40 text-green-400 text-sm flex items-center gap-2">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {lastMintedTokenId}
                        </span>
                        <span>
                            Contract Address: 0x85457472Db2A41a761127E8d3db9348b35908deD
                        </span>
                    </div>

                )}
            </div>

            {/* NFT Preview Section */}
            {/* Wrapped in card style like NFTBox */}
            {false && ( // replace `false` with `nftImageUrl` logic if you fetch preview
                <div className="mt-6 border border-zinc-800 rounded-2xl bg-zinc-900 p-4 flex flex-col items-center">
                    <img
                        src=""
                        alt="NFT"
                        className="w-48 h-48 object-cover rounded-2xl border border-purple-800/30 mb-2"
                    />
                    <p className="text-sm text-zinc-400">Preview of your freshly baked Cake NFT 🍰</p>
                </div>
            )}
        </div>
    )
}
