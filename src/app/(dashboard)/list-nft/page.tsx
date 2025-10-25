// app/list-nft/page.tsx
"use client"

import { useAccount, useChainId } from "wagmi"
import { chainsToContracts } from "@/constants/constants"
import ListNftForm from "@/components/(dashboard)/ListNftForm"

export default function ListNftPage() {
    const account = useAccount()
    const chainId = useChainId()
    const chainSupported =
        chainId in chainsToContracts && chainsToContracts[chainId]?.nftMarketplace !== undefined

    return (
        <div className="min-h-screen mt-10 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">

                    {/* Connection Status */}
                    {!account.isConnected ? (
                        <div className="p-8  rounded-xl shadow-sm bordertext-center">
                            <p className="text-lg text-zinc-600 mb-4">
                                Connect your wallet to list your NFT
                            </p>
                        </div>
                    ) : !chainSupported ? (
                        <div className="p-8 rounded-xl shadow-sm border text-center">
                            <p className="text-lg text-red-600 mb-4">
                                The current network is not supported. Please switch to a supported
                                network.
                            </p>
                        </div>
                    ) : (
                        <ListNftForm />
                    )}
                </div>
            </main>

        </div>
    )
}
