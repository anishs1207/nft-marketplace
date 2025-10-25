"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useReadContract } from "wagmi"
import { cakeAbi } from "@/constants/constants"
import formatPrice from "@/utils/formatPrice"

interface NFTBoxProps {
    tokenId: string
    contractAddress: string
    price: string
}

export default function NFTBox({ tokenId, contractAddress, price }: NFTBoxProps) {
    const [nftImageUrl, setNftImageUrl] = useState<string | null>(null)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [imageError, setImageError] = useState(false)

    // Fetch the tokenURI from the contract
    const {
        data: tokenURIData,
        isLoading: isTokenURILoading,
        error: tokenURIError,
    } = useReadContract({
        abi: cakeAbi,
        address: contractAddress as `0x${string}`,
        functionName: "tokenURI",
        args: tokenId ? [BigInt(tokenId)] : undefined,
        query: {
            enabled: !!tokenId && !!contractAddress,
        },
    })

    // Fetch metadata and extract image URL when tokenURI is available
    useEffect(() => {
        if (tokenURIData && !isTokenURILoading) {
            const fetchMetadata = async () => {
                setIsLoadingImage(true)
                try {
                    const uri = tokenURIData as string
                    const response = await fetch(uri)
                    const metadata = await response.json()
                    const imageUrl = metadata.image
                    setNftImageUrl(imageUrl)
                } catch (error) {
                    console.error("Error fetching metadata:", error)
                    setImageError(true)
                } finally {
                    setIsLoadingImage(false)
                }
            }

            fetchMetadata()
        }
    }, [tokenURIData, isTokenURILoading, tokenId, contractAddress])

    return (
        <div className="border border-purple-700/30 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-zinc-900 text-white">
            <div className="aspect-square relative bg-zinc-800">
                {isLoadingImage || isTokenURILoading ? (
                    <div className="absolute inset-0 flex items-center justify-center text-purple-400 animate-pulse">
                        Loading...
                    </div>
                ) : imageError || tokenURIError || !nftImageUrl ? (
                    <Image
                        src="/placeholder.png"
                        alt={`NFT ${tokenId}`}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <Image
                        src={nftImageUrl}
                        alt={`NFT ${tokenId}`}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-purple-400">Token #{tokenId}</h3>
                    <span className="text-sm font-medium bg-purple-600 px-3 py-1 rounded-full">
                        {formatPrice(price)}
                    </span>
                </div>
                <p className="text-sm text-zinc-300 truncate" title={contractAddress}>
                    Contract: {contractAddress}
                </p>
            </div>
        </div>
    )
}
