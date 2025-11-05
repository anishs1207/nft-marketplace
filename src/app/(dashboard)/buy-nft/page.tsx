"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function BuyFormPage() {
    const [contractAddress, setContractAddress] = useState("")
    const [tokenId, setTokenId] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!contractAddress || !tokenId) return alert("Please fill all fields")
        router.push(`/buy-nft/${contractAddress}/${tokenId}`)
    }

    return (
        <div className="min-h-screen">
            <Card className="m-3 max-w-2xl w-full mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg text-white mt-10">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-purple-400">
                        Buy NFT
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-zinc-300">
                                Contract Address
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter contract address"
                                value={contractAddress}
                                onChange={(e) => setContractAddress(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-zinc-300">
                                Token ID
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter token ID"
                                value={tokenId}
                                onChange={(e) => setTokenId(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="cursor-pointer w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold transition-all duration-200 shadow-md hover:shadow-purple-500/20"
                        >
                            Continue
                        </Button>
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
                </CardContent>
            </Card>
        </div>
    )
}
